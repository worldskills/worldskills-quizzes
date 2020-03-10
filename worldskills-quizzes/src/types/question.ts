import {List} from './common';
import {Answer} from './answer';

export interface QuestionWithAnswers extends Question {
  answers: Array<Answer>;
}

export interface Question {
  id: number;
  text: {
    lang_code: string;
    text: string;
  };
  weight: number;
  sort: number;
  active: boolean;
}

export type QuestionList<T extends Question = Question> = List<T, 'questions'>;
