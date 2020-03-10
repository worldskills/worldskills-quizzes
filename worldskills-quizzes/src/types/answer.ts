import {List} from './common';

export interface Answer {
  id: number;
  text: {
    lang_code: string;
    text: string;
  };
  correct: boolean;
  sort: number;
}

export type AnswersList = List<Answer, 'answers'>;
