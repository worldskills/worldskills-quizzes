import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../types/quiz';
import {Attempt} from '../../types/attempt';
import {AnsweredQuestionWithAnswers} from '../../types/question';
import {ActivatedRoute} from '@angular/router';
import {AttemptService} from '../../services/attempt/attempt.service';
import {AttemptQuestionService} from '../../services/attempt-question/attempt-question.service';
import {QuizService} from '../../services/quiz/quiz.service';
import {WsComponent} from '@worldskills/worldskills-angular-lib';
import {UserRoleUtil} from '@worldskills/worldskills-angular-lib';
import {NgAuthService} from '@worldskills/worldskills-angular-lib';

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
  locale: string;
  canAssess = false;

  constructor(
    private authService: NgAuthService,
    private quizService: QuizService,
    private attemptService: AttemptService,
    private attemptQuestionService: AttemptQuestionService,
    private router: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.locale = (window.navigator.language || (window.navigator as any).userLanguage || 'en').substring(0, 2);
    this.authService.currentUser.subscribe(currentUser => {
      this.canAssess = UserRoleUtil.userHasRoles(currentUser, 1300, 'Admin', 'AssessQuizzes');
    });
    this.subscribe(
      this.attemptService.subject.subscribe(attempt => (this.attempt = attempt)),
      this.attemptService.loading.subscribe(loading => (this.loading = loading)),
      this.quizService.subject.subscribe(quiz => (this.quiz = quiz)),
      this.router.params.subscribe(value => {
        const {attemptId} = value;
        this.loadAttempt(attemptId);
      })
    );
  }

  loadAttempt(attemptId) {
    this.attemptService.fetch(attemptId, {l: this.locale});
  }

  assessQuestion(e: Event, attemptQuestion: AnsweredQuestionWithAnswers, correct) {
    e.preventDefault();
    attemptQuestion.correct = correct;
    this.attemptQuestionService.updateAttemptQuestion(this.attempt.id, attemptQuestion, this.locale).subscribe(() => {
      // reload attempt
      this.loadAttempt(this.attempt.id)
    });
  }

}
