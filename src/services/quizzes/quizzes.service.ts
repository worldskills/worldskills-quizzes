import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuizList} from '../../types/quiz';

import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
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

export const DEFAULT_FETCH_PARAMS: FetchParams = {offset: 0, limit: 15};

@Injectable({
  providedIn: 'root'
})
export class QuizzesService extends WsService<QuizList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(rOpt?: RequestOptions): Observable<QuizList>;
  fetch(params: FetchParams, rOpt?: RequestOptions): Observable<QuizList>;
  fetch(mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<QuizList>;
  fetch(params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<QuizList>;
  fetch(p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<QuizList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<QuizList>(requestOptions.url ?? `${environment.worldskillsApiEndpoint}/quizzes`, {params}).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
