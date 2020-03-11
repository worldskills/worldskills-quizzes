import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../types/quiz';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {QuestionList, QuestionWithAnswers} from '../../../../types/question';
import {QuestionsService} from '../../../../services/questions/questions.service';
import {AnswersService} from '../../../../services/answers/answers.service';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-quizzes-translation-form',
  templateUrl: './quizzes-translation-form.component.html',
  styleUrls: ['./quizzes-translation-form.component.css']
})
export class QuizzesTranslationFormComponent implements OnInit {

  faCheck = faCheck;
  faTimes = faTimes;
  @Input() quiz: Quiz;
  questions: QuestionList<QuestionWithAnswers>;
  form: FormGroup;

  constructor(private questionsService: QuestionsService, private answersService: AnswersService) {
  }

  ngOnInit(): void {
    this.questionsService.list.subscribe(questions => {
      if (questions) {
        const questionsWithAnswers = [...questions.questions.map(qs => ({...qs, answers: []}))];
        this.questions = {...questions, questions: questionsWithAnswers};
        const requests = [];
        this.questions.questions.forEach((question, index) => {
          const observable = this.answersService.fetchList(question.id, {l: this.quiz.title.lang_code});
          observable.subscribe(answers => {
            this.questions.questions[index].answers = answers.answers;
          });
          requests.push(observable);
        });
        forkJoin(requests).subscribe(() => {
          this.form = new FormGroup({
            locale: new FormControl(this.quiz.title.lang_code),
            title: new FormControl(this.quiz.title.text),
            questions: new FormArray(this.questions.questions.map(q => new FormGroup({
              question: new FormControl(q.text.text),
              sort: new FormControl(q.sort),
              answers: new FormArray(
                q.answers.map(a => new FormGroup({
                  answer: new FormControl(a.text.text),
                  correct: new FormControl(a.correct),
                  sort: new FormControl(a.sort)
                }))
              ),
            })))
          });
        });
      }
    });
    this.questionsService.fetchList(this.quiz.id, {limit: 100, l: this.quiz.title.lang_code, sort: 'name_asc'});
  }

  get questionControls() {
    return (this.form.get('questions') as FormArray).controls;
  }

  getAnswerControls(questionControl: AbstractControl) {
    return (questionControl.get('answers') as FormArray).controls;
  }

  save() {
  }

}
