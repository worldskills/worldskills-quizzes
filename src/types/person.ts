import { AttemptMemberReport } from "./attempt-member-report";

export interface PersonSearch {
  id: number;
  firstName: string;
  lastName: string;
  person?: Person;
  report?: AttemptMemberReport;
  training: any;
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  trainings: any[];
}

export interface PersonList {
  people: PersonSearch[];
}
