import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz, QuizRequest} from '../../types/quiz';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {QuestionList, QuestionRequest, QuestionWithAnswers} from '../../types/question';
import {QuestionsService} from '../../services/questions/questions.service';
import {AnswersService} from '../../services/answers/answers.service';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {forkJoin} from 'rxjs';
import {AnswerRequest} from '../../types/answer';
import {RxjsUtil, WsComponent} from '@worldskills/worldskills-angular-lib';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {editorConfig, onEditorReady} from "../../utils/ckeditor";
import {HttpClient} from "@angular/common/http";

export interface TranslationFormData {
  locale: string;
  title: string;
  questions: Array<{
    questionId: number;
    question: string;
    sort: number;
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
export class QuizzesTranslationFormComponent extends WsComponent implements OnInit {

  @Input() quiz: Quiz;
  @Input() locale: string = null;
  @Output() save: EventEmitter<TranslationFormSubmitData> = new EventEmitter<TranslationFormSubmitData>();
  faCheck = faCheck;
  faTimes = faTimes;
  form: FormGroup;
  isSubmitted = false;
  loading = false;
  questions: QuestionList<QuestionWithAnswers>;
  editor = ClassicEditor;
  config = editorConfig;
  onReady = onEditorReady;

  constructor(private questionsService: QuestionsService, private answersService: AnswersService, public http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      RxjsUtil.loaderSubscriber(
        this.questionsService,
        this.answersService,
      ).subscribe(loading => this.loading = loading),
      this.questionsService.subject.subscribe(questions => {
        const questionsWithAnswers = [...questions.questions.map(qs => ({...qs, answers: []}))];
        this.questions = {...questions, questions: questionsWithAnswers};
        const requests = [];
        this.questions.questions.forEach((question, index) => {
          const observable = this.answersService.fetch(question.id, {l: this.quiz.title.lang_code});
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
    this.questionsService.fetch(this.quiz.id, {
      limit: 100,
      l: this.locale || this.quiz.title.lang_code,
      sort: 'name_asc'
    });
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
            sort: question.sort,
            text: {
              lang_code: locale,
              text: question.question
            }
          },
          answers: question.answers.map(answer => ({
            answerId: answer.answerId,
            answer: {
              sort: answer.sort,
              correct: answer.correct,
              text: {
                lang_code: locale,
                text: answer.answer
              }
            }
          }))
        }))
      };
      this.save.emit(data);
    }
  }

}
