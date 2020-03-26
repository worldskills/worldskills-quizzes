import {Injectable} from '@angular/core';
import {AuthService as WsAuthService, UserModel, UserService} from '@worldskills/worldskills-angular-lib';
import {BehaviorSubject} from 'rxjs';
import {share} from 'rxjs/operators';

export interface AuthStatus {
  isLoggedIn: boolean;
  user: UserModel,
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authStatus = new BehaviorSubject<AuthStatus>({
    isLoggedIn: false,
    user: undefined,
    authenticated: false,
  });

  constructor(private authService: WsAuthService, private userService: UserService) {
    this.authStatus.next({
      isLoggedIn: this.authService.isLoggedIn(),
      user: undefined,
      authenticated: false,
    });
    this.authService.currentUser.subscribe((user: UserModel) => {
      if (user instanceof UserModel) {
        this.authStatus.next({
          isLoggedIn: true,
          user,
          authenticated: true
        });
      }
    });
    if (this.authService.isLoggedIn()) {
      this.authService.loadUserProfile(user => {
        if ('ok' in user && !user.ok) {
          if (this.authService.isLoggedIn()) {
            this.logout().subscribe({
              error: () => {
                this.login();
              },
              next: () => {
                this.login();
              }
            });
          } else {
            this.login();
          }
        }
      });
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    const observable = this.userService.logout().pipe(share());
    observable.subscribe({
      complete: () => {
        this.authStatus.next({
          isLoggedIn: false,
          user: undefined,
          authenticated: false
        });
      }
    });
    return observable;
  }
}
