import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SkillList} from '../../types/skill';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams} from '../../utils/http';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import WsService, {FULL, MulticastOptions, P1, P2, P3, RequestOptions} from '../../utils/ws.service';

export const DEFAULT_FETCH_PARAMS: FetchParams = {limit: 100, l: 'en', sort: 'name_asc'};

@Injectable({
  providedIn: 'root'
})
export class SkillsService extends WsService<SkillList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(eventId: number, rOpt?: RequestOptions): Observable<SkillList>;
  fetch(eventId: number, params: FetchParams, rOpt?: RequestOptions): Observable<SkillList>;
  fetch(eventId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<SkillList>;
  fetch(eventId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<SkillList>;
  fetch(eventId: number, p1: P1, p2?: P2, p3?: P3): Observable<SkillList> {
    const {fetchParams, multicastOptions, requestOptions} = WsService.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<SkillList>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
