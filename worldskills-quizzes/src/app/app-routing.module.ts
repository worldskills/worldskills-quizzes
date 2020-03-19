import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminAuthGuard} from '../security/admin-auth.guard';
import {QuizzesComponent} from './quizzes/quizzes.component';
import {LandingComponent} from './landing/landing.component';
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

const routes: Routes = [
  {
    path: '',
    // pathMatch: 'full',
    component: LandingComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/quizzes'
      },
      {
        path: 'quiz/:quizId',
        pathMatch: 'full',
        component: QuizComponent,
        canActivate: [AdminAuthGuard], // TODO different guard
        data: {breadcrumb: 'Quiz'}

      },
      {
        path: 'quizzes',
        pathMatch: 'full',
        component: QuizzesComponent,
        canActivate: [AdminAuthGuard],
        data: {breadcrumb: 'Quizzes'}
      },
      {
        path: 'quizzes/create',
        pathMatch: 'full',
        component: QuizzesQuizCreateComponent,
        canActivate: [AdminAuthGuard],
        data: {breadcrumb: 'Add quiz'}
      },
      {
        path: 'quizzes/:quizId',
        component: QuizzesQuizComponent,
        canActivate: [AdminAuthGuard],
        children: [
          {
            path: '',
            component: QuizzesQuizUpdateComponent,
            canActivate: [AdminAuthGuard],
            data: {breadcrumb: 'Quiz'}
          },
          {
            path: 'questions',
            component: QuizzesQuizQuestionsComponent,
            canActivate: [AdminAuthGuard],
            data: {breadcrumb: 'Questions'}
          },
          {
            path: 'questions/create',
            component: QuizzesQuestionCreateComponent,
            canActivate: [AdminAuthGuard],
            data: {breadcrumb: 'Add question'}
          },
          {
            path: 'questions/:questionId',
            component: QuizzesQuestionUpdateComponent,
            canActivate: [AdminAuthGuard],
            data: {breadcrumb: 'Edit question'}
          },
          {
            path: 'preview',
            component: QuizzesQuizPreviewComponent,
            canActivate: [AdminAuthGuard],
            data: {breadcrumb: 'Preview'}
          },
          {
            path: 'translations',
            component: QuizzesQuizTranslationsComponent,
            canActivate: [AdminAuthGuard],
            data: {breadcrumb: 'Translations'}
          },
          {
            path: 'translations/create',
            component: QuizzesTranslationCreateComponent,
            canActivate: [AdminAuthGuard],
            data: {breadcrumb: 'Add translation'}
          },
          {
            path: 'translations/:locale',
            component: QuizzesTranslationUpdateComponent,
            canActivate: [AdminAuthGuard],
            data: {breadcrumb: 'Edit translation'}
          },
          {
            path: 'attempts',
            component: QuizzesQuizAttemptsComponent,
            canActivate: [AdminAuthGuard],
            data: {breadcrumb: 'Attempts'}
          },
          {
            path: 'attempts/:attemptId',
            component: QuizzesAttemptComponent,
            canActivate: [AdminAuthGuard],
            data: {breadcrumb: 'Attempt'}
          }
        ]
      }
    ]
  },
  // children: [
  //   {
  //     path: 'create',
  //     component: QuizzesCreateComponent
  //   }
  // ]
  // {
  //   path: ':id',
  //   component: QuizzesQuizComponent,
  //   children: [
  //     {
  //       path: 'questions/create',
  //       component: QuizzesQuestionCreateComponent
  //     },
  //     {
  //       path: 'translations',
  //       children: [
  //         {
  //           path: 'create',
  //           component: QuizzesTranslationCreateComponent
  //         },
  //         {
  //           path: ':locale',
  //           component: QuizzesTranslationComponent
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: 'questions',
  //   component: QuizzesQuizQuestionsComponent,
  //   children: [
  //     {
  //       path: ':id',
  //       component: QuizzesQuestionComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'preview',
  //   component: QuizzesQuizPreviewComponent
  // },
  // {
  //   path: 'translations',
  //   component: QuizzesQuizTranslationsComponent
  // },
  // {
  //   path: 'attempts',
  //   component: QuizzesQuizAttemptsComponent,
  //   children: [
  //     {
  //       path: ':id',
  //       component: QuizzesAttemptComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'quiz/:id',
  //   component: QuizComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
