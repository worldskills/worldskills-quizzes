import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AttemptsList} from '../../types/attempt';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FetchParams, WsService,} from '@worldskills/worldskills-angular-lib';

export const DEFAULT_FETCH_PARAMS: FetchParams = {limit: 100};

@Injectable({
  providedIn: 'root'
})
export class AttemptsService extends WsService<AttemptsList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(quizId: number, params): Observable<AttemptsList> {
    return this.http.get<AttemptsList>(`${environment.worldskillsApiEndpoint}/quizzes/${quizId}/attempts`, {params: params});
  }

}
