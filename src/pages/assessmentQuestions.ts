import type { DayType } from "./Constants/DayType";
import { javaQuestions } from "./JavaQuestions/JavaQuestions";
import { topicGuides } from "./JavaGuide/weeks";
import { javaScriptQuestions } from "./Java Scrpit/JavaScrpitQuestions";
import { ReactPracticeQuestions } from "./REACTPOSTS/ReactPracticeQuestions";
import { sqlQuestions } from "./SQL/SqlQuestions";
import { SpringBootPracticeQuestions } from "./SpringBootPosts/SpringBootPracticeQuestions";

export const assessmentSkills = [
  "Java",
  "Spring Boot",
  "Microservices",
  "SQL",
  "JavaScript",
  "React",
  "API Testing",
  "Selenium",
] as const;

export type AssessmentSkill = (typeof assessmentSkills)[number];
export type ExperienceBand = "beginner" | "intermediate" | "advanced";
export type AssessmentSection =
  | "Java theory"
  | "Spring Boot"
  | "Microservices"
  | "Java coding"
  | "SQL"
  | "API Testing"
  | "Selenium"
  | "JavaScript theory"
  | "JavaScript coding"
  | "React";

export type AssessmentQuestion = {
  id: string;
  skill: AssessmentSkill;
  section: AssessmentSection;
  title: string;
  prompt: string;
  context?: string;
  answer: string;
  difficulty: ExperienceBand;
};

const QUESTIONS_PER_SECTION = 3;
const MIN_ASSESSMENT_QUESTION_COUNT = 15;
const MAX_ASSESSMENT_QUESTION_COUNT = 25;

const assessmentSectionPlan: {
  skill: AssessmentSkill;
  section: AssessmentSection;
}[] = [
  { skill: "Java", section: "Java theory" },
  { skill: "Spring Boot", section: "Spring Boot" },
  { skill: "Microservices", section: "Microservices" },
  { skill: "Java", section: "Java coding" },
  { skill: "SQL", section: "SQL" },
  { skill: "API Testing", section: "API Testing" },
  { skill: "Selenium", section: "Selenium" },
  { skill: "JavaScript", section: "JavaScript theory" },
  { skill: "JavaScript", section: "JavaScript coding" },
  { skill: "React", section: "React" },
];

const bandForYears = (years: number): ExperienceBand => {
  if (years <= 1) return "beginner";
  if (years <= 4) return "intermediate";
  return "advanced";
};

const dayBand = (day: string): ExperienceBand => {
  const dayNumber = Number(day.replace("Day ", ""));
  if (dayNumber <= 15) return "beginner";
  if (dayNumber <= 30) return "intermediate";
  return "advanced";
};

type QuestionLike = {
  question: string;
  explanation: string;
  inputs: string;
  expectedOutput?: string;
  hint?: string;
};

const mapDailyQuestions = (
  skill: "Java" | "JavaScript",
  section: "Java coding" | "JavaScript coding",
  questionsByDay: Record<DayType, QuestionLike[]>,
): AssessmentQuestion[] =>
  Object.entries(questionsByDay).flatMap(([day, questions]) =>
    questions.map((question, index) => ({
      id: `${skill}-${day}-${index}`,
      skill,
      section,
      title: question.question,
      prompt: question.explanation,
      context: question.inputs,
      answer:
        question.expectedOutput ||
        question.hint ||
        "Explain your approach and expected result.",
      difficulty: dayBand(day),
    })),
  );

const mapJavaTheoryQuestions = (): AssessmentQuestion[] =>
  Object.entries(topicGuides).flatMap(([topic, guide]) => {
    const week = Number(topic.split("-")[0]);
    const difficulty: ExperienceBand =
      week === 1 ? "beginner" : week === 4 ? "advanced" : "intermediate";

    return guide.quizzes.map((quiz, index) => ({
      id: `Java-theory-${topic}-${index}`,
      skill: "Java" as const,
      section: "Java theory" as const,
      title: `Java fundamentals · ${topic}`,
      prompt: quiz.question,
      answer: `${quiz.options[quiz.correctIndex]}\n\n${quiz.explanation}`,
      difficulty,
    }));
  });

