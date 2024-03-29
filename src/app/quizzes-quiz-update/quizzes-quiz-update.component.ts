import {Component, OnInit} from '@angular/core';
import {EventList} from '../../types/event';
import {Quiz, QuizRequest} from '../../types/quiz';
import {SkillList} from '../../types/skill';
import {EventsService} from '../../services/events/events.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AlertService, AlertType, RxjsUtil, WsComponent} from '@worldskills/worldskills-angular-lib';
import {QuizService} from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-quizzes-quiz-update',
  templateUrl: './quizzes-quiz-update.component.html',
  styleUrls: ['./quizzes-quiz-update.component.css']
})
export class QuizzesQuizUpdateComponent extends WsComponent implements OnInit {

  quiz: Quiz = null;
  events: EventList = null;
  skills: SkillList = null;
  loading = true;

  constructor(
    private eventsService: EventsService,
    private quizService: QuizService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.quizService.subject.subscribe(quiz => (this.quiz = quiz)),
      this.eventsService.subject.subscribe(events => (this.events = events)),
      RxjsUtil.loaderSubscriber(
        this.quizService,
        this.eventsService,
      ).subscribe(loading => (this.loading = loading))
    );
  }

  update(quiz: QuizRequest) {
    this.quizService.update(this.quiz.id, quiz).subscribe(() => {

        this.translateService.get('message_quiz_saved').subscribe(t => {
          this.alertService.setAlert('new-alert', AlertType.success, null, t, true);
          this.router.navigateByUrl('/quizzes').catch(e => alert(e));
        });

      }
    );
  }

}
