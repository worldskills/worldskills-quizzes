import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {BreadcrumbsService, Language, NgAuthService, User, WorldskillsAngularLibService} from '@worldskills/worldskills-angular-lib';
import {LocaleContextService} from '../services/locale-context/locale-context.service';
import {environment} from '../environments/environment';
import {AppService} from '../services/app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;
  showBreadcrumb = true;
  languages: Array<Language>;
  language: Language;
  languageLock: boolean;
  environmentWarning = environment.environmentWarning;

  constructor(
    private appService: AppService,
    private authService: NgAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumb: BreadcrumbsService,
    private localeContextService: LocaleContextService,
    private wsi: WorldskillsAngularLibService,
  ) {
    this.breadcrumb.homeItemRoute = '/competitions';
    this.breadcrumb.targetOutlet = 'primary';
    this.breadcrumb.build(this.route.root);
  }

  ngOnInit(): void {
    this.appService.showBreadcrumbs.subscribe(showBreadcrumb => setTimeout(() => (this.showBreadcrumb = showBreadcrumb)));
    this.languages = this.localeContextService.languages;
    this.authService.currentUser.subscribe(currentUser => (this.currentUser = currentUser)),
      combineLatest([this.localeContextService.subject, this.localeContextService.lock])
        .subscribe(([language, lock]) =>
          setTimeout(() => {
            this.languageLock = lock;
            this.language = lock ? this.localeContextService.lockedLanguage : language;
          })
        );

    this.wsi.authConfigSubject.next({
      loginUrl: environment.worldskillsAuthorizeUrl,
      redirectUri: environment.worldskillsAuthorizeRedirect,
      userinfoEndpoint: `${environment.worldskillsAuthorizeUserinfoEndpoint}?show_child_roles=${environment.loadChildEntityRoles ? 'true' : 'false'}&${environment.filterAuthRoles.map(appCode => `app_code=${appCode}`).join('&')}`,
      clientId: environment.worldskillsClientId,
      requireHttps: environment.production,
      oidc: false
    });

    this.wsi.httpConfigSubject.next({
      encoderUriPatterns: [],
      authUriPatterns: environment.worldskillsAuthUriPatterns
    });

    this.wsi.serviceConfigSubject.next({
      appCode: [1300],
      apiEndpoint: environment.worldskillsApiEndpoint
    });
  }

  changeLanguage(language) {
    this.localeContextService.changeLanguage(language);
  }
}
