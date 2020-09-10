import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  showBreadcrumbs: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }
}
