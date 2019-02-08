import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/* @export
 * @class FilterSearchComponent
 * @implements {ControlValueAccessor}
 */
@Component({
  selector: 'own-filter-search',
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
  updateForm: Function;
  disabled: boolean;

  /* @param {string} val
   * @memberof FilterSearchComponent
   */
  setInputValue(val: string): void {
    this.inputValue = val;
    this.updateForm(this.inputValue);
  }

  // ControlValueAccessor

  /* @param {string} val
   * @memberof FilterSearchComponent
   */
  writeValue(val: string): void {
    this.inputValue = val;
  }
  /* @param {*} fn
   * @memberof FilterSearchComponent
   */
  registerOnChange(fn: any): void {
    this.updateForm = fn;
  }

  /* @param {*} fn
   * @memberof FilterSearchComponent
   */
  registerOnTouched(fn: any): void {
    // Not implemented;
  }

  /* @param {boolean} isDisabled
   * @memberof FilterSearchComponent
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Binding Methods

  /* @param {*} $event
   * @memberof FilterSearchComponent
   */
  onChange($event: any): void {
    this.setInputValue($event.target.value);
  }

  /* @returns {boolean}
   * @memberof FilterSearchComponent
   */
  isSearchFieldNotEmpty(): boolean {
    return !!this.inputValue;
  }

  clearSearchField(): void {
    this.setInputValue('');
  }
}
