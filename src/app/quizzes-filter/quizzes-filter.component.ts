import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizzesFetchParams } from 'src/types/quiz';

@Component({
  selector: 'app-quizzes-filter',
  templateUrl: './quizzes-filter.component.html',
  styleUrls: ['./quizzes-filter.component.css']
})
export class QuizzesFilterComponent implements OnInit {

  @Output() filter = new EventEmitter<QuizzesFetchParams>();
  @Output() clear = new EventEmitter<void>();
  @Input() fetchParams: QuizzesFetchParams;

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {
    this.filter.emit(this.fetchParams);
  }

  clearFilter() {
    this.clear.emit();
  }

}
