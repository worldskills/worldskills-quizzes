import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Quiz} from '../../types/quiz';
import {Attempt} from '../../types/attempt';
import {map} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import WsComponent from '../../utils/ws.component';
import {AttemptService} from '../../services/attempt/attempt.service';
import {QuizService} from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent extends WsComponent implements OnInit {

  quiz: Quiz;
  attempt: Attempt;
  alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  loading = true;
  error = null;
  locale: string;

  constructor(
    private quizService: QuizService,
    private attemptService: AttemptService,
    private router: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.locale = (window.navigator.language || (window.navigator as any).userLanguage || 'en').substring(0, 2);
    this.subscribe(
      combineLatest([this.quizService.loading, this.attemptService.loading])
      .pipe(map(([l1, l2]) => l1 || l2))
      .subscribe(loading => this.loading = loading),
      this.attemptService.subject.subscribe(attempt => (this.attempt = attempt)),
      this.quizService.subject.subscribe({
        next: quiz => {
          this.quiz = quiz;
          this.attemptService.create(this.quiz.id, {}, {l: this.locale});
        },
        error: error => (this.error = error)
      })
    );
    this.router.params.subscribe(params => {
      const {quizId} = params;
      this.quizService.fetch(quizId, {l: this.locale});
    });
  }

  selectAnswer(questionId: number, answerId: number) {
    this.attemptService.update(this.attempt.id, questionId, answerId, {}, {l: this.locale});
  }

  finish() {
    this.attemptService.finish(this.attempt.id, {}, {l: this.locale});
  }

  retry() {
    window.location.reload();
  }

}
