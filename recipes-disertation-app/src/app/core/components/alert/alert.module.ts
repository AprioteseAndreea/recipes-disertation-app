import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { AlertsContainerComponent } from './alerts-container.component';
import { TimeoutDirective } from '../../directives/timeout.directive';
import { ToasterComponent } from './toaster/toaster.component';
import { ToastComponent } from './toast/toast.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AlertsContainerComponent,
    AlertComponent,
    TimeoutDirective,
    ToasterComponent,
    ToastComponent,
  ],
  imports: [CommonModule, OverlayModule, NgbToastModule],
})
export class AlertModule {}
