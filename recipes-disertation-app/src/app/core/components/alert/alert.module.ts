import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { AlertsContainerComponent } from './alerts-container.component';
import { TimeoutDirective } from '../../directives/timeout.directive';

@NgModule({
  declarations: [AlertsContainerComponent, AlertComponent, TimeoutDirective],
  imports: [CommonModule, OverlayModule],
})
export class AlertModule {}
