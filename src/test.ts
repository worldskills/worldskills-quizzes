// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import {getTestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {Quiz} from './types/quiz';
import {Entity} from './types/entity';
import {Event} from './types/event';
import * as faker from 'faker';
import {Skill} from './types/skill';
import {TranslateService} from "@ngx-translate/core";
import {Pipe, PipeTransform} from "@angular/core";
import {Observable, of} from "rxjs";

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

export function mockEntityFactory(): Entity {
  return {
    id: faker.seedValue,
    links: [],
    name: {
      lang_code: 'en',
      text: faker.name.title()
    }
  };
}

export function mockEventFactory(): Event {
  return {
    id: faker.seedValue,
    type: faker.name.jobType(),
    code: faker.name.title(),
    country: {
      id: faker.seedValue,
      code: faker.address.countryCode(),
      name: {
        lang_code: 'en',
        text: faker.address.country()
      }
    },
    description: faker.name.jobDescriptor(),
    end_date: faker.date.recent().toISOString(),
    links: [],
    name: faker.name.title(),
    start_date: faker.date.recent().toISOString(),
    town: faker.address.county(),
    url: faker.internet.url(),
    utc_offset: faker.random.number(12),
    venue: faker.name.title(),
    ws_entity: mockEntityFactory()
  };
}

export function mockSkillFactory(): Skill {
  return {
    id: faker.seedValue,
    base_id: faker.seedValue,
    compatriot_marking: faker.random.boolean(),
    competitor_max_age: faker.random.number(),
    description: {
      lang_code: 'en',
      text: faker.name.jobDescriptor()
    },
    description_competition_action: {
      lang_code: 'en',
      text: faker.name.jobDescriptor()
    },
    description_facts: {
      lang_code: 'en',
      text: faker.name.jobDescriptor()
    },
    description_industry_action: {
      lang_code: 'en',
      text: faker.name.jobDescriptor()
    },
    description_required_skills: {
      lang_code: 'en',
      text: faker.name.jobDescriptor()
    },
    event: mockEventFactory(),
    generate_500_scale: faker.random.boolean(),
    group_competitors: faker.random.boolean(),
    identify_judges: faker.random.boolean(),
    landscape_marking: faker.random.boolean(),
    group: faker.name.title(),
    links: [],
    max_teams: faker.random.number(),
    min_teams: faker.random.number(),
    name: {
      lang_code: 'en',
      text: faker.name.title()
    },
    number: faker.name.title(),
    photos: [],
    sector: {
      id: faker.random.number(),
      name: {
        lang_code: 'en',
        text: faker.name.title()
      },
      event: mockEventFactory(),
      base_sector_id: faker.random.number(),
      ws_entity: mockEntityFactory(),
      links: []
    },
    sort: faker.seedValue,
    sponsors: [],
    status: 'finished',
    tags: [],
    team_size: faker.seedValue,
    type: faker.name.jobType(),
    url_video: faker.internet.url(),
    ws_entity: mockEntityFactory()
  };
}

export function mockQuizFactory(): Quiz {
  return {
    id: faker.seedValue,
    title: {
      lang_code: 'en',
      text: faker.name.title()
    },
    ws_entity: mockEntityFactory(),
    links: [],
    active: faker.random.boolean(),
    created: faker.date.recent().toISOString(),
    event: mockEventFactory(),
    has_attempts: faker.random.boolean(),
    lang_code: 'en',
    max_questions: faker.random.number(100),
    random_questions: faker.random.boolean(),
    required_score_pass: faker.random.number(100),
    reveal_correct_answers: faker.random.boolean(),
    allow_multiple_attempts: faker.random.boolean(),
    skill: mockSkillFactory(),
    text: faker.name.jobDescriptor(),
    url_learning: faker.internet.url(),
    url_success: faker.internet.url()
  };
}

export class TranslateServiceStub {

  public get(key: any): any {
    return of(key);
  }

  public use(lang: string): Observable<any> {
    return of(lang);
  }
}

export const TranslateServiceTestingProvider = {provide: TranslateService, useClass: TranslateServiceStub};

@Pipe({name: 'translate'})
export class TranslationMockPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}
