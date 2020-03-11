import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Attempt, AttemptsList} from '../../types/attempt';
import {HttpClient} from '@angular/common/http';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class AttemptsService {

  private loading = false;
  public list = new BehaviorSubject<AttemptsList>(null);
  public instance = new BehaviorSubject<Attempt>(null);

  constructor(private http: HttpClient) {
  }

  fetchList(quizId: number, fetchParams: FetchParams = {limit: 1000}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    this.loading = true;
    const subscription = this.http.get<AttemptsList>(url ?? `https://api.worldskills.show/quizzes/${quizId}/attempts`, {params});
    subscription.subscribe(value => {
      this.loading = false;
      this.list.next(value);
    });
    return subscription;
  }

  fetchInstance(attemptId: number, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    this.loading = true;
    const subscription = this.http.get<Attempt>(url ?? `https://api.worldskills.show/quizzes/attempts/${attemptId}`, {params});
    subscription.subscribe(value => {
      this.loading = false;
      this.instance.next(value);
    });
    return subscription;
  }
}
