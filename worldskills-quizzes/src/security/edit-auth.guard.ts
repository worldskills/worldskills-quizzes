import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService, UserService, WSAuthGuard } from '@worldskills/worldskills-angular-lib';
// import { appRoles } from '../../environments/environment';
// import { environment } from '../../environments/environment.dev';
// import { AlertService } from '../services/alert.service';

@Injectable({ providedIn: 'root' })
export class EditAuthGuard extends WSAuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected userService: UserService,
    // protected alerts: AlertService
  ) {
    super(authService, router, userService);
    this.roles = ['Admin'];
    this.redirectRoute = ['/'];
  }

  protected error(message: string) {
    console.error(message);
  }

  // protected kick(state: RouterStateSnapshot): boolean {
  //   // this.alerts.remove('EditAction');
  //   // this.alerts.setError(
  //   //   'EditAction',
  //   //   '',
  //   //   'You do not have permissions to edit this item',
  //   //   'if you feel you need permissions, please contact your administrator'
  //   // );
  //   // this.router.navigate(['/']);
  //   return false;
  // }
}
