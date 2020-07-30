import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { AttemptUserReportService } from '../../services/attempt-user-report/attempt-user-report.service';

import { AttemptReport } from '../../types/attempt-report';

@Component({
  selector: 'app-quizzes-quiz-attempts',
  templateUrl: './quizzes-quiz-attempts.component.html',
  styleUrls: ['./quizzes-quiz-attempts.component.css']
})
export class QuizzesQuizAttemptsComponent implements OnInit {

  reports: AttemptReport[] = [];
  faAngleDown = faAngleDown;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private attemptUserReportService: AttemptUserReportService
  ) { }

  ngOnInit(): void {
    const quizId = +this.route.snapshot.parent.paramMap.get('quizId');

    this.loading = true;
    this.attemptUserReportService.getAttemptReport(quizId)
      .subscribe(reports => {
        this.loading = false;
        this.reports = reports;
        this.reports.sort(function (a, b) {
          return (b.attempts_count - b.passed_count) - (a.attempts_count - a.passed_count);
        });
      });
  }

}
