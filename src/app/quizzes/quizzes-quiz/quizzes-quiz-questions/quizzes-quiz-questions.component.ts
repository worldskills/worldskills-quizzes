import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../../types/quiz';
import {txt} from 'src/utils/txt';
import {combineLatest, forkJoin} from 'rxjs';
import {Question, QuestionList} from '../../../../types/question';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {QuestionsService} from '../../../../services/questions/questions.service';
import {QuestionService} from '../../../../services/question/question.service';
import {QuizService} from '../../../../services/quiz/quiz.service';
import {map} from 'rxjs/operators';
import {LOADER_ONLY, WsComponent} from '@worldskills/worldskills-angular-lib';

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
    private quizService: QuizService,
    private questionsService: QuestionsService,
    private questionService: QuestionService) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.quizService.subject.subscribe(quiz => {
        this.quiz = quiz;
        this.questionsService.fetch(this.quiz.id);
      }),
      this.questionsService.subject.subscribe(questions => (this.questions = questions)),
      combineLatest([this.questionsService.loading, this.questionsService.loading])
      .pipe(map(([l1, l2]) => l1 || l2))
      .subscribe(loading => this.loading = loading)
    );
  }

  moveQuestionUp(q: Question) {
    this.move(q, (q1, q2) => q1.sort === q2.sort - 1, q1 => q1.sort - 1);
  }

  moveQuestionDown(q: Question) {
    this.move(q, (q1, q2) => q1.sort === q2.sort + 1, q1 => q1.sort + 1);
  }

  private move(q: Question, sortCheck: (q1: Question, q2: Question) => boolean, newSort: (q: Question) => number) {
    const observables = [];
    this.questions.questions.sort((a, b) => a.sort - b.sort).forEach(question => {
      if (sortCheck(question, q)) {
        observables.push(this.questionService.update(question.id, {...question, sort: q.sort}, LOADER_ONLY));
      } else if (question.sort === q.sort) {
        observables.push(this.questionService.update(question.id, {...question, sort: newSort(q)}, LOADER_ONLY));
      }
    });
    if (observables.length > 0) {
      const forkJoined = forkJoin(observables);
      forkJoined.subscribe(() => this.questionsService.fetch(this.quiz.id).subscribe(questionList => {
        const observables2 = [];
        for (let i = 0; i < questionList.questions.length; i++) {
          if (questionList.questions[i].sort !== i + 1) {
            const q2 = questionList.questions[i];
            q2.sort = i + 1;
            observables2.push(this.questionService.update(q2.id, q2, LOADER_ONLY));
          }
        }
        if (observables2.length > 0) {
          const forkJoined2 = forkJoin(observables2);
          forkJoined2.subscribe(() => this.questionsService.fetch(this.quiz.id));
        }
      }));
    }
  }

}

