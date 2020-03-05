import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {QuizList} from '../../types/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  private list = new BehaviorSubject<QuizList>(null);

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


  fetch() {
    const params = new HttpParams();
    params.set('offset', '0');
    params.set('limit', '15');
    console.log('fetching');
    this.http.get<QuizList>('https://api.worldskills.show/quizzes', {params})
    .subscribe(value => this.list.next(value));
    return this.list;
  }

}
