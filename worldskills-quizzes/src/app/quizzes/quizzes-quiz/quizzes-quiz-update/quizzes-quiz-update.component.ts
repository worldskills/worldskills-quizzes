import {Component, OnInit} from '@angular/core';
import {EventList} from '../../../../types/event';
import {Quiz, QuizRequest} from '../../../../types/quiz';
import {SkillList} from '../../../../types/skill';
import {EntityList} from '../../../../types/entity';
import {EntitiesService} from '../../../../services/entities/entities.service';
import {EventsService} from '../../../../services/events/events.service';
import {QuizzesService} from '../../../../services/quizzes/quizzes.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertService, AlertType} from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-quizzes-quiz-update',
  templateUrl: './quizzes-quiz-update.component.html',
  styleUrls: ['./quizzes-quiz-update.component.css']
})
export class QuizzesQuizUpdateComponent implements OnInit {

  quiz: Quiz = null;
  events: EventList = null;
  skills: SkillList = null;
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
    this.quizzesService.instance.subscribe(quiz => (this.quiz = quiz));
    this.eventsService.list.subscribe(events => (this.events = events));
    this.entitiesService.list.subscribe(entities => (this.entities = entities));
    combineLatest([
      this.quizzesService.loading,
      this.eventsService.loading,
      this.entitiesService.loading,
    ]).pipe(map(([l1, l2, l3]) => l1 || l2 || l3)).subscribe(loading => (this.loading = loading));
  }

  update(quiz: QuizRequest) {
    this.quizzesService.updateInstance(this.quiz.id, quiz).subscribe(() => {
        this.alertService.setAlert('new-alert', AlertType.success,
          null, undefined, 'The Quiz has been saved successfully.', true);
        this.router.navigateByUrl('/quizzes').catch(e => alert(e));
      }
    );
  }

}
