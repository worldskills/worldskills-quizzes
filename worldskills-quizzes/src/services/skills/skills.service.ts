import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject, Subscription} from 'rxjs';
import {SkillList} from '../../types/skill';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams, multicastRequestLoader} from '../../utils/http';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private listSubscription: Subscription;
  public loading = new ReplaySubject<boolean>(1);
  public list = new ReplaySubject<SkillList>(1);

  constructor(private http: HttpClient) {
  }

  fetchList(eventId: number, fetchParams: FetchParams = {limit: 100, l: 'en', sort: 'name_asc'}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<SkillList>(
      url ?? `${environment.worldskillsApiEvents}/${eventId}/skills`, {params}
    ).pipe(share());
    this.listSubscription = multicastRequestLoader<SkillList>(observable, this.list, this.loading, this.listSubscription);
    return observable;
  }
}
