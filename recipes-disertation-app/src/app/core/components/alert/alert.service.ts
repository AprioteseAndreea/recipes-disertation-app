import { AlertsContainerComponent } from './alerts-container.component';
import { Observable, BehaviorSubject } from 'rxjs';

import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Alert, AlertType, AlertTypeTimeout } from './alert.config';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class AlertService implements OnDestroy {
  private overlayRef: OverlayRef = null;

  private alerts = new BehaviorSubject<Alert[]>([]);
  public alerts$: Observable<Alert[]> = this.alerts.asObservable();

  constructor(private overlay: Overlay, private ngZone: NgZone) {}

  info(message: string) {
    this._createAlert(AlertType.Info, message);
  }

  error(message: string) {
    this._createAlert(AlertType.Error, message);
  }

  warning(message: string) {
    this._createAlert(AlertType.Warning, message);
  }

  success(message: string) {
    this._createAlert(AlertType.Success, message);
  }

  show(alertType: AlertType, message: string) {
    this._createAlert(alertType, message);
  }

  delete(alert: Alert) {
    const alerts = this.alerts.value;
    const index = alerts.indexOf(alert);
    if (index !== -1) {
      const newAlerts = [...alerts.slice(0, index), ...alerts.slice(index + 1)];
      this.alerts.next(newAlerts);
    }
  }

  private _createAlert(type: AlertType, message: string) {
    this.ngZone.run(() => {
      if (!this.overlayRef) {
        // initial setup
        this._createOverlay();
      }

      const alerts = this.alerts.value;
      const newAlerts = [
        ...alerts,
        {
          type: type,
          message: message,
          timeout: AlertTypeTimeout[type],
        },
      ];
      this.alerts.next(newAlerts);
    });
  }

  private _createOverlay() {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: false,
      positionStrategy: this.overlay.position().global().bottom().right(),
      disposeOnNavigation: false,
      maxWidth: 420,
    });

    this.overlayRef = this.overlay.create(overlayConfig);
    this.overlayRef.attach(new ComponentPortal(AlertsContainerComponent));
  }

  ngOnDestroy(): void {
    this.alerts.complete();
  }
}
