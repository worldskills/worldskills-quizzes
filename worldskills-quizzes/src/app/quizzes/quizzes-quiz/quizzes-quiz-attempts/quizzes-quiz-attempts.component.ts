import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../../types/quiz';
import {QuizzesService} from '../../../../services/quizzes/quizzes.service';
import {Attempt} from '../../../../types/attempt';
import {fetchLink} from '../../../../utils/http';
import {AttemptsService} from '../../../../services/attempts/attempts.service';

@Component({
  selector: 'app-quizzes-quiz-attempts',
  templateUrl: './quizzes-quiz-attempts.component.html',
  styleUrls: ['./quizzes-quiz-attempts.component.css']
})
export class QuizzesQuizAttemptsComponent implements OnInit {

  quiz: Quiz = null;
  attempts: Array<Attempt> = null;

  constructor(private quizzesService: QuizzesService, private attemptsService: AttemptsService) {
  }

  ngOnInit(): void {
    this.quizzesService.instance.subscribe(quiz => {
      if (quiz) {
        this.quiz = {...quiz};
        const attemptsLink = fetchLink(quiz, 'attempts');
        this.attemptsService.list.subscribe(attemptsList => {
          if (attemptsList) {
            this.attempts = attemptsList.attempts;
          }
        });
        this.attemptsService.fetchList(quiz.id, {limit: 1000}, attemptsLink[0].href);
      }
    });
  }

}
