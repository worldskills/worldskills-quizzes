import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthConfig, OAuthModule} from 'angular-oauth2-oidc';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {WorldskillsAngularLibModule, WsHttpInterceptor} from '@worldskills/worldskills-angular-lib';
import {AppHomepageComponent} from './app-homepage/app-homepage.component';
import {QuizzesComponent} from './quizzes/quizzes.component';
import {LandingComponent} from './landing/landing.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {QuizzesQuizComponent} from './quizzes/quizzes-quiz/quizzes-quiz.component';
import {QuizzesQuizFormComponent} from './quizzes/quizzes-quiz/quizzes-quiz-form/quizzes-quiz-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuizzesQuizQuestionsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-questions/quizzes-quiz-questions.component';
import {QuizzesQuizPreviewComponent} from './quizzes/quizzes-quiz/quizzes-quiz-preview/quizzes-quiz-preview.component';
import {QuizzesQuizTranslationsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-translations/quizzes-quiz-translations.component';
import {QuizzesQuizAttemptsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-attempts/quizzes-quiz-attempts.component';
import {QuizzesAttemptComponent} from './quizzes/quizzes-attempt/quizzes-attempt.component';
import {QuizzesQuestionUpdateComponent} from './quizzes/quizzes-question-update/quizzes-question-update.component';
import {QuizzesQuestionFormComponent} from './quizzes/quizzes-question-form/quizzes-question-form.component';
import {QuizzesTranslationComponent} from './quizzes/quizzes-translation/quizzes-translation.component';
import {QuizzesTranslationFormComponent} from './quizzes/quizzes-translation/quizzes-translation-form/quizzes-translation-form.component';
import {QuizComponent} from './quiz/quiz.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {QuizzesQuizUpdateComponent} from './quizzes/quizzes-quiz/quizzes-quiz-update/quizzes-quiz-update.component';
import {QuizzesQuizCreateComponent} from './quizzes/quizzes-quiz/quizzes-quiz-create/quizzes-quiz-create.component';
import {QuizzesQuestionCreateComponent} from './quizzes/quizzes-question-create/quizzes-question-create.component';

const serviceConfig = {
  appCode: 1300,
  userServiceEndpoint: 'https://api.worldskills.show/auth',
  resourceApiPath: 'https://api.worldskills.show/quizzes',
  authApiPath: 'https://api.worldskills.show/auth'
};

// oauth client app configuration
const oAuthConfig = {
  // login page URI
  loginUrl: 'https://auth.worldskills.show/oauth/authorize',

  // this should match your configured redirecctUri in auth admin
  redirectUri: 'http://localhost:11301/',

  // load the user information object
  userinfoEndpoint: 'https://api.worldskills.show/auth/users/loggedIn?show_child_roles=false&app_code=1300',

  // this should match the auth admin valiue
  clientId: '91c518ccad27',

  requireHttps: false,

  // keep this false
  oidc: false
} as AuthConfig;

const httpConfig = {
  // used to apply custom url parameter encoding for java services
  encoderUriPatterns: [],

  // used to automagically inject auth tokens in http requests
  authUriPatterns: ['api.worldskills.show']
};

@NgModule({
  declarations: [
    AppComponent,
    AppHomepageComponent,
    QuizzesComponent,
    LandingComponent,
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
    // QuizzesTranslationCreateComponent,
    // QuizzesTranslationCreateFormComponent,
    QuizzesTranslationComponent,
    QuizzesTranslationFormComponent,
    QuizComponent,
    BreadcrumbComponent,
    QuizzesQuizUpdateComponent,
    QuizzesQuizCreateComponent
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
    {provide: HTTP_INTERCEPTORS, useClass: WsHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
