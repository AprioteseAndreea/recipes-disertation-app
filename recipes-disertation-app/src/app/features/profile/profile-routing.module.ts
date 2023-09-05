import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrefsStep1Component } from './components/prefs-step1/prefs-step1.component';
import { PrefsStep2Component } from './components/prefs-step2/prefs-step2.component';
import { PrefsStep3Component } from './components/prefs-step3/prefs-step3.component';
import { PrefsStep4Component } from './components/prefs-step4/prefs-step4.component';
import { PrefsStep5Component } from './components/prefs-step5/prefs-step5.component';
import { PrefsStep6Component } from './components/prefs-step6/prefs-step6.component';
import { PrefsStep7Component } from './components/prefs-step7/prefs-step7.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProfileComponent,
  },
  {
    path: 'preferences-step-1',
    pathMatch: 'full',
    component: PrefsStep1Component,
  },
  {
    path: 'preferences-step-2',
    pathMatch: 'full',
    component: PrefsStep2Component,
  },
  {
    path: 'preferences-step-3',
    pathMatch: 'full',
    component: PrefsStep3Component,
  },
  {
    path: 'preferences-step-4',
    pathMatch: 'full',
    component: PrefsStep4Component,
  },
  {
    path: 'preferences-step-5',
    pathMatch: 'full',
    component: PrefsStep5Component,
  },
  {
    path: 'preferences-step-6',
    pathMatch: 'full',
    component: PrefsStep6Component,
  },
  {
    path: 'preferences-step-7',
    pathMatch: 'full',
    component: PrefsStep7Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