const mapSpringBootQuestions = (): AssessmentQuestion[] => {
  const questions = Object.entries(SpringBootPracticeQuestions)
    .sort(([first], [second]) => Number(first) - Number(second))
    .flatMap(([, dailyQuestions]) => dailyQuestions);

  return questions.map((question, index) => ({
    id: `Spring Boot-${index}`,
    skill: "Spring Boot",
    section: "Spring Boot",
    title: question.question,
    prompt: "Explain your answer and include an example where appropriate.",
    answer: question.answer,
    difficulty:
      index < questions.length / 3
        ? "beginner"
        : index < (questions.length * 2) / 3
          ? "intermediate"
          : "advanced",
  }));
};

const microservicesQuestions: AssessmentQuestion[] = [
  {
    id: "microservices-beginner-1",
    skill: "Microservices",
    section: "Microservices",
    title: "What is a microservice?",
    prompt: "Describe how a microservice is structured and deployed.",
    answer:
      "A microservice is a small, independently deployable service focused on a specific business capability. Services communicate through defined APIs or messages.",
    difficulty: "beginner",
  },
  {
    id: "microservices-beginner-2",
    skill: "Microservices",
    section: "Microservices",
    title: "How do microservices differ from a monolith?",
    prompt: "Compare how the two architectures are built and released.",
    answer:
      "A monolith packages most functionality into one deployable application. Microservices split functionality into services that can be developed and deployed independently.",
    difficulty: "beginner",
  },
  {
    id: "microservices-beginner-3",
    skill: "Microservices",
    section: "Microservices",
    title: "How can microservices communicate?",
    prompt: "Name common communication styles and when each is useful.",
    answer:
      "Services commonly communicate synchronously through HTTP APIs or asynchronously through a message broker. The choice depends on latency, coupling, and delivery requirements.",
    difficulty: "beginner",
  },
  {
    id: "microservices-intermediate-1",
    skill: "Microservices",
    section: "Microservices",
    title: "What does an API gateway do?",
    prompt: "Explain the gateway's role in a microservices system.",
    answer:
      "An API gateway provides a client-facing entry point and can route requests, enforce authentication, apply rate limits, and combine responses.",
    difficulty: "intermediate",
  },
  {
    id: "microservices-intermediate-2",
    skill: "Microservices",
    section: "Microservices",
    title: "How does service discovery help?",
    prompt:
      "Explain why service locations may need to be discovered dynamically.",
    answer:
      "Service discovery lets callers find healthy service instances without hard-coding addresses, which is useful as instances scale or change.",
    difficulty: "intermediate",
  },
  {
    id: "microservices-intermediate-3",
    skill: "Microservices",
    section: "Microservices",
    title: "What problem does a circuit breaker solve?",
    prompt: "Describe how it behaves when a downstream service is unhealthy.",
    answer:
      "A circuit breaker temporarily stops calls to a failing dependency, allowing it to recover and helping prevent cascading failures. It can later allow limited calls to test recovery.",
    difficulty: "intermediate",
  },
  {
    id: "microservices-advanced-1",
    skill: "Microservices",
    section: "Microservices",
    title: "How can a distributed transaction be handled?",
    prompt:
      "Describe a practical alternative to one database transaction spanning services.",
    answer:
      "A saga coordinates a sequence of local transactions and uses compensating actions when a step fails. It avoids requiring one transaction across independent service databases.",
    difficulty: "advanced",
  },
  {
    id: "microservices-advanced-2",
    skill: "Microservices",
    section: "Microservices",
    title: "How do you trace a request across services?",
    prompt: "Explain which observability signals and techniques are useful.",
    answer:
      "Propagate a correlation or trace ID across service boundaries and collect distributed traces, logs, and metrics. This helps connect one request's behavior across the system.",
    difficulty: "advanced",
  },
  {
    id: "microservices-advanced-3",
    skill: "Microservices",
    section: "Microservices",
    title: "How can events be published reliably with database changes?",
    prompt:
      "Describe a pattern that avoids losing events after a successful database write.",
    answer:
      "The transactional outbox writes the business change and an event record in the same local transaction. A separate publisher delivers the event and marks it processed.",
    difficulty: "advanced",
  },
];

