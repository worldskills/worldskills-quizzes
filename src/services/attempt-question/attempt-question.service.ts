import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AnsweredQuestionWithAnswers} from '../../types/question';

@Injectable({
  providedIn: 'root'
})
export class AttemptQuestionService {

  constructor(private http: HttpClient) { }

  updateResponse(attemptId: number, attemptQuestion: AnsweredQuestionWithAnswers, locale: string): Observable<AnsweredQuestionWithAnswers> {
    var params = new HttpParams();
    params.set('l', locale);
    return this.http.put<AnsweredQuestionWithAnswers>(
      `${environment.worldskillsApiQuizzes}/attempts/${attemptId}/questions/${attemptQuestion.id}/response`,
      attemptQuestion, {params}
    );
  }

}
