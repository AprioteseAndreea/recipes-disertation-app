import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/components/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutProductComponent } from './components/about-product/about-product.component';
import { AboutRecipeRoutingModule } from './about-product-routing.module';
import { LineBreakPipe } from './pipes/line-break.pipe';
import { RouterModule, Routes } from '@angular/router';
import { RatingComponent } from './rating/rating/rating.component';

const routes: Routes = [
  { path: ':id', component: AboutProductComponent },
  { path: ':id/rating', component: RatingComponent }

];

@NgModule({
  declarations: [
  AboutProductComponent,
  LineBreakPipe,
  RatingComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AboutRecipeRoutingModule,
    SharedModule,
    NgSelectModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [RouterModule]
})
export class ProductModule {}
