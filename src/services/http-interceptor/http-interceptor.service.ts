import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertService, AlertType, AuthService} from '@worldskills/worldskills-angular-lib';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap({
      error: (event: HttpErrorResponse) => {
        if (event.status === 404) {
          this.router.navigateByUrl('/not-found', {skipLocationChange: true});
        } else if (event.status === 403) {
          this.authService.login();
        } else if (event.status === 400) {
          this.alertService.setAlert('request', AlertType.error, event.error, undefined,
            'user_msg' in event.error ? event.error.user_msg : event.message, false);
        } else {
          if (event.error && 'user_msg' in event.error) {
            this.alertService.setAlert('request', AlertType.error, event.error, undefined,
              'user_msg' in event.error ? event.error.user_msg : event.message, false);
          } else {
            this.alertService.setError('request', event.error, event.statusText, event.message);
          }
        }
      }
    }));
  }


}
