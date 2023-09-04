import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field.component';

@NgModule({
  declarations: [FieldComponent],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [FieldComponent],
})
export class FieldModule {}
