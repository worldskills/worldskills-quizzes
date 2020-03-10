import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {QuestionList, QuestionWithAnswers} from '../../types/question';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private loading = false;
  public list = new BehaviorSubject<QuestionList>(null);
  public instance = new BehaviorSubject<QuestionWithAnswers>(null);

  constructor(private http: HttpClient) {
  }

  fetchList(quizId: number) {
    const params = new HttpParams();
    params.set('limit', '100');
    params.set('l', 'en');
    params.set('sort', 'name_asc');
    this.loading = true;
    const subscription = this.http.get<QuestionList>(`https://api.worldskills.show/quizzes/${quizId}/questions`, {params});
    subscription.subscribe(value => {
      this.loading = false;
      this.list.next(value);
    });
    return subscription;
  }

  fetchInstance(questionId: number) {
    this.loading = true;
    const subscription = this.http.get<QuestionWithAnswers>(`https://api.worldskills.show/quizzes/questions/${questionId}`);
    subscription.subscribe(value => {
      this.loading = false;
      this.instance.next(value);
    });
    return subscription;
  }
}
