import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject, Subscription} from 'rxjs';
import {Quiz, QuizList} from '../../types/quiz';
import {FetchParams} from '../../types/common';
import {httpParamsFromFetchParams, multicastRequestLoader} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  private listSubscription: Subscription;
  private instanceSubscription: Subscription;
  public list = new ReplaySubject<QuizList>(1);
  public instance = new ReplaySubject<Quiz>(1);
  public loading = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) {
    this.loading.next(false);
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

  fetchList(fetchParams: FetchParams = {offset: 0, limit: 15}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<QuizList>(url ?? 'https://api.worldskills.show/quizzes', {params});
    this.listSubscription = multicastRequestLoader<QuizList>(observable, this.list, this.loading, this.listSubscription);
    return observable;
  }

  fetchInstance(quizId: number, fetchParams: FetchParams = {}, url?: string) {
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<Quiz>(url ?? `https://api.worldskills.show/quizzes/${quizId}`, {params});
    this.instanceSubscription = multicastRequestLoader<Quiz>(observable, this.instance, this.loading, this.instanceSubscription);
    return observable;
  }

}
