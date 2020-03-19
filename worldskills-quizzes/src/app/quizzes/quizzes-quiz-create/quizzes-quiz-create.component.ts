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

@Component({
  selector: 'app-quizzes-quiz-create',
  templateUrl: './quizzes-quiz-create.component.html',
  styleUrls: ['./quizzes-quiz-create.component.css']
})
export class QuizzesQuizCreateComponent implements OnInit {

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
  }

  ngOnInit(): void {
    this.eventsService.fetchList().subscribe(events => (this.events = events));
    this.entitiesService.fetchList().subscribe(entities => (this.entities = entities));
    combineLatest([
      this.eventsService.loading,
      this.entitiesService.loading,
    ]).pipe(map(([l1, l2]) => l1 || l2)).subscribe(loading => (this.loading = loading));
  }

  create(quiz: QuizRequest) {
    this.quizzesService.createInstance(quiz).subscribe(q => {
      this.alertService.setAlert('new-alert', AlertType.success,
        null, undefined, 'The Quiz has been added successfully. Please add now questions for the Quiz.', true);
      this.router.navigateByUrl(`/quizzes/${q.id}`).catch(e => alert(e));
    });
  }

}
