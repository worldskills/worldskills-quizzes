import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../types/quiz';
import {QuizzesService} from '../../../services/quizzes/quizzes.service';
import {TranslationFormSubmitData} from '../quizzes-translation-form/quizzes-translation-form.component';
import {QuestionsService} from '../../../services/questions/questions.service';
import {AnswersService} from '../../../services/answers/answers.service';
import {AlertService, AlertType} from '@worldskills/worldskills-angular-lib';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-quizzes-translation-create',
  templateUrl: './quizzes-translation-create.component.html',
  styleUrls: ['./quizzes-translation-create.component.css']
})
export class QuizzesTranslationCreateComponent implements OnInit {

  quiz: Quiz = null;
  loading = false;

  constructor(
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService,
    private answersService: AnswersService,
    private router: Router,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.quizzesService.instance.subscribe(quiz => (this.quiz = quiz));
  }

  save(data: TranslationFormSubmitData) {
    const observables = [];
    const l = data.locale;
    observables.push(this.quizzesService.updateInstance(
      data.quizId,
      data.quiz,
      {l}
    ));
    observables.push(this.questionsService.updateInstances(
      data.questions.map(({questionId, question}) => ({questionId, question})),
      {l}
    ));
    data.questions.forEach(question => {
      observables.push(this.answersService.updateInstances(
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
