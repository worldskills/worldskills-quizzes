import {Component, OnInit} from '@angular/core';
import {QuizRequest} from '../../types/quiz';
import {EventList} from '../../types/event';
import {EventsService} from '../../services/events/events.service';
import {Router} from '@angular/router';
import {AlertService, AlertType, WsComponent} from '@worldskills/worldskills-angular-lib';
import {QuizService} from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-quizzes-quiz-create',
  templateUrl: './quizzes-quiz-create.component.html',
  styleUrls: ['./quizzes-quiz-create.component.css']
})
export class QuizzesQuizCreateComponent extends WsComponent implements OnInit {

  events: EventList = null;
  loading = true;

  constructor(
    private eventsService: EventsService,
    private quizService: QuizService,
    private router: Router,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventsService.subject.subscribe(events => (this.events = events)),
      this.eventsService.loading.subscribe(loading => (this.loading = loading)),
    );
    this.eventsService.fetch();
  }

  create(quiz: QuizRequest) {
    this.quizService.create(quiz).subscribe(q => {
      this.alertService.setAlert('new-alert', AlertType.success,
        null, 'The Quiz has been added successfully. Please add now questions for the Quiz.', true);
      this.router.navigateByUrl(`/quizzes/${q.id}`).catch(e => alert(e));
    });
  }

}
