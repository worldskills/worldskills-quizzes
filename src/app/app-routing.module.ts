import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizzesComponent} from './quizzes/quizzes.component';
import {QuizzesQuizComponent} from './quizzes-quiz/quizzes-quiz.component';
import {QuizzesQuizQuestionsComponent} from './quizzes-quiz-questions/quizzes-quiz-questions.component';
import {QuizzesQuestionUpdateComponent} from './quizzes-question-update/quizzes-question-update.component';
import {QuizzesQuizPreviewComponent} from './quizzes-quiz-preview/quizzes-quiz-preview.component';
import {QuizzesQuizTranslationsComponent} from './quizzes-quiz-translations/quizzes-quiz-translations.component';
import {QuizzesTranslationUpdateComponent} from './quizzes-translation-update/quizzes-translation-update.component';
import {QuizzesQuizAttemptsComponent} from './quizzes-quiz-attempts/quizzes-quiz-attempts.component';
import {QuizzesQuizAttemptsUserComponent} from './quizzes-quiz-attempts-user/quizzes-quiz-attempts-user.component';
import {QuizzesAttemptComponent} from './quizzes-attempt/quizzes-attempt.component';
import {QuizComponent} from './quiz/quiz.component';
import {QuizzesQuizUpdateComponent} from './quizzes-quiz-update/quizzes-quiz-update.component';
import {QuizzesQuizCreateComponent} from './quizzes-quiz-create/quizzes-quiz-create.component';
import {QuizzesQuestionCreateComponent} from './quizzes-question-create/quizzes-question-create.component';
import {QuizzesTranslationCreateComponent} from './quizzes-translation-create/quizzes-translation-create.component';
import {HomeComponent} from './home/home.component';
import {AppAuthGuard} from '@worldskills/worldskills-angular-lib';
import {ErrorComponent} from './error/error.component';

const APP_CODE = 1300;

function forAppCode(appCode: number, roles: Array<string>) {
  return roles.map(name => ({
    appCode,
    name
  }));
}

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'quiz/:quizId',
    pathMatch: 'full',
    component: QuizComponent,
    canActivate: [AppAuthGuard],
    data: {roles: forAppCode(APP_CODE, ['AttemptQuizzes'])}
  },
  {
    path: 'quizzes',
    pathMatch: 'full',
    canActivate: [AppAuthGuard],
    component: QuizzesComponent,
    data: {breadcrumb: 'Quizzes', roles: forAppCode(APP_CODE, ['Admin', 'EditQuizzes', 'ViewAllAttempts'])}
  },
  {
    path: 'quizzes/create',
    pathMatch: 'full',
    component: QuizzesQuizCreateComponent,
    canActivate: [AppAuthGuard],
    data: {breadcrumb: 'Add quiz', roles: forAppCode(APP_CODE, ['Admin', 'EditQuizzes'])}
  },
  {
    path: 'quizzes/:quizId',
    component: QuizzesQuizComponent,
    canActivate: [AppAuthGuard],
    data: {breadcrumb: 'Quiz', roles: forAppCode(APP_CODE, ['Admin', 'EditQuizzes', 'ViewAllAttempts'])},
    children: [
      {
        path: '',
        component: QuizzesQuizUpdateComponent,
        data: {breadcrumb: 'Quiz'}
      },
      {
        path: 'questions',
        component: QuizzesQuizQuestionsComponent,
        data: {breadcrumb: 'Questions', roles: forAppCode(APP_CODE, ['Admin', 'EditQuizzes'])}
      },
      {
        path: 'questions/create',
        component: QuizzesQuestionCreateComponent,
        data: {breadcrumb: 'Add question', roles: forAppCode(APP_CODE, ['Admin', 'EditQuizzes'])}
      },
      {
        path: 'questions/:questionId',
        component: QuizzesQuestionUpdateComponent,
        data: {breadcrumb: 'Edit question', roles: forAppCode(APP_CODE, ['Admin', 'EditQuizzes'])}
      },
      {
        path: 'preview',
        component: QuizzesQuizPreviewComponent,
        data: {breadcrumb: 'Preview'}
      },
      {
        path: 'translations',
        component: QuizzesQuizTranslationsComponent,
        data: {breadcrumb: 'Translations', roles: forAppCode(APP_CODE, ['Admin', 'EditQuizzes'])}
      },
      {
        path: 'translations/create',
        component: QuizzesTranslationCreateComponent,
        data: {breadcrumb: 'Add translation', roles: forAppCode(APP_CODE, ['Admin', 'EditQuizzes'])}
      },
      {
        path: 'translations/:locale',
        component: QuizzesTranslationUpdateComponent,
        data: {breadcrumb: 'Edit translation', roles: forAppCode(APP_CODE, ['Admin', 'EditQuizzes'])}
      },
      {
        path: 'attempts',
        component: QuizzesQuizAttemptsComponent,
        data: {breadcrumb: 'Attempts', roles: forAppCode(APP_CODE, ['Admin', 'ViewAllAttempts'])}
      },
      {
        path: 'attempts/users/:userId',
        component: QuizzesQuizAttemptsUserComponent,
        data: {breadcrumb: 'Attempt', roles: forAppCode(APP_CODE, ['Admin', 'ViewAllAttempts'])}
      },
      {
        path: 'attempts/:attemptId',
        component: QuizzesAttemptComponent,
        data: {breadcrumb: 'Attempt', roles: forAppCode(APP_CODE, ['Admin', 'ViewAllAttempts'])}
      },
      {
        path: '**',
        component: ErrorComponent,
        data: {breadcrumb: 'Not found'}
      }
    ]
  },
  {
    path: 'not-authorized',
    component: ErrorComponent,
    data: {breadcrumb: 'Not found', error: 'Not authorized'}
  },
  {
    path: '**',
    component: ErrorComponent,
    data: {breadcrumb: 'Not found'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
