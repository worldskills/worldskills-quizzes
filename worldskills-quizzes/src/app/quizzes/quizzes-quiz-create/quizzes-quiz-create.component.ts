import {Component, OnInit} from '@angular/core';
import {QuizRequest} from '../../../types/quiz';
import {EventList} from '../../../types/event';
import {EntityList} from '../../../types/entity';
import {EntitiesService} from '../../../services/entities/entities.service';
import {EventsService} from '../../../services/events/events.service';
import {QuizzesService} from '../../../services/quizzes/quizzes.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertService, AlertType} from '@worldskills/worldskills-angular-lib';
import WsComponent from '../../../utils/ws.component';

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
    private quizzesService: QuizzesService,
    private router: Router,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventsService.list.subscribe(events => (this.events = events)),
      this.entitiesService.list.subscribe(entities => (this.entities = entities)),
      combineLatest([
        this.eventsService.loading,
        this.entitiesService.loading,
      ])
      .pipe(map(([l1, l2]) => l1 || l2))
      .subscribe(loading => (this.loading = loading))
    );

    this.eventsService.fetchList();
    this.entitiesService.fetchList();
  }

  create(quiz: QuizRequest) {
    this.quizzesService.createInstance(quiz).subscribe(q => {
      this.alertService.setAlert('new-alert', AlertType.success,
        null, undefined, 'The Quiz has been added successfully. Please add now questions for the Quiz.', true);
      this.router.navigateByUrl(`/quizzes/${q.id}`).catch(e => alert(e));
    });
  }

}
