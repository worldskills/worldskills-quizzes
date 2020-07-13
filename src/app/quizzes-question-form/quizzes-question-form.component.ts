import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Quiz} from '../../types/quiz';
import {Question, QuestionRequest} from '../../types/question';
import {AnswerRequest, AnswersList} from '../../types/answer';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {faPlus, faRedo, faTimes} from '@fortawesome/free-solid-svg-icons';
import {map} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import {QuestionService} from '../../services/question/question.service';
import {WsComponent} from '@worldskills/worldskills-angular-lib';
import {AnswerService} from '../../services/answer/answer.service';
import {striptagsFromText} from '../../utils/striptags';

export interface QuestionFormData {
  question: string;
  answers: Array<{
    id?: number;
    answer: string;
    correct: boolean;
    removed: boolean;
  }>;
}

export interface QuestionFormSubmitData {
  question: QuestionRequest;
  answers: Array<AnswerRequest>;
  deletedAnswers: Array<AnswerRequest>;
}

@Component({
  selector: 'app-quizzes-question-form',
  templateUrl: './quizzes-question-form.component.html',
  styleUrls: ['./quizzes-question-form.component.css']
})
export class QuizzesQuestionFormComponent extends WsComponent implements OnInit, OnChanges {

  @Input() quiz: Quiz = null;
  @Input() question: Question = null;
  @Input() answers: AnswersList = null;
  form: FormGroup;
  faPlus = faPlus;
  faRedo = faRedo;
  faTimes = faTimes;
  @Output() save: EventEmitter<QuestionFormSubmitData> = new EventEmitter<QuestionFormSubmitData>();
  isSubmitted = false;
  loading = false;

  constructor(private questionService: QuestionService, private answerService: AnswerService) {
    super();
  }

  get answerControls() {
    return (this.form.get('answers') as FormArray).controls as Array<FormGroup>;
  }

  ngOnInit() {
    this.subscribe(
      combineLatest([this.questionService.loading, this.answerService.loading])
      .pipe(map(([l1, l2]) => l1 || l2))
      .subscribe(loading => this.loading = loading)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const defaultAnswer = (correct = false) => ({
      id: new FormControl(null),
      answer: new FormControl(''),
      correct: new FormControl(correct),
      removed: new FormControl(false)
    });
    this.form = new FormGroup({
      question: new FormControl(this.question ? this.question.text.text : '', Validators.required),
      answers: new FormArray(this.answers ? this.answers.answers.map(answer => new FormGroup({
        id: new FormControl(answer.id),
        answer: new FormControl(answer.text.text),
        correct: new FormControl(answer.correct),
        removed: new FormControl(false)
      })) : [
        new FormGroup(defaultAnswer(true)),
        new FormGroup(defaultAnswer()),
        new FormGroup(defaultAnswer()),
        new FormGroup(defaultAnswer())
      ])
    });
  }

  removeAnswer(control: AbstractControl) {
    control.setValue(true);
  }

  restoreAnswer(control: AbstractControl) {
    control.setValue(false);
  }

  addAnswer() {
    (this.form.get('answers') as FormArray).push(new FormGroup({
      id: new FormControl(null),
      answer: new FormControl(null),
      correct: new FormControl(false),
      removed: new FormControl(false)
    }));
  }

  changeCorrect(e: Event, control: AbstractControl) {
    e.preventDefault();
    (this.form.get('answers') as FormArray).controls.forEach(c => {
      if (c !== control) {
        c.get('correct').setValue(false);
      } else {
        c.get('correct').setValue(true);
      }
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      const formData: QuestionFormData = this.form.value;
      const data: QuestionFormSubmitData = {
        question: {
          text: {
            lang_code: 'en',
            text: striptagsFromText(formData.question)
          },
          active: true
        },
        answers: formData.answers.filter(answer => !answer.removed).map<AnswerRequest>((answer, index) => ({
          id: answer.id,
          correct: answer.correct,
          sort: index + 1,
          text: {
            lang_code: 'en',
            text: striptagsFromText(answer.answer)
          }
        })),
        deletedAnswers: formData.answers.filter(answer => answer.removed && !!answer.id).map<AnswerRequest>(answer => ({
          id: answer.id,
          correct: answer.correct,
          sort: undefined,
          text: {
            lang_code: 'en',
            text: striptagsFromText(answer.answer)
          }
        }))
      };
      if (data.answers.findIndex(answer => answer.correct) < 0) {
        alert('Please mark at least one answer as correct!');
      } else {
        this.save.emit(data);
      }
    }
  }

}
