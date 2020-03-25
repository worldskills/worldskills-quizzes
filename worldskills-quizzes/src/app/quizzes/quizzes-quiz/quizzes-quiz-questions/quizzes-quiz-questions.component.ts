import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../../types/quiz';
import {QuizzesService} from '../../../../services/quizzes/quizzes.service';
import {txt} from 'src/utils/txt';
import {forkJoin} from 'rxjs';
import {Question, QuestionList} from '../../../../types/question';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import WsComponent from '../../../../utils/ws.component';
import {LOADER_ONLY} from '../../../../utils/http';
import {QuestionsService} from '../../../../services/questions/questions.service';
import {QuestionService} from '../../../../services/question/question.service';

@Component({
  selector: 'app-quizzes-quiz-questions',
  templateUrl: './quizzes-quiz-questions.component.html',
  styleUrls: ['./quizzes-quiz-questions.component.css']
})
export class QuizzesQuizQuestionsComponent extends WsComponent implements OnInit {


  txt = txt;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  quiz: Quiz = null;
  questions: QuestionList = null;
  loading = false;

  constructor(
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService,
    private questionService: QuestionService) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.quizzesService.instance.subscribe(quiz => {
        this.quiz = quiz;
        this.questionsService.fetch(this.quiz.id);
      }),
      this.questionsService.subject.subscribe(questions => (this.questions = questions)),
      this.questionsService.loading.subscribe(loading => (this.loading = loading))
    );
  }

  moveQuestionUp(q: Question) {
    // this.questionsService.fetchList(this.quiz.id).subscribe(list => {
    const observables = [];
    this.questions.questions.sort((a, b) => a.sort - b.sort).forEach((question, index) => {
      if (question.sort === q.sort - 1) {
        question.sort = q.sort;
        observables.push(this.questionService.update(question.id, question, {}, LOADER_ONLY));
      } else if (question.sort === q.sort) {
        question.sort = q.sort - 1;
        observables.push(this.questionService.update(question.id, question, {}, LOADER_ONLY));
      }
    });
    if (observables.length > 0) {
      const forkJoined = forkJoin(observables);
      forkJoined.subscribe(() => this.questionsService.fetch(this.quiz.id));
    }
    // else {
    //   this.questionsService.fetchList(this.quiz.id, QuizzesQuizQuestionsComponent.FetchParams);
    // }
    // });
  }

  moveQuestionDown(q: Question) {
    // this.questionsService.fetchList(this.quiz.id).subscribe(list => {
    const observables = [];
    this.questions.questions.sort((a, b) => a.sort - b.sort).forEach((question, index) => {
      if (question.sort === q.sort + 1) {
        question.sort = q.sort;
        observables.push(this.questionService.update(question.id, question, {}, LOADER_ONLY));
      } else if (question.sort === q.sort) {
        question.sort = q.sort + 1;
        observables.push(this.questionService.update(question.id, question, {}, LOADER_ONLY));
      }
    });
    if (observables.length > 0) {
      const forkJoined = forkJoin(observables);
      forkJoined.subscribe(() => this.questionsService.fetch(this.quiz.id));
    }
    // else {
    //   this.questionsService.fetchList(this.quiz.id, QuizzesQuizQuestionsComponent.FetchParams);
    // }
    // });
  }

}