const qaSkillQuestions: AssessmentQuestion[] = [
  {
    id: "api-testing-beginner-1",
    skill: "API Testing",
    section: "API Testing",
    title: "What do you verify in an API test?",
    prompt: "Describe the main parts of a request and response to check.",
    answer:
      "Verify the status code, response body and schema, headers, and relevant side effects. Also check that invalid requests fail safely and consistently.",
    difficulty: "beginner",
  },
  {
    id: "api-testing-beginner-2",
    skill: "API Testing",
    section: "API Testing",
    title: "How do GET and POST requests differ?",
    prompt: "Explain their common intent and how their request data is sent.",
    answer:
      "GET requests retrieve a representation and commonly pass filters in the URL. POST requests submit data, commonly in the request body, to create or process a resource.",
    difficulty: "beginner",
  },
  {
    id: "api-testing-beginner-3",
    skill: "API Testing",
    section: "API Testing",
    title: "What do the 2xx, 4xx, and 5xx status-code groups indicate?",
    prompt: "Describe what each response class tells a test about the request.",
    answer:
      "2xx indicates success, 4xx indicates a client-side request or authorization issue, and 5xx indicates that the server failed to fulfill a valid request.",
    difficulty: "beginner",
  },
  {
    id: "api-testing-beginner-4",
    skill: "API Testing",
    section: "API Testing",
    title: "What is the difference between positive and negative API tests?",
    prompt: "Give an example of each for a user-creation endpoint.",
    answer:
      "A positive test sends valid data and checks the expected success response. A negative test sends invalid or missing data and checks for a documented error without unintended side effects.",
    difficulty: "beginner",
  },
  {
    id: "api-testing-beginner-5",
    skill: "API Testing",
    section: "API Testing",
    title: "What is the difference between path and query parameters?",
    prompt: "Explain how each is commonly used in an endpoint.",
    answer:
      "Path parameters identify a resource, such as /users/42. Query parameters commonly filter, sort, or paginate results, such as /users?page=2.",
    difficulty: "beginner",
  },
  {
    id: "api-testing-intermediate-1",
    skill: "API Testing",
    section: "API Testing",
    title: "How would you test an endpoint that requires authentication?",
    prompt: "Include both valid and invalid credential cases.",
    answer:
      "Test a valid token, a missing token, an expired token, and a token without the required permission. Verify the documented status and response for each case.",
    difficulty: "intermediate",
  },
  {
    id: "api-testing-intermediate-2",
    skill: "API Testing",
    section: "API Testing",
    title: "What is API contract testing?",
    prompt:
      "Explain what a contract test protects between a provider and its clients.",
    answer:
      "Contract testing checks that a service's requests and responses match an agreed schema and behavior, helping detect incompatible changes before consumers are affected.",
    difficulty: "intermediate",
  },
  {
    id: "api-testing-intermediate-3",
    skill: "API Testing",
    section: "API Testing",
    title: "How would you test whether an operation is idempotent?",
    prompt:
      "Describe what you would compare after sending the same request more than once.",
    answer:
      "Send the same request repeatedly and verify that repeating it has the same intended effect as sending it once. For example, a retried PUT should not create duplicate resources.",
    difficulty: "intermediate",
  },
  {
    id: "api-testing-advanced-1",
    skill: "API Testing",
    section: "API Testing",
    title: "How do you test backward compatibility for an API change?",
    prompt:
      "Explain how you would protect existing consumers while a contract evolves.",
    answer:
      "Run contract tests for current consumers, verify old fields and behaviors remain supported, and treat breaking changes as a versioned migration rather than silently changing the existing contract.",
    difficulty: "advanced",
  },
  {
    id: "api-testing-advanced-2",
    skill: "API Testing",
    section: "API Testing",
    title: "How would you test rate limiting?",
    prompt:
      "Describe checks for both requests within and beyond the configured limit.",
    answer:
      "Send requests below and above the configured threshold, verify normal responses before the limit, and check the documented throttling response and retry guidance after it is reached.",
    difficulty: "advanced",
  },
  {
    id: "api-testing-advanced-3",
    skill: "API Testing",
    section: "API Testing",
    title: "How would you test an API that triggers asynchronous work?",
    prompt: "Explain how to verify completion without relying on fixed delays.",
    answer:
      "Verify the initial accepted response and returned job identifier, then poll a status endpoint or wait on an event with a bounded timeout until the job reaches a terminal state.",
    difficulty: "advanced",
  },
  {
    id: "selenium-beginner-1",
    skill: "Selenium",
    section: "Selenium",
    title: "What is Selenium WebDriver used for?",
    prompt: "Describe the type of application behavior it helps test.",
    answer:
      "Selenium WebDriver automates browser interactions, allowing tests to exercise web pages as a user would and verify the resulting UI behavior.",
    difficulty: "beginner",
  },
  {
    id: "selenium-beginner-2",
    skill: "Selenium",
    section: "Selenium",
    title: "What makes a good element locator?",
    prompt:
      "Describe how you would choose a locator for a frequently tested control.",
    answer:
      "Prefer a stable, unique locator such as an accessible role/name or a dedicated test attribute. Avoid brittle selectors tied to layout or generated class names.",
    difficulty: "beginner",
  },
  {
    id: "selenium-beginner-3",
    skill: "Selenium",
    section: "Selenium",
    title: "Why should tests avoid fixed sleep calls?",
    prompt: "Explain a more reliable way to wait for a page element.",
    answer:
      "Fixed sleeps waste time and can still be too short. Use an explicit wait for the expected condition, such as an element becoming visible or clickable.",
    difficulty: "beginner",
  },
  {
    id: "selenium-beginner-4",
    skill: "Selenium",
    section: "Selenium",
    title: "What is an assertion in a browser test?",
    prompt: "Describe what an assertion checks after an interaction.",
    answer:
      "An assertion checks that the application reached the expected state, such as showing a confirmation message after a form is submitted.",
    difficulty: "beginner",
  },
  {
    id: "selenium-beginner-5",
    skill: "Selenium",
    section: "Selenium",
    title: "What is the Page Object Model?",
    prompt: "Explain how it organizes page interactions in a test suite.",
    answer:
      "The Page Object Model puts page-specific locators and actions behind reusable objects, separating test intent from browser interaction details.",
    difficulty: "beginner",
  },
  {
    id: "selenium-intermediate-1",
    skill: "Selenium",
    section: "Selenium",
    title: "How do implicit and explicit waits differ?",
    prompt: "Explain their scope and why explicit waits are often preferred.",
    answer:
      "An implicit wait applies a general search timeout for element lookups. An explicit wait targets a particular condition and is usually clearer for dynamic page behavior.",
    difficulty: "intermediate",
  },
  {
    id: "selenium-intermediate-2",
    skill: "Selenium",
    section: "Selenium",
    title: "How can a test handle a changing element on a page?",
    prompt: "Describe how to avoid acting on a stale or not-yet-ready element.",
    answer:
      "Wait for the required state and locate the element close to the interaction. If the page refreshes the element, locate it again rather than reusing a stale reference.",
    difficulty: "intermediate",
  },
  {
    id: "selenium-intermediate-3",
    skill: "Selenium",
    section: "Selenium",
    title: "How can browser tests be made less flaky?",
    prompt: "Name practices that improve repeatability.",
    answer:
      "Use explicit condition-based waits, independent test data, stable locators, isolated tests, and deterministic setup and cleanup. Avoid timing assumptions and shared mutable state.",
    difficulty: "intermediate",
  },
  {
    id: "selenium-advanced-1",
    skill: "Selenium",
    section: "Selenium",
    title: "How would you run browser tests across multiple browsers?",
    prompt: "Describe a maintainable way to distribute the same test suite.",
    answer:
      "Parameterize browser setup and run the same tests against a supported browser matrix, locally or through a remote grid. Keep browser-specific behavior isolated and explicit.",
    difficulty: "advanced",
  },
  {
    id: "selenium-advanced-2",
    skill: "Selenium",
    section: "Selenium",
    title: "What should run in parallel, and what should remain isolated?",
    prompt:
      "Explain how test data and browser sessions affect parallel execution.",
    answer:
      "Independent tests with isolated browser sessions and data can run in parallel. Tests that share accounts, mutable records, or application state need isolation or controlled sequencing.",
    difficulty: "advanced",
  },
  {
    id: "selenium-advanced-3",
    skill: "Selenium",
    section: "Selenium",
    title: "How do you balance UI tests with API and unit tests?",
    prompt: "Explain how the test layers can complement one another.",
    answer:
      "Use unit and API tests for fast, broad logic coverage, and reserve UI automation for critical end-to-end user journeys. This keeps feedback quick while still checking integrated behavior.",
    difficulty: "advanced",
  },
];

