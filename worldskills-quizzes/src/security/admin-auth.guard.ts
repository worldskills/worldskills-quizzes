import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService, UserService, WSAuthGuard} from '@worldskills/worldskills-angular-lib';
// import { appRoles } from '../../environments/environment';
// import { environment } from '../../environments/environment.dev';

@Injectable({providedIn: 'root'})
export class AdminAuthGuard extends WSAuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected userService: UserService
  ) {
    super(authService, router, userService);
    this.roles = ['Admin'];
    this.redirectRoute = [];
  }

  protected error(message: string) {
    console.error(message);
  }
}
