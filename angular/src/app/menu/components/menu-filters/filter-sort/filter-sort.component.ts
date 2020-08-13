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

@Component({
  selector: 'app-own-filter-sort',
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
  updateForm: (fn: any) => void;
  disabled: boolean;

  sortDirIcon: SortIcon = SortIcon.DESC;

  // ControlValueAccessor

  writeValue(val: SortControlModel): void {
    this.sortValue = val;
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

  onSelectChange($event: any): void {
    this.sortValue = { ...this.sortValue, ...{ property: $event.value } };
    this.updateForm(this.sortValue);
  }
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
