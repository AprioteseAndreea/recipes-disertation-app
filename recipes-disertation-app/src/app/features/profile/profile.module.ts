import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/components/shared.module';
import { PrefsStep1Component } from './components/prefs-step1/prefs-step1.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { PrefsStep2Component } from './components/prefs-step2/prefs-step2.component';
import { PrefsStep3Component } from './components/prefs-step3/prefs-step3.component';
import { PrefsStep4Component } from './components/prefs-step4/prefs-step4.component';
import { PrefsStep5Component } from './components/prefs-step5/prefs-step5.component';
import { PrefsStep6Component } from './components/prefs-step6/prefs-step6.component';
import { PrefsStep7Component } from './components/prefs-step7/prefs-step7.component';

@NgModule({
  declarations: [
   PrefsStep1Component,
   PrefsStep2Component,
   PrefsStep3Component,
   PrefsStep4Component,
   PrefsStep5Component,
   PrefsStep6Component,
   PrefsStep7Component
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgSelectModule,
    NgbPaginationModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
