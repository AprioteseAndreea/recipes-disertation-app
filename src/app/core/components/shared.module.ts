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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarModule } from './navbar/navbar.module';
import { BadgeComponent } from './badge/badge.component';
import { CookingLevelPipe } from 'src/app/features/about-product/pipes/cooking-level.pipe';
import { ModalComponent } from './modal/modal.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

@NgModule({
  declarations: [DownloadButtonsComponent, BadgeComponent, CookingLevelPipe],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
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
    FontAwesomeModule,
    NavBarModule,
    BadgeComponent,
    CookingLevelPipe
  ],
 
})
export class SharedModule {}
