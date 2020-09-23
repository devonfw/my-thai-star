import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-own-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterSearchComponent),
      multi: true,
    },
  ],
})
export class FilterSearchComponent implements ControlValueAccessor {
  inputValue: string;
  updateForm: (fn: any) => void;
  disabled: boolean;

  setInputValue(val: string): void {
    this.inputValue = val;
    this.updateForm(this.inputValue);
  }

  // ControlValueAccessor

  writeValue(val: string): void {
    this.inputValue = val;
  }
  registerOnChange(fn: any): void {
    this.updateForm = fn;
  }

  registerOnTouched(fn: any): void {
    // Not implemented;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Binding Methods

  onChange($event: any): void {
    this.setInputValue($event.target.value);
  }

  isSearchFieldNotEmpty(): boolean {
    return !!this.inputValue;
  }

  clearSearchField(): void {
    this.setInputValue('');
  }
}
