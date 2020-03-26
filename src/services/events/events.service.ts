import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventList} from '../../types/event';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams} from '../../utils/http';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import WsService, {FULL, MulticastOptions, P1, P2, P3, RequestOptions} from '../../utils/ws.service';

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
  fetch(p1: P1, p2?: P2, p3?: P3): Observable<EventList> {
    const {fetchParams, multicastOptions, requestOptions} = WsService.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    let params = httpParamsFromFetchParams(fetchParams);
    params = params.set('type', 'competition');
    const observable = this.http.get<EventList>(
      requestOptions.url ?? environment.worldskillsApiEvents, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
