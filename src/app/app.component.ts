import {Component, OnInit} from '@angular/core';
import {AuthService, AuthStatus} from '../services/auth/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import {combineLatest, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  static showBreadcrumbs = new Subject<boolean>();
  date;
  authStatus: AuthStatus;
  showBreadcrumb = true;

  constructor(private authService: AuthService, private router: Router) {
    this.date = new Date();
  }

  ngOnInit(): void {
    AppComponent.showBreadcrumbs.subscribe(showBreadcrumb => setTimeout(() => (this.showBreadcrumb = showBreadcrumb)));
    this.authService.authStatus.subscribe(authStatus => (this.authStatus = authStatus));
    combineLatest([
      this.authService.authStatus,
      this.router.events.pipe(filter<NavigationEnd>(event => event instanceof NavigationEnd))
    ]).subscribe(([authStatus, routerEvent]) => {
      const url = routerEvent.url;
      const queryParamMap = this.router.parseUrl(url).queryParamMap;
      const target = queryParamMap.has('returnUrl') ? queryParamMap.get('returnUrl') : undefined;
      if (url === '/' || target) {
        if (authStatus.authenticated) {
          this.router.navigateByUrl(target || '/quizzes');
        } else if (!authStatus.isLoggedIn) {
          this.authService.login();
        }
      }
    });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout().subscribe({
      complete: () => {
        window.location.reload();
      }
    });
  }
}
