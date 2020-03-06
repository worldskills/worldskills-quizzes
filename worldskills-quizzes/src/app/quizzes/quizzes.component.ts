import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QuizzesService} from '../../services/quizzes/quizzes.service';
import {QuizList} from '../../types/quiz';
import {ListPage} from '../../types/common';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit, OnChanges {

  faCheck;
  faTimes;
  list: QuizList = null;
  listPage: ListPage = {
    page: 1,
    pageSize: 10
  };

  constructor(private quizzesService: QuizzesService) {
    this.faCheck = faCheck;
    this.faTimes = faTimes;
  }

  ngOnInit(): void {
    this.quizzesService.fetchList().subscribe(list => (this.list = list));
  }

  fetch() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }


}
