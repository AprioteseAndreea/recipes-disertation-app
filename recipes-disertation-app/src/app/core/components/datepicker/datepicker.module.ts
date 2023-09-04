import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DatepickerComponent],
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  exports: [DatepickerComponent],
})
export class DatepickerModule {}
