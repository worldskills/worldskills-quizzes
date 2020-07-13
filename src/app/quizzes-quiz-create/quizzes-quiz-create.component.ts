import {Component, OnInit} from '@angular/core';
import {QuizRequest} from '../../types/quiz';
import {EventList} from '../../types/event';
import {EntityList} from '../../types/entity';
import {EntitiesService} from '../../services/entities/entities.service';
import {EventsService} from '../../services/events/events.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
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
  entities: EntityList = null;
  loading = true;

  constructor(
    private entitiesService: EntitiesService,
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
      this.entitiesService.subject.subscribe(entities => (this.entities = entities)),
      combineLatest([
        this.eventsService.loading,
        this.entitiesService.loading,
      ])
      .pipe(map(([l1, l2]) => l1 || l2))
      .subscribe(loading => (this.loading = loading))
    );

    this.eventsService.fetch();
    this.entitiesService.fetch();
  }

  create(quiz: QuizRequest) {
    this.quizService.create(quiz).subscribe(q => {
      this.alertService.setAlert('new-alert', AlertType.success,
        null, undefined, 'The Quiz has been added successfully. Please add now questions for the Quiz.', true);
      this.router.navigateByUrl(`/quizzes/${q.id}`).catch(e => alert(e));
    });
  }

}
