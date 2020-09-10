import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Quiz} from '../../types/quiz';
import {Attempt} from '../../types/attempt';
import {AnsweredQuestionWithAnswers} from '../../types/question';
import {AttemptService} from '../../services/attempt/attempt.service';
import {AttemptQuestionService} from '../../services/attempt-question/attempt-question.service';
import {QuizService} from '../../services/quiz/quiz.service';
import {RxjsUtil, WsComponent} from '@worldskills/worldskills-angular-lib';
import {AppService} from "../../services/app/app.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent extends WsComponent implements OnInit, OnDestroy {

  quiz: Quiz;
  attempt: Attempt;
  alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  loading = true;
  error = null;
  locale: string;

  constructor(
    private appService: AppService,
    private quizService: QuizService,
    private attemptService: AttemptService,
    private attemptQuestionService: AttemptQuestionService,
    private router: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.appService.showBreadcrumbs.next(false);
    this.locale = (window.navigator.language || (window.navigator as any).userLanguage || 'en').substring(0, 2);
    this.subscribe(
      RxjsUtil.loaderSubscriber(
        this.quizService.loading,
        this.attemptService.loading,
      ).subscribe(loading => this.loading = loading),
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
    const attempt = {...this.attempt};
    const qIndex = attempt.questions.findIndex(q => q.id === questionId);
    attempt.questions[qIndex].answer = attempt.questions[qIndex].answers.find(a => a.id === answerId);
    this.attemptService.subject.next(attempt);
    this.attemptService.update(this.attempt.id, questionId, answerId, {}, {l: this.locale});
  }

  updateResponse(attemptQuestion: AnsweredQuestionWithAnswers) {
    this.attemptQuestionService.updateResponse(this.attempt.id, attemptQuestion, this.locale).subscribe();
  }

  finish() {
    this.attemptService.finish(this.attempt.id, {}, {l: this.locale});
  }

  retry() {
    window.location.reload();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.appService.showBreadcrumbs.next(true);
  }

}
