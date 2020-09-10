import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {QuestionList} from '../../types/question';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';
import {
  FetchParams,
  FULL,
  HttpUtil,
  MulticastOptions,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3,
} from '@worldskills/worldskills-angular-lib';

export const DEFAULT_FETCH_PARAMS: FetchParams = {limit: 100, l: 'en', sort: 'sort_asc'};

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends WsService<QuestionList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(quizId: number, rOpt?: RequestOptions): Observable<QuestionList>;
  fetch(quizId: number, params: FetchParams, rOpt?: RequestOptions): Observable<QuestionList>;
  fetch(quizId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<QuestionList>;
  fetch(quizId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<QuestionList>;
  fetch(quizId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<QuestionList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<QuestionList>(
      requestOptions.url ?? `${environment.worldskillsApiEndpoint}/quizzes/${quizId}/questions`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
