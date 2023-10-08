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

@NgModule({
  declarations: [
  AboutProductComponent,
  LineBreakPipe,
  ],
  imports: [
    CommonModule,
    AboutRecipeRoutingModule,
    SharedModule,
    NgSelectModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
})
export class ProductModule {}
