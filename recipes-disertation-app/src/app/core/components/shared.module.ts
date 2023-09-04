import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from './avatar/avatar.module';
import { ButtonModule } from './button/button.module';
import { CardModule } from './card/card.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { DownloadButtonsComponent } from './download-buttons/download-buttons.component';
import { FieldModule } from './field/field.module';
import { MonthDatepickerModule } from './month-datepicker/month-datepicker.module';
import { SortModule } from './sort/sort.module';
import { SpinnerModule } from './spinner/spinner.module';
import { PipesModule } from '../pipes/pipes.module';
import { AlertModule } from './alert/alert.module';

@NgModule({
  declarations: [DownloadButtonsComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    AlertModule,
    FormsModule,
    SortModule,
    CardModule,
    ButtonModule,
    SpinnerModule,
    AvatarModule,
    PipesModule,
    DownloadButtonsComponent,
    DatepickerModule,
    MonthDatepickerModule,
    FieldModule,
  ],
})
export class SharedModule {}
