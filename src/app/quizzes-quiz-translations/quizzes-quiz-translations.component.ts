import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../types/quiz';
import {forkJoin, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {QuizService} from '../../services/quiz/quiz.service';
import {WsComponent} from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-quizzes-quiz-translations',
  templateUrl: './quizzes-quiz-translations.component.html',
  styleUrls: ['./quizzes-quiz-translations.component.css']
})
export class QuizzesQuizTranslationsComponent extends WsComponent implements OnInit {

  quiz: Quiz = null;
  translatedQuizzes: Array<Quiz>;

  constructor(private quizService: QuizService, private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.quizService.subject.subscribe(quiz => {
        this.quiz = quiz;
        const supportedLocales = quiz.links.filter(l => l.rel === 'i18n');
        if (supportedLocales.length > 0) {
          const requests: Array<Observable<Quiz>> = supportedLocales.map(supportedLocale => this.http.get<Quiz>(supportedLocale.href));
          if (requests.length > 0) {
            forkJoin(requests).subscribe(translatedQuizzes => (this.translatedQuizzes = translatedQuizzes));
          } else {
            this.translatedQuizzes = [];
          }
        }
      })
    );
  }

}
