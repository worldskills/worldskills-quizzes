import {Link, List, LocalizedText} from './common';
import {Entity} from './entity';
import {Skill} from './skill';

export interface Quiz {
  id: number;
  title: LocalizedText;
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
  skill: Skill;
  created: string;
  active: boolean;
  links: Array<Link<QuizLinkType>>;
}

export type QuizLinkType = 'questions' | 'attempts' | 'i18n';

export type QuizList = List<Quiz, 'quizzes'>;
