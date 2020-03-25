import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../types/quiz';
import {TranslationFormSubmitData} from '../quizzes-translation-form/quizzes-translation-form.component';
import {AlertService, AlertType} from '@worldskills/worldskills-angular-lib';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {QuestionService} from '../../../services/question/question.service';
import WsComponent from '../../../utils/ws.component';
import {AnswerService} from '../../../services/answer/answer.service';
import {QuizService} from '../../../services/quiz/quiz.service';

@Component({
  selector: 'app-quizzes-translation-create',
  templateUrl: './quizzes-translation-create.component.html',
  styleUrls: ['./quizzes-translation-create.component.css']
})
export class QuizzesTranslationCreateComponent extends WsComponent implements OnInit {

  quiz: Quiz = null;
  loading = false;

  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private router: Router,
    private alertService: AlertService) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.quizService.subject.subscribe(quiz => (this.quiz = quiz)));
  }

  save(data: TranslationFormSubmitData) {
    const observables = [];
    const l = data.locale;
    observables.push(this.quizService.update(
      data.quizId,
      data.quiz,
      {l}
    ));
    observables.push(this.questionService.updateMany(
      data.questions.map(({questionId, question}) => ({questionId, question})),
      {l}
    ));
    data.questions.forEach(question => {
      observables.push(this.answerService.updateMany(
        question.answers.map(({answerId, answer}) => ({answerId, answer})),
        {l}
      ));
    });
    if (observables.length > 0) {
      const forkedJoin = forkJoin(observables);
      forkedJoin.subscribe(() => {
        this.alertService.setAlert('update-translation', AlertType.success,
          null, undefined, 'The translation has been updated successfully.', true);
        this.router.navigateByUrl(`/quizzes/${this.quiz.id}/translations`).catch(e => alert(e));
      });
    } else {
      this.alertService.setAlert('update-question', AlertType.success,
        null, undefined, 'The translation has been updated successfully.', true);
      this.router.navigateByUrl(`/quizzes/${this.quiz.id}/translations`).catch(e => alert(e));
    }
  }

}
