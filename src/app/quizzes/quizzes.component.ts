import {Component, OnInit} from '@angular/core';
import {QuizzesService} from '../../services/quizzes/quizzes.service';
import {QuizList} from '../../types/quiz';
import {ListPage, listPageToFetchParam} from '../../types/common';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import WsComponent from '../../utils/ws.component';

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
  listPage: ListPage = {
    page: 1,
    pageSize: 15
  };

  constructor(private quizzesService: QuizzesService) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.quizzesService.subject.subscribe(quizzes => (this.quizzes = quizzes)),
      this.quizzesService.loading.subscribe(loading => (this.loading = loading))
    );
    this.quizzesService.fetch(listPageToFetchParam(this.listPage));
  }

  fetch(page: number) {
    this.listPage.page = page;
    this.quizzesService.fetch(listPageToFetchParam(this.listPage));
  }

}
