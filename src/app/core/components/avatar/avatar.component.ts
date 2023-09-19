import { SafeUrl } from '@angular/platform-browser';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() name: string;
  @Input() title: string;
  @Input() image: SafeUrl;

  @Input()
  get ltr(): BooleanInput {
    return this._ltr;
  }
  set ltr(val: BooleanInput) {
    this._ltr = coerceBooleanProperty(val);
  }

  @Input()
  get large(): BooleanInput {
    return this._large;
  }
  set large(val: BooleanInput) {
    this._large = coerceBooleanProperty(val);
  }

  private _ltr: BooleanInput;
  private _large: BooleanInput;
}
