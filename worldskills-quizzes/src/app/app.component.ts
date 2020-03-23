import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService, UserModel, UserService} from '@worldskills/worldskills-angular-lib';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  date;
  user: UserModel;
  isLoggedIn = false;
  showLoginAndLogoutButtons = true;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.date = new Date();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: UserModel) => {
      this.user = user;
      this.isLoggedIn = true;
    });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.userService.logout().subscribe({
      complete: () => {
        this.isLoggedIn = false;
        this.router.navigate(['/']).catch(e2 => console.error(e2));
      }
    });
  }
}
