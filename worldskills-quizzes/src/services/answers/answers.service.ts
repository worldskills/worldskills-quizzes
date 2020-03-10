import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AnswersList} from '../../types/answer';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  private loading = false;
  public list = new BehaviorSubject<AnswersList>(null);

  constructor(private http: HttpClient) {
  }

  fetchList(questionId: number) {
    this.loading = true;
    const subscription = this.http.get<AnswersList>(`https://api.worldskills.show/quizzes/questions/${questionId}/answers`);
    subscription.subscribe(value => {
      this.loading = false;
      this.list.next(value);
    });
    return subscription;
  }
}
