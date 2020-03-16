import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../../types/quiz';
import {EventList} from '../../../../types/event';
import {EntityList} from '../../../../types/entity';
import {EntitiesService} from '../../../../services/entities/entities.service';
import {EventsService} from '../../../../services/events/events.service';
import {QuizzesService} from '../../../../services/quizzes/quizzes.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

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

  create(quiz: Quiz) {

  }

}
