import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {AttemptMemberReport} from '../../types/attempt-member-report';

@Injectable({
  providedIn: 'root'
})
export class AttemptMemberReportService {

  constructor(
    private http: HttpClient,
  ) { }

  getAttemptMemberReport(eventId: number, quizIds: string[], memberEntityId: string[]): Observable<AttemptMemberReport[]> {
    var params = {quiz: quizIds, member_entity: memberEntityId};
    return this.http.get<AttemptMemberReport[]>(`${environment.worldskillsApiEndpoint}/quizzes/attempt_member_report/${eventId}`, {params});
  }
}
