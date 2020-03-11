import {Quiz, QuizLinkType} from '../types/quiz';
import {Link} from '../types/common';

export function fetchSupportedLocales(quiz: Quiz): Array<Link<QuizLinkType>> {
  return quiz.links.filter(link => link.rel === 'i18n');
}
