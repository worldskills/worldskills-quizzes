import {Component, OnInit} from '@angular/core';
import {Quiz, QuizLinkType} from '../../../types/quiz';
import {QuizzesService} from '../../../services/quizzes/quizzes.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {fetchLink, httpParamsFromFetchParams} from '../../../utils/http';
import {AnswersService} from '../../../services/answers/answers.service';
import {AlertService, AlertType} from '@worldskills/worldskills-angular-lib';
import {TranslationFormSubmitData} from '../quizzes-translation-form/quizzes-translation-form.component';
import {forkJoin} from 'rxjs';
import WsComponent from '../../../utils/ws.component';
import {QuestionService} from '../../../services/question/question.service';

@Component({
  selector: 'app-quizzes-translation-update',
  templateUrl: './quizzes-translation-update.component.html',
  styleUrls: ['./quizzes-translation-update.component.css']
})
export class QuizzesTranslationUpdateComponent extends WsComponent implements OnInit {

  quiz: Quiz = null;
  translatedQuiz: Quiz = null;
  loading = false;

  constructor(
    private quizzesService: QuizzesService,
    private questionService: QuestionService,
    private answersService: AnswersService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService) {
    super();
  }

  deleteTranslation(locale: string) {
    if (confirm('Deleting the translation will delete all translations of the questions and answers. Click OK to proceed.')) {
      this.quizzesService.deleteTranslations(this.quiz.id, locale).subscribe(() => {
        this.alertService.setAlert('delete-translations', AlertType.success,
          null, undefined, 'The translation has been deleted successfully.', true);
        this.router.navigateByUrl(`/quizzes/${this.quiz.id}/translations`).catch(e => alert(e));
      });
    }
  }

  ngOnInit(): void {
    this.subscribe(
      this.quizzesService.instance.subscribe(quiz => {
        this.route.params.subscribe(({locale}) => {
          const links = fetchLink<QuizLinkType>(quiz, 'self');
          if (links.length > 0) {
            this.http.get<Quiz>(links[0].href, {params: httpParamsFromFetchParams({l: locale})}
            ).subscribe(translatedQuiz => {
              this.translatedQuiz = translatedQuiz;
              this.quiz = quiz;
            });
          } else {
            console.error('cannot load links of quiz');
          }
        });
      })
    );
  }

  save(data: TranslationFormSubmitData) {
    const observables = [];
    const l = data.locale;
    observables.push(this.quizzesService.updateInstance(
      data.quizId,
      data.quiz,
      {l}
    ));
    observables.push(this.questionService.updateMany(
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
