import {Component, OnInit} from '@angular/core';
import {AuthService as LibAuthService} from '@worldskills/worldskills-angular-lib';
import {AuthService, AuthStatus} from '../services/auth/auth.service';
import { environment } from './../environments/environment';
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
  environmentWarning = environment.environmentWarning;

  constructor(private authService: AuthService, private libAuthService: LibAuthService, private router: Router) {
    this.date = new Date();
  }

  ngOnInit(): void {
    AppComponent.showBreadcrumbs.subscribe(showBreadcrumb => setTimeout(() => (this.showBreadcrumb = showBreadcrumb)));

    this.authService.authStatus.subscribe(authStatus => (this.authStatus = authStatus));
    this.libAuthService.redirectOrReturn(['/quizzes']);
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
