import {Component, OnInit} from '@angular/core';
import {EventList} from '../../types/event';
import {Quiz, QuizRequest} from '../../types/quiz';
import {SkillList} from '../../types/skill';
import {EventsService} from '../../services/events/events.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertService, AlertType, WsComponent} from '@worldskills/worldskills-angular-lib';
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
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.quizService.subject.subscribe(quiz => (this.quiz = quiz)),
      this.eventsService.subject.subscribe(events => (this.events = events)),
      combineLatest([
        this.quizService.loading,
        this.eventsService.loading,
      ]).pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
  }

  update(quiz: QuizRequest) {
    this.quizService.update(this.quiz.id, quiz).subscribe(() => {
        this.alertService.setAlert('new-alert', AlertType.success,
          null, undefined, 'The Quiz has been saved successfully.', true);
        this.router.navigateByUrl('/quizzes').catch(e => alert(e));
      }
    );
  }

}
