import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Quiz, QuizRequest} from '../../../types/quiz';
import {NgForm} from '@angular/forms';
import {EventList} from '../../../types/event';
import {SkillList} from '../../../types/skill';
import {EntityList} from '../../../types/entity';
import {SkillsService} from '../../../services/skills/skills.service';
import {QuizzesService} from '../../../services/quizzes/quizzes.service';

@Component({
  selector: 'app-quizzes-quiz-form',
  templateUrl: './quizzes-quiz-form.component.html',
  styleUrls: ['./quizzes-quiz-form.component.css']
})
export class QuizzesQuizFormComponent implements OnInit {

  @Input() quiz: Quiz = null;
  @Input() events: EventList = null;
  @Input() entities: EntityList = null;
  skills: SkillList = null;
  skillsLoading = false;
  quizzesLoading = false;
  @Output() save: EventEmitter<QuizRequest> = new EventEmitter<QuizRequest>();
  @ViewChild('form') form: NgForm;

  constructor(private skillsService: SkillsService, private quizzesService: QuizzesService) {
  }

  ngOnInit(): void {
    this.skillsService.list.subscribe(skills => (this.skills = skills));
    this.skillsService.loading.subscribe(skillsLoading => (this.skillsLoading = skillsLoading));
    this.quizzesService.loading.subscribe(quizzesLoading => (this.quizzesLoading = quizzesLoading));
  }

  onEventChange(): void {
    this.form.controls.skill.setValue('');
    this.fetchSkills();
  }

  fetchSkills() {
    if (this.form) {
      const eventId = this.form.controls.event.value;
      if (eventId !== '') {
        this.skillsService.fetchList(parseInt(eventId));
      } else {
        this.skillsService.list.next({skills: [], total_count: 0});
      }
    }
  }

  submit() {
    const {
      title,
      ws_entity,
      event,
      skill,
      max_questions,
      required_score_pass,
      random_questions,
      reveal_correct_answers,
      active,
      url_learning,
      url_success
    } = this.form.value;

    const maxQuestions = parseInt(max_questions);
    const requiredScorePass = parseInt(required_score_pass);
    const quiz: QuizRequest = {
      title: {
        lang_code: 'en',
        text: title
      },
      ws_entity: this.entities.ws_entity_list.find(e => parseInt(ws_entity) === e.id),
      event: this.events.events.find(e => parseInt(event) === e.id),
      skill: this.skills ? this.skills.skills.find(s => parseInt(skill) === s.id) : undefined,
      max_questions: !isNaN(maxQuestions) ? maxQuestions : undefined,
      required_score_pass: !isNaN(requiredScorePass) ? requiredScorePass : undefined,
      random_questions,
      reveal_correct_answers,
      active,
      url_learning,
      url_success
    };

    if (this.form.valid) {
      this.save.emit(quiz);
    }
  }

}
