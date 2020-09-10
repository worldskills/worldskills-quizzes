import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventList} from '../../types/event';

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

export const DEFAULT_FETCH_PARAMS: FetchParams = {limit: 100, l: 'en', sort: 'start_date_desc'};

@Injectable({
  providedIn: 'root'
})
export class EventsService extends WsService<EventList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(rOpt?: RequestOptions): Observable<EventList>;
  fetch(params: FetchParams, rOpt?: RequestOptions): Observable<EventList>;
  fetch(mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<EventList>;
  fetch(params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<EventList>;
  fetch(p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<EventList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    let params = HttpUtil.objectToParams(fetchParams || {});
    params = params.set('type', 'competition');
    const observable = this.http.get<EventList>(
      requestOptions.url ?? `${environment.worldskillsApiEndpoint}/events`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
