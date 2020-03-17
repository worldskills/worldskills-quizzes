import {Injectable} from '@angular/core';
import {ReplaySubject, Subscription} from 'rxjs';
import {QuestionList, QuestionWithAnswers} from '../../types/question';
import {HttpClient} from '@angular/common/http';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams, multicastRequestLoader} from '../../utils/http';
import {share} from 'rxjs/operators';

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
      url ?? `https://api.worldskills.show/quizzes/${quizId}/questions`, {params}
    ).pipe(share());
    this.listSubscription = multicastRequestLoader<QuestionList>(observable, this.list, this.loading, this.listSubscription);
    return observable;
  }

  fetchInstance(questionId: number, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<QuestionWithAnswers>(
      url ?? `https://api.worldskills.show/quizzes/questions/${questionId}`, {params}
    ).pipe(share());
    this.instanceSubscription = multicastRequestLoader<QuestionWithAnswers>(
      observable, this.instance, this.loading, this.instanceSubscription);
    return observable;
  }
}
