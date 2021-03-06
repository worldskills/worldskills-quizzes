import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Quiz, QuizRequest} from '../../types/quiz';
import {NgForm, FormControl} from '@angular/forms';
import {EventList} from '../../types/event';
import {SkillList} from '../../types/skill';
import {SkillsService} from '../../services/skills/skills.service';
import {QuizzesService} from '../../services/quizzes/quizzes.service';
import {WsComponent} from '@worldskills/worldskills-angular-lib';
import {striptagsFromText} from '../../utils/striptags';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {editorConfig, onEditorReady} from "../../utils/ckeditor";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-quizzes-quiz-form',
  templateUrl: './quizzes-quiz-form.component.html',
  styleUrls: ['./quizzes-quiz-form.component.css']
})
export class QuizzesQuizFormComponent extends WsComponent implements OnInit {

  @Input() quiz: Quiz = null;
  @Input() events: EventList = null;
  skills: SkillList = null;
  skillsLoading = false;
  quizzesLoading = false;
  @Output() save: EventEmitter<QuizRequest> = new EventEmitter<QuizRequest>();
  @ViewChild('form') form: NgForm;
  editor = ClassicEditor;
  config = editorConfig;
  onReady = onEditorReady;

  constructor(
    private skillsService: SkillsService,
    private quizzesService: QuizzesService,
    public http: HttpClient,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.skillsService.subject.subscribe(skills => (this.skills = skills)),
      this.skillsService.loading.subscribe(skillsLoading => (this.skillsLoading = skillsLoading)),
      this.quizzesService.loading.subscribe(quizzesLoading => (this.quizzesLoading = quizzesLoading))
    );
    if (this.quiz && this.quiz.event) {
      this.skillsService.fetch(this.quiz.event.id);
    }
  }

  onEventChange(): void {
    this.form.controls.skill.setValue(null);
    this.fetchSkills();
  }

  fetchSkills() {
    if (this.form) {
      const eventId = this.form.controls.event.value;
      if (eventId) {
        this.skillsService.fetch(parseInt(eventId));
      } else {
        this.skillsService.subject.next({skills: [], total_count: 0});
      }
    }
  }

  submit() {
    const {
      title,
      description,
      ws_entity,
      event,
      skill,
      max_questions,
      required_score_pass,
      random_questions,
      reveal_correct_answers,
      allow_multiple_attempts,
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
      description: {
        lang_code: 'en',
        text: striptagsFromText(description)
      },
      ws_entity: {id: ws_entity},
      event: this.events.events.find(e => parseInt(event) === e.id),
      skill: this.skills ? this.skills.skills.find(s => parseInt(skill) === s.id) : undefined,
      max_questions: !isNaN(maxQuestions) ? maxQuestions : undefined,
      required_score_pass: !isNaN(requiredScorePass) ? requiredScorePass : undefined,
      random_questions,
      reveal_correct_answers,
      allow_multiple_attempts,
      active,
      url_learning,
      url_success
    };

    if (this.form.valid) {
      this.save.emit(quiz);
    }
  }

}