const mapSqlQuestions = (): AssessmentQuestion[] =>
  sqlQuestions.map((question) => ({
    id: `SQL-${question.id}`,
    skill: "SQL",
    section: "SQL",
    title: question.title,
    prompt: question.description,
    context: `Topic: ${question.topic}\nHint: ${question.hint}`,
    answer: question.solution,
    difficulty:
      question.difficulty === "Easy"
        ? "beginner"
        : question.difficulty === "Medium"
          ? "intermediate"
          : "advanced",
  }));

const javascriptTheoryQuestions: Omit<
  AssessmentQuestion,
  "id" | "skill" | "section"
>[] = [
  {
    title: "What is the difference between let, const, and var?",
    prompt: "Compare their scope and reassignment behavior.",
    answer:
      "let and const are block-scoped; var is function-scoped. let can be reassigned, const cannot be reassigned, and var can be redeclared within its scope.",
    difficulty: "beginner",
  },
  {
    title: "What is a closure in JavaScript?",
    prompt: "Explain what a function retains after its outer function returns.",
    answer:
      "A closure is a function together with access to variables from its lexical scope, even after the outer function has returned.",
    difficulty: "beginner",
  },
  {
    title: "What is the difference between == and ===?",
    prompt: "Describe how JavaScript compares values with each operator.",
    answer:
      "== may coerce operand types before comparing values. === compares both type and value without that coercion.",
    difficulty: "beginner",
  },
  {
    title: "What is hoisting in JavaScript?",
    prompt: "Describe how declarations are handled before their code executes.",
    answer:
      "JavaScript processes declarations before executing their scope. Function declarations are available earlier; var declarations are initialized as undefined, while let and const remain in the temporal dead zone until initialized.",
    difficulty: "beginner",
  },
  {
    title: "What is event bubbling?",
    prompt: "Explain how an event travels through nested DOM elements.",
    answer:
      "In event bubbling, an event starts at its target element and propagates through its ancestors. A handler can stop that propagation with stopPropagation when needed.",
    difficulty: "beginner",
  },
  {
    title: "How do promises represent asynchronous work?",
    prompt:
      "Describe the states of a promise and how callers handle its result.",
    answer:
      "A promise represents work that may be pending, fulfilled, or rejected. Callers handle completion with then/catch or await inside an async function.",
    difficulty: "intermediate",
  },
  {
    title: "How does the JavaScript event loop work?",
    prompt: "Explain how queued callbacks run alongside synchronous code.",
    answer:
      "JavaScript runs synchronous work on its call stack. The event loop schedules queued callbacks when the stack is clear, with promise microtasks processed before the next task.",
    difficulty: "intermediate",
  },
  {
    title: "How is the value of this determined?",
    prompt: "Explain why call-site context matters for regular functions.",
    answer:
      "For regular functions, this is generally determined by how the function is called. Arrow functions instead capture this lexically from their surrounding scope.",
    difficulty: "intermediate",
  },
  {
    title: "What is prototypal inheritance?",
    prompt:
      "Describe how an object can access behavior defined on another object.",
    answer:
      "Objects can inherit through a prototype chain. When a property is not found on an object, JavaScript checks its prototype and continues up the chain.",
    difficulty: "advanced",
  },
  {
    title: "How do microtasks differ from tasks in the event loop?",
    prompt:
      "Describe when promise callbacks and timer callbacks are processed.",
    answer:
      "After the current synchronous work finishes, the runtime drains the microtask queue, which includes promise reactions, before moving on to the next task such as a timer callback.",
    difficulty: "advanced",
  },
  {
    title: "What is the difference between shallow and deep copying?",
    prompt: "Explain what happens to nested objects in each kind of copy.",
    answer:
      "A shallow copy creates a new outer object but keeps references to nested objects. A deep copy also duplicates nested data so the copies do not share those references.",
    difficulty: "advanced",
  },
];

