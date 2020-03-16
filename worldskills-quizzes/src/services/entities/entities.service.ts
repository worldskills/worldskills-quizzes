import {Injectable} from '@angular/core';
import {ReplaySubject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EntityList} from '../../types/entity';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams, multicastRequestLoader} from '../../utils/http';

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
    const params = httpParamsFromFetchParams(fetchParams);
    params.set('role', 'EditQuizzes');
    params.set('roleApp', '1300');
    const observable = this.http.get<EntityList>(url ?? 'https://api.worldskills.show/auth/ws_entities', {params});
    this.listSubscription = multicastRequestLoader<EntityList>(observable, this.list, this.loading, this.listSubscription);
    return this.list;
  }
}
