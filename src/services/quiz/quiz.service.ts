import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quiz, QuizRequest} from '../../types/quiz';
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

@Injectable({
  providedIn: 'root'
})
export class QuizService extends WsService<Quiz> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(quizId: number, rOpt?: RequestOptions): Observable<Quiz>;
  fetch(quizId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Quiz>;
  fetch(quizId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Quiz>;
  fetch(quizId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Quiz>;
  fetch(quizId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Quiz> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<Quiz>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/${quizId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(quiz: QuizRequest, rOpt?: RequestOptions): Observable<Quiz>;
  create(quiz: QuizRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Quiz>;
  create(quiz: QuizRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Quiz>;
  create(quiz: QuizRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Quiz>;
  create(quiz: QuizRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Quiz> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<Quiz>(
      requestOptions.url ?? environment.worldskillsApiQuizzes, quiz, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(quizId: number, quiz: QuizRequest, rOpt?: RequestOptions): Observable<Quiz>;
  update(quizId: number, quiz: QuizRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Quiz>;
  update(quizId: number, quiz: QuizRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Quiz>;
  update(quizId: number, quiz: QuizRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Quiz>;
  update(quizId: number, quiz: QuizRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Quiz> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Quiz>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/${quizId}`, quiz, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(quizId: number, rOpt?: RequestOptions): Observable<Quiz>;
  delete(quizId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Quiz>;
  delete(quizId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Quiz>;
  delete(quizId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Quiz>;
  delete(quizId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Quiz> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<Quiz>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/${quizId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  deleteTranslations(quizId: number, locale: string, rOpt?: RequestOptions): Observable<Quiz>;
  deleteTranslations(quizId: number, locale: string, params: FetchParams, rOpt?: RequestOptions): Observable<Quiz>;
  deleteTranslations(quizId: number, locale: string, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Quiz>;
  deleteTranslations(quizId: number, locale: string, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Quiz>;
  deleteTranslations(quizId: number, locale: string, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Quiz> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, LOADER_ONLY);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<Quiz>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/${quizId}/translations/${locale}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
