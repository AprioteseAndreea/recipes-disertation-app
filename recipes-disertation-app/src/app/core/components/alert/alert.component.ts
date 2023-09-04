import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Alert } from './alert.config';

@Component({
  selector: 'app-alert',
  template: `
    <ng-container *ngIf="alert">
      <div
        class="alert alert-{{
          alert.type
        }} alert-dismissible d-flex align-items-center m-2"
        [appTimeout]="alert.timeout"
        (onTimeout)="close()"
      >
        <div class="break-line">
          {{ alert.message }}
        </div>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          (click)="close()"
        ></button>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .break-line {
        white-space: pre;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() alert: Alert;
  @Output() timeout = new EventEmitter<Alert>();

  close() {
    this.timeout.emit(this.alert);
  }
}
