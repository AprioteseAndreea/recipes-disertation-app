import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from 'src/app/core/models/user.model';
import { environment } from 'src/app/core/environments/environment';
import { User } from '../models/user.model';
import { FridgeService } from '../../fridge/modals/add-item-component/fridge.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  private loggedUser: BehaviorSubject<UserDto | null>;
  public loggedUser$: Observable<UserDto | null>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fridgeService: FridgeService
  ) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();

    this.loggedUser = new BehaviorSubject(
      JSON.parse(localStorage.getItem('loggedUser')!)
    );
    this.loggedUser$ = this.loggedUser.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public get loggedUserValue() {
    return this.loggedUser.value;
  }

  //   login(username: string, password: string) {
  //     return this.http
  //       .post<User>(`${environment.apiUrl}/users/authenticate`, {
  //         username,
  //         password,
  //       })
  //       .pipe(
  //         map((user) => {
  //           // store user details and jwt token in local storage to keep user logged in between page refreshes
  //           localStorage.setItem('user', JSON.stringify(user));
  //           this.userSubject.next(user);
  //           return user;
  //         })
  //       );
  //   }

  updateUserIngredientCollection() {
    this.fridgeService
      .getAllIngredientsByUserId(this.loggedUserValue.id)
      .subscribe((res) => (this.loggedUserValue.userIngredients = res));
    //apeleza endpointul din fridgeService de a lua ingredientele by Userid
    // si asigneaza-le aici: this.accountService.loggedUserValue.userIngredients
  }

  updateUser(user: User) {
    console.log(user);
    this.loggedUser.next(user);
    console.log(this.loggedUser.value);
  }

  getUserByEmail(email: string) {
    //http://localhost:8080/users?email=andreea.apriotese11@gmail.com
    return this.http.get<User>(`${environment.apiUrl}/users?email=${email}`);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.removeItem('loggedUser');

    this.userSubject.next(null);
    this.loggedUser.next(null);

    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  //   update(id: number, params: any) {
  //     return this.http.put(`${environment.apiUrl}/users/${id}`, params).pipe(
  //       map((x) => {
  //         // update stored user if the logged in user updated their own record
  //         if (id == this.userValue?.id) {
  //           // update local storage
  //           const user = { ...this.userValue, ...params };
  //           localStorage.setItem('user', JSON.stringify(user));

  //           // publish updated user to subscribers
  //           this.userSubject.next(user);
  //         }
  //         return x;
  //       })
  //     );
  //   }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`).pipe(
      map((x) => {
        // auto logout if the logged in user deleted their own record
        if (id == this.loggedUserValue?.id) {
          this.logout();
        }
        return x;
      })
    );
  }
}
