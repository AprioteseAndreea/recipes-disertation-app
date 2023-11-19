import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, shareReplay } from 'rxjs';
import { environment } from 'src/app/core/environments/environment';
import { Ingredient } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  constructor(private httpClient: HttpClient) {}

  getAllIngredients() {
    return this.httpClient.get<Ingredient[]>(`${environment.apiUrl}/ingredients`);
  }
}
