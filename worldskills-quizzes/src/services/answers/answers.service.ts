import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AnswersList} from '../../types/answer';
import {HttpClient} from '@angular/common/http';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  private loading = false;
  public list = new BehaviorSubject<AnswersList>(null);

  constructor(private http: HttpClient) {
  }

  fetchList(questionId: number, fetchParams: FetchParams = {}) {
    const params = httpParamsFromFetchParams(fetchParams);
    this.loading = true;
    const subscription = this.http.get<AnswersList>(`https://api.worldskills.show/quizzes/questions/${questionId}/answers`, {params});
    subscription.subscribe(value => {
      this.loading = false;
      this.list.next(value);
    });
    return subscription;
  }
}
