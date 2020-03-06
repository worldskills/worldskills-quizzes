import {Link, List} from './common';
import {Entity} from './entity';

export interface Quiz {
  id: number;
  title: {
    lang_code: string,
    text: string
  };
  lang_code: string;
  text: string;
  random_questions: boolean;
  max_questions: number;
  required_score_pass: number;
  reveal_correct_answers: boolean;
  url_learning: string;
  url_success: string;
  ws_entity: Entity;
  has_attempts: true;
  event: {
    id: number,
    name: string
  };
  skill: any;
  created: string;
  active: boolean;
  links: Array<Link<'questions' | 'attempts'>>;
}

export type QuizList = List<Quiz, 'quizzes'>;
