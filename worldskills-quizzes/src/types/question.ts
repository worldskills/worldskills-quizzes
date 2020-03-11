import {List, LocalizedText} from './common';
import {Answer} from './answer';

export interface AnsweredQuestionWithAnswers extends QuestionWithAnswers {
  answer: Answer;
  correct: boolean;
}

export interface QuestionWithAnswers extends Question {
  answers: Array<Answer>;
}

export interface Question {
  id: number;
  text: LocalizedText;
  weight: number;
  sort: number;
  active: boolean;
}

export type QuestionList<T extends Question = Question> = List<T, 'questions'>;
