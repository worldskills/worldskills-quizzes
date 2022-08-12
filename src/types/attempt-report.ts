import {Person} from './person';

export interface AttemptReport {
  person: Person;
  member;
  attempts_count: number;
  passed_count: number;
}
