import {Component, OnInit} from '@angular/core';
import {AuthService, UserService} from '@worldskills/worldskills-angular-lib';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.loadUserProfile(user => {
        if ('ok' in user && !user.ok) {
          this.userService.logout().subscribe({
            error: () => {
              this.authService.login();
            },
            next: () => {
              this.authService.login();
            }
          });
        }
      });
    } else {
      this.authService.login();
    }
  }

}
