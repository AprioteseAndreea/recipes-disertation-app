import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FridgeRoutingModule } from './fridge-routing.module';
import { FridgeComponent } from './components/fridge/fridge.component';
import { SharedModule } from 'src/app/core/components/shared.module';
import { ChunkPipe } from './pipes/chunk.pipe';
import { AddItemComponentComponent } from './modals/add-item-component/add-item-component.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ToastrService } from 'ngx-toastr';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
   FridgeComponent,
   ChunkPipe,
   AddItemComponentComponent
  ],
  imports: [
    CommonModule,
    FridgeRoutingModule,
    SharedModule,
    NgSelectModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbDropdownModule,
    MdbRippleModule,
    MatSelectModule
    ],
  providers:[
    MdbModalService,
    NotificationService,
    ToastrService
  ]
})
export class FridgeModule {}
