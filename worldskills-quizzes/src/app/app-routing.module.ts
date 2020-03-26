import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminAuthGuard} from '../security/admin-auth.guard';
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
import {NotFoundComponent} from './not-found/not-found.component';
import {AttemptAuthGuard} from '../security/attempt-auth.guard';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'quiz/:quizId',
        pathMatch: 'full',
        component: QuizComponent,
        canActivate: [AttemptAuthGuard],
        data: {breadcrumb: 'Quiz'}
      },
      {
        path: 'quizzes',
        pathMatch: 'full',
        canActivate: [AdminAuthGuard],
        component: QuizzesComponent,
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
        data: {breadcrumb: 'Quiz'},
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
          },
          {
            path: '**',
            component: NotFoundComponent,
            data: {breadcrumb: 'Not found'}
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
