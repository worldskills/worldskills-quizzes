import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {Quiz} from '../../types/quiz';
import {AttemptsList} from '../../types/attempt';
import {AttemptsService} from '../../services/attempts/attempts.service';
import {QuizService} from '../../services/quiz/quiz.service';
import {WsComponent} from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-quizzes-quiz-attempts-user',
  templateUrl: './quizzes-quiz-attempts-user.component.html',
  styleUrls: ['./quizzes-quiz-attempts-user.component.css']
})
export class QuizzesQuizAttemptsUserComponent extends WsComponent implements OnInit {

  faAngleDown = faAngleDown;
  quizId: number;
  userId: number;
  quiz: Quiz = null;
  attempts: AttemptsList = null;
  loading = true;
  page = 1;
  pageSize = 10;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private attemptsService: AttemptsService,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.route.snapshot) {
      this.userId = +this.route.snapshot.paramMap.get('userId');
      if (this.route.snapshot.parent) {
        this.quizId = +this.route.snapshot.parent.paramMap.get('quizId');
      }
    }
    this.subscribe(
      this.quizService.subject.subscribe(quiz => {
        this.quiz = quiz;
      })
    );
    this.fetch();
  }

  fetch(page: number = 1) {
    this.page = page;
    this.loading = true;
    const params = {
      sort: 'started_desc',
      offset: (this.page - 1) * this.pageSize,
      limit: this.pageSize,
      user: this.userId,
    };
    this.attemptsService.fetch(this.quizId, params).subscribe(attempts => {
      this.loading = false;
      this.attempts = attempts;
    });
  }
}
