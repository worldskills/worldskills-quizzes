import {User} from './user';

export interface AttemptReport {
  user: User;
  member;
  attempts_count: number;
  passed_count: number;
}
