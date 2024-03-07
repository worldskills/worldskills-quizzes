import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, combineLatest} from 'rxjs';
import {Quiz} from '../../types/quiz';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

import {AppService} from "../../services/app/app.service";
import {QuizService} from '../../services/quiz/quiz.service';
import {AttemptMemberReportService} from '../../services/attempt-member-report/attempt-member-report.service';
import { NgAuthService } from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-quizzes-report',
  templateUrl: './quizzes-report.component.html',
  styleUrls: ['./quizzes-report.component.css']
})
export class QuizzesReportComponent implements OnInit {

  readonly QUIZZES_APP_ID = 1300;

  faCheck = faCheck;
  faTimes = faTimes;
  loading = false;
  eventId: number;
  quizzes: Quiz[] = [];
  reports = [];

  constructor(
    private appService: AppService,
    private quizService: QuizService,
    private attemptMemberReportService: AttemptMemberReportService,
    private authService: NgAuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params.eventId;

    this.appService.showBreadcrumbs.next(false);

    const quizIds = this.route.snapshot.queryParams.quiz;

    this.loading = true;
    this.authService.currentUser.subscribe(currentUser => {
      const wsEntityIds = currentUser.roles.filter(role => role.name === 'ViewMemberAttempts' && role.role_application.application_code === this.QUIZZES_APP_ID).map(role => role.ws_entity.id + '');

      this.attemptMemberReportService.getAttemptMemberReport(this.eventId, quizIds, wsEntityIds)
        .subscribe(reports => {
          this.loading = false;
          this.reports = reports;
          this.reports.sort(function (a, b) {
            return b.attempts_count - a.attempts_count;
          });
        });
    });
    
    let quizObservables: Observable<Quiz>[] = [];
    for (let quizId of quizIds) {
      quizObservables.push(this.quizService.fetch(quizId))
    }
    combineLatest(quizObservables).subscribe((quizzes) => {
      quizzes.sort(function (a, b) {
        return a.id - b.id;
      })
      this.quizzes = quizzes;
    });

  }

}
