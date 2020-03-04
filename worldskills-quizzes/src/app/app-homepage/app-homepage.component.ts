import {Component, OnInit} from '@angular/core';
import {AuthService} from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-app-homepage',
  templateUrl: './app-homepage.component.html',
  styleUrls: ['./app-homepage.component.css']
})
export class AppHomepageComponent implements OnInit {
  title = 'worldskills-quizzes';

  constructor(private authService: AuthService) {

    // this.authService.login();
  }

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn());
    console.log(this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
      console.log('logged in');
      this.authService.loadUserProfile(user => console.log('USER', user)).then(() => {
        console.log(this.authService.currentUserValue);
        this.authService.currentUser.subscribe(value => {
          console.log(value);
        });
      });
    } else {
      console.log('logging out');
      this.authService.login();
    }

  }

}
