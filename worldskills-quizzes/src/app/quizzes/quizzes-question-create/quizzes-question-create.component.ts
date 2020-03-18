import {Component, OnInit} from '@angular/core';
import {QuizzesService} from '../../../services/quizzes/quizzes.service';
import {QuestionsService} from '../../../services/questions/questions.service';
import {AnswersService} from '../../../services/answers/answers.service';
import {Quiz} from '../../../types/quiz';
import {QuestionFormSubmitData} from '../quizzes-question-form/quizzes-question-form.component';
import {AlertService, AlertType} from '@worldskills/worldskills-angular-lib';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quizzes-question-create',
  templateUrl: './quizzes-question-create.component.html',
  styleUrls: ['./quizzes-question-create.component.css']
})
export class QuizzesQuestionCreateComponent implements OnInit {

  quiz: Quiz;

  constructor(
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService,
    private answersService: AnswersService,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.quizzesService.instance.subscribe(quiz => (this.quiz = quiz));
  }

  save(question: QuestionFormSubmitData) {
    this.questionsService.fetchList(this.quiz.id).subscribe(list => {
      question.question.sort = list.questions.reduce((acc, q) => Math.max(acc, q.sort), 0) + 1;
      this.questionsService.createInstance(this.quiz.id, question.question).subscribe(q => {
        this.answersService.createInstances(q.id, question.answers).subscribe(() => {
          this.alertService.setAlert('new-question', AlertType.success,
            null, undefined, 'The Question has been added successfully.', true);
          this.router.navigateByUrl(`/quizzes/${this.quiz.id}/questions`).catch(e => alert(e));
        });
      });
    });
  }
}
