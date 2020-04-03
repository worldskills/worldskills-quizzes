import {List} from './common';
import {I18nModel} from '@worldskills/worldskills-angular-lib';

export interface AnswerRequest {
  id?: number;
  text: I18nModel;
  correct: boolean;
  sort?: number;
}

export interface Answer extends AnswerRequest {
  id: number;
  sort: number;
}

export type AnswersList = List<Answer, 'answers'>;
