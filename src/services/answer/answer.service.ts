import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Answer, AnswerRequest} from '../../types/answer';
import {HttpClient} from '@angular/common/http';
import {httpParamsFromFetchParams} from '../../utils/http';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {
  FetchParams,
  FULL,
  LOADER_ONLY,
  MulticastOptions,
  NO_SUBJECT,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';

type Many = Array<{ answerId: number, answer: AnswerRequest }>;

@Injectable({
  providedIn: 'root'
})
export class AnswerService extends WsService<Answer> {

  constructor(private http: HttpClient) {
    super();
  }

  create(questionId: number, answer: AnswerRequest, rOpt?: RequestOptions): Observable<Answer>;
  create(questionId: number, answer: AnswerRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Answer>;
  create(questionId: number, answer: AnswerRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Answer>;
  create(questionId: number, answer: AnswerRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Answer>;
  create(questionId: number, answer: AnswerRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Answer> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<Answer>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/questions/${questionId}/answers`, answer, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  createMany(questionId: number, answers: Array<AnswerRequest>, rOpt?: RequestOptions): Observable<Array<Answer>>;
  createMany(questionId: number, answers: Array<AnswerRequest>, params: FetchParams, rOpt?: RequestOptions): Observable<Array<Answer>>;
  createMany(questionId: number, answers: Array<AnswerRequest>, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Array<Answer>>;
  createMany(questionId: number, answers: Array<AnswerRequest>, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Array<Answer>>;
  createMany(questionId: number, answers: Array<AnswerRequest>, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Array<Answer>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, LOADER_ONLY);
    const params = httpParamsFromFetchParams(fetchParams);
    const observables = [];
    answers.forEach(answer => {
      observables.push(this.http.post<Answer>(
        requestOptions.url ?? `${environment.worldskillsApiQuizzes}/questions/${questionId}/answers`, answer, {params}
      ).pipe(share()));
    });
    return this.requestMany(observables, multicastOptions);
  }

  update(answerId: number, answer: AnswerRequest, rOpt?: RequestOptions): Observable<Answer>;
  update(answerId: number, answer: AnswerRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Answer>;
  update(answerId: number, answer: AnswerRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Answer>;
  update(answerId: number, answer: AnswerRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Answer>;
  update(answerId: number, answer: AnswerRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Answer> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Answer>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/answers/${answerId}`, answer, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  updateMany(answers: Many, rOpt?: RequestOptions): Observable<Array<Answer>>;
  updateMany(answers: Many, params: FetchParams, rOpt?: RequestOptions): Observable<Array<Answer>>;
  updateMany(answers: Many, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Array<Answer>>;
  updateMany(answers: Many, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Array<Answer>>;
  updateMany(answers: Many, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Array<Answer>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, LOADER_ONLY);
    console.log({fetchParams, multicastOptions, requestOptions});
    const params = httpParamsFromFetchParams(fetchParams);
    const observables = [];
    answers.forEach(({answerId, answer}) => {
      observables.push(this.http.put<Answer>(
        requestOptions.url ?? `${environment.worldskillsApiQuizzes}/answers/${answerId}`, answer, {params}
      ).pipe(share()));
    });
    return this.requestMany(observables, multicastOptions);
  }

  delete(answerId: number, rOpt?: RequestOptions): Observable<Answer>;
  delete(answerId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Answer>;
  delete(answerId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Answer>;
  delete(answerId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Answer>;
  delete(answerId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Answer> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<Answer>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/answers/${answerId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  deleteMany(answersIds: Array<number>, rOpt?: RequestOptions): Observable<Array<Answer>>;
  deleteMany(answersIds: Array<number>, params: FetchParams, rOpt?: RequestOptions): Observable<Array<Answer>>;
  deleteMany(answersIds: Array<number>, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Array<Answer>>;
  deleteMany(answersIds: Array<number>, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Array<Answer>>;
  deleteMany(answersIds: Array<number>, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Array<Answer>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, LOADER_ONLY);
    const params = httpParamsFromFetchParams(fetchParams);
    const observables = [];
    answersIds.forEach(answerId => {
      observables.push(this.http.delete<Answer>(
        requestOptions.url ?? `${environment.worldskillsApiQuizzes}/answers/${answerId}`, {params}
      ).pipe(share()));
    });
    return this.requestMany(observables, multicastOptions);
  }

}
