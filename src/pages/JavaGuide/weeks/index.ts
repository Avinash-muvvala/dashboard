import { week1Topics } from './week1';
import { week2Topics } from './week2';
import { week3Topics } from './week3';
import { week4Topics } from './week4';

type TopicGuide = {
  theory: string;
  keyPoints: string[];
  code: string;
  quizzes: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
};

export const topicGuides: Record<string, TopicGuide> = {
  ...week1Topics,
  ...week2Topics,
  ...week3Topics,
  ...week4Topics,
};