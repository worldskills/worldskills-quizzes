import {List, LocalizedText} from './common';
import {Answer} from './answer';

export interface AnsweredQuestionWithAnswers extends QuestionWithAnswers {
  answer: Answer;
  correct: boolean;
}

export interface QuestionWithAnswers extends Question {
  answers: Array<Answer>;
}

export interface QuestionRequest {
  text: LocalizedText;
  weight?: number;
  sort?: number;
  active?: boolean;
}

export interface Question extends QuestionRequest {
  id: number;
  weight: number;
  sort: number;
  active: boolean;
}

export type QuestionList<T extends Question = Question> = List<T, 'questions'>;
