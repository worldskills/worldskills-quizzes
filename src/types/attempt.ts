import {User} from './user';
import {AnsweredQuestionWithAnswers} from './question';
import {Quiz} from './quiz';
import {Link, List} from './common';

// tslint:disable-next-line:no-empty-interface
export interface AttemptRequest {

}

export interface Attempt extends AttemptRequest {
  id: number;
  quiz: Quiz;
  state: string;
  started: string;
  finished: string;
  questions_count: number;
  score: number;
  passed: boolean;
  questions: Array<AnsweredQuestionWithAnswers>;
  user: User;
  links: Array<Link>;
}

export type AttemptsList = List<Attempt, 'attempts'>;
