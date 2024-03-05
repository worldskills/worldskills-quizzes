import {Component, OnInit} from '@angular/core';
import {QuizzesService} from '../../services/quizzes/quizzes.service';
import {QuizList, QuizzesFetchParams} from '../../types/quiz';
import {ListPage, listPageToFetchParam} from '../../types/common';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {WsComponent} from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent extends WsComponent implements OnInit {

  faCheck = faCheck;
  faTimes = faTimes;
  quizzes: QuizList = null;
  loading = true;
  fetchParams: QuizzesFetchParams;

  constructor(private quizzesService: QuizzesService) {
    super();
  }

  ngOnInit(): void {
    this.clear();
  }

  changePage(page: number) {
    this.fetchParams.offset = this.fetchParams.limit * (page - 1);
    this.fetch();
  }

  fetch() {
    this.loading = true;
    this.quizzesService.fetch(this.fetchParams).subscribe(quizzes => {
      this.quizzes = quizzes;
      this.loading = false;
    });
  }

  filter(params: QuizzesFetchParams) {
    this.fetchParams = params;
    this.fetch();
  }

  clear() {
    this.fetchParams = {
      offset: 0,
      limit: 10,
      l: 'en',
    };
    this.fetch();
  }
}
