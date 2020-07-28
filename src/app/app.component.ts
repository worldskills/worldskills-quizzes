import {Component, OnInit} from '@angular/core';
import {AuthService, AuthStatus} from '../services/auth/auth.service';
import {environment} from '../environments/environment';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  static showBreadcrumbs = new Subject<boolean>();
  authStatus: AuthStatus;
  showBreadcrumb = true;
  environmentWarning = environment.environmentWarning;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    AppComponent.showBreadcrumbs.subscribe(showBreadcrumb => setTimeout(() => (this.showBreadcrumb = showBreadcrumb)));
    this.authService.authStatus.subscribe(authStatus => (this.authStatus = authStatus));
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
