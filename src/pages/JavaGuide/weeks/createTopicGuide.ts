type TopicQuiz = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type TopicGuide = {
  theory: string;
  keyPoints: string[];
  code: string;
  quizzes: TopicQuiz[];
};

export const createTopicGuide = (
  theory: string,
  keyPoints: string[],
  code: string,
  question: string,
  options: string[],
  correctIndex: number,
  explanation: string,
): TopicGuide => ({
  theory,
  keyPoints,
  code,
  quizzes: [{ question, options, correctIndex, explanation }],
});
