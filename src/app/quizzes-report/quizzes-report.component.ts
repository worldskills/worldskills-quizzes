import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, combineLatest} from 'rxjs';
import {Quiz} from '../../types/quiz';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

import {AppService} from "../../services/app/app.service";
import {EventsService} from '../../services/events/events.service';
import {QuizService} from '../../services/quiz/quiz.service';
import {AttemptMemberReportService} from '../../services/attempt-member-report/attempt-member-report.service';

@Component({
  selector: 'app-quizzes-report',
  templateUrl: './quizzes-report.component.html',
  styleUrls: ['./quizzes-report.component.css']
})
export class QuizzesReportComponent implements OnInit {

  faCheck = faCheck;
  faTimes = faTimes;
  loading = false;
  quizzes: Quiz[] = [];
  reports = [];

  constructor(
    private appService: AppService,
    private eventsService: EventsService,
    private quizService: QuizService,
    private attemptMemberReportService: AttemptMemberReportService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.params.eventId;
    const quizIds = this.route.snapshot.queryParams.quiz;

    this.appService.showBreadcrumbs.next(false);

    this.loading = true;
    this.attemptMemberReportService.getAttemptMemberReport(eventId, quizIds)
      .subscribe(reports => {
        this.loading = false;
        this.reports = reports;
        this.reports.sort(function (a, b) {
          return b.attempts_count - a.attempts_count;
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
