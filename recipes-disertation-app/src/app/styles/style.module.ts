
import {
  NgbDatepickerModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleComponent } from './style.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../core/components/shared.module';
import { FieldModule } from '../core/components/field/field.module';
import { DatepickerModule } from '../core/components/datepicker/datepicker.module';
import { MonthDatepickerModule } from '../core/components/month-datepicker/month-datepicker.module';

const routes: Routes = [
  {
    path: '',
    component: StyleComponent,
  },
];

@NgModule({
  declarations: [StyleComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    NgbPaginationModule,
    FieldModule,
    DatepickerModule,
    MonthDatepickerModule,
  ],
})
export class StyleModule {}
