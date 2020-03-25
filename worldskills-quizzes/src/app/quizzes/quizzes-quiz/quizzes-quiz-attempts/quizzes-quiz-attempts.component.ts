import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../../types/quiz';
import {QuizzesService} from '../../../../services/quizzes/quizzes.service';
import {AttemptsList} from '../../../../types/attempt';
import {fetchLink} from '../../../../utils/http';
import {AttemptsService} from '../../../../services/attempts/attempts.service';
import {ListPage, listPageToFetchParam} from '../../../../types/common';
import WsComponent from '../../../../utils/ws.component';

@Component({
  selector: 'app-quizzes-quiz-attempts',
  templateUrl: './quizzes-quiz-attempts.component.html',
  styleUrls: ['./quizzes-quiz-attempts.component.css']
})
export class QuizzesQuizAttemptsComponent extends WsComponent implements OnInit {

  quiz: Quiz = null;
  attempts: AttemptsList = null;
  loading = true;
  listPage: ListPage = {
    page: 1,
    pageSize: 15
  };
  private apiEndpoint: string;

  constructor(private quizzesService: QuizzesService, private attemptsService: AttemptsService) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.attemptsService.list.subscribe(attempts => (this.attempts = attempts)),
      this.attemptsService.loading.subscribe(loading => (this.loading = loading)),
      this.quizzesService.instance.subscribe(quiz => {
        this.quiz = quiz;
        this.apiEndpoint = fetchLink(this.quiz, 'attempts')[0].href;
        this.attemptsService.fetchList(this.quiz.id, listPageToFetchParam(this.listPage), this.apiEndpoint);
      })
    );
  }

  fetch(page: number) {
    this.listPage.page = page;
    this.attemptsService.fetchList(this.quiz.id, listPageToFetchParam(this.listPage), this.apiEndpoint);
  }
}
