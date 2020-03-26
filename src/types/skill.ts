import {Link, List} from './common';
import {Event} from './event';
import {Entity} from './entity';
import {I18nModel} from '@worldskills/worldskills-angular-lib';

export interface Skill {
  id: number;
  event: Event;
  type: string;
  base_id: number;
  number: string;
  status: string;
  url_video: string;
  sort: number;
  name: I18nModel;
  description: I18nModel;
  description_required_skills: I18nModel;
  description_industry_action: I18nModel;
  description_competition_action: I18nModel;
  description_facts: I18nModel;
  group: any;
  sector: {
    id: number;
    name: I18nModel;
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
    description: I18nModel;
    links: Array<Link>;
  }>;
  tags: Array<any>;
  sponsors: Array<any>;
  ws_entity: Entity;
  links: Array<Link>;
}

export type SkillList = List<Skill, 'skills'>;
