import {Component} from '@angular/core';
import {UserService} from '@worldskills/worldskills-angular-lib';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date;

  constructor(private user: UserService, private router: Router) {
    this.date = new Date();
  }

  logout(e: MouseEvent) {
    e.preventDefault();
    console.log(e, 'loogging out');
    this.user.logout().subscribe({
      complete: () => {
        this.router.navigate(['/']).catch(e2 => console.error(e2));
      }
    });
  }
}
