import {Link, List, LocalizedText} from './common';

export interface Entity {
  id: number;
  name: LocalizedText;
  links: Array<Link>;
}

export type EntityList = List<Entity, 'ws_entity_list'>;
