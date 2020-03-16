import {Component, OnInit} from '@angular/core';
import {EventList} from '../../../../types/event';
import {Quiz} from '../../../../types/quiz';
import {SkillList} from '../../../../types/skill';
import {EntityList} from '../../../../types/entity';
import {EntitiesService} from '../../../../services/entities/entities.service';
import {EventsService} from '../../../../services/events/events.service';
import {SkillsService} from '../../../../services/skills/skills.service';
import {QuizzesService} from '../../../../services/quizzes/quizzes.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

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
    private skillsService: SkillsService,
    private quizzesService: QuizzesService,
  ) {
  }

  ngOnInit(): void {
    this.quizzesService.instance.subscribe(quiz => (this.quiz = quiz));
    this.eventsService.list.subscribe(events => (this.events = events));
    this.skillsService.list.subscribe(skills => (this.skills = skills));
    this.entitiesService.list.subscribe(entities => (this.entities = entities));
    combineLatest([
      this.quizzesService.loading,
      this.eventsService.loading,
      this.skillsService.loading,
      this.entitiesService.loading,
    ]).pipe(map(([l1, l2, l3, l4]) => l1 || l2 || l3 || l4)).subscribe(loading => (this.loading = loading));
  }

  update(quiz: Quiz) {
    // TODO
  }

}
