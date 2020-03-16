import {Injectable} from '@angular/core';
import {ReplaySubject, Subscription} from 'rxjs';
import {Attempt, AttemptsList} from '../../types/attempt';
import {HttpClient} from '@angular/common/http';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams, multicastRequestLoader} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class AttemptsService {

  private listSubscription: Subscription;
  private instanceSubscription: Subscription;
  public list = new ReplaySubject<AttemptsList>(1);
  public instance = new ReplaySubject<Attempt>(1);
  public loading = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) {
  }

  fetchList(quizId: number, fetchParams: FetchParams = {limit: 1000}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<AttemptsList>(url ?? `https://api.worldskills.show/quizzes/${quizId}/attempts`, {params});
    this.listSubscription = multicastRequestLoader<AttemptsList>(observable, this.list, this.loading, this.listSubscription);
    return this.list;
  }

  fetchInstance(attemptId: number, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<Attempt>(url ?? `https://api.worldskills.show/quizzes/attempts/${attemptId}`, {params});
    this.instanceSubscription = multicastRequestLoader<Attempt>(observable, this.instance, this.loading, this.instanceSubscription);
    return this.instance;
  }
}
