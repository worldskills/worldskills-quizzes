import {Link, List} from './common';
import {Event} from './event';
import {Entity} from './entity';

export interface Skill {
  id: number;
  event: Event;
  type: string;
  base_id: number;
  number: string;
  status: string;
  url_video: string;
  sort: number;
  name: {
    lang_code: string;
    text: string;
  };
  description: {
    lang_code: string;
    text: string;
  };
  description_required_skills: {
    lang_code: string;
    text: string;
  };
  description_industry_action: {
    lang_code: string;
    text: string;
  };
  description_competition_action: {
    lang_code: string;
    text: string;
  };
  description_facts: {
    lang_code: string;
    text: string;
  };
  group: any;
  sector: {
    id: number;
    name: {
      lang_code: string;
      text: string;
    }
    event: Event;
    base_sector_id: number;
    ws_entity: Entity;
    links: Array<Link>
  };
  min_teams: number;
  max_teams: number;
  team_size: number;
  identify_judges: false;
  group_competitors: false;
  compatriot_marking: false;
  generate_500_scale: false;
  landscape_marking: false;
  competitor_max_age: number;
  photos: Array<{
    id: number;
    image_id: number;
    thumbnail_hash: string;
    thumbnail: string;
    description: {
      lang_code: string;
      text: string;
    }
    links: Array<Link>;
  }>;
  tags: Array<any>;
  sponsors: Array<any>;
  ws_entity: Entity;
  links: Array<Link>;
}

export type SkillList = List<Event, 'skills'>;
