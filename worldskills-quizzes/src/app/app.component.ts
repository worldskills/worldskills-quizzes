import {Component, OnInit} from '@angular/core';
import {AuthService, AuthStatus} from '../services/auth/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  date;
  authStatus: AuthStatus;
  showBreadcrumbs = false;

  constructor(private authService: AuthService, private router: Router) {
    this.date = new Date();
  }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(authStatus => (this.authStatus = authStatus));
    combineLatest([
      this.authService.authStatus,
      this.router.events.pipe(filter<NavigationEnd>(event => event instanceof NavigationEnd))
    ]).subscribe(([authStatus, routerEvent]) => {
      const url = routerEvent.url;
      this.showBreadcrumbs = !url.match(/^\/quiz\/(\d+)$/);

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
