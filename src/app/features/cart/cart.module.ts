import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/components/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { ConfmodalComponent } from './components/cart/modals/confmodal/confmodal.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

@NgModule({
  declarations: [
  CartComponent,
  ConfmodalComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    NgSelectModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers:[
    MdbModalService
  ]
  
})
export class CartModule {}
