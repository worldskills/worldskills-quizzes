import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person, PersonList } from 'src/types/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  getPeoplePublic(params): Observable<PersonList> {
    return this.http.get<PersonList>(`${environment.worldskillsApiEndpoint}/people/public`, {params});
  }

  getPersonPublic(personId: number): Observable<Person> {
    return this.http.get<Person>(`${environment.worldskillsApiEndpoint}/people/public/${personId}`);
  }
}
