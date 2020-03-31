import {Component, OnInit} from '@angular/core';
import {QuestionsService} from '../../../../services/questions/questions.service';
import {AnswersService} from '../../../../services/answers/answers.service';
import {Quiz} from '../../../../types/quiz';
import {QuestionList, QuestionWithAnswers} from '../../../../types/question';
import {QuizService} from '../../../../services/quiz/quiz.service';
import {WsComponent} from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-quizzes-quiz-preview',
  templateUrl: './quizzes-quiz-preview.component.html',
  styleUrls: ['./quizzes-quiz-preview.component.css']
})
export class QuizzesQuizPreviewComponent extends WsComponent implements OnInit {

  alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  quiz: Quiz;
  questions: QuestionList<QuestionWithAnswers>;

  constructor(
    private quizService: QuizService,
    private questionsService: QuestionsService,
    private answersService: AnswersService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.quizService.subject.subscribe(quiz => {
        if (quiz) {
          this.quiz = {...quiz};
          this.questionsService.fetch(quiz.id);
        }
      }),
      this.questionsService.subject.subscribe(questions => {
        if (questions) {
          const questionsWithAnswers = [...questions.questions.map(qs => ({...qs, answers: null}))];
          this.questions = {...questions, questions: questionsWithAnswers};
          this.questions.questions.forEach((question, index) => {
            this.answersService.fetch(question.id).subscribe(answers => {
              this.questions.questions[index].answers = answers.answers;
            });
          });
        }
      })
    );
  }

}
