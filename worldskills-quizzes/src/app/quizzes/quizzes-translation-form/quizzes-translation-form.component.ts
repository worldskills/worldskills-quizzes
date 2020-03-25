import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Quiz, QuizRequest} from '../../../types/quiz';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {QuestionList, QuestionRequest, QuestionWithAnswers} from '../../../types/question';
import {QuestionsService} from '../../../services/questions/questions.service';
import {AnswersService} from '../../../services/answers/answers.service';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {combineLatest, forkJoin} from 'rxjs';
import {AnswerRequest} from '../../../types/answer';
import {map} from 'rxjs/operators';
import WsComponent from '../../../utils/ws.component';

export interface TranslationFormData {
  locale: string;
  title: string;
  questions: Array<{
    questionId: number;
    question: string;
    sort: string;
    answers: Array<{
      answerId: number;
      answer: string;
      correct: boolean;
      sort: number;
    }>;
  }>;
}

export interface TranslationFormSubmitData {
  locale: string;
  quizId: number;
  quiz: QuizRequest;
  questions: Array<{
    questionId: number;
    question: QuestionRequest;
    answers: Array<{
      answerId: number;
      answer: AnswerRequest;
    }>;
  }>;
}

@Component({
  selector: 'app-quizzes-translation-form',
  templateUrl: './quizzes-translation-form.component.html',
  styleUrls: ['./quizzes-translation-form.component.css']
})
export class QuizzesTranslationFormComponent extends WsComponent implements OnInit, OnChanges {

  @Input() quiz: Quiz;
  @Input() locale: string = null;
  @Output() save: EventEmitter<TranslationFormSubmitData> = new EventEmitter<TranslationFormSubmitData>();
  faCheck = faCheck;
  faTimes = faTimes;
  form: FormGroup;
  isSubmitted = false;
  loading = false;
  questions: QuestionList<QuestionWithAnswers>;

  constructor(private questionsService: QuestionsService, private answersService: AnswersService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
  }

  initForm() {
    this.subscriptions.unsubscribe();
    this.subscribe(
      combineLatest([this.questionsService.loading, this.answersService.loading])
      .pipe(map(([l1, l2]) => l1 || l2))
      .subscribe(loading => this.loading = loading),
      this.questionsService.subject.subscribe(questions => {
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
              questionId: new FormControl(q.id),
              question: new FormControl(q.text.text),
              sort: new FormControl(q.sort),
              answers: new FormArray(
                q.answers.map(a => new FormGroup({
                  answerId: new FormControl(a.id),
                  answer: new FormControl(a.text.text),
                  correct: new FormControl(a.correct),
                  sort: new FormControl(a.sort)
                }))
              ),
            })))
          });
        });
      })
    );
    this.questionsService.fetch(this.quiz.id, {limit: 100, l: this.locale || this.quiz.title.lang_code, sort: 'name_asc'});
  }

  get questionControls() {
    return (this.form.get('questions') as FormArray).controls as Array<FormGroup>;
  }

  getAnswerControls(questionControl: AbstractControl) {
    return (questionControl.get('answers') as FormArray).controls as Array<FormGroup>;
  }

  submit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      const formData: TranslationFormData = this.form.value;
      const locale = formData.locale;
      const quiz = {...this.quiz};
      quiz.title = {
        lang_code: locale,
        text: formData.title
      };
      const data: TranslationFormSubmitData = {
        locale,
        quizId: this.quiz.id,
        quiz,
        questions: formData.questions.map(question => ({
          questionId: question.questionId,
          question: {
            text: {
              lang_code: locale,
              text: question.question
            }
          },
          answers: question.answers.map(answer => ({
            answer: {
              correct: answer.correct,
              text: {
                lang_code: locale,
                text: answer.answer
              }
            },
            answerId: answer.answerId
          }))
        }))
      };
      this.save.emit(data);
    }
  }

}
