import {Component, OnInit} from '@angular/core';
import {AlertService, AlertType} from '@worldskills/worldskills-angular-lib';
import {Router} from '@angular/router';
import {QuizzesService} from '../../../services/quizzes/quizzes.service';
import {QuestionsService} from '../../../services/questions/questions.service';
import {AnswersService} from '../../../services/answers/answers.service';
import {Quiz} from '../../../types/quiz';
import {QuestionFormSubmitData} from '../quizzes-question-form/quizzes-question-form.component';
import {QuestionService} from '../../../services/question/question.service';
import WsComponent from '../../../utils/ws.component';

@Component({
  selector: 'app-quizzes-question-create',
  templateUrl: './quizzes-question-create.component.html',
  styleUrls: ['./quizzes-question-create.component.css']
})
export class QuizzesQuestionCreateComponent extends WsComponent implements OnInit {

  quiz: Quiz;

  constructor(
    private quizzesService: QuizzesService,
    private questionService: QuestionService,
    private questionsService: QuestionsService,
    private answersService: AnswersService,
    private router: Router,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.quizzesService.instance.subscribe(quiz => (this.quiz = quiz)));
  }

  save(question: QuestionFormSubmitData) {
    this.questionsService.fetch(this.quiz.id).subscribe(list => {
      question.question.sort = list.questions.reduce((acc, q) => Math.max(acc, q.sort), 0) + 1;
      this.questionService.create(this.quiz.id, question.question).subscribe(q => {
        this.answersService.createInstances(q.id, question.answers).subscribe(() => {
          this.alertService.setAlert('new-question', AlertType.success,
            null, undefined, 'The Question has been added successfully.', true);
          this.router.navigateByUrl(`/quizzes/${this.quiz.id}/questions`).catch(e => alert(e));
        });
      });
    });
  }
}
