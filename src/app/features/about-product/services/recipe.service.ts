import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/core/environments/environment';
import { Recipe } from 'src/app/core/models/user.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(private http: HttpClient) {}

  
  getRecipeById(id: Number): Observable<Recipe>{
    return this.http.get(
        `${environment.apiUrl}/recipes/${id}`
      );
  }
}
