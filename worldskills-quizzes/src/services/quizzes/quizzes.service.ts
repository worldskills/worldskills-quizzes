import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject, Subscription} from 'rxjs';
import {Quiz, QuizList, QuizRequest} from '../../types/quiz';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams, multicastRequestLoader} from '../../utils/http';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  private listSubscription: Subscription;
  private instanceSubscription: Subscription;
  public list = new ReplaySubject<QuizList>(1);
  public instance = new ReplaySubject<Quiz>(1);
  public loading = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) {
    this.loading.next(false);
  }

  fetchList(fetchParams: FetchParams = {offset: 0, limit: 15}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<QuizList>(url ?? environment.worldskillsApiQuizzes, {params}).pipe(share());
    this.listSubscription = multicastRequestLoader<QuizList>(observable, this.list, this.loading, this.listSubscription);
    return observable;
  }

  fetchInstance(quizId: number, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<Quiz>(url ?? `${environment.worldskillsApiQuizzes}/${quizId}`, {params}).pipe(share());
    this.instanceSubscription = multicastRequestLoader<Quiz>(observable, this.instance, this.loading, this.instanceSubscription);
    return observable;
  }

  createInstance(quiz: QuizRequest, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<Quiz>(url ?? environment.worldskillsApiQuizzes, quiz, {params}).pipe(share());
    this.instanceSubscription = multicastRequestLoader<Quiz>(observable, this.instance, this.loading, this.instanceSubscription);
    return observable;
  }

  updateInstance(quizId: number, quiz: QuizRequest, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Quiz>(url ?? `${environment.worldskillsApiQuizzes}/${quizId}`, quiz, {params}).pipe(share());
    this.instanceSubscription = multicastRequestLoader<Quiz>(observable, this.instance, this.loading, this.instanceSubscription);
    return observable;
  }

  deleteInstance(quizId: number, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<Quiz>(url ?? `${environment.worldskillsApiQuizzes}/${quizId}`, {params}).pipe(share());
    this.instanceSubscription = multicastRequestLoader<Quiz>(observable, undefined, this.loading, this.instanceSubscription);
    return observable;
  }

  deleteTranslations(quizId: number, locale: string, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<Quiz>(
      url ?? `${environment.worldskillsApiQuizzes}/${quizId}/translations/${locale}`, {params}
    ).pipe(share());
    multicastRequestLoader<Quiz>(observable, undefined, this.loading);
    return observable;
  }

}
