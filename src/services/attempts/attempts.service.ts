import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AttemptsList} from '../../types/attempt';
import {HttpClient} from '@angular/common/http';
import {httpParamsFromFetchParams} from '../../utils/http';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {
  FetchParams,
  FULL,
  MulticastOptions,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';

export const DEFAULT_FETCH_PARAMS: FetchParams = {limit: 100};

@Injectable({
  providedIn: 'root'
})
export class AttemptsService extends WsService<AttemptsList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(quizId: number, rOpt?: RequestOptions): Observable<AttemptsList>;
  fetch(quizId: number, params: FetchParams, rOpt?: RequestOptions): Observable<AttemptsList>;
  fetch(quizId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<AttemptsList>;
  fetch(quizId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<AttemptsList>;
  fetch(quizId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<AttemptsList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<AttemptsList>(
      requestOptions.url ?? `${environment.worldskillsApiQuizzes}/${quizId}/attempts`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
