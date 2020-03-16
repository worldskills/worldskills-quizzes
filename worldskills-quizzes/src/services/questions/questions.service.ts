import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {QuestionList, QuestionWithAnswers} from '../../types/question';
import {HttpClient} from '@angular/common/http';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private loading = false;
  public list = new BehaviorSubject<QuestionList>(null);
  public instance = new BehaviorSubject<QuestionWithAnswers>(null);

  constructor(private http: HttpClient) {
  }

  fetchList(quizId: number, fetchParams: FetchParams = {limit: 100, l: 'en', sort: 'name_asc'}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    this.loading = true;
    const subscription = this.http.get<QuestionList>(url ?? `https://api.worldskills.show/quizzes/${quizId}/questions`, {params});
    subscription.subscribe(value => {
      this.loading = false;
      this.list.next(value);
    });
    return subscription;
  }

  fetchInstance(questionId: number, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    this.loading = true;
    const subscription = this.http.get<QuestionWithAnswers>(
      url ?? `https://api.worldskills.show/quizzes/questions/${questionId}`, {params}
    );
    subscription.subscribe(value => {
      this.loading = false;
      this.instance.next(value);
    });
    return subscription;
  }
}
