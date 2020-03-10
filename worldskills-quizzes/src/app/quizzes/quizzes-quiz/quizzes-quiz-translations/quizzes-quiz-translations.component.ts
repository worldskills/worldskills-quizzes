import {Component, OnInit} from '@angular/core';
import {QuizzesService} from '../../../../services/quizzes/quizzes.service';
import {Quiz} from '../../../../types/quiz';
import {fetchSupportedLocales} from '../../../../utils/quiz';
import {forkJoin, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-quizzes-quiz-translations',
  templateUrl: './quizzes-quiz-translations.component.html',
  styleUrls: ['./quizzes-quiz-translations.component.css']
})
export class QuizzesQuizTranslationsComponent implements OnInit {

  quiz: Quiz = null;
  translatedQuizzes: Array<Quiz> = [];

  constructor(private quizzesService: QuizzesService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.quizzesService.instance.subscribe(quiz => {
      if (quiz) {
        this.quiz = {...quiz};
        const supportedLocales = fetchSupportedLocales(quiz);
        const requests: Array<Observable<Quiz>> = supportedLocales.map(supportedLocale => this.http.get<Quiz>(supportedLocale.href));
        forkJoin(requests).subscribe(translatedQuizzes => (this.translatedQuizzes = translatedQuizzes));
      }
    });
  }

}
