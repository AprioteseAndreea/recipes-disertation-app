import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  HostBinding,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @Input() loading: boolean;
  @Input() primary: BooleanInput;

  @HostBinding('class.text-primary')
  public get isPrimary(): boolean {
    return coerceBooleanProperty(this.primary);
  }
}
