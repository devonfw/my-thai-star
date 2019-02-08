import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/* @export
 * @class FilterCheckboxesComponent
 */
@Component({
  selector: 'own-filter-checkboxes',
  templateUrl: './filter-checkboxes.component.html',
  styleUrls: ['./filter-checkboxes.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterCheckboxesComponent),
      multi: true,
    },
  ],
})
export class FilterCheckboxesComponent {
  categoriesValue: CategoriesModel;
  updateForm: Function;
  disabled: boolean;

  // ControlValueAccessor

  /* @param {CategoriesModel} val
   * @memberof FilterCheckboxesComponent
   */
  writeValue(val: CategoriesModel): void {
    this.categoriesValue = val;
  }
  /* @param {*} fn
   * @memberof FilterCheckboxesComponent
   */
  registerOnChange(fn: any): void {
    this.updateForm = fn;
  }

  /* @param {*} fn
   * @memberof FilterCheckboxesComponent
   */
  registerOnTouched(fn: any): void {
    // Not implemented;
  }

  /* @param {boolean} isDisabled
   * @memberof FilterCheckboxesComponent
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Binding Methods

  /* @param {string} filterName
   * @memberof FilterCheckboxesComponent
   */
  onToggle(filterName: string): void {
    const toggledValue: boolean = !this.categoriesValue[filterName];
    this.categoriesValue = {
      ...this.categoriesValue,
      ...{ [filterName]: toggledValue },
    };
    this.updateForm(this.categoriesValue);
  }
}

export interface CategoriesModel {
  mainDishes: boolean;
  starters: boolean;
  desserts: boolean;
  noodle: boolean;
  rice: boolean;
  curry: boolean;
  vegan: boolean;
  vegetarian: boolean;
  favourites: boolean;
}
