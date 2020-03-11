import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Quiz, QuizList} from '../../types/quiz';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  private loading = false;
  public list = new BehaviorSubject<QuizList>(null);
  public instance = new BehaviorSubject<Quiz>(null);

  constructor(private http: HttpClient) {
  }

// (function () {
//     'use strict';
//
//     var quizzesApp = angular.module('quizzesApp');
//     quizzesApp.constant('WORLDSKILLS_API_QUIZZES',
//       'https://api.worldskills.show/quizzes');
//     quizzesApp.constant('WORLDSKILLS_API_IMAGES',
//       'https://api.worldskills.show/images');
//     quizzesApp.constant('WORLDSKILLS_API_EVENTS',
//       'https://api.worldskills.show/events');
//     quizzesApp.constant('WORLDSKILLS_API_AUTH',
//       'https://api.worldskills.show/auth');
//     quizzesApp.constant('WORLDSKILLS_CLIENT_ID', '483a531c5e66');
//     quizzesApp.constant('WORLDSKILLS_AUTHORIZE_URL',
//       'https://auth.worldskills.show/oauth/authorize');
//     quizzesApp.constant('LOAD_CHILD_ENTITY_ROLES', true);
//     quizzesApp.constant('FILTER_AUTH_ROLES', [1300]); // Quizzes
//
//   })();

  static listUrl() {
    return 'https://api.worldskills.show/quizzes';
  }

  static instanceUrl(quizId: number) {
    return `https://api.worldskills.show/quizzes/${quizId}`;
  }

  fetchList(fetchParams: FetchParams = {offset: 0, limit: 15}) {
    const params = httpParamsFromFetchParams(fetchParams);
    this.loading = true;

    const subscription = this.http.get<QuizList>(QuizzesService.listUrl(), {params});
    subscription.subscribe(value => {
      this.loading = false;
      this.list.next(value);
    });
    return subscription;
  }

  fetchInstance(quizId: number, fetchParams: FetchParams = {}) {
    const params = httpParamsFromFetchParams(fetchParams);
    this.loading = true;
    const subscription = this.http.get<Quiz>(QuizzesService.instanceUrl(quizId), {params});
    subscription.subscribe(value => {
      this.loading = false;
      this.instance.next(value);
    });
    return subscription;
  }

}
