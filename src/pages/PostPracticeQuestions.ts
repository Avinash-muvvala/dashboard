export type PracticeQuestion = {
  question: string;
  answer: string;
};

export const extractPostPracticeQuestions = (
  description: string,
): PracticeQuestion[] => {
  const questions: PracticeQuestion[] = [];
  const explicitPattern =
    /Q:\s*([\s\S]*?)\n✅ Answer:\s*([\s\S]*?)(?=\n\n(?:💡|📌|🔹|🔥|Q:)|$)/g;

  for (const match of description.matchAll(explicitPattern)) {
    questions.push({
      question: match[1].trim(),
      answer: match[2].trim(),
    });
  }

  const descriptionLines = description.split(/\r?\n/);
  const questionHeadingIndex = descriptionLines.findIndex(
    (line) =>
      /\bQUESTIONS?\b/i.test(line) &&
      (/^[^\S\r\n]*[🎯🔹🔥]/u.test(line) ||
        /^[^\S\r\n]*(?:INTERVIEW\s+)?QUESTIONS?\b[^\S\r\n]*$/i.test(line)),
  );
  const section =
    questionHeadingIndex < 0
      ? undefined
      : descriptionLines.slice(questionHeadingIndex + 1).join("\n");
  if (!section) return questions;

  const sectionContent = section.split(/\n\n(?=(?:💡|🏆|🚀|🔹|🔥 Day|📌))/)[0];
  const numberedQuestions = sectionContent.split(
    /\n(?=\s*(?:\d+(?:\uFE0F?\u20E3|[.)])?|🔟)\s)/u,
  );

  for (const block of numberedQuestions) {
    const answerMarker = block.indexOf("\n👉");
    if (answerMarker < 0) continue;

    const question = block
      .slice(0, answerMarker)
      .replace(/^\s*(?:\d+(?:\uFE0F?\u20E3|[.)])?|🔟)\s*/u, "")
      .trim();
    const answer = block.slice(answerMarker + 2).trim();
    if (question && answer) questions.push({ question, answer });
  }

  return questions;
};
