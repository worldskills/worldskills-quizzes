import {Component, OnInit} from '@angular/core';
import {AuthService, UserService} from '@worldskills/worldskills-angular-lib';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      console.log('logged in');
      this.authService.loadUserProfile(user => {
        if ('ok' in user && !user.ok) {
          this.userService.logout().subscribe({
            error: () => {
              console.log('ERROR');
              this.authService.login();
            },
            next: () => {
              console.log('NEXT');
              this.authService.login();
            }
          });
        }
      });
    } else {
      console.log('logged out');
      this.authService.login();
    }
  }

}
