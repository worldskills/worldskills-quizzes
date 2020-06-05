import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Attempt, AttemptRequest} from '../../types/attempt';
import {AnsweredQuestionWithAnswers} from '../../types/question';
import {HttpClient} from '@angular/common/http';
import {httpParamsFromFetchParams} from '../../utils/http';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {
  FetchParams,
  FULL,
  MulticastOptions,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';

@Injectable({
  providedIn: 'root'
})
export class AttemptService extends WsService<Attempt> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(attemptId: number, rOpt?: RequestOptions): Observable<Attempt>;
  fetch(attemptId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Attempt>;
  fetch(attemptId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Attempt>;
  fetch(attemptId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Attempt>;
  fetch(attemptId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Attempt> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<Attempt>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/attempts/${attemptId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(quizId: number, attempt: AttemptRequest, rOpt?: RequestOptions): Observable<Attempt>;
  create(quizId: number, attempt: AttemptRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Attempt>;
  create(quizId: number, attempt: AttemptRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Attempt>;
  create(quizId: number, attempt: AttemptRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Attempt>;
  create(quizId: number, attempt: AttemptRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Attempt> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<Attempt>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/${quizId}/attempts`, attempt, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(attemptId: number, questionId: number, answerId: number, attempt: AttemptRequest, rOpt?: RequestOptions): Observable<Attempt>;
  update(attemptId: number, questionId: number, answerId: number, attempt: AttemptRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Attempt>;
  update(attemptId: number, questionId: number, answerId: number, attempt: AttemptRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Attempt>;
  // tslint:disable-next-line:max-line-length
  update(attemptId: number, questionId: number, answerId: number, attempt: AttemptRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Attempt>;
  update(attemptId: number, questionId: number, answerId: number, attempt: AttemptRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Attempt> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Attempt>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/attempts/${attemptId}/questions/${questionId}/answers/${answerId}`,
      attempt, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  updateResponse(attemptId: number, questionId: number, attemptQuestion: AnsweredQuestionWithAnswers, fetchParams: FetchParams): Observable<Attempt> {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Attempt>(
      `${environment.worldskillsApiQuizzes}/attempts/${attemptId}/questions/${questionId}/response`,
      attemptQuestion, {params}
    ).pipe(share());
    return observable;
  }

  finish(attemptId: number, attempt: AttemptRequest, rOpt?: RequestOptions): Observable<Attempt>;
  finish(attemptId: number, attempt: AttemptRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Attempt>;
  finish(attemptId: number, attempt: AttemptRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Attempt>;
  finish(attemptId: number, attempt: AttemptRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Attempt>;
  finish(attemptId: number, attempt: AttemptRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Attempt> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Attempt>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/attempts/${attemptId}/finish`, attempt, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
