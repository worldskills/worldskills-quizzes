import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuizList, QuizzesFetchParams} from '../../types/quiz';

import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {
  FetchParams,
  FULL,
  HttpUtil,
  MulticastOptions,
  ObjectUtil,
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

  fetch(params: QuizzesFetchParams): Observable<QuizList> {
    let httpParams = HttpUtil.objectToParams(ObjectUtil.stripNullOrUndefined(params || {}));
    return this.http.get<QuizList>(`${environment.worldskillsApiEndpoint}/quizzes`, {params: httpParams}).pipe(share());
  }

}
