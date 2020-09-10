import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AnswersList} from '../../types/answer';
import {HttpClient} from '@angular/common/http';

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

@Injectable({
  providedIn: 'root'
})
export class AnswersService extends WsService<AnswersList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(questionId: number, rOpt?: RequestOptions): Observable<AnswersList>;
  fetch(questionId: number, params: FetchParams, rOpt?: RequestOptions): Observable<AnswersList>;
  fetch(questionId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<AnswersList>;
  fetch(questionId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<AnswersList>;
  fetch(questionId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<AnswersList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<AnswersList>(
      requestOptions.url ?? `${environment.worldskillsApiEndpoint}/quizzes/questions/${questionId}/answers`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
