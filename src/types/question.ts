import {List} from './common';
import {Answer} from './answer';
import {I18nModel} from '@worldskills/worldskills-angular-lib';

export interface AnsweredQuestionWithAnswers extends QuestionWithAnswers {
  answer: Answer;
  correct: boolean;
  response: string;
}

export interface QuestionWithAnswers extends Question {
  answers: Array<Answer>;
}

export interface QuestionRequest {
  text: I18nModel;
  weight?: number;
  sort?: number;
  active?: boolean;
  type?: string;
}

export interface Question extends QuestionRequest {
  id: number;
  weight: number;
  sort: number;
  active: boolean;
  type: string;
}

export type QuestionList<T extends Question = Question> = List<T, 'questions'>;
