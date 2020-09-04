import {Component, OnInit} from '@angular/core';
import {AlertService, AlertType, WsComponent} from '@worldskills/worldskills-angular-lib';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {QuestionsService} from '../../services/questions/questions.service';
import {Quiz} from '../../types/quiz';
import {QuestionFormSubmitData} from '../quizzes-question-form/quizzes-question-form.component';
import {QuestionService} from '../../services/question/question.service';
import {AnswerService} from '../../services/answer/answer.service';
import {QuizService} from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-quizzes-question-create',
  templateUrl: './quizzes-question-create.component.html',
  styleUrls: ['./quizzes-question-create.component.css']
})
export class QuizzesQuestionCreateComponent extends WsComponent implements OnInit {

  quiz: Quiz;

  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private questionsService: QuestionsService,
    private answerService: AnswerService,
    private router: Router,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.quizService.subject.subscribe(quiz => (this.quiz = quiz)));
  }

  save(question: QuestionFormSubmitData) {
    this.questionsService.fetch(this.quiz.id).subscribe(list => {
      question.question.sort = list.questions.reduce((acc, q) => Math.max(acc, q.sort), 0) + 1;
      this.questionService.create(this.quiz.id, question.question).subscribe(q => {
        const observables = [];
        if (question.answers.length > 0) {
          observables.push(this.answerService.createMany(q.id, question.answers));
        }
        forkJoin(observables).subscribe({
          complete: () => {
            this.alertService.setAlert('new-question', AlertType.success,
              null, undefined, 'The Question has been added successfully.', true);
            this.router.navigateByUrl(`/quizzes/${this.quiz.id}/questions`).catch(e => alert(e));
          }
        });
      });
    });
  }
}
