import {Link, List} from './common';
import {Entity} from './entity';
import {I18nText} from '@worldskills/worldskills-angular-lib';

export interface Event {
  id: number;
  name: string;
  type: string;
  start_date: string;
  end_date: string;
  venue: string;
  town: string;
  code: string;
  country: {
    id: number;
    code: string;
    name: I18nText;
  };
  utc_offset: number;
  url: string;
  description: string;
  ws_entity: Entity;
  links: Array<Link>;
}

export type EventList = List<Event, 'events'>;
