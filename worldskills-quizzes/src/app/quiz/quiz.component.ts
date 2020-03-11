import {Component, OnInit} from '@angular/core';
import {QuizzesService} from '../../services/quizzes/quizzes.service';
import {ActivatedRoute} from '@angular/router';
import {Quiz} from '../../types/quiz';
import {Attempt} from '../../types/attempt';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz: Quiz;
  attempt: Attempt;
  language;
  alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  constructor(private quizzesService: QuizzesService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.language = (window.navigator.language || (window.navigator as any).userLanguage || 'en').substring(0, 2);
    this.router.params.subscribe(params => {
      const {quizId} = params;
      this.quizzesService.instance.subscribe(quiz => {
        if (quiz) {
          this.quiz = quiz;

        }
      });
    });
  }

  selectAnswer() {

  }

  finish() {

  }

  retry() {

  }

}
