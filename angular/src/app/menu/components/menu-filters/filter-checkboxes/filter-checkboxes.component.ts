import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-own-filter-checkboxes',
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
  updateForm: (fn: any) => void;
  disabled: boolean;

  // ControlValueAccessor

  writeValue(val: CategoriesModel): void {
    this.categoriesValue = val;
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
