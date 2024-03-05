import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {WorldskillsAngularLibModule, WsHttpInterceptor} from '@worldskills/worldskills-angular-lib';
import {QuizzesComponent} from './quizzes/quizzes.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {QuizzesQuizComponent} from './quizzes-quiz/quizzes-quiz.component';
import {QuizzesQuizFormComponent} from './quizzes-quiz-form/quizzes-quiz-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuizzesQuizQuestionsComponent} from './quizzes-quiz-questions/quizzes-quiz-questions.component';
import {QuizzesQuizPreviewComponent} from './quizzes-quiz-preview/quizzes-quiz-preview.component';
import {QuizzesQuizTranslationsComponent} from './quizzes-quiz-translations/quizzes-quiz-translations.component';
import {QuizzesQuizAttemptsComponent} from './quizzes-quiz-attempts/quizzes-quiz-attempts.component';
import {QuizzesQuizAttemptsFilterPipePipe} from './quizzes-quiz-attempts/quizzes-quiz-attempts-filter-pipe.pipe';
import {QuizzesQuizAttemptsUserComponent} from './quizzes-quiz-attempts-user/quizzes-quiz-attempts-user.component';
import {QuizzesAttemptComponent} from './quizzes-attempt/quizzes-attempt.component';
import {QuizzesQuestionUpdateComponent} from './quizzes-question-update/quizzes-question-update.component';
import {QuizzesQuestionFormComponent} from './quizzes-question-form/quizzes-question-form.component';
import {QuizzesTranslationUpdateComponent} from './quizzes-translation-update/quizzes-translation-update.component';
import {QuizzesTranslationFormComponent} from './quizzes-translation-form/quizzes-translation-form.component';
import {QuizComponent} from './quiz/quiz.component';
import {QuizzesQuizUpdateComponent} from './quizzes-quiz-update/quizzes-quiz-update.component';
import {QuizzesQuizCreateComponent} from './quizzes-quiz-create/quizzes-quiz-create.component';
import {QuizzesQuestionCreateComponent} from './quizzes-question-create/quizzes-question-create.component';
import {QuizzesTranslationCreateComponent} from './quizzes-translation-create/quizzes-translation-create.component';
import {HttpInterceptorService} from '../services/http-interceptor/http-interceptor.service';
import {WsSpinnerComponent} from './ws-spinner/ws-spinner.component';
import {HomeComponent} from './home/home.component';
import {ErrorComponent} from './error/error.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { QuizzesReportComponent } from './quizzes-report/quizzes-report.component';
import { QuizzesReportAttemptComponent } from './quizzes-report-attempt/quizzes-report-attempt.component';
import { QuizzesFilterComponent } from './quizzes-filter/quizzes-filter.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json?v=20220120132207');
}

@NgModule({
  declarations: [
    AppComponent,
    QuizzesComponent,
    QuizzesQuizComponent,
    QuizzesQuizFormComponent,
    QuizzesQuizQuestionsComponent,
    QuizzesQuizPreviewComponent,
    QuizzesQuizTranslationsComponent,
    QuizzesQuizAttemptsComponent,
    QuizzesQuizAttemptsFilterPipePipe,
    QuizzesQuizAttemptsUserComponent,
    QuizzesAttemptComponent,
    QuizzesQuestionUpdateComponent,
    QuizzesQuestionCreateComponent,
    QuizzesQuestionFormComponent,
    QuizzesTranslationCreateComponent,
    QuizzesTranslationUpdateComponent,
    QuizzesTranslationFormComponent,
    QuizComponent,
    QuizzesQuizUpdateComponent,
    QuizzesQuizCreateComponent,
    WsSpinnerComponent,
    HomeComponent,
    ErrorComponent,
    QuizzesReportComponent,
    QuizzesReportAttemptComponent,
    QuizzesFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    WorldskillsAngularLibModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CKEditorModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WsHttpInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
