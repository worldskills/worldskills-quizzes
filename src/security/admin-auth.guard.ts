import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService, UserService, WSAuthGuard} from '@worldskills/worldskills-angular-lib';

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
    this.roles = ['Admin', 'EditQuizzes'];
    this.redirectRoute = [];
  }

  protected error(message: string) {
    this.router.navigate(['/']);
  }
}
