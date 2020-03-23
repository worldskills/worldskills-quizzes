import {Injectable} from '@angular/core';
import {forkJoin, ReplaySubject, Subscription} from 'rxjs';
import {QuestionList, QuestionRequest, QuestionWithAnswers} from '../../types/question';
import {HttpClient} from '@angular/common/http';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams, multicastRequestLoader} from '../../utils/http';
import {share} from 'rxjs/operators';
import {Answer} from '../../types/answer';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  public loading = new ReplaySubject<boolean>(1);
  private listSubscription: Subscription;
  private instanceSubscription: Subscription;
  public list = new ReplaySubject<QuestionList>(1);
  public instance = new ReplaySubject<QuestionWithAnswers>(1);

  constructor(private http: HttpClient) {
  }

  fetchList(quizId: number, fetchParams: FetchParams = {limit: 100, l: 'en', sort: 'name_asc'}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<QuestionList>(
      url ?? `${environment.worldskillsApiQuizzes}/${quizId}/questions`, {params}
    ).pipe(share());
    this.listSubscription = multicastRequestLoader<QuestionList>(observable, this.list, this.loading, this.listSubscription);
    return observable;
  }

  fetchInstance(questionId: number, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<QuestionWithAnswers>(
      url ?? `${environment.worldskillsApiQuizzes}/questions/${questionId}`, {params}
    ).pipe(share());
    this.instanceSubscription = multicastRequestLoader<QuestionWithAnswers>(
      observable, this.instance, this.loading, this.instanceSubscription);
    return observable;
  }

  createInstance(quizId: number, question: QuestionRequest, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<QuestionWithAnswers>(
      url ?? `${environment.worldskillsApiQuizzes}/${quizId}/questions`, question, {params}
    ).pipe(share());
    this.instanceSubscription = multicastRequestLoader<QuestionWithAnswers>(
      observable, this.instance, this.loading, this.instanceSubscription
    );
    return observable;
  }

  updateInstance(questionId: number, question: QuestionRequest, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<QuestionWithAnswers>(
      url ?? `${environment.worldskillsApiQuizzes}/questions/${questionId}`, question, {params}
    ).pipe(share());
    this.instanceSubscription = multicastRequestLoader<QuestionWithAnswers>(
      observable, this.instance, this.loading, this.instanceSubscription
    );
    return observable;
  }

  updateInstances(questions: Array<{ questionId: number, question: QuestionRequest }>, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observables = [];
    questions.forEach(({questionId, question}) => {
      observables.push(this.http.put<QuestionWithAnswers>(
        url ?? `${environment.worldskillsApiQuizzes}/questions/${questionId}`, question, {params}
      ).pipe(share()));
    });
    const forkJoined = forkJoin<QuestionWithAnswers>(observables);
    multicastRequestLoader<Array<QuestionWithAnswers>>(forkJoined, undefined, this.loading);
    return forkJoined;
  }

  deleteInstance(questionId: number, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<QuestionWithAnswers>(
      url ?? `${environment.worldskillsApiQuizzes}/questions/${questionId}`, {params}
    ).pipe(share());
    this.instanceSubscription = multicastRequestLoader<QuestionWithAnswers>(observable, undefined, this.loading, this.instanceSubscription);
    return observable;
  }
}
