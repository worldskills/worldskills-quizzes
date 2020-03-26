import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AnswersList} from '../../types/answer';
import {HttpClient} from '@angular/common/http';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams} from '../../utils/http';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import WsService, {FULL, MulticastOptions, P1, P2, P3, RequestOptions} from '../../utils/ws.service';

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
  fetch(questionId: number, p1: P1, p2?: P2, p3?: P3): Observable<AnswersList> {
    const {fetchParams, multicastOptions, requestOptions} = WsService.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<AnswersList>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/questions/${questionId}/answers`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
