import {User} from './user';
import {AnsweredQuestionWithAnswers} from './question';
import {Quiz} from './quiz';
import {Link, List} from './common';

export interface Attempt {
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
