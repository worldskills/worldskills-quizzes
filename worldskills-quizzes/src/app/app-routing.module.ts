import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppHomepageComponent} from './app-homepage/app-homepage.component';
import {AdminAuthGuard} from '../security/admin-auth.guard';
// import {QuizzesComponent} from './quizzes/quizzes.component';
// import {QuizzesCreateComponent} from './quizzes/quizzes-create/quizzes-create.component';
// import {QuizzesQuizComponent} from './quizzes/quizzes-quiz/quizzes-quiz.component';
// import {QuizzesQuizQuestionsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-questions/quizzes-quiz-questions.component';
// import {QuizzesQuizPreviewComponent} from './quizzes/quizzes-quiz/quizzes-quiz-preview/quizzes-quiz-preview.component';
// import {QuizzesQuizTranslationsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-translations/quizzes-quiz-translations.component';
// import {QuizzesQuizAttemptsComponent} from './quizzes/quizzes-quiz/quizzes-quiz-attempts/quizzes-quiz-attempts.component';
// import {QuizzesAttemptComponent} from './quizzes/quizzes-attempt/quizzes-attempt.component';
// import {QuizzesQuestionCreateComponent} from './quizzes/quizzes-question-create/quizzes-question-create.component';
// import {QuizzesQuestionComponent} from './quizzes/quizzes-question/quizzes-question.component';
// import {QuizzesTranslationCreateComponent} from './quizzes/quizzes-translation-create/quizzes-translation-create.component';
// import {QuizzesTranslationComponent} from './quizzes/quizzes-translation/quizzes-translation.component';
// import {QuizComponent} from './quiz/quiz.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppHomepageComponent,
    // canActivate: [AdminAuthGuard]
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: AppHomepageComponent,
    canActivate: [AdminAuthGuard]
  },
  // {
  //   path: 'quizzes',
  //   component: QuizzesComponent,
  //   children: [
  //     {
  //       path: 'create',
  //       component: QuizzesCreateComponent
  //     }
  //   ]
  // },
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
