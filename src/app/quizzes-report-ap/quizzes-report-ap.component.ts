import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, combineLatest} from 'rxjs';
import {Quiz} from '../../types/quiz';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

import {AppService} from "../../services/app/app.service";
import {QuizService} from '../../services/quiz/quiz.service';
import {AttemptMemberReportService} from '../../services/attempt-member-report/attempt-member-report.service';
import { EventsService } from 'src/services/events/events.service';
import { PeopleService } from 'src/services/people/people.service';
import { AuthService, NgAuthService, UserRoleUtil } from '@worldskills/worldskills-angular-lib';
import { OrgService } from 'src/services/org/org.service';
import { Member } from 'src/types/member';
import { Event } from 'src/types/event';
import { PersonSearch } from 'src/types/person';

@Component({
  selector: 'app-quizzes-report-ap',
  templateUrl: './quizzes-report-ap.component.html',
  styleUrls: ['./quizzes-report-ap.component.css']
})
export class QuizzesReportApComponent implements OnInit {

  readonly BASE_POSITION_ID_EXPERT = 1;

  readonly MEMBER_ID_WSI = 1;

  readonly WS_ENTITY_ID_WSI = 1;

  readonly QUIZZES_APP_ID = 1300;

  readonly TRAINING_ACCESS_PROGRAMME_ID = 1;

  readonly QUIZ_ACCESS_PROGRAMME_IDS = [
    302,
    303,
    304,
    305,
    306,
    307,
    308,
    309,
    310,
    311,
  ];

  faCheck = faCheck;
  faTimes = faTimes;
  loading = false;
  eventId: number;
  event: Event;
  selectedMember?: Member;
  members: Member[] = [];
  quizzes: Quiz[] = [];
  people: PersonSearch[] = [];
  reports = [];

  constructor(
    private appService: AppService,
    private quizService: QuizService,
    private attemptMemberReportService: AttemptMemberReportService,
    private authService: NgAuthService,
    private eventService: EventsService,
    private peopleService: PeopleService,
    private orgService: OrgService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.appService.showBreadcrumbs.next(false);

    this.loading = true;

    this.eventId = this.route.snapshot.params.eventId;
    const eventObservable = this.eventService.getEvent(this.eventId);

    const membersObservable = this.orgService.getMembers({
      limit: 100,
      member_of: this.MEMBER_ID_WSI,
      sort: '1058',
      l: 'en',
    });

    combineLatest([eventObservable, membersObservable, this.authService.currentUser]).subscribe(([event, members, currentUser]) => {

      this.event = event;

      if (currentUser && currentUser.roles) {
        const canViewAllMembers = UserRoleUtil.userHasRolesOfEntity(currentUser, this.QUIZZES_APP_ID, this.WS_ENTITY_ID_WSI, 'Admin', 'ViewAllAttempts');
        if (canViewAllMembers) {
          this.members = members.members;
        } else {
          const wsEntityIds = currentUser.roles.filter(role => role.name === 'ViewMemberAttempts' && role.role_application.application_code === this.QUIZZES_APP_ID).map(role => role.ws_entity.id);
          this.members = members.members.filter(member => wsEntityIds.includes(member.ws_entity.id));
        }

        if (this.members.length > 0) {
          this.selectedMember = this.members[0];
        }

        this.loadMemberReport();
      }
    });

    let quizObservables: Observable<Quiz>[] = [];
    for (let quizId of this.QUIZ_ACCESS_PROGRAMME_IDS) {
      quizObservables.push(this.quizService.fetch(quizId))
    }
    combineLatest(quizObservables).subscribe((quizzes) => {
      quizzes.sort(function (a, b) {
        return a.id - b.id;
      })
      this.quizzes = quizzes;
    });

  }

  changeMember() {
    this.loadMemberReport();
  }

  compareMember(a: Member, b: Member) {
    return a && b ? a.id === b.id : a === b;
  }

  loadMemberReport() {
    this.loading = true;
    const peopleObservable = this.peopleService.getPeoplePublic({
      base_position: this.BASE_POSITION_ID_EXPERT,
      member_id: this.selectedMember.id,
      show_inactive: 0,
      include_history: 0,
      limit: 1000,
      event: this.eventId,
    })
    const reportObservable = this.attemptMemberReportService.getAttemptMemberReport(this.eventId, this.QUIZ_ACCESS_PROGRAMME_IDS.map(String), [this.selectedMember.ws_entity.id + '']);
    combineLatest([peopleObservable, reportObservable]).subscribe(([people, reports]) => {

      this.loading = false;
      this.people = people.people;

      this.reports = reports;
      this.reports.sort(function (a, b) {
        return b.attempts_count - a.attempts_count;
      });

      // find reports for each person
      for (let person of this.people) {

        // load full person
        this.peopleService.getPersonPublic(person.id).subscribe(fullPerson => {
          person.person = fullPerson;
          person.training = fullPerson.trainings.filter(training => training.training.id === this.TRAINING_ACCESS_PROGRAMME_ID).shift();
        });

        person.report = this.reports.filter(report => report.person.id === person.id).shift();
      }
    });
  }
}
