import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {SkillList} from '../../types/skill';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private loading = false;
  public list = new BehaviorSubject<SkillList>(null);

  constructor(private http: HttpClient) {
  }

  fetchList(eventId: number, fetchParams: FetchParams = {limit: 100, l: 'en', sort: 'name_asc'}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    this.loading = true;
    const subscription = this.http.get<SkillList>(url ?? `https://api.worldskills.show/events/${eventId}/skills`, {params});
    subscription.subscribe(value => {
      this.loading = false;
      this.list.next(value);
    });
    return subscription;
  }
}
