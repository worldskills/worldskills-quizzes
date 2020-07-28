import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../types/quiz';
import {Attempt} from '../../types/attempt';
import {ActivatedRoute} from '@angular/router';
import {AttemptService} from '../../services/attempt/attempt.service';
import {QuizService} from '../../services/quiz/quiz.service';
import {WsComponent} from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-quizzes-attempt',
  templateUrl: './quizzes-attempt.component.html',
  styleUrls: ['./quizzes-attempt.component.css']
})
export class QuizzesAttemptComponent extends WsComponent implements OnInit {

  quiz: Quiz = null;
  attempt: Attempt = null;
  alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  loading = true;

  constructor(
    private quizService: QuizService,
    private attemptService: AttemptService,
    private router: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.attemptService.subject.subscribe(attempt => (this.attempt = attempt)),
      this.attemptService.loading.subscribe(loading => (this.loading = loading)),
      this.quizService.subject.subscribe(quiz => (this.quiz = quiz)),
      this.router.params.subscribe(value => {
        const {attemptId} = value;
        const l = (window.navigator.language || (window.navigator as any).userLanguage || 'en').substring(0, 2);
        this.attemptService.fetch(attemptId, {l});
      })
    );
  }

  selectAnswer() {
  }

}
