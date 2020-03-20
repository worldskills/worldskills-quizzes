import {Injectable} from '@angular/core';
import {ReplaySubject, Subscription} from 'rxjs';
import {Attempt, AttemptRequest, AttemptsList} from '../../types/attempt';
import {HttpClient} from '@angular/common/http';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams, multicastRequestLoader} from '../../utils/http';
import {share} from 'rxjs/operators';

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
    const observable = this.http.get<AttemptsList>(
      url ?? `https://api.worldskills.show/quizzes/${quizId}/attempts`, {params}
    ).pipe(share());
    this.listSubscription = multicastRequestLoader<AttemptsList>(observable, this.list, this.loading, this.listSubscription);
    return observable;
  }

  fetchInstance(attemptId: number, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<Attempt>(
      url ?? `https://api.worldskills.show/quizzes/attempts/${attemptId}`, {params}
    ).pipe(share());
    this.instanceSubscription = multicastRequestLoader<Attempt>(observable, this.instance, this.loading, this.instanceSubscription);
    return observable;
  }

  createInstance(quizId: number, attempt: AttemptRequest, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<Attempt>(
      url ?? `https://api.worldskills.show/quizzes/${quizId}/attempts`, attempt, {params}
    ).pipe(share());
    this.instanceSubscription = multicastRequestLoader<Attempt>(observable, this.instance, this.loading, this.instanceSubscription);
    return observable;
  }

  updateInstance(
    attemptId: number, questionId: number, answerId: number, attempt: AttemptRequest, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Attempt>(
      url ?? `https://api.worldskills.show/quizzes/attempts/${attemptId}/questions/${questionId}/answers/${answerId}`,
      attempt, {params}
    ).pipe(share());
    this.instanceSubscription = multicastRequestLoader<Attempt>(observable, this.instance, this.loading, this.instanceSubscription);
    return observable;
  }

  finishInstance(attemptId: number, attempt: AttemptRequest, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Attempt>(
      url ?? `https://api.worldskills.show/quizzes/attempts/${attemptId}/finish`, attempt, {params}
    ).pipe(share());
    this.instanceSubscription = multicastRequestLoader<Attempt>(observable, this.instance, this.loading, this.instanceSubscription);
    return observable;
  }
}
