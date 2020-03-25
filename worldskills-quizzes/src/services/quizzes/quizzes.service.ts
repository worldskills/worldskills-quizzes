import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuizList} from '../../types/quiz';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams} from '../../utils/http';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import WsService, {FULL, MulticastOptions, P1, P2, P3, RequestOptions} from '../../utils/ws.service';

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
  fetch(p1: P1, p2?: P2, p3?: P3): Observable<QuizList> {
    const {fetchParams, multicastOptions, requestOptions} = WsService.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<QuizList>(requestOptions.url ?? environment.worldskillsApiQuizzes, {params}).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
