import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
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
  responseChanged: Subject<string>[] = [];

  constructor(
    private appService: AppService,
    private quizService: QuizService,
    private attemptService: AttemptService,
    private attemptQuestionService: AttemptQuestionService,
    private router: Router,
    private route: ActivatedRoute
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
      this.attemptService.subject.subscribe(attempt => {
        for (const question of attempt.questions) {
          const responseChanged = new Subject<string>();
          responseChanged.pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe(() => {
              this.attemptQuestionService.updateResponse(attempt.id, question, this.locale).subscribe();
            });
          this.responseChanged[question.id] = responseChanged;
        }
        this.attempt = attempt;
      }),
      this.quizService.subject.subscribe({
        next: quiz => {
          this.quiz = quiz;
          this.attemptService.create(this.quiz.id, {}, {l: this.locale});
        },
        error: error => (this.error = error)
      })
    );
    this.route.params.subscribe(params => {
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

  updateResponse(response: string, attemptQuestion: AnsweredQuestionWithAnswers) {
    this.responseChanged[attemptQuestion.id].next(response);
  }

  finish() {
    this.attemptService.finish(this.attempt.id, {}, {l: this.locale});
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  retry() {
    window.location.reload();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.appService.showBreadcrumbs.next(true);
  }

}
