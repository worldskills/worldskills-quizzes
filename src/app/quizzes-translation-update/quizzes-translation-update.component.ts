import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../types/quiz';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, AlertType, HttpUtil, WsComponent} from '@worldskills/worldskills-angular-lib';
import {TranslationFormSubmitData} from '../quizzes-translation-form/quizzes-translation-form.component';
import {forkJoin} from 'rxjs';
import {QuestionService} from '../../services/question/question.service';
import {AnswerService} from '../../services/answer/answer.service';
import {QuizService} from '../../services/quiz/quiz.service';

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
    private quizService: QuizService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService) {
    super();
  }

  deleteTranslation(locale: string) {
    if (confirm('Deleting the translation will delete all translations of the questions and answers. Click OK to proceed.')) {
      this.quizService.deleteTranslations(this.quiz.id, locale).subscribe(() => {
        this.alertService.setAlert('delete-translations', AlertType.success,
          null, 'The translation has been deleted successfully.', true);
        this.router.navigateByUrl(`/quizzes/${this.quiz.id}/translations`).catch(e => alert(e));
      });
    }
  }

  ngOnInit(): void {
    this.subscribe(
      this.quizService.subject.subscribe(quiz => {
        this.route.params.subscribe(({locale}) => {
          const links = quiz.links.filter(l => l.rel === 'self');
          if (links.length > 0) {
            this.http.get<Quiz>(links[0].href, {params: HttpUtil.objectToParams({l: locale})}
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
    forkJoin(observables).subscribe({
      complete: () => {
        this.quizService.fetch(this.quiz.id).subscribe(() => {
          this.alertService.setAlert('update-translation', AlertType.success,
            null, 'The translation has been updated successfully.', true);
          this.router.navigateByUrl(`/quizzes/${this.quiz.id}/translations`).catch(e => alert(e));
        });
      }
    });
  }

}
