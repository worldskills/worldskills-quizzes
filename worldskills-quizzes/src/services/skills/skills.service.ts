import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {SkillList} from '../../types/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private loading = false;
  public list = new BehaviorSubject<SkillList>(null);

  constructor(private http: HttpClient) {
  }

  fetchList(eventId: number) {
    const params = new HttpParams();
    params.set('limit', '100');
    params.set('l', 'en');
    params.set('sort', 'name_asc');
    this.loading = true;
    const subscription = this.http.get<SkillList>(`https://api.worldskills.show/events/${eventId}/skills`, {params});
    subscription.subscribe(value => {
      this.loading = false;
      this.list.next(value);
    });
    return subscription;
  }
}
