import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  Schema,
} from "firebase/ai";
import { getApp } from "firebase/app";

export type SimpleInterviewAnswer = {
  interviewAnswer: string;
  simpleExplanation: string;
  example: string;
  keyTakeaway: string;
};

export type AnswerOptions = {
  /** e.g. "Honeywell – Java Interview" */
  context?: string;
  /** e.g. "8 years". Controls depth of the answer. */
  experience?: string;
  /** Fact-check in the background after the draft is shown. Default: true. */
  verify?: boolean;
  /** Called repeatedly while the answer streams in (partial text). */
  onPartial?: (partial: SimpleInterviewAnswer) => void;
  /** Called only if the background check changed/corrected the answer. */
  onImproved?: (answer: SimpleInterviewAnswer) => void;
  /** Skip the cache and generate a fresh answer. */
  forceRefresh?: boolean;
};

const MODEL_NAME = "gemini-3.8-flash";
const CACHE_PREFIX = "interview-answer:v3:";

const SYSTEM_INSTRUCTION = `
You are a Java developer answering a question in a live interview, speaking out loud.

interviewAnswer:
- Maximum 3 short sentences (about 15-20 seconds spoken). Simple, everyday words.
- First person, natural and confident, like talking to a person.
- Sentence 1: the direct answer. Sentence 2: how or why it works. Sentence 3 (only if useful): one practical use or trade-off.
- No bullets, headings, markdown, or textbook definitions. Do not repeat the question or say "Great question".
- Never invent company names, metrics, or numbers.

simpleExplanation: 1-2 very short sentences, explained like to a beginner.
example: one short sentence or tiny one-line example ("" if it would be misleading).
keyTakeaway: one short sentence, 12 words or fewer.

Accuracy rules:
- Be technically correct. Separate what a Java/Spring version finalized from preview features and earlier releases.
- Mention a version number only when you are certain of it.
- If unsure about a detail, leave it out instead of guessing.
- Never return sentence fragments.
`.trim();

const VERIFY_INSTRUCTION = `
You are a strict senior Java reviewer fact-checking an interview answer.
Check every technical claim: Java/Spring versions, which features were preview vs final, default values, complexity, behaviour of APIs, and terminology.
- If everything is correct, return the answer unchanged.
- If anything is wrong, misleading, or too vague, fix it while keeping the same spoken, first-person style and length.
- Remove any claim you are not confident about rather than guessing.
Return the same JSON structure.
`.trim();

const answerSchema = Schema.object({
  properties: {
    interviewAnswer: Schema.string(),
    simpleExplanation: Schema.string(),
    example: Schema.string(),
    keyTakeaway: Schema.string(),
  },
  required: ["interviewAnswer", "simpleExplanation", "example", "keyTakeaway"],
});

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const isCompleteAnswer = (
  value: Partial<SimpleInterviewAnswer>,
): value is SimpleInterviewAnswer =>
  typeof value.interviewAnswer === "string" &&
  typeof value.simpleExplanation === "string" &&
  typeof value.example === "string" &&
  typeof value.keyTakeaway === "string";

const tryParse = (response: string): SimpleInterviewAnswer | null => {
  const json = response
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  const candidates = [json];
  const start = json.indexOf("{");
  const end = json.lastIndexOf("}");
  if (start !== -1 && end > start) candidates.push(json.slice(start, end + 1));

  for (const candidate of candidates) {
    try {
      const answer = JSON.parse(candidate) as Partial<SimpleInterviewAnswer>;
      if (isCompleteAnswer(answer) && answer.interviewAnswer.trim()) {
        return {
          interviewAnswer: answer.interviewAnswer.trim(),
          simpleExplanation: answer.simpleExplanation.trim(),
          example: answer.example.trim(),
          keyTakeaway: answer.keyTakeaway.trim(),
        };
      }
    } catch {
      // try next candidate
    }
  }
  return null;
};

// ---- cache: each question is generated once, so answers stay consistent ----
const readCache = (key: string): SimpleInterviewAnswer | null => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    return raw ? tryParse(raw) : null;
  } catch {
    return null;
  }
};

const writeCache = (key: string, answer: SimpleInterviewAnswer) => {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(answer));
  } catch {
    // storage full or blocked: ignore
  }
};

