import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import {
  Component,
  Input,
  Self,
  Optional,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { CompareWithFn } from '@ng-select/ng-select/lib/ng-select.component';
import { Subject } from 'rxjs';
import { FieldType } from '../../constants/constants';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements ControlValueAccessor, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();

  @Input() id: string = '';

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() fieldType: FieldType = 'INPUT';
  @Input() rows: number = 3;
  @Input() items: unknown[];
  @Input() submitted: boolean = false;

  @Input() bindLabel = '';
  @Input() bindValue = '';

  @Input() compareFn: CompareWithFn;

  @Input()
  get required(): boolean {
    return (
      this._required ??
      this.ngControl?.control?.hasValidator(Validators.required) ??
      false
    );
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  private _required: boolean | undefined;

  _value: string | string[];
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get value(): string | string[] {
    return this._value;
  }

  set value(val: string | string[]) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string | string[]): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
