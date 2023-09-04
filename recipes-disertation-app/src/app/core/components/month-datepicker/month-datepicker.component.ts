import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, Validators, NgControl } from '@angular/forms';
import {
  Component,
  ViewEncapsulation,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-month-datepicker',
  templateUrl: './month-datepicker.component.html',
  styleUrls: ['./month-datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class MonthDatepickerComponent implements ControlValueAccessor {
  @Input() id: string = '';

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() submitted: boolean = false;

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

  _value: string;
  onChange = (_: any) => {};
  onTouched = () => {};

  pickerData: {
    year: number;
    month: number;
    increment: number;
  };
  isYearRange: boolean = false;
  readonly months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private datePipe: DatePipe
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.setPickerDate();
  }

  addYear($event: Event, increment: number) {
    $event.stopPropagation();
    const newYear = this.pickerData.year + increment;
    const newIncrement = this.pickerData.increment + 10 * increment;

    if (this.isYearRange) {
      this.pickerData = {
        ...this.pickerData,
        increment: newIncrement,
      };
    } else {
      this.pickerData = {
        ...this.pickerData,
        year: newYear,
      };
    }
  }

  select($event: Event, index: number, dropdown: NgbDropdown): void {
    if (this.isYearRange) {
      $event.stopPropagation();
      const newYear = this.pickerData.increment + index;
      const newIncrement = this.getYearIncrement(newYear);
      this.isYearRange = !this.isYearRange;
      this.pickerData = {
        ...this.pickerData,
        year: newYear,
        increment: newIncrement,
      };
    } else {
      this.pickerData = {
        ...this.pickerData,
        month: index,
      };
      this.value = this.getParsedValue();
      dropdown.close();
    }
  }

  toggleYearView($event: Event, toggle: boolean) {
    $event.stopPropagation();
    this.isYearRange = !toggle;
  }

  getYearIncrement(year: number): number {
    return year - (year % 10) - 1;
  }

  onDropdownToggle(open: boolean) {
    // reset pickerDate every time dropdown opens
    if (open) {
      this.isYearRange = false;
      this.setPickerDate();
    }
  }

  // control value accessor
  get value(): string {
    return this.getFormatedValue(this._value);
  }

  set value(val: string) {
    const newValue = val && this.isDateValid(val) ? this.getDate(val) : val;
    this._value = newValue;
    this.onChange(newValue);
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = this.getFormatedValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private getDate(val: string): string {
    const newDate = new Date(val);
    return new Date(
      newDate.getTime() - newDate.getTimezoneOffset() * 60000
    ).toISOString();
  }

  private getParsedValue(): string {
    return this.months[this.pickerData.month] + ' ' + this.pickerData.year;
  }

  private getFormatedValue(value: string) {
    return value && this.isDateValid(value)
      ? this.datePipe.transform(value, 'MMM y')
      : null;
  }

  private isDateValid(value: string) {
    const newDate = new Date(value);
    return !isNaN(newDate.getMonth());
  }

  private setPickerDate() {
    const currentDate =
      this.value && this.isDateValid(this.value)
        ? new Date(this.value)
        : new Date();
    this.pickerData = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      increment: this.getYearIncrement(currentDate.getFullYear()),
    };
  }
}
