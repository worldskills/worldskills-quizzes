import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {AttemptReport} from '../../types/attempt-report';

@Injectable({
  providedIn: 'root'
})
export class AttemptUserReportService {

  constructor(private http: HttpClient) {
  }

  getAttemptReport(quizId: number): Observable<AttemptReport[]> {
    return this.http.get<AttemptReport[]>(`${environment.worldskillsApiEndpoint}/quizzes/${quizId}/attempt_user_report`);
  }
}
