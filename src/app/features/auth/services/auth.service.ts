import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AccountService } from './account.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public notificationAlert: NotificationService,
    public accountService: AccountService,
    public ngZone: NgZone
  ) {
    
    this.fetchUserData(true);
  }

  fetchUserData(redirect: boolean){
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);

        this.accountService
          .getUserByEmail(user.email)
          .subscribe((returnedUser) => {
            this.accountService.updateLoggedUser(returnedUser);
            localStorage.setItem('loggedUser', JSON.stringify(returnedUser));
            if (returnedUser && redirect) {
              this.router.navigate(['/home']);
            }
          });
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.accountService
              .getUserByEmail(email)
              .subscribe((returnedUser) => {
                console.log(returnedUser);
                this.accountService.updateLoggedUser(returnedUser);
                if (returnedUser) {
                  this.router.navigate(['/home']);
                }
              });
          }
        });
      })
      .catch((error) => {
        this.notificationAlert.showError(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */

        //this.SendVerificationMail();
        this.SetUserData(result.user);
        this.notificationAlert.showSuccess('A new account has been created!');
      })
      .catch((error) => {
        this.notificationAlert.showError(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.notificationAlert.showSuccess(
          'Password reset email sent, check your inbox.'
        );
      })
      .catch((error) => {
        'Password reset email sent, check your inbox.';
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/home']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log(error);
        this.notificationAlert.showError(error.message);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('loggedUser');
      this.router.navigate(['/login']);
    });
  }
}
