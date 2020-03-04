import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService, UserService, WSAuthGuard, UserModel } from '@worldskills/worldskills-angular-lib';
// import { appRoles } from '../../environments/environment';
// import { AppService } from '../services/app.service';


@Injectable({ providedIn: 'root' })
export class ViewAuthGuard extends WSAuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  protected roles: string[];

  protected redirectRoute: string[];

  constructor(
    // protected app: AppService,
    protected authService: AuthService,
    protected router: Router,
    protected userService: UserService
  ) {
    super(authService, router, userService);
    this.roles = ['Admin'];
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      if (this.userService.authenticate(currentUser, this.roles)) {
        return true;
      }
    }

    // at this point we know we are getting an error

    this.handleError(state, currentUser);
    return this.kick(state);
  }

  // details about why we are kicking the current request
  protected handleError(state: RouterStateSnapshot, currentUser: UserModel) {
    if (currentUser) {
      const userDetail = `${currentUser.id} (${currentUser.firstName} ${currentUser.lastName})`;
      this.error(
        `User: ${userDetail}) does not have the required role(s) [${this.roles.join(', ')}] to access ${state.url}`
      );
    } else {
      this.error('Kicking invalid user session out');
    }
  }

  // // overidable kick method: should be false unless if we need to do something special
  // protected kick(state: RouterStateSnapshot): boolean {
  //   // kick back to the home screen when not logged in
  //   // this.router.navigate(this.redirectRoute, { queryParams: { returnUrl: state.url } });
  //   // ensure session is cleared
  //   // this.authService.logout();
  //   // sessionStorage.setItem('returnUrl', state.url);
  //   // this.app.login();
  //   // TODO: kick off an alert
  //   return false;
  // }

  protected error(message: string) {
    console.log(message);
  }
}
