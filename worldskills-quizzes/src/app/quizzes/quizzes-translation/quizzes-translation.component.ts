import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../types/quiz';
import {QuizzesService} from '../../../services/quizzes/quizzes.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {httpParamsFromFetchParams} from '../../../utils/http';

@Component({
  selector: 'app-quizzes-translation',
  templateUrl: './quizzes-translation.component.html',
  styleUrls: ['./quizzes-translation.component.css']
})
export class QuizzesTranslationComponent implements OnInit {

  quiz: Quiz = null;
  translatedQuiz: Quiz = null;

  constructor(
    private quizzesService: QuizzesService,
    private http: HttpClient,
    private router: ActivatedRoute) {
  }

  deleteTranslation() {
  }

  ngOnInit(): void {
    this.quizzesService.instance.subscribe(quiz => {
      if (quiz) {
        this.router.params.subscribe(({locale}) => {
          this.http.get<Quiz>(
            // TODO env
            `https://api.worldskills.show/quizzes/${quiz.id}`,
            {params: httpParamsFromFetchParams({l: locale})}
          ).subscribe(translatedQuiz => {
            this.translatedQuiz = {...translatedQuiz};
            this.quiz = {...quiz};
          });
        });
      }
    });
  }

}
