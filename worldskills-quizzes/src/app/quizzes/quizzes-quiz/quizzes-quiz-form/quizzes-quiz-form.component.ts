import {Component, OnInit, ViewChild} from '@angular/core';
import {Quiz} from '../../../../types/quiz';
import {NgForm} from '@angular/forms';
import {QuizzesService} from '../../../../services/quizzes/quizzes.service';
import {EventList} from '../../../../types/event';
import {SkillList} from '../../../../types/skill';
import {EntityList} from '../../../../types/entity';
import {EntitiesService} from '../../../../services/entities/entities.service';
import {EventsService} from '../../../../services/events/events.service';
import {SkillsService} from '../../../../services/skills/skills.service';

@Component({
  selector: 'app-quizzes-quiz-form',
  templateUrl: './quizzes-quiz-form.component.html',
  styleUrls: ['./quizzes-quiz-form.component.css']
})
export class QuizzesQuizFormComponent implements OnInit {

  instance: Quiz = null;
  events: EventList = null;
  skills: SkillList = null;
  entities: EntityList = null;
  @ViewChild('form') form: NgForm;

  constructor(
    private entitiesService: EntitiesService,
    private eventsService: EventsService,
    private skillsService: SkillsService,
    private quizzesService: QuizzesService,
  ) {
  }

  ngOnInit(): void {
    this.quizzesService.instance.subscribe(instance => {
      this.instance = {...instance};
    });
    this.eventsService.list.subscribe(list => {
      this.events = {...list};
    });
    this.skillsService.list.subscribe(list => {
      this.skills = {...list};
    });
    this.entitiesService.list.subscribe(list => {
      this.entities = {...list};
    });
  }

  save(): void {
    console.log(this.form);
  }

}
