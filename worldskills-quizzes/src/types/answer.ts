import {List, LocalizedText} from './common';

export interface Answer {
  id: number;
  text: LocalizedText;
  correct: boolean;
  sort: number;
}

export type AnswersList = List<Answer, 'answers'>;
