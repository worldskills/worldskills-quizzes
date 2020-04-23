import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizzesComponent} from './quizzes/quizzes.component';
import {QuizzesQuizComponent} from './quizzes/quizzes-quiz/quizzes-quiz.component';
import {QuizzesQuizQuestionsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-questions/quizzes-quiz-questions.component';
import {QuizzesQuestionUpdateComponent} from './quizzes/quizzes-question-update/quizzes-question-update.component';
import {QuizzesQuizPreviewComponent} from './quizzes/quizzes-quiz/quizzes-quiz-preview/quizzes-quiz-preview.component';
import {QuizzesQuizTranslationsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-translations/quizzes-quiz-translations.component';
import {QuizzesTranslationUpdateComponent} from './quizzes/quizzes-translation-update/quizzes-translation-update.component';
import {QuizzesQuizAttemptsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-attempts/quizzes-quiz-attempts.component';
import {QuizzesAttemptComponent} from './quizzes/quizzes-attempt/quizzes-attempt.component';
import {QuizComponent} from './quiz/quiz.component';
import {QuizzesQuizUpdateComponent} from './quizzes/quizzes-quiz-update/quizzes-quiz-update.component';
import {QuizzesQuizCreateComponent} from './quizzes/quizzes-quiz-create/quizzes-quiz-create.component';
import {QuizzesQuestionCreateComponent} from './quizzes/quizzes-question-create/quizzes-question-create.component';
import {QuizzesTranslationCreateComponent} from './quizzes/quizzes-translation-create/quizzes-translation-create.component';
import {HomeComponent} from './home/home.component';
import {AppAuthGuard} from '@worldskills/worldskills-angular-lib';
import {ErrorComponent} from './error/error.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'quiz/:quizId',
        pathMatch: 'full',
        component: QuizComponent,
        canActivate: [AppAuthGuard],
        data: {roles: ['AttemptQuizzes']}
      },
      {
        path: 'quizzes',
        pathMatch: 'full',
        canActivate: [AppAuthGuard],
        component: QuizzesComponent,
        data: {breadcrumb: 'Quizzes', roles: ['EditQuizzes']}
      },
      {
        path: 'quizzes/create',
        pathMatch: 'full',
        component: QuizzesQuizCreateComponent,
        canActivate: [AppAuthGuard],
        data: {breadcrumb: 'Add quiz', roles: ['EditQuizzes']}
      },
      {
        path: 'quizzes/:quizId',
        component: QuizzesQuizComponent,
        canActivate: [AppAuthGuard],
        data: {breadcrumb: 'Quiz', roles: ['EditQuizzes']},
        children: [
          {
            path: '',
            component: QuizzesQuizUpdateComponent,
            data: {breadcrumb: 'Quiz'}
          },
          {
            path: 'questions',
            component: QuizzesQuizQuestionsComponent,
            data: {breadcrumb: 'Questions'}
          },
          {
            path: 'questions/create',
            component: QuizzesQuestionCreateComponent,
            data: {breadcrumb: 'Add question'}
          },
          {
            path: 'questions/:questionId',
            component: QuizzesQuestionUpdateComponent,
            data: {breadcrumb: 'Edit question'}
          },
          {
            path: 'preview',
            component: QuizzesQuizPreviewComponent,
            data: {breadcrumb: 'Preview'}
          },
          {
            path: 'translations',
            component: QuizzesQuizTranslationsComponent,
            data: {breadcrumb: 'Translations'}
          },
          {
            path: 'translations/create',
            component: QuizzesTranslationCreateComponent,
            data: {breadcrumb: 'Add translation'}
          },
          {
            path: 'translations/:locale',
            component: QuizzesTranslationUpdateComponent,
            data: {breadcrumb: 'Edit translation'}
          },
          {
            path: 'attempts',
            component: QuizzesQuizAttemptsComponent,
            data: {breadcrumb: 'Attempts'}
          },
          {
            path: 'attempts/:attemptId',
            component: QuizzesAttemptComponent,
            data: {breadcrumb: 'Attempt'}
          },
          {
            path: '**',
            component: ErrorComponent,
            data: {breadcrumb: 'Not found'}
          }
        ]
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
