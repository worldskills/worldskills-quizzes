import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {QuestionRequest, QuestionWithAnswers} from '../../types/question';
import {HttpClient} from '@angular/common/http';
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
import {httpParamsFromFetchParams} from '../../utils/http';

type Many = Array<{ questionId: number, question: QuestionRequest }>;

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends WsService<QuestionWithAnswers> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(questionId: number, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  fetch(questionId: number, params: FetchParams, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  fetch(questionId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  fetch(questionId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  fetch(questionId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<QuestionWithAnswers> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<QuestionWithAnswers>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/questions/${questionId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(quizId: number, question: QuestionRequest, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  create(quizId: number, question: QuestionRequest, params: FetchParams, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  create(quizId: number, question: QuestionRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  create(quizId: number, question: QuestionRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  create(quizId: number, question: QuestionRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<QuestionWithAnswers> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<QuestionWithAnswers>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/${quizId}/questions`, question, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(questionId: number, question: QuestionRequest, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  update(questionId: number, question: QuestionRequest, params: FetchParams, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  update(questionId: number, question: QuestionRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  update(questionId: number, question: QuestionRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  update(questionId: number, question: QuestionRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<QuestionWithAnswers> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<QuestionWithAnswers>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/questions/${questionId}`, question, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  updateMany(questions: Many, rOpt?: RequestOptions): Observable<Array<QuestionWithAnswers>>;
  updateMany(questions: Many, params: FetchParams, rOpt?: RequestOptions): Observable<Array<QuestionWithAnswers>>;
  updateMany(questions: Many, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Array<QuestionWithAnswers>>;
  updateMany(questions: Many, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Array<QuestionWithAnswers>>;
  updateMany(questions: Many, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Array<QuestionWithAnswers>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, LOADER_ONLY);
    const params = httpParamsFromFetchParams(fetchParams);
    const observables = [];
    questions.forEach(({questionId, question}) => {
      observables.push(this.http.put<QuestionWithAnswers>(
        requestOptions.url ?? `${environment.worldskillsApiQuizzes}/questions/${questionId}`, question, {params}
      ).pipe(share()));
    });
    return this.requestMany(observables, multicastOptions);
  }

  delete(questionId: number, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  delete(questionId: number, params: FetchParams, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  delete(questionId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  delete(questionId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<QuestionWithAnswers>;
  delete(questionId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<QuestionWithAnswers> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<QuestionWithAnswers>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/questions/${questionId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
