import {Component, OnInit} from '@angular/core';
import {QuizRequest} from '../../types/quiz';
import {EventList} from '../../types/event';
import {EventsService} from '../../services/events/events.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AlertService, AlertType, WsComponent} from '@worldskills/worldskills-angular-lib';
import {QuizService} from '../../services/quiz/quiz.service';
import { AppService } from 'src/services/app/app.service';

@Component({
  selector: 'app-quizzes-quiz-create',
  templateUrl: './quizzes-quiz-create.component.html',
  styleUrls: ['./quizzes-quiz-create.component.css']
})
export class QuizzesQuizCreateComponent extends WsComponent implements OnInit {

  events: EventList = null;
  loading = true;

  constructor(
    private appService: AppService,
    private eventsService: EventsService,
    private quizService: QuizService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.appService.showBreadcrumbs.next(true);
    this.subscribe(
      this.eventsService.subject.subscribe(events => (this.events = events)),
      this.eventsService.loading.subscribe(loading => (this.loading = loading)),
    );
    this.eventsService.fetch();
  }

  create(quiz: QuizRequest) {
    this.quizService.create(quiz).subscribe(q => {

      this.translateService.get('message_quiz_added').subscribe(t => {
        this.alertService.setAlert('new-alert', AlertType.success, null, t, true);
        this.router.navigateByUrl(`/quizzes/${q.id}`).catch(e => alert(e));
      });

    });
  }

}
