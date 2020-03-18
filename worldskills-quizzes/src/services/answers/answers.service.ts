import {Injectable} from '@angular/core';
import {forkJoin, ReplaySubject, Subscription} from 'rxjs';
import {Answer, AnswerRequest, AnswersList} from '../../types/answer';
import {HttpClient} from '@angular/common/http';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams, multicastRequestLoader} from '../../utils/http';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  private listSubscription: Subscription;
  private instanceSubscription: Subscription;
  private instance = new ReplaySubject<Answer>(1);
  public list = new ReplaySubject<AnswersList>(1);
  public loading = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) {
  }

  fetchList(questionId: number, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<AnswersList>(
      url ?? `https://api.worldskills.show/quizzes/questions/${questionId}/answers`, {params}
    ).pipe(share());
    this.listSubscription = multicastRequestLoader<AnswersList>(observable, this.list, this.loading, this.listSubscription);
    return observable;
  }

  createInstance(questionId: number, answer: AnswerRequest, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<Answer>(
      url ?? `https://api.worldskills.show/quizzes/questions/${questionId}/answers`, answer, {params}
    ).pipe(share());
    this.instanceSubscription = multicastRequestLoader<Answer>(observable, this.instance, this.loading, this.instanceSubscription);
    return observable;
  }

  createInstances(questionId: number, answers: Array<AnswerRequest>, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observables = [];
    answers.forEach(answer => {
      observables.push(this.http.post<Answer>(
        url ?? `https://api.worldskills.show/quizzes/questions/${questionId}/answers`, answer, {params}
      ).pipe(share()));
    });
    const forkJoined = forkJoin<Answer>(observables);
    multicastRequestLoader<Array<Answer>>(forkJoined, undefined, this.loading);
    return forkJoined;
  }

  updateInstance(answerId: number, answer: AnswerRequest, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Answer>(
      url ?? `https://api.worldskills.show/quizzes/answers/${answerId}`, answer, {params}
    ).pipe(share());
    this.instanceSubscription = multicastRequestLoader<Answer>(observable, this.instance, this.loading, this.instanceSubscription);
    return observable;
  }

  updateInstances(answers: Array<{ answerId: number, answer: AnswerRequest }>, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observables = [];
    answers.forEach(({answerId, answer}) => {
      observables.push(this.http.put<Answer>(
        url ?? `https://api.worldskills.show/quizzes/answers/${answerId}`, answer, {params}
      ).pipe(share()));
    });
    const forkJoined = forkJoin<Answer>(observables);
    multicastRequestLoader<Array<Answer>>(forkJoined, undefined, this.loading);
    return forkJoined;
  }

  deleteInstance(answerId: number, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<Answer>(url ?? `https://api.worldskills.show/quizzes/answers/${answerId}`, {params}).pipe(share());
    this.instanceSubscription = multicastRequestLoader<Answer>(observable, undefined, this.loading, this.instanceSubscription);
    return observable;
  }

  deleteInstances(answersIds: Array<number>, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observables = [];
    answersIds.forEach(answerId => {
      observables.push(this.http.delete<Answer>(url ?? `https://api.worldskills.show/quizzes/answers/${answerId}`, {params}).pipe(share()));
    });
    const forkJoined = forkJoin<Answer>(observables);
    multicastRequestLoader<Array<Answer>>(forkJoined, undefined, this.loading);
    return forkJoined;
  }
}
