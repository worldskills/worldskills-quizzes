import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppHomepageComponent} from './app-homepage/app-homepage.component';
import {AdminAuthGuard} from '../security/admin-auth.guard';
import {QuizzesComponent} from './quizzes/quizzes.component';
import {LandingComponent} from './landing/landing.component';
import {QuizzesQuizComponent} from './quizzes/quizzes-quiz/quizzes-quiz.component';
import {QuizzesQuizFormComponent} from './quizzes/quizzes-quiz/quizzes-quiz-form/quizzes-quiz-form.component';
import {QuizzesQuizQuestionsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-questions/quizzes-quiz-questions.component';
import {QuizzesQuestionComponent} from './quizzes/quizzes-question/quizzes-question.component';
// import {QuizzesQuestionCreateComponent} from './quizzes/quizzes-question-create/quizzes-question-create.component';
import {QuizzesQuizPreviewComponent} from './quizzes/quizzes-quiz/quizzes-quiz-preview/quizzes-quiz-preview.component';
import {QuizzesQuizTranslationsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-translations/quizzes-quiz-translations.component';
import {QuizzesTranslationComponent} from './quizzes/quizzes-translation/quizzes-translation.component';
// import {QuizzesTranslationCreateComponent} from './quizzes/quizzes-translation-create/quizzes-translation-create.component';
import {QuizzesQuizAttemptsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-attempts/quizzes-quiz-attempts.component';
import {QuizzesAttemptComponent} from './quizzes/quizzes-attempt/quizzes-attempt.component';
import {QuizComponent} from './quiz/quiz.component';

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
        path: 'quizzes/:quizId',
        component: QuizzesQuizComponent,
        canActivate: [AdminAuthGuard],
        children: [
          {
            path: '',
            component: QuizzesQuizFormComponent,
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
            path: 'questions/:questionId',
            component: QuizzesQuestionComponent,
            canActivate: [AdminAuthGuard],
            data: {breadcrumb: 'Question'}
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
            path: 'translations/:locale',
            component: QuizzesTranslationComponent,
            canActivate: [AdminAuthGuard],
            data: {breadcrumb: 'Translation'}
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
            data: {breadcrumb: 'Attempts'}
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
