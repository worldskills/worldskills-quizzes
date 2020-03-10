import {Component, OnChanges, OnInit} from '@angular/core';
import {QuizzesService} from '../../../services/quizzes/quizzes.service';
import {AnswersService} from '../../../services/answers/answers.service';
import {QuestionsService} from '../../../services/questions/questions.service';
import {Quiz} from '../../../types/quiz';
import {AnswersList} from '../../../types/answer';
import {Question} from '../../../types/question';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-quizzes-question',
  templateUrl: './quizzes-question.component.html',
  styleUrls: ['./quizzes-question.component.css']
})
export class QuizzesQuestionComponent implements OnInit {

  quiz: Quiz;
  question: Question;
  list: AnswersList;

  constructor(
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService,
    private answersService: AnswersService,
    private router: ActivatedRoute
  ) {
  }

  deleteQuestion() {
    // TODO
  }

  deactivateQuestion() {

  }

  activateQuestion() {

  }

  ngOnInit(): void {
    this.quizzesService.instance.subscribe(quiz => {
      if (quiz) {
        this.quiz = {...quiz};
      }
    });
    this.questionsService.instance.subscribe(question => {
      if (question) {
        this.question = {...question};
      }
    });
    this.answersService.list.subscribe(list => {
      this.list = {...list};
    });
    this.router.params.subscribe(value => {
      const {questionId} = value;
      this.answersService.fetchList(questionId);
      this.questionsService.fetchInstance(questionId);
    });
  }

}
