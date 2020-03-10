import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../../types/quiz';
import {QuizzesService} from '../../../../services/quizzes/quizzes.service';
import {QuestionsService} from '../../../../services/questions/questions.service';
import {Question, QuestionList} from '../../../../types/question';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {txt} from 'src/utils/txt';

@Component({
  selector: 'app-quizzes-quiz-questions',
  templateUrl: './quizzes-quiz-questions.component.html',
  styleUrls: ['./quizzes-quiz-questions.component.css']
})
export class QuizzesQuizQuestionsComponent implements OnInit {

  txt = txt;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  instance: Quiz = null;
  questions: QuestionList = null;

  constructor(private quizzesService: QuizzesService, private questionsService: QuestionsService) {
  }

  moveQuestionUp(question: Question) {
// TODO implement in questions service
  }

  moveQuestionDown(question: Question) {
// TODO implement in questions service
  }

  ngOnInit(): void {
    this.quizzesService.instance.subscribe(instance => {
      if (instance) {
        this.instance = {...instance};
        this.questionsService.fetchList(instance.id);
      }
    });
    this.questionsService.list.subscribe(questions => {
      this.questions = {...questions};
    });
  }

}
