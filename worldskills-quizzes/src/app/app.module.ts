import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthConfig, OAuthModule} from 'angular-oauth2-oidc';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {WorldskillsAngularLibModule, WsHttpInterceptor} from '@worldskills/worldskills-angular-lib';
import {QuizzesComponent} from './quizzes/quizzes.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {QuizzesQuizComponent} from './quizzes/quizzes-quiz/quizzes-quiz.component';
import {QuizzesQuizFormComponent} from './quizzes/quizzes-quiz-form/quizzes-quiz-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuizzesQuizQuestionsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-questions/quizzes-quiz-questions.component';
import {QuizzesQuizPreviewComponent} from './quizzes/quizzes-quiz/quizzes-quiz-preview/quizzes-quiz-preview.component';
import {QuizzesQuizTranslationsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-translations/quizzes-quiz-translations.component';
import {QuizzesQuizAttemptsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-attempts/quizzes-quiz-attempts.component';
import {QuizzesAttemptComponent} from './quizzes/quizzes-attempt/quizzes-attempt.component';
import {QuizzesQuestionUpdateComponent} from './quizzes/quizzes-question-update/quizzes-question-update.component';
import {QuizzesQuestionFormComponent} from './quizzes/quizzes-question-form/quizzes-question-form.component';
import {QuizzesTranslationUpdateComponent} from './quizzes/quizzes-translation-update/quizzes-translation-update.component';
import {QuizzesTranslationFormComponent} from './quizzes/quizzes-translation-form/quizzes-translation-form.component';
import {QuizComponent} from './quiz/quiz.component';
import {QuizzesQuizUpdateComponent} from './quizzes/quizzes-quiz-update/quizzes-quiz-update.component';
import {QuizzesQuizCreateComponent} from './quizzes/quizzes-quiz-create/quizzes-quiz-create.component';
import {QuizzesQuestionCreateComponent} from './quizzes/quizzes-question-create/quizzes-question-create.component';
import {QuizzesTranslationCreateComponent} from './quizzes/quizzes-translation-create/quizzes-translation-create.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HttpInterceptorService} from '../services/http-interceptor/http-interceptor.service';
import {CkEditorDirective} from './directives/ck-editor/ck-editor.directive';
import {WsSpinnerComponent} from './ws-spinner/ws-spinner.component';
import {LangCodeToNamePipe} from '../pipes/lang-code-to-name/lang-code-to-name.pipe';

const serviceConfig = {
  appCode: 1300,
  userServiceEndpoint: environment.worldskillsApiAuth,
  resourceApiPath: environment.worldskillsApiQuizzes,
  authApiPath: environment.worldskillsApiAuth
};

// oauth client app configuration
const oAuthConfig = {
  // login page URI
  loginUrl: environment.worldskillsAuthorizeUrl,

  // this should match your configured redirecctUri in auth admin
  redirectUri: environment.worldskillsAuthorizeRedirect,

  // load the user information object
  // tslint:disable-next-line:max-line-length
  userinfoEndpoint: `${environment.worldskillsAuthorizeUserinfoEndpoint}?show_child_roles=${environment.loadChildEntityRoles ? 'true' : 'false'}&${environment.filterAuthRoles.map(appCode => `app_code=${appCode}`).join('&')}`,

  // this should match the auth admin valiue
  clientId: environment.worldskillsClientId,

  requireHttps: environment.production,

  // keep this false
  oidc: false
} as AuthConfig;

const httpConfig = {
  // used to apply custom url parameter encoding for java services
  encoderUriPatterns: [],

  // used to automagically inject auth tokens in http requests
  authUriPatterns: environment.worldskillsAuthUriPatterns
};

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
    NotFoundComponent,
    CkEditorDirective,
    WsSpinnerComponent,
    LangCodeToNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    WorldskillsAngularLibModule.forConfig(serviceConfig, oAuthConfig, httpConfig),
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WsHttpInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
