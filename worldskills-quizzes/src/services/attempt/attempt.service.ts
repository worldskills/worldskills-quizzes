import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Attempt, AttemptRequest} from '../../types/attempt';
import {HttpClient} from '@angular/common/http';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams} from '../../utils/http';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import WsService, {FULL, MulticastOptions, P1, P2, P3, RequestOptions} from '../../utils/ws.service';

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
  fetch(attemptId: number, p1: P1, p2?: P2, p3?: P3): Observable<Attempt> {
    const {fetchParams, multicastOptions, requestOptions} = WsService.resolveArgs(p1, p2, p3, FULL);
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
  create(quizId: number, attempt: AttemptRequest, p1: P1, p2?: P2, p3?: P3): Observable<Attempt> {
    const {fetchParams, multicastOptions, requestOptions} = WsService.resolveArgs(p1, p2, p3, FULL);
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
  update(attemptId: number, questionId: number, answerId: number, attempt: AttemptRequest, p1: P1, p2?: P2, p3?: P3): Observable<Attempt> {
    const {fetchParams, multicastOptions, requestOptions} = WsService.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Attempt>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/attempts/${attemptId}/questions/${questionId}/answers/${answerId}`,
      attempt, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  finish(attemptId: number, attempt: AttemptRequest, rOpt?: RequestOptions): Observable<Attempt>;
  finish(attemptId: number, attempt: AttemptRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Attempt>;
  finish(attemptId: number, attempt: AttemptRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Attempt>;
  finish(attemptId: number, attempt: AttemptRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Attempt>;
  finish(attemptId: number, attempt: AttemptRequest, p1: P1, p2?: P2, p3?: P3): Observable<Attempt> {
    const {fetchParams, multicastOptions, requestOptions} = WsService.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Attempt>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/attempts/${attemptId}/finish`, attempt, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}