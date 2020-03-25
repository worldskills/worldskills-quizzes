import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {QuestionList} from '../../types/question';
import {HttpClient} from '@angular/common/http';
import {FetchParams} from '../../types/common';
import WsService, {FULL, MulticastOptions, P1, P2, P3, RequestOptions} from '../../utils/ws.service';
import {httpParamsFromFetchParams} from '../../utils/http';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

export const DEFAULT_FETCH_PARAMS: FetchParams = {limit: 100, l: 'en', sort: 'order_asc'};

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
  fetch(quizId: number, p1: P1, p2?: P2, p3?: P3): Observable<QuestionList> {
    const {fetchParams, multicastOptions, requestOptions} = WsService.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<QuestionList>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/${quizId}/questions`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
