import {Component, OnInit} from '@angular/core';
import {QuizzesService} from '../../services/quizzes/quizzes.service';
import {ActivatedRoute} from '@angular/router';
import {Quiz} from '../../types/quiz';
import {Attempt} from '../../types/attempt';
import {AttemptsService} from '../../services/attempts/attempts.service';
import {map} from 'rxjs/operators';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz: Quiz;
  attempt: Attempt;
  alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  loading = true;
  error = null;
  locale: string;

  constructor(private quizzesService: QuizzesService, private attemptsService: AttemptsService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    combineLatest([this.quizzesService.loading, this.attemptsService.loading])
    .pipe(map(([l1, l2]) => l1 || l2))
    .subscribe(loading => this.loading = loading);
    this.locale = (window.navigator.language || (window.navigator as any).userLanguage || 'en').substring(0, 2);
    this.attemptsService.instance.subscribe(attempt => (this.attempt = attempt));
    this.quizzesService.instance.subscribe({
      next: quiz => {
        this.quiz = quiz;
        this.attemptsService.createInstance(this.quiz.id, {}, {l: this.locale});
      },
      error: error => (this.error = error)
    });
    this.router.params.subscribe(params => {
      const {quizId} = params;
      this.quizzesService.fetchInstance(quizId, {l: this.locale});
    });
  }

  selectAnswer(questionId: number, answerId: number) {
    this.attemptsService.updateInstance(this.attempt.id, questionId, answerId, {}, {l: this.locale});
  }

  finish() {
    this.attemptsService.finishInstance(this.attempt.id, {}, {l: this.locale});
  }

  retry() {
    window.location.reload();
  }

}
