import {Component, OnInit} from '@angular/core';
import {AnswersService} from '../../services/answers/answers.service';
import {QuestionsService} from '../../services/questions/questions.service';
import {Quiz} from '../../types/quiz';
import {AnswerRequest, AnswersList} from '../../types/answer';
import {Question} from '../../types/question';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionFormSubmitData} from '../quizzes-question-form/quizzes-question-form.component';
import {AlertService, AlertType, WsComponent} from '@worldskills/worldskills-angular-lib';
import {forkJoin} from 'rxjs';
import {QuestionService} from '../../services/question/question.service';
import {AnswerService} from '../../services/answer/answer.service';
import {QuizService} from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-quizzes-question-update',
  templateUrl: './quizzes-question-update.component.html',
  styleUrls: ['./quizzes-question-update.component.css']
})
export class QuizzesQuestionUpdateComponent extends WsComponent implements OnInit {

  quiz: Quiz;
  question: Question;
  answers: AnswersList;
  loading = false;

  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private questionsService: QuestionsService,
    private answersService: AnswersService,
    private answerService: AnswerService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.quizService.subject.subscribe(quiz => (this.quiz = quiz)),
      this.questionService.subject.subscribe(question => (this.question = question)),
      this.answersService.subject.subscribe(answers => (this.answers = answers)),
      this.answersService.loading.subscribe(loading => (this.loading = loading)),
      this.route.params.subscribe(value => {
        const {questionId} = value;
        this.answersService.fetch(questionId);
        this.questionService.fetch(questionId);
      })
    );
  }

  deleteQuestion() {
    if (confirm('Deleting the Question will also delete all answers. Click OK to proceed.')) {
      this.questionService.delete(this.question.id).subscribe(() => {
        this.questionsService.fetch(this.quiz.id).subscribe(list => {
          const observables = [];
          list.questions.sort((a, b) => a.sort - b.sort).forEach((question, index) => {
            question.sort = index + 1;
            observables.push(this.questionService.update(question.id, question));
          });

          forkJoin(observables).subscribe({
            complete: () => {
              this.alertService.setAlert('delete-question', AlertType.success,
                null, 'The Question has been deleted successfully.', true);
              this.router.navigateByUrl(`/quizzes/${this.quiz.id}/questions`).catch(e => alert(e));
            }
          });
        });
      });
    }
  }

  deactivateQuestion() {
    const instance = {...this.question, active: false};
    this.questionService.update(this.question.id, instance).subscribe(() => {
      this.alertService.setAlert('activate-question', AlertType.success,
        null, 'The Question has been deactivated successfully.', true);
      this.router.navigateByUrl(`/quizzes/${this.quiz.id}/questions`).catch(e => alert(e));
    });
  }

  activateQuestion() {
    const instance = {...this.question, active: true};
    this.questionService.update(this.question.id, instance).subscribe(() => {
      this.alertService.setAlert('deactivate-question', AlertType.success,
        null, 'The Question has been activated successfully.', true);
      this.router.navigateByUrl(`/quizzes/${this.quiz.id}/questions`).catch(e => alert(e));
    });
  }

  save(question: QuestionFormSubmitData) {
    const instance = {...this.question, ...question.question};
    this.questionService.update(this.question.id, instance).subscribe(() => {
      const observables = [];
      const storedAnswers: Array<AnswerRequest> = question.answers.filter(answer => !!answer.id);
      const newAnswers: Array<AnswerRequest> = question.answers.filter(answer => !answer.id);
      if (storedAnswers.length > 0) {
        observables.push(this.answerService.updateMany(storedAnswers.map(storedAnswer => ({
          answerId: storedAnswer.id,
          answer: storedAnswer
        }))));
      }
      if (newAnswers.length > 0) {
        observables.push(this.answerService.createMany(this.question.id, newAnswers));
      }
      if (question.deletedAnswers.length > 0) {
        observables.push(this.answerService.deleteMany(question.deletedAnswers.map(answer => answer.id)));
      }
      forkJoin(observables).subscribe({
        complete: () => {
          this.alertService.setAlert('update-question', AlertType.success,
            null, 'The Question has been updated successfully.', true);
          this.router.navigateByUrl(`/quizzes/${this.quiz.id}/questions`).catch(e => alert(e));
        }
      });
    });
  }

}
