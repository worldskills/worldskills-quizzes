import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {EventList} from '../../types/event';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private loading = false;
  public list = new BehaviorSubject<EventList>(null);

  constructor(private http: HttpClient) {
  }

  fetchList(fetchParams: FetchParams = {limit: 100, l: 'en', sort: 'start_date_desc'}) {
    const params = httpParamsFromFetchParams(fetchParams);
    params.set('type', 'competition');
    this.loading = true;
    const subscription = this.http.get<EventList>(`https://api.worldskills.show/events`, {params});
    subscription.subscribe(value => {
      this.loading = false;
      this.list.next(value);
    });
    return subscription;
  }
}
