import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EntityList} from '../../types/entity';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  private loading = false;
  public list = new BehaviorSubject<EntityList>(null);

  constructor(private http: HttpClient) {
  }

  fetchList(fetchParams: FetchParams = {limit: 100}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    params.set('role', 'EditQuizzes');
    params.set('roleApp', '1300');
    this.loading = true;
    const subscription = this.http.get<EntityList>(url ?? 'https://api.worldskills.show/auth/ws_entities', {params});
    subscription.subscribe(value => {
      this.loading = false;
      this.list.next(value);
    });
    return subscription;
  }
}
