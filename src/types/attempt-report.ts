import {User} from './user';

export interface AttemptReport {
  user: User;
  attempts_count: number;
  passed_count: number;
}
