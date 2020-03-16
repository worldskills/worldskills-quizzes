import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BreadcrumbService} from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() showHomeItem: boolean;
  @Input() homeItemRoute: string;
  @Input() homeItemText: string;

  public isAtHome: boolean;

  // support multiple outlets
  targetOutlet: string;

  constructor(public service: BreadcrumbService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.targetOutlet = 'primary';
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          this.service.breadcrumbs = [];
          this.service.build(this.route.root);
        }
      }
    );
  }
}
