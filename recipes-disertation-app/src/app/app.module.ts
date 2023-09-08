import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
