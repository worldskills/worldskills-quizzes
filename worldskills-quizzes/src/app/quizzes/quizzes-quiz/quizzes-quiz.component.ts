import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../types/quiz';
import {QuizzesService} from '../../../services/quizzes/quizzes.service';
import {ActivatedRoute} from '@angular/router';
import {EntitiesService} from '../../../services/entities/entities.service';
import {EventsService} from '../../../services/events/events.service';
import {EventList} from '../../../types/event';
import {EntityList} from '../../../types/entity';
import {take, takeLast} from 'rxjs/operators';

@Component({
  selector: 'app-quizzes-quiz',
  templateUrl: './quizzes-quiz.component.html',
  styleUrls: ['./quizzes-quiz.component.css']
})
export class QuizzesQuizComponent implements OnInit {

  quiz: Quiz = null;
  events: EventList = null;
  entities: EntityList = null;

  constructor(
    private entitiesService: EntitiesService,
    private eventsService: EventsService,
    private quizzesService: QuizzesService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.router.params.pipe(take(1)).subscribe(value => {
      const {quizId} = value;
      this.quizzesService.instance.pipe(take(1)).subscribe(quiz => {
        this.quiz = quiz;
        this.eventsService.fetchList().subscribe(events => (this.events = events));
        this.entitiesService.fetchList().subscribe(entities => (this.entities = entities));
      });
      this.quizzesService.fetchInstance(quizId);
    });
  }

}
