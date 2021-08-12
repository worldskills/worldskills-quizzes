import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../types/quiz';
import {ActivatedRoute, Router} from '@angular/router';
import {EntitiesService} from '../../services/entities/entities.service';
import {EventsService} from '../../services/events/events.service';
import {EventList} from '../../types/event';
import {EntityList} from '../../types/entity';
import {AlertService, AlertType, WsComponent} from '@worldskills/worldskills-angular-lib';
import {QuizService} from '../../services/quiz/quiz.service';

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
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      const {quizId} = value;
      this.subscribe(this.quizService.subject.subscribe(quiz => (this.quiz = quiz)));
      this.eventsService.fetch().subscribe(events => (this.events = events));
      this.entitiesService.fetch().subscribe(entities => (this.entities = entities));
      this.quizService.fetch(quizId);
    });
    this.subscribe(this.quizService.loading.subscribe(loading => (this.deleteLoading = loading)));
  }

  shareQuiz() {
    prompt('Quiz link:', window.location.origin + this.router.createUrlTree(['/quiz', this.quiz.id]));
  }

  deleteQuiz() {
    if (confirm('Deleting the Quiz will also delete all questions and attempts. Click OK to proceed.')) {
      this.quizService.delete(this.quiz.id).subscribe(() => {
          this.alertService.setAlert('new-alert', AlertType.success,
            null, 'The Quiz has been deleted successfully.', true);
          this.router.navigateByUrl('/quizzes').catch(e => alert(e));
        }
      );
    }
  }

}
