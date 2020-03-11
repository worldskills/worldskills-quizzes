import {Link, List, LocalizedText} from './common';
import {Entity} from './entity';

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
    name: LocalizedText;
  };
  utc_offset: number;
  url: string;
  description: string;
  ws_entity: Entity;
  links: Array<Link>;
}

export type EventList = List<Event, 'events'>;
