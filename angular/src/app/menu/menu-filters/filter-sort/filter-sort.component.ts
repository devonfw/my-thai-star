import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SortControlModel {
  property: string;
  direction: SortDirection;
}
export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
enum SortIcon {
  ASC = 'vertical_align_top',
  DESC = 'vertical_align_bottom',
}

/* @export
 * @class FilterSortComponent
 * @implements {ControlValueAccessor}
 */
@Component({
  selector: 'own-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterSortComponent),
      multi: true,
    },
  ],
})
export class FilterSortComponent implements ControlValueAccessor {
  sortValue: SortControlModel;
  updateForm: Function;
  disabled: boolean;

  sortDirIcon: SortIcon = SortIcon.DESC;

  // ControlValueAccessor

  /* @param {SortControlModel} val
   * @memberof FilterSortComponent
   */
  writeValue(val: SortControlModel): void {
    this.sortValue = val;
  }
  /* @param {*} fn
   * @memberof FilterSortComponent
   */
  registerOnChange(fn: any): void {
    this.updateForm = fn;
  }

  /* @param {*} fn
   * @memberof FilterSortComponent
   */
  registerOnTouched(fn: any): void {
    // Not implemented;
  }

  /* @param {boolean} isDisabled
   * @memberof FilterSortComponent
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Binding Methods

  /* @param {*} $event
   * @memberof FilterSortComponent
   */
  onSelectChange($event: any): void {
    this.sortValue = { ...this.sortValue, ...{ property: $event.value } };
    this.updateForm(this.sortValue);
  }
  /* @param {Event} event
   * @memberof FilterSortComponent
   */
  changeSortDir(event: Event): void {
    event.preventDefault();
    this.sortDirIcon =
      this.sortDirIcon === SortIcon.ASC ? SortIcon.DESC : SortIcon.ASC;
    const newDir: SortDirection =
      this.sortValue.direction === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;
    this.sortValue = { ...this.sortValue, ...{ direction: newDir } };
    this.updateForm(this.sortValue);
  }
}
