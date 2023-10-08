import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/core/environments/environment';
import { UserRecommendation } from 'src/app/core/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUserRecommendationsByDate(id: Number, dateTime: Date): Observable<UserRecommendation> {
    return this.http.get(
      `${environment.apiUrl}/users/${id}/recommendations?dateTime=${dateTime}`
    );
  }
}
