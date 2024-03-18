import { AttemptMemberReport } from "./attempt-member-report";

export interface PersonSearch {
  id: number;
  first_name: string;
  last_name: string;
  person?: Person;
  report?: AttemptMemberReport;
  training: any;
}

export interface Person {
  id: number;
  first_name: string;
  last_name: string;
  trainings: any[];
}

export interface PersonList {
  people: PersonSearch[];
}
