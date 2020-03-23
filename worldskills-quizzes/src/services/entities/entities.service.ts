import {Injectable} from '@angular/core';
import {ReplaySubject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EntityList} from '../../types/entity';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams, multicastRequestLoader} from '../../utils/http';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  public loading = new ReplaySubject<boolean>(1);
  private listSubscription: Subscription;
  public list = new ReplaySubject<EntityList>(1);

  constructor(private http: HttpClient) {
  }

  fetchList(fetchParams: FetchParams = {limit: 100}, url?: string) {
    let params = httpParamsFromFetchParams(fetchParams);
    params = params.set('role', 'EditQuizzes');
    environment.filterAuthRoles.forEach(appRole => {
      params = params.set('roleApp', appRole.toString());
    });
    const observable = this.http.get<EntityList>(url ?? `${environment.worldskillsApiAuth}/ws_entities`, {params}).pipe(share());
    this.listSubscription = multicastRequestLoader<EntityList>(observable, this.list, this.loading, this.listSubscription);
    return observable;
  }
}
