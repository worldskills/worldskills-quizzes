import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, combineLatest} from 'rxjs';
import {Quiz} from '../../types/quiz';
import {faCheck, faTimes, faUser, faSortDown, faSortUp, faHourglassHalf} from '@fortawesome/free-solid-svg-icons';

import {AppService} from "../../services/app/app.service";
import {QuizService} from '../../services/quiz/quiz.service';
import {AttemptMemberReportService} from '../../services/attempt-member-report/attempt-member-report.service';
import { EventsService } from 'src/services/events/events.service';
import { PeopleService } from 'src/services/people/people.service';
import { CentresService } from 'src/services/centres/centres.service';
import { AuthService, NgAuthService, UserRoleUtil } from '@worldskills/worldskills-angular-lib';
import { OrgService } from 'src/services/org/org.service';
import { Member } from 'src/types/member';
import { Event } from 'src/types/event';
import { PersonSearch } from 'src/types/person';
import { environment } from 'src/environments/environment';

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

  readonly CENTRES_ID = 55; // TODO load dynamically based on event ID

  readonly CENTRES_TASK_NAME = 'Access Programme';

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
  faUser = faUser;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faHourglassHalf = faHourglassHalf;
  peopleLink: string;
  loading = false;
  eventId: number;
  event: Event;
  selectedMember?: Member;
  sort = 'name';
  reverse = false;
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
    private centresService: CentresService,
    private orgService: OrgService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.appService.showBreadcrumbs.next(false);

    this.peopleLink = environment.worldskillsPeopleLink;

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

        // load centres task
        this.centresService.getPersonTasks(this.CENTRES_ID, person.id, {l: 'en'}).subscribe(personTasks => {
          person.task = personTasks.tasks.filter(task => task.name.text === this.CENTRES_TASK_NAME).shift();
          if (person.task) {
            person.task.passed = (person.task.status === 'COMPLETE');
          }
          person.loaded = true;
        });

        person.report = this.reports.filter(report => report.person.id === person.id).shift();
      }
    });
  }

  sortBy(sort: string) {
    this.reverse = (this.sort === sort) ? !this.reverse : false;
    this.sort = sort;
    this.people.sort(function (a, b) {
      if (sort === 'ap') {
        if (a.task?.passed === b.task?.passed) {
          return 0;
        } else if (a.task?.passed) {
          return 1;
        }
        return -1;
      } else {
        return a.last_name.localeCompare(b.last_name);
      }
    });
    if (this.reverse) {
      this.people.reverse();
    }
  }
}
