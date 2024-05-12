import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  UserCuisine,
  UserDiet,
  UserDto,
  UserIngredient,
} from 'src/app/core/models/user.model';
import { environment } from 'src/app/core/environments/environment';
import { User } from '../models/user.model';
import { FridgeService } from '../../fridge/modals/add-item-component/fridge.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  headers_object: any;
  httpOptions: any;

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

  getHttpHeader() {
    this.headers_object = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8;',
      Accept: 'application/json',
    });
    this.httpOptions = {
      headers: this.headers_object,
    };
    return this.httpOptions;
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public get loggedUserValue() {
    return this.loggedUser.value;
  }

  updateUserIngredientCollection() {
    return this.fridgeService.getAllIngredientsByUserId(
      this.loggedUserValue.id
    );
  }

  updateLoggedUser(updatedUser: UserDto): void {
    this.loggedUser.next(updatedUser);
    localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
  }

  getUserByEmail(email: string) {
    return this.http.get<User>(`${environment.apiUrl}/users?email=${email}`);
  }

  updateCuisines(userCuisines: UserCuisine[]): Observable<any> {
    console.log(userCuisines);
    const updatedUser = { ...this.loggedUser.value, userCuisines };
    return this.http.patch(
      `${environment.apiUrl}/users/${this.loggedUserValue.id}`,
      JSON.stringify(updatedUser),
      this.getHttpHeader()
    );
  }

  updateDiets(userDiets: UserDiet[]): Observable<any> {
    console.log(userDiets);
    const updatedUser = { ...this.loggedUser.value, userDiets };
    return this.http.patch(
      `${environment.apiUrl}/users/${this.loggedUserValue.id}`,
      JSON.stringify(updatedUser),
      this.getHttpHeader()
    );
  }

  updateUserDislikedIngredients(
    userDislikedIngredients: UserIngredient[]
  ): Observable<any> {
    console.log(userDislikedIngredients);
    const updatedUser = { ...this.loggedUser.value, userDislikedIngredients };

    console.log(this.loggedUser.value);

    return this.http.patch(
      `${environment.apiUrl}/users/${this.loggedUserValue.id}`,
      JSON.stringify(updatedUser),
      this.getHttpHeader()
    );
  }

  updateUser(updatedUser: UserDto) {
    Object.assign(this.loggedUser.value, updatedUser);

    console.log(this.loggedUser.value);
    return this.http.patch(
      `${environment.apiUrl}/users/${this.loggedUserValue.id}`,
      JSON.stringify(this.loggedUser.value),
      this.getHttpHeader()
    );
  }

  updateUserGoals(userGoals: boolean[]): Observable<any> {
    const updatedUser = { ...this.loggedUser.value };

    updatedUser.wantToLearnNewSkills = userGoals[0];
    updatedUser.wantToTryNewCuisines = userGoals[1];
    updatedUser.wantToSaveTime = userGoals[2];
    updatedUser.wantToSaveMoney = userGoals[3];
    updatedUser.wantToEatHealthy = userGoals[4];

    return this.http.patch(
      `${environment.apiUrl}/users/${this.loggedUserValue.id}`,
      JSON.stringify(updatedUser),
      this.getHttpHeader()
    );
  }

  updateLoggedUserCuisines(userCuisines: UserCuisine[]) {
    this.loggedUserValue.userCuisines = userCuisines;
    this.loggedUser.next(this.loggedUserValue);
  }

  updateLoggedUserDiets(userDiets: UserDiet[]) {
    this.loggedUserValue.userDiets = userDiets;
    this.loggedUser.next(this.loggedUserValue);
  }

  updateLoggedUserDislikedIngedients(userIngredients: UserIngredient[]) {
    this.loggedUserValue.userDislikedIngredients = userIngredients;
    this.loggedUser.next(this.loggedUserValue);
  }

  updateLoggedUserGoals(userGoals: boolean[]) {
    this.loggedUserValue.wantToLearnNewSkills = userGoals[0];
    this.loggedUserValue.wantToTryNewCuisines = userGoals[1];
    this.loggedUserValue.wantToSaveTime = userGoals[2];
    this.loggedUserValue.wantToSaveMoney = userGoals[3];
    this.loggedUserValue.wantToEatHealthy = userGoals[4];

    this.loggedUser.next(this.loggedUserValue);
  }

  logout() {
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

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`).pipe(
      map((x) => {
        if (id == this.loggedUserValue?.id) {
          this.logout();
        }
        return x;
      })
    );
  }

  generateNewMenu() {
    // Obțineți data de astăzi
    const today = new Date();

    // Determinați prima zi a săptămânii curente (Luni)
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));

    // Determinați ultima zi a săptămânii curente (Duminica)
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);


    // Formatează datele în formatul dorit
    const startDateTimeFormatted = firstDayOfWeek.toISOString().slice(0, 19); // Eliminați "Z" de la sfârșit
    const endDateTimeFormatted = lastDayOfWeek.toISOString().slice(0, 19);

    // Construiește URL-ul cu parametrii de query formatați
    const url =
      `${environment.apiUrl}/users/${this.loggedUserValue.id}/generate-recommendation` +
      `?startDateTime=${startDateTimeFormatted}` +
      `&endDateTime=${endDateTimeFormatted}`;

    return this.http.post(url, this.getHttpHeader());
  }
}
