import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { UserIngredient } from 'src/app/core/models/user.model';
import { environment } from 'src/app/core/environments/environment';
import { AccountService } from '../../auth/services/account.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  headers_object: any;
  httpOptions: any;

  userId: number;
  private cartUrl = 'http://localhost:9000/api/cart';

  constructor(private httpClient: HttpClient,  public accountService: AccountService) {
    this.userId = this.accountService.loggedUserValue.id;
  }

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

  getUserCart(): Observable<any> {
    const url = `${this.cartUrl}/${this.userId}`;
    return this.httpClient.get(url).pipe(
      map((response) => response),
      shareReplay(1),
      catchError((error) => {
        console.error('Error fetching user cart:', error);
        throw error;
      })
    );
  }

  updateUserIngredient(userIngredient: UserIngredient) {
    return this.httpClient.patch(
      `${environment.apiUrl}/users/${this.userId}/ingredients`,
       JSON.stringify(userIngredient),
      this.getHttpHeader()
    );
  }

  deleteUserIngredient(userIngrId: number) {
    return this.httpClient.delete<UserIngredient>(
      `${environment.apiUrl}/users/${this.userId}/ingredients/` + userIngrId,
      this.getHttpHeader()
    );
  }
}
