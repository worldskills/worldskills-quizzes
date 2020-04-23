import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const data = this.route.snapshot.data;
    this.errorMessage = data && data.error ? data.error : 'Not found';
  }

}
