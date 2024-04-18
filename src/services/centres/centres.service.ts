import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CentresService {

  constructor(private http: HttpClient) { }

  getCentres(eventId: number, params): Observable<any> {
    return this.http.get<any>(`${environment.worldskillsApiEndpoint}/centres/competitions/${eventId}/centres`, {params});
  }

  getPersonTasks(centreId: number, personId: number, params): Observable<any> {
    return this.http.get<any>(`${environment.worldskillsApiEndpoint}/centres/user_tasks/${personId}/centres/${centreId}`);
  }
}