const mapJavaScriptTheoryQuestions = (): AssessmentQuestion[] =>
  javascriptTheoryQuestions.map((question, index) => ({
    id: `JavaScript-theory-${index}`,
    skill: "JavaScript",
    section: "JavaScript theory",
    ...question,
  }));

const mapReactQuestions = (): AssessmentQuestion[] => {
  const days = Object.entries(ReactPracticeQuestions).sort(
    ([first], [second]) => Number(first) - Number(second),
  );

  return days.flatMap(([day, questions], dayIndex) =>
    questions.map((question, index) => ({
      id: `React-${day}-${index}`,
      skill: "React" as const,
      section: "React" as const,
      title: question.question,
      prompt: "Explain your answer and include an example where appropriate.",
      answer: question.answer,
      difficulty:
        dayIndex < days.length / 3
          ? "beginner"
          : dayIndex < (days.length * 2) / 3
            ? "intermediate"
            : "advanced",
    })),
  );
};

const sectionQuestionBank = (
  section: AssessmentSection,
): AssessmentQuestion[] => {
  switch (section) {
    case "Java theory":
      return mapJavaTheoryQuestions();
    case "Spring Boot":
      return mapSpringBootQuestions();
    case "Microservices":
      return microservicesQuestions;
    case "Java coding":
      return mapDailyQuestions("Java", section, javaQuestions);
    case "SQL":
      return mapSqlQuestions();
    case "API Testing":
    case "Selenium":
      return qaSkillQuestions.filter(
        (question) => question.section === section,
      );
    case "JavaScript theory":
      return mapJavaScriptTheoryQuestions();
    case "JavaScript coding":
      return mapDailyQuestions("JavaScript", section, javaScriptQuestions);
    case "React":
      return mapReactQuestions();
  }
};

