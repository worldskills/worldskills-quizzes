import {Component, OnInit} from '@angular/core';
import {QuizzesService} from '../../../services/quizzes/quizzes.service';
import {AttemptsService} from '../../../services/attempts/attempts.service';
import {Quiz} from '../../../types/quiz';
import {Attempt} from '../../../types/attempt';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-quizzes-attempt',
  templateUrl: './quizzes-attempt.component.html',
  styleUrls: ['./quizzes-attempt.component.css']
})
export class QuizzesAttemptComponent implements OnInit {

  quiz: Quiz = null;
  attempt: Attempt = null;
  alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  constructor(
    private quizzesService: QuizzesService,
    private attemptsService: AttemptsService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.quizzesService.instance.subscribe(quiz => {
      if (quiz) {
        this.quiz = {...quiz};

        this.attemptsService.instance.subscribe(attempt => {
          this.attempt = attempt;
        });

        this.router.params.subscribe(value => {
          const {attemptId} = value;
          const l = (window.navigator.language || (window.navigator as any).userLanguage || 'en').substring(0, 2);
          this.attemptsService.fetchInstance(attemptId, {l});
        });
      }
    });
  }

  selectAnswer() {
  }

}
