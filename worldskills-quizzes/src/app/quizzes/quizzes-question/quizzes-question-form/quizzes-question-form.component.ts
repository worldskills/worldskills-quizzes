import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../types/quiz';
import {Question} from '../../../../types/question';
import {AnswersList} from '../../../../types/answer';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {faPlus, faRedo, faStop} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quizzes-question-form',
  templateUrl: './quizzes-question-form.component.html',
  styleUrls: ['./quizzes-question-form.component.css']
})
export class QuizzesQuestionFormComponent implements OnInit {

  @Input() quiz: Quiz;
  @Input() question: Question;
  @Input() answers: AnswersList;
  form: FormGroup;
  faPlus = faPlus;
  faRedo = faRedo;
  faStop = faStop;

  constructor() {
  }

  get answerControls() {
    return (this.form.get('answers') as FormArray).controls;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      question: new FormControl(this.question.text.text, Validators.required),
      answers: new FormArray(this.answers.answers.map(answer => new FormGroup({
        answer: new FormControl(answer.text.text),
        correct: new FormControl(answer.correct),
        removed: new FormControl(false)
      }))),
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

  save() {
    console.log(this.form);
  }

}
