import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { ShoppingCart } from 'server/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUrl = 'http://localhost:9000/api/cart';

  constructor(private httpClient: HttpClient) {}

  getUserCart(userId: number): Observable<any> {
    const url = `${this.cartUrl}/${userId}`;
    return this.httpClient.get(url).pipe(
      map((response) => response),
      shareReplay(1),
      catchError((error) => {
        console.error('Error fetching user cart:', error);
        throw error;
      })
    );
  }
}
