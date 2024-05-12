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

const routes: Routes = [
  { path: ':id', component: AboutProductComponent }
];

@NgModule({
  declarations: [
  AboutProductComponent,
  LineBreakPipe,
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
