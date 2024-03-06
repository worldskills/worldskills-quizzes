import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MemberList } from 'src/types/member';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  constructor(private http: HttpClient) { }

  getMembers(params): Observable<MemberList> {
    return this.http.get<MemberList>(`${environment.worldskillsApiEndpoint}/org/members`, {params});
  }
}
