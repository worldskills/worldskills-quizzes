import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject, Subscription} from 'rxjs';
import {EventList} from '../../types/event';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams, multicastRequestLoader} from '../../utils/http';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private listSubscription: Subscription;
  public loading = new ReplaySubject<boolean>(1);
  public list = new ReplaySubject<EventList>(1);

  constructor(private http: HttpClient) {
  }

  fetchList(fetchParams: FetchParams = {limit: 100, l: 'en', sort: 'start_date_desc'}, url?: string) {
    let params = httpParamsFromFetchParams(fetchParams);
    params = params.set('type', 'competition');
    const observable = this.http.get<EventList>(url ?? `https://api.worldskills.show/events`, {params}).pipe(share());;
    this.listSubscription = multicastRequestLoader<EventList>(observable, this.list, this.loading, this.listSubscription);
    return observable;
  }
}
