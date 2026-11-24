import { week1Topics } from './week1';
import { week2Topics } from './week2';
import { week3Topics } from './week3';
import { week4Topics } from './week4';
import { week5Topics } from './week5';
import { week6Topics } from './week6';
import { week7Topics } from './week7';
import { week8Topics } from './week8';
import { week9Topics } from './week9';
import { week10Topics } from './week10';
import { week11Topics } from './week11';
import { week12Topics } from './week12';
import { week13Topics } from './week13';
import { week14Topics } from './week14';
import { week15Topics } from './week15';
import { week16Topics } from './week16';
import { week17Topics } from './week17';
import { week18Topics } from './week18';
import { week19Topics } from './week19';
import { week20Topics } from './week20';
import { week21Topics } from './week21';
import { week22Topics } from './week22';
import { week23Topics } from './week23';
import { week24Topics } from './week24';

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
  ...week5Topics,
  ...week6Topics,
  ...week7Topics,
  ...week8Topics,
  ...week9Topics,
  ...week10Topics,
  ...week11Topics,
  ...week12Topics,
  ...week13Topics,
  ...week14Topics,
  ...week15Topics,
  ...week16Topics,
  ...week17Topics,
  ...week18Topics,
  ...week19Topics,
  ...week20Topics,
  ...week21Topics,
  ...week22Topics,
  ...week23Topics,
  ...week24Topics,
};