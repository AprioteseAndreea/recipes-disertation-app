import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/core/environments/environment';
import { Ingredient, UserIngredient } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  headers_object: any;
  httpOptions: any;

  constructor(private httpClient: HttpClient) {}

  getHttpHeader() {
    this.headers_object = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8;",
      Accept: "application/json",
    });
    this.httpOptions = {
      headers: this.headers_object,
    };
    return this.httpOptions;
  }

  getAllIngredients() {
    return this.httpClient.get<Ingredient[]>(
      `${environment.apiUrl}/ingredients`
    );
  }

  getAllIngredientsByUserId(userId: Number){
    return this.httpClient.get<Ingredient[]>(
      `${environment.apiUrl}/users/${userId}/ingredients`
    );
  }

  addIngredient(fridgeIngrediet: UserIngredient, userId: Number) {
    return this.httpClient.post(
      `${environment.apiUrl}/users/${userId}/ingredients`,
       JSON.stringify(fridgeIngrediet),
      this.getHttpHeader()
    );
  }
}
