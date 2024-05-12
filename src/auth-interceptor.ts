import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private afAuth: AngularFireAuth) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.afAuth.currentUser).pipe(
      switchMap((user: User | null) => {
        if (user) {
          return from(user.getIdToken()).pipe(
            switchMap(token => {
              // Adaugă token-ul de acces la cererea HTTP
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              });
              return next.handle(request);
            })
          );
        } else {
          return next.handle(request);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Tratează cazul în care token-ul de acces a expirat sau nu mai este valid
          // Încearcă să obții un nou token de acces utilizând token-ul de reîmprospătare
          // Dacă acest lucru eșuează sau token-ul de reîmprospătare este expirat, deconectează utilizatorul
          console.log('Token expired or invalid, logging out user...');
          // Deconectare utilizator
        }
        return throwError(error);
      })
    );
  }
}