export const clearCachedAnswer = (question: string) => {
  try {
    localStorage.removeItem(CACHE_PREFIX + normalize(question));
  } catch {
    // ignore
  }
};

// ---- model instances are created once and reused ----
const modelCache = new Map<string, ReturnType<typeof getGenerativeModel>>();

const buildModel = (kind: "draft" | "verify") => {
  const existing = modelCache.get(kind);
  if (existing) return existing;

  const ai = getAI(getApp(), { backend: new GoogleAIBackend() });
  const model = getGenerativeModel(
    ai,
    {
      model: MODEL_NAME,
      systemInstruction:
        kind === "draft" ? SYSTEM_INSTRUCTION : VERIFY_INSTRUCTION,
      generationConfig: {
        maxOutputTokens: 4096, // thinking tokens count toward this limit
        responseMimeType: "application/json",
        responseSchema: answerSchema,
        thinkingConfig: { thinkingLevel: "low" },
      },
    },
    { timeout: 60000 },
  );
  modelCache.set(kind, model);
  return model;
};

// ---- read a string field out of half-finished JSON while it streams ----
const extractPartialField = (text: string, field: string): string => {
  const match = new RegExp(`"${field}"\\s*:\\s*"`).exec(text);
  if (!match) return "";
  let out = "";
  for (let i = match.index + match[0].length; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === "\\") {
      const next = text[i + 1];
      if (next === undefined) break;
      if (next === "n") out += "\n";
      else if (next === "t") out += "\t";
      else if (next === "u") i += 4;
      else out += next;
      i += 1;
      continue;
    }
    if (ch === '"') break;
    out += ch;
  }
  return out;
};

const toPartialAnswer = (text: string): SimpleInterviewAnswer => ({
  interviewAnswer: extractPartialField(text, "interviewAnswer"),
  simpleExplanation: extractPartialField(text, "simpleExplanation"),
  example: extractPartialField(text, "example"),
  keyTakeaway: extractPartialField(text, "keyTakeaway"),
});

const sameAnswer = (a: SimpleInterviewAnswer, b: SimpleInterviewAnswer) =>
  JSON.stringify(a) === JSON.stringify(b);

export const generateSimpleInterviewAnswer = async (
  question: string,
  options: AnswerOptions = {},
): Promise<SimpleInterviewAnswer> => {
  const cacheKey = normalize(question);

  if (!options.forceRefresh) {
    const cached = readCache(cacheKey);
    if (cached) return cached;
  }

  const level = options.experience
    ? `Candidate experience level: ${options.experience}. Match the depth to this level.`
    : "Candidate experience level: mid to senior Java backend developer.";
  const context = options.context
    ? `Interview context: ${options.context}.`
    : "Interview context: Java backend developer interview.";

  // Pass 1: streamed draft. The user sees text within about a second.
  //   const stream = await buildModel("draft").generateContentStream(
  //     `${context}\n${level}\n\nInterview question: ${question}`,
  //   );
  //   let accumulated = "";
  //   for await (const chunk of stream.stream) {
  //     accumulated += chunk.text();
  //     options.onPartial?.(toPartialAnswer(accumulated));
  //   }
  //   const draft = tryParse(accumulated || (await stream.response).text());
  //   if (!draft) {
  //     throw new Error("The answer service returned an unreadable response.");
  //   }
  //   writeCache(cacheKey, draft);

  //   // Pass 2: fact-check in the background. Never blocks the UI.
  //   if (options.verify === true) {
  //     void (async () => {
  //       try {
  //         const reviewResult = await buildModel("verify").generateContent(
  //           `Interview question: ${question}\n\nAnswer to review:\n${JSON.stringify(draft)}`,
  //         );
  //         const reviewed = tryParse(reviewResult.response.text());
  //         if (reviewed && !sameAnswer(reviewed, draft)) {
  //           writeCache(cacheKey, reviewed);
  //           options.onImproved?.(reviewed);
  //         }
  //       } catch (error) {
  //         console.warn("Background verification failed, keeping draft:", error);
  //       }
  //     })();
  //   }

  //   return draft;
  // };
  console.log("Starting Gemini request", {
    model: MODEL_NAME,
    question,
  });
  const stream = await buildModel("draft").generateContentStream(
    `${context}\n${level}\n\nInterview question: ${question}`,
  );
  console.log("Gemini stream opened");

  let accumulated = "";

  for await (const chunk of stream.stream) {
    const chunkText = chunk.text();

    if (!chunkText) continue;

    accumulated += chunkText;
    options.onPartial?.(toPartialAnswer(accumulated));
  }

  console.log("Gemini stream completed", {
    responseLength: accumulated.length,
  });

  // Always inspect the final response as a fallback.
  const finalResponse = await stream.response;
  const finalText = finalResponse.text();

  const draft = tryParse(accumulated) ?? tryParse(finalText);

  if (!draft) {
    console.error("Gemini returned an unreadable response", {
      streamedLength: accumulated.length,
      finalLength: finalText.length,
      streamedResponse: accumulated,
      finalResponse: finalText,
    });

    throw new Error(
      "Gemini returned an empty or invalid JSON response. Check the browser console.",
    );
  }

  writeCache(cacheKey, draft);

  // Pass 2: background verification.
  if (options.verify === true) {
    void (async () => {
      try {
        const reviewResult = await buildModel("verify").generateContent(
          `Interview question: ${question}\n\nAnswer to review:\n${JSON.stringify(draft)}`,
        );

        const reviewed = tryParse(reviewResult.response.text());

        if (reviewed && !sameAnswer(reviewed, draft)) {
          writeCache(cacheKey, reviewed);
          options.onImproved?.(reviewed);
        }
      } catch (error) {
        console.warn("Background verification failed, keeping draft:", error);
      }
    })();
  }

  return draft;
};

