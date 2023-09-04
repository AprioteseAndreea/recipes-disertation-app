import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: '[app-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() loading: boolean;

  @Input() primary: BooleanInput;
  @Input() secondary: BooleanInput;
  @Input() link: BooleanInput;

  constructor() {}

  ngOnInit(): void {}

  @HostBinding('class.btn') btnBase: boolean = true;

  @HostBinding('class.btn-primary')
  public get isPrimary(): boolean {
    return coerceBooleanProperty(this.primary);
  }

  @HostBinding('class.btn-secondary')
  public get isSecondary(): boolean {
    return coerceBooleanProperty(this.secondary);
  }

  @HostBinding('class.btn-link')
  public get isLink(): boolean {
    return coerceBooleanProperty(this.link);
  }
}
