import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './core/components/header/header.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingService } from './core/components/loading/loading.service';
import { NotificationService } from './core/services/notification.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { environment } from './core/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FontAwesomeModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [LoadingService, NotificationService, ToastrService],
  bootstrap: [AppComponent],
})
export class AppModule {}
