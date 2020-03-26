import {Component, OnInit} from '@angular/core';
import {AuthService, AuthStatus} from '../services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  date;
  authStatus: AuthStatus;

  constructor(private authService: AuthService) {
    this.date = new Date();
  }

  ngOnInit(): void {
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