const shuffle = <T>(items: T[]): T[] => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }
  return shuffled;
};

const questionDifficultyPlan = (
  experience: ExperienceBand,
  questionCount: number,
): { band: ExperienceBand; count: number }[] => {
  if (experience === "beginner") {
    return [{ band: "beginner", count: questionCount }];
  }

  if (experience === "intermediate") {
    const beginnerCount = Math.ceil((questionCount * 2) / 3);
    return [
      { band: "beginner", count: beginnerCount },
      { band: "intermediate", count: questionCount - beginnerCount },
    ];
  }

  const beginnerCount = Math.ceil(questionCount / 3);
  const intermediateCount = Math.ceil(questionCount / 3);
  return [
    { band: "beginner", count: beginnerCount },
    { band: "intermediate", count: intermediateCount },
    {
      band: "advanced",
      count: questionCount - beginnerCount - intermediateCount,
    },
  ];
};

const selectSectionQuestions = (
  section: AssessmentSection,
  yearsOfExperience: number,
  questionCount: number,
): AssessmentQuestion[] => {
  const experience = bandForYears(yearsOfExperience);
  const questions = sectionQuestionBank(section);
  const selected: AssessmentQuestion[] = [];

  const difficultyPlan = questionDifficultyPlan(experience, questionCount);
  for (const { band, count } of difficultyPlan) {
    selected.push(
      ...shuffle(
        questions.filter((question) => question.difficulty === band),
      ).slice(0, count),
    );
  }

  if (selected.length < questionCount) {
    const selectedIds = new Set(selected.map((question) => question.id));
    const allowedBands = difficultyPlan.map(({ band }) => band);
    const remaining = shuffle(
      questions.filter(
        (question) =>
          allowedBands.includes(question.difficulty) &&
          !selectedIds.has(question.id),
      ),
    );
    selected.push(...remaining.slice(0, questionCount - selected.length));
  }

  return selected;
};

export const getAssessmentQuestionCount = (
  skills: AssessmentSkill[],
): number => {
  const sectionCount = assessmentSectionPlan.filter(({ skill }) =>
    skills.includes(skill),
  ).length;
  if (!sectionCount) return 0;

  return Math.min(
    MAX_ASSESSMENT_QUESTION_COUNT,
    Math.max(
      MIN_ASSESSMENT_QUESTION_COUNT,
      sectionCount * QUESTIONS_PER_SECTION,
    ),
  );
};

export const createAssessmentQuestions = (
  skills: AssessmentSkill[],
  yearsOfExperience: number,
): AssessmentQuestion[] => {
  const sections = assessmentSectionPlan.filter(({ skill }) =>
    skills.includes(skill),
  );
  if (!sections.length) return [];

  const targetQuestionCount = getAssessmentQuestionCount(skills);
  const baseCount = Math.floor(targetQuestionCount / sections.length);
  const extraQuestions = targetQuestionCount % sections.length;

  return sections.flatMap(({ section }, index) =>
    selectSectionQuestions(
      section,
      yearsOfExperience,
      baseCount + (index < extraQuestions ? 1 : 0),
    ),
  );
};
