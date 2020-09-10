import {List} from './common';
import {I18nText} from '@worldskills/worldskills-angular-lib';

export interface AnswerRequest {
  id?: number;
  text: I18nText;
  correct: boolean;
  sort?: number;
}

export interface Answer extends AnswerRequest {
  id: number;
  sort: number;
}

export type AnswersList = List<Answer, 'answers'>;
