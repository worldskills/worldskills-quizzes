import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {EventList} from '../../types/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private loading = false;
  public list = new BehaviorSubject<EventList>(null);

  constructor(private http: HttpClient) {
  }

  fetchList() {
    const params = new HttpParams();
    params.set('limit', '100');
    params.set('l', 'en');
    params.set('sort', 'start_date_desc');
    params.set('type', 'competition');
    this.loading = true;
    this.http.get<EventList>(`https://api.worldskills.show/events`, {params})
    .subscribe(value => {
      this.loading = false;
      this.list.next(value);
    });
    return this.list;
  }
}
