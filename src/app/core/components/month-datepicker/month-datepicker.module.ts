import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthDatepickerComponent } from './month-datepicker.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [MonthDatepickerComponent],
  imports: [CommonModule, FormsModule, NgbDropdownModule, ButtonModule],
  exports: [MonthDatepickerComponent],
})
export class MonthDatepickerModule {}
