import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EntityList} from '../../types/entity';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  private loading = false;
  public list = new BehaviorSubject<EntityList>(null);

  constructor(private http: HttpClient) {
  }

  fetchList() {
    const params = new HttpParams();
    params.set('limit', '100');
    params.set('role', 'EditQuizzes');
    params.set('roleApp', '1300');
    this.loading = true;
    this.http.get<EntityList>('https://api.worldskills.show/auth/ws_entities', {params})
    .subscribe(value => {
      this.loading = false;
      this.list.next(value);
    });
    return this.list;
  }
}
