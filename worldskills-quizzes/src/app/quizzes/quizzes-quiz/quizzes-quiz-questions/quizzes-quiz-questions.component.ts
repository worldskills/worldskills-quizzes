import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../../types/quiz';
import {QuizzesService} from '../../../../services/quizzes/quizzes.service';
import {QuestionsService} from '../../../../services/questions/questions.service';
import {Question, QuestionList} from '../../../../types/question';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {txt} from 'src/utils/txt';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-quizzes-quiz-questions',
  templateUrl: './quizzes-quiz-questions.component.html',
  styleUrls: ['./quizzes-quiz-questions.component.css']
})
export class QuizzesQuizQuestionsComponent implements OnInit {

  txt = txt;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  quiz: Quiz = null;
  questions: QuestionList = null;
  loading = false;

  constructor(private quizzesService: QuizzesService, private questionsService: QuestionsService) {
  }

  moveQuestionUp(q: Question) {
    this.questionsService.fetchList(this.quiz.id).subscribe(list => {
      const observables = [];
      list.questions.sort((a, b) => a.sort - b.sort).forEach((question, index) => {
        if (question.sort === q.sort - 1) {
          question.sort = q.sort;
          observables.push(this.questionsService.updateInstance(question.id, question));
        } else if (question.sort === q.sort) {
          question.sort = q.sort - 1;
          observables.push(this.questionsService.updateInstance(question.id, question));
        }
      });
      if (observables.length > 0) {
        const forkJoined = forkJoin(observables);
        forkJoined.subscribe(() => this.questionsService.fetchList(this.quiz.id));
      } else {
        this.questionsService.fetchList(this.quiz.id);
      }
    });
  }

  moveQuestionDown(q: Question) {
    this.questionsService.fetchList(this.quiz.id).subscribe(list => {
      const observables = [];
      list.questions.sort((a, b) => a.sort - b.sort).forEach((question, index) => {
        if (question.sort === q.sort + 1) {
          question.sort = q.sort;
          observables.push(this.questionsService.updateInstance(question.id, question));
        } else if (question.sort === q.sort) {
          question.sort = q.sort + 1;
          observables.push(this.questionsService.updateInstance(question.id, question));
        }
      });
      if (observables.length > 0) {
        const forkJoined = forkJoin(observables);
        forkJoined.subscribe(() => this.questionsService.fetchList(this.quiz.id));
      } else {
        this.questionsService.fetchList(this.quiz.id);
      }
    });
  }

  ngOnInit(): void {
    this.quizzesService.instance.subscribe(quiz => {
      this.quiz = quiz;
      this.questionsService.fetchList(this.quiz.id);
    });
    this.questionsService.list.subscribe(questions => (this.questions = questions));
    this.questionsService.loading.subscribe(loading => (this.loading = loading));
  }

}
