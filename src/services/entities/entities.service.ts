import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EntityList} from '../../types/entity';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams} from '../../utils/http';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import WsService, {FULL, MulticastOptions, P1, P2, P3, RequestOptions} from '../../utils/ws.service';

export const DEFAULT_FETCH_PARAMS: FetchParams = {limit: 100};

@Injectable({
  providedIn: 'root'
})
export class EntitiesService extends WsService<EntityList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(rOpt?: RequestOptions): Observable<EntityList>;
  fetch(params: FetchParams, rOpt?: RequestOptions): Observable<EntityList>;
  fetch(mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<EntityList>;
  fetch(params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<EntityList>;
  fetch(p1: P1, p2?: P2, p3?: P3): Observable<EntityList> {
    const {fetchParams, multicastOptions, requestOptions} = WsService.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    let params = httpParamsFromFetchParams(fetchParams);
    params = params.set('role', 'EditQuizzes');
    environment.filterAuthRoles.forEach(appRole => {
      params = params.set('roleApp', appRole.toString());
    });
    const observable = this.http.get<EntityList>(
      requestOptions.url ?? `${environment.worldskillsApiAuth}/ws_entities`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
