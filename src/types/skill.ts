import {Link, List} from './common';
import {Event} from './event';
import {Entity} from './entity';
import {I18nText} from '@worldskills/worldskills-angular-lib';

export interface Skill {
  id: number;
  event: Event;
  type: string;
  base_id: number;
  number: string;
  status: string;
  url_video: string;
  sort: number;
  name: I18nText;
  description: I18nText;
  description_required_skills: I18nText;
  description_industry_action: I18nText;
  description_competition_action: I18nText;
  description_facts: I18nText;
  group: any;
  sector: {
    id: number;
    name: I18nText;
    event: Event;
    base_sector_id: number;
    ws_entity: Entity;
    links: Array<Link>
  };
  min_teams: number;
  max_teams: number;
  team_size: number;
  identify_judges: boolean;
  group_competitors: boolean;
  compatriot_marking: boolean;
  generate_500_scale: boolean;
  landscape_marking: boolean;
  competitor_max_age: number;
  photos: Array<{
    id: number;
    image_id: number;
    thumbnail_hash: string;
    thumbnail: string;
    description: I18nText;
    links: Array<Link>;
  }>;
  tags: Array<any>;
  sponsors: Array<any>;
  ws_entity: Entity;
  links: Array<Link>;
}

export type SkillList = List<Skill, 'skills'>;
