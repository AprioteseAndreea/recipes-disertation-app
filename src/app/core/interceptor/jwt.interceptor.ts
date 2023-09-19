// import {Injectable} from '@angular/core';
// import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import {AuthenticationService} from '../services/authentication.service';
// import {environment} from '../../environments/environment';
// import { LocalService } from '../utils/local.service';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(private authenticationService: AuthenticationService,private localService: LocalService
//     ) {
//   }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (environment.production == true && this.authenticationService.isLoggedIn()) {
//       const currentUser = this.localService.getData('currentUser');
//       request = request.clone({
//         headers: new HttpHeaders({
//           'JWT': currentUser,
//           'Content-Type': 'application/json'
//         })
//       });
//     }
//     return next.handle(request);
//   }
// }
