import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Quiz} from '../../../../types/quiz';
import {NgForm} from '@angular/forms';
import {EventList} from '../../../../types/event';
import {SkillList} from '../../../../types/skill';
import {EntityList} from '../../../../types/entity';

@Component({
  selector: 'app-quizzes-quiz-form',
  templateUrl: './quizzes-quiz-form.component.html',
  styleUrls: ['./quizzes-quiz-form.component.css']
})
export class QuizzesQuizFormComponent {

  @Input() quiz: Quiz = null;
  @Input() events: EventList = null;
  @Input() skills: SkillList = null;
  @Input() entities: EntityList = null;
  @Output() save: EventEmitter<Quiz> = new EventEmitter<Quiz>();
  @ViewChild('form') form: NgForm;

  submit() {
    this.save.emit(null);
  }

}
