import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WsComponent } from '@worldskills/worldskills-angular-lib';
import { AppService } from 'src/services/app/app.service';
import { AttemptService } from 'src/services/attempt/attempt.service';
import { Attempt } from 'src/types/attempt';

@Component({
  selector: 'app-quizzes-report-attempt',
  templateUrl: './quizzes-report-attempt.component.html',
  styleUrls: ['./quizzes-report-attempt.component.css']
})
export class QuizzesReportAttemptComponent extends WsComponent implements OnInit {

  attempt: Attempt = null;
  alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  loading = true;
  locale: string;

  constructor(
    private appService: AppService,
    private attemptService: AttemptService,
    private router: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {

    this.locale = (window.navigator.language || (window.navigator as any).userLanguage || 'en').substring(0, 2);

    this.appService.showBreadcrumbs.next(false);

    this.subscribe(
      this.attemptService.subject.subscribe(attempt => (this.attempt = attempt)),
      this.attemptService.loading.subscribe(loading => (this.loading = loading)),
      this.router.params.subscribe(value => {
        const {attemptId} = value;
        this.loadAttempt(attemptId);
      })
    );
  }

  loadAttempt(attemptId) {
    this.attemptService.fetch(attemptId, {l: this.locale});
  }

}
