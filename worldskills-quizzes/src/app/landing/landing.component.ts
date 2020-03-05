import {Component, OnInit} from '@angular/core';
import {AuthService, UserService} from '@worldskills/worldskills-angular-lib';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private auth: AuthService, private user: UserService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      console.log('logged in');
      this.auth.loadUserProfile(user => {
        if ('ok' in user && !user.ok) {
          this.user.logout().subscribe({
            error: () => {
              console.log('ERROR');
              this.auth.login();
            },
            next: () => {
              console.log('NEXT');
              this.auth.login();
            }
          });
        } else {
          this.router.navigate(['/quizzes']).catch(e => console.error(e));
        }
      });
    } else {
      console.log('logged out');
      this.auth.login();
    }
  }

}
