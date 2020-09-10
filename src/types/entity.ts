import {Link, List} from './common';
import {I18nText} from '@worldskills/worldskills-angular-lib';

export interface Entity {
  id: number;
  name?: I18nText;
  links?: Array<Link>;
}

export type EntityList = List<Entity, 'ws_entity_list'>;
