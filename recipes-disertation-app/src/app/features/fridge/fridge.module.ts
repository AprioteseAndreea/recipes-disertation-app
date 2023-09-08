import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FridgeRoutingModule } from './fridge-routing.module';
import { FridgeComponent } from './components/fridge/fridge.component';
import { SharedModule } from 'src/app/core/components/shared.module';
import { ChunkPipe } from './pipes/chunk.pipe';

@NgModule({
  declarations: [
   FridgeComponent,
   ChunkPipe
  ],
  imports: [
    CommonModule,
    FridgeRoutingModule,
    SharedModule,
    NgSelectModule,
    NgbPaginationModule,
    ReactiveFormsModule,
  ],
})
export class FridgeModule {}
