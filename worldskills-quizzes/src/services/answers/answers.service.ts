import {Injectable} from '@angular/core';
import {ReplaySubject, Subscription} from 'rxjs';
import {AnswersList} from '../../types/answer';
import {HttpClient} from '@angular/common/http';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams, multicastRequestLoader} from '../../utils/http';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  private listSubscription: Subscription;
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
}