/** Warm the cache for a question in the background (e.g. the next one). */
export const prefetchInterviewAnswer = (
  question: string,
  options: AnswerOptions = {},
) => {
  if (readCache(normalize(question))) return;
  void generateSimpleInterviewAnswer(question, options).catch(() => {
    // prefetch is best-effort
  });
};

// export const runGeminiDiagnostics = async () => {
//   const ai = getAI(getApp(), { backend: new GoogleAIBackend() });
//   const opts = { timeout: 30000 };

//   const tests: [string, () => Promise<unknown>][] = [
//     [
//       "A: 3.8 plain",
//       () =>
//         getGenerativeModel(
//           ai,
//           { model: "gemini-3.8-flash" },
//           opts,
//         ).generateContent("Say hello in 3 words"),
//     ],
//     [
//       "B: 3.8 + low thinking",
//       () =>
//         getGenerativeModel(
//           ai,
//           {
//             model: "gemini-3.8-flash",
//             generationConfig: { thinkingConfig: { thinkingLevel: "low" } },
//           },
//           opts,
//         ).generateContent("Say hello in 3 words"),
//     ],
//     [
//       "C: 3.8 + low + schema + system prompt",
//       () =>
//         getGenerativeModel(
//           ai,
//           {
//             model: "gemini-3.8-flash",
//             systemInstruction: SYSTEM_INSTRUCTION,
//             generationConfig: {
//               maxOutputTokens: 4096,
//               responseMimeType: "application/json",
//               responseSchema: answerSchema,
//               thinkingConfig: { thinkingLevel: "low" },
//             },
//           },
//           opts,
//         ).generateContent("Interview question: What is a HashMap?"),
//     ],
//     [
//       "D: 3.8 streaming (first chunk)",
//       async () => {
//         const s = await getGenerativeModel(
//           ai,
//           { model: "gemini-3.8-flash" },
//           opts,
//         ).generateContentStream("Say hello in 3 words");
//         for await (const chunk of s.stream) return chunk.text();
//       },
//     ],
//     [
//       "E: 3.7 plain",
//       () =>
//         getGenerativeModel(
//           ai,
//           { model: "gemini-3.7-flash" },
//           opts,
//         ).generateContent("Say hello in 3 words"),
//     ],
//   ];

//   for (const [label, run] of tests) {
//     const start = performance.now();
//     try {
//       await run();
//       console.log(`✅ ${label}: ${Math.round(performance.now() - start)} ms`);
//     } catch (error) {
//       console.error(
//         `❌ ${label}: ${Math.round(performance.now() - start)} ms`,
//         error,
//       );
//     }
//   }
// };
