import {Component, OnInit} from '@angular/core';
import {QuizzesService} from '../../../services/quizzes/quizzes.service';
import {AnswersService} from '../../../services/answers/answers.service';
import {QuestionsService} from '../../../services/questions/questions.service';
import {Quiz} from '../../../types/quiz';
import {AnswerRequest, AnswersList} from '../../../types/answer';
import {Question} from '../../../types/question';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionFormSubmitData} from '../quizzes-question-form/quizzes-question-form.component';
import {AlertService, AlertType} from '@worldskills/worldskills-angular-lib';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-quizzes-question-update',
  templateUrl: './quizzes-question-update.component.html',
  styleUrls: ['./quizzes-question-update.component.css']
})
export class QuizzesQuestionUpdateComponent implements OnInit {

  quiz: Quiz;
  question: Question;
  answers: AnswersList;
  loading = false;

  constructor(
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService,
    private answersService: AnswersService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  // TODO subscription management! VERY IMPORTANT to prevent leaks
  ngOnInit(): void {
    this.quizzesService.instance.subscribe(quiz => (this.quiz = quiz));
    this.questionsService.instance.subscribe(question => (this.question = question));
    this.answersService.list.subscribe(answers => (this.answers = answers));
    this.answersService.loading.subscribe(loading => (this.loading = loading));
    this.route.params.subscribe(value => {
      const {questionId} = value;
      this.answersService.fetchList(questionId);
      this.questionsService.fetchInstance(questionId);
    });
  }

  deleteQuestion() {
    this.questionsService.deleteInstance(this.question.id).subscribe(() => {
      this.alertService.setAlert('delete-question', AlertType.success,
        null, undefined, 'The Question has been deleted successfully.', true);
      this.router.navigateByUrl(`/quizzes/${this.quiz.id}/questions`).catch(e => alert(e));
    });
  }

  deactivateQuestion() {
    const instance = {...this.question, active: false};
    this.questionsService.updateInstance(this.question.id, instance).subscribe(() => {
      this.alertService.setAlert('activate-question', AlertType.success,
        null, undefined, 'The Question has been deactivated successfully.', true);
      this.router.navigateByUrl(`/quizzes/${this.quiz.id}/questions`).catch(e => alert(e));
    });
  }

  activateQuestion() {
    const instance = {...this.question, active: true};
    this.questionsService.updateInstance(this.question.id, instance).subscribe(() => {
      this.alertService.setAlert('deactivate-question', AlertType.success,
        null, undefined, 'The Question has been activated successfully.', true);
      this.router.navigateByUrl(`/quizzes/${this.quiz.id}/questions`).catch(e => alert(e));
    });
  }

  save(question: QuestionFormSubmitData) {
    const instance = {...this.question, ...question.question};
    this.questionsService.updateInstance(this.question.id, instance).subscribe(() => {
      const observables = [];
      const storedAnswers: Array<AnswerRequest> = question.answers.filter(answer => !!answer.id);
      const newAnswers: Array<AnswerRequest> = question.answers.filter(answer => !answer.id);
      if (storedAnswers.length > 0) {
        observables.push(this.answersService.updateInstances(storedAnswers.map(storedAnswer => ({
          answerId: storedAnswer.id,
          answer: storedAnswer
        }))));
      }
      if (newAnswers.length > 0) {
        observables.push(this.answersService.createInstances(this.question.id, newAnswers));
      }
      if (question.deletedAnswers.length > 0) {
        observables.push(this.answersService.deleteInstances(question.deletedAnswers.map(answer => answer.id)));
      }
      if (observables.length > 0) {
        const forkedJoin = forkJoin(observables);
        forkedJoin.subscribe(() => {
          this.alertService.setAlert('update-question', AlertType.success,
            null, undefined, 'The Question has been updated successfully.', true);
          this.router.navigateByUrl(`/quizzes/${this.quiz.id}/questions`).catch(e => alert(e));
        });
      } else {
        this.alertService.setAlert('update-question', AlertType.success,
          null, undefined, 'The Question has been updated successfully.', true);
        this.router.navigateByUrl(`/quizzes/${this.quiz.id}/questions`).catch(e => alert(e));
      }
    });
  }

}
