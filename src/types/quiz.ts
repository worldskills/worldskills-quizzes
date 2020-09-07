import {Link, List} from './common';
import {Event} from './event';
import {Skill} from './skill';
import {Entity} from './entity';
import {I18nModel} from '@worldskills/worldskills-angular-lib';

export interface QuizRequest {
  title: I18nModel;
  random_questions: boolean;
  max_questions: number;
  required_score_pass: number;
  reveal_correct_answers: boolean;
  allow_multiple_attempts: boolean;
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
  has_attempts: boolean;
  created: string;
  links: Array<Link<QuizLinkType>>;
}

export type QuizLinkType = 'questions' | 'attempts' | 'i18n';

export type QuizList = List<Quiz, 'quizzes'>;
