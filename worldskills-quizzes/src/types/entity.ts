import {Link, List} from './common';

export interface Entity {
  id: number;
  name: {
    lang_code: string;
    text: string;
  };
  links: Array<Link>;
}

export type EntityList = List<Entity, 'ws_entity_list'>;
