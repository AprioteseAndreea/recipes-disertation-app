import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from './alert.config';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alerts-container',
  template: `
    <div class="alert-container" *ngIf="alerts$ | async as alerts">
      <app-alert
        *ngFor="let alert of alerts"
        [alert]="alert"
        (timeout)="close($event)"
      ></app-alert>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsContainerComponent {
  alerts$: Observable<Alert[]>;

  constructor(private service: AlertService) {
    this.alerts$ = this.service.alerts$;
  }

  close(alert: Alert) {
    this.service.delete(alert);
  }
}
