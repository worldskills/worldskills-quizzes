import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EntityList} from '../../types/entity';
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
export class EntitiesService extends WsService<EntityList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(rOpt?: RequestOptions): Observable<EntityList>;
  fetch(params: FetchParams, rOpt?: RequestOptions): Observable<EntityList>;
  fetch(mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<EntityList>;
  fetch(params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<EntityList>;
  fetch(p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<EntityList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    let params = httpParamsFromFetchParams(fetchParams);
    params = params.set('role', 'EditQuizzes');
    environment.filterAuthRoles.forEach(appRole => {
      params = params.set('roleApp', appRole.toString());
    });
    const observable = this.http.get<EntityList>(
      requestOptions.url ?? `${environment.worldskillsApiEndpoint}/auth/ws_entities`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
