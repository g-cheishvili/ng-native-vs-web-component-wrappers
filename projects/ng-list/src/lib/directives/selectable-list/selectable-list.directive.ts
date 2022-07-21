import {AfterContentInit, ContentChildren, Directive, Input, OnDestroy, Optional, QueryList} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {SelectableListItemToken} from "../../tokens";
import {SelectableItem} from "../../types";
import {coerceArray} from "@angular/cdk/coercion";
import {map, Observable, skip, startWith, takeUntil, tap} from "rxjs";

console.log('SelectableListDirective is in bundle');

@Directive({
  selector: 'ul[ng-list][selectable]'
})
export class SelectableListDirective<ValueType = any> implements ControlValueAccessor, AfterContentInit, OnDestroy {
  @Input()
  multiple = false;
  @ContentChildren(SelectableListItemToken) items!: QueryList<SelectableItem>;

  private onChange: (value: ValueType | ValueType[]) => void = () => void 0;
  private onTouched: () => void = () => void 0;
  private _value: ValueType[] = [];

  items$!: Observable<SelectableItem[]>;

  constructor(@Optional() private ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = val => {
      if (fn) {
        fn(val);
      }
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = () => fn && fn();
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: ValueType | ValueType[]): void {
    this._value = coerceArray(obj);
  }

  ngAfterContentInit() {
    this.items$ = this.items.changes.pipe(startWith(this.items), map(items => items.toArray()))
    this.items$.pipe(tap(items => {
      items.forEach(item => {
        item.clicked.pipe(
          tap(() => this._itemClicked(item)),
          takeUntil(this.items$.pipe(skip(1))),
        ).subscribe();
      })
    })).subscribe()
  }

  private _itemClicked = (item: SelectableItem) => {
    const isSelected = this._value.includes(item.value);
    isSelected ? this.deselect(item) : this.select(item);
    this._syncValueWithVisual();
    this.onChange(this._value);
  }

  select(item: SelectableItem) {
    if (this.multiple) {
      this._value = [...this._value, item.value];
    } else {
      this._value = [item.value];
    }
    item.select();
  }

  deselect(item: SelectableItem) {
    if (this.multiple) {
      this._value = this._value.filter(value => value !== item.value);
    } else {
      this._value = [];
    }
    item.deselect();
  }

  ngOnDestroy() {
  }

  private _syncValueWithVisual() {
    this.items.forEach(item => {
      const isSelected = this._value.includes(item.value);
      isSelected ? item.select() : item.deselect();
    });
  }
}
