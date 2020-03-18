import {List, LocalizedText} from './common';

export interface AnswerRequest {
  id?: number;
  text: LocalizedText;
  correct: boolean;
  sort?: number;
}

export interface Answer extends AnswerRequest {
  id: number;
  sort: number;
}

export type AnswersList = List<Answer, 'answers'>;
