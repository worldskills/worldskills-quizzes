import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../types/quiz';
import {QuizzesService} from '../../../services/quizzes/quizzes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EntitiesService} from '../../../services/entities/entities.service';
import {EventsService} from '../../../services/events/events.service';
import {EventList} from '../../../types/event';
import {EntityList} from '../../../types/entity';
import {AlertService, AlertType} from '@worldskills/worldskills-angular-lib';
import WsComponent from '../../../utils/ws.component';

@Component({
  selector: 'app-quizzes-quiz',
  templateUrl: './quizzes-quiz.component.html',
  styleUrls: ['./quizzes-quiz.component.css']
})
export class QuizzesQuizComponent extends WsComponent implements OnInit {

  quiz: Quiz = null;
  events: EventList = null;
  entities: EntityList = null;
  deleteLoading = false;

  constructor(
    private entitiesService: EntitiesService,
    private eventsService: EventsService,
    private quizzesService: QuizzesService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      const {quizId} = value;
      this.subscribe(this.quizzesService.instance.subscribe(quiz => (this.quiz = quiz)));
      this.eventsService.fetchList().subscribe(events => (this.events = events));
      this.entitiesService.fetchList().subscribe(entities => (this.entities = entities));
      this.quizzesService.fetchInstance(quizId);
    });
    this.subscribe(this.quizzesService.loading.subscribe(loading => (this.deleteLoading = loading)));
  }

  deleteQuiz() {
    if (confirm('Deleting the Quiz will also delete all questions and attempts. Click OK to proceed.')) {
      this.quizzesService.deleteInstance(this.quiz.id).subscribe(() => {
          this.alertService.setAlert('new-alert', AlertType.success,
            null, undefined, 'The Quiz has been deleted successfully.', true);
          this.router.navigateByUrl('/quizzes').catch(e => alert(e));
        }
      );
    }
  }

}
