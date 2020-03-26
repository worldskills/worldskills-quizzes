import {Link, List, LocalizedText} from './common';
import {Entity} from './entity';
import {Event} from './event';
import {Skill} from './skill';

export interface QuizRequest {
  title: LocalizedText;
  random_questions: boolean;
  max_questions: number;
  required_score_pass: number;
  reveal_correct_answers: boolean;
  url_learning: string;
  url_success: string;
  ws_entity: Entity;
  event: Event;
  skill: Skill;
  active: boolean;
}

export interface Quiz extends QuizRequest {
  id: number;
  lang_code: string;
  text: string;
  has_attempts: true;
  created: string;
  links: Array<Link<QuizLinkType>>;
}

export type QuizLinkType = 'questions' | 'attempts' | 'i18n';

export type QuizList = List<Quiz, 'quizzes'>;
