import {Component, OnInit} from '@angular/core';
import {AuthService} from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.redirectOrReturn(['/quizzes']);
  }

}
