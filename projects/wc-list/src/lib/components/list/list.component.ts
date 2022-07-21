import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy, Optional,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
// @ts-ignore
import '@ui5/webcomponents/dist/List.js';
import {ListItemComponent} from "../list-item/list-item.component";
import {BooleanInput, coerceBooleanProperty} from "@angular/cdk/coercion";
// @ts-ignore
import ListMode from "@ui5/webcomponents/dist/types/ListMode.js";
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
  selector: 'ul[wc-list]',
  templateUrl: './list.component.html',
  styles: [
    `
      :host {
        padding: 0;
        margin: 0
      }
    `
  ]
})
export class ListComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input()
  get multiple(): boolean {
    return this._multiple;
  }

  set multiple(value: BooleanInput) {
    this._multiple = coerceBooleanProperty(value);
  }

  @Input()
  get selectable(): boolean {
    return this._selectable;
  }

  set selectable(value: BooleanInput) {
    this._selectable = coerceBooleanProperty(value);
  }

  get listMode() {
    if (!this._selectable) {
      return ListMode.None;
    }
    return this._multiple ? ListMode.MultiSelect : ListMode.SingleSelect;
  }

  @ContentChildren(ListItemComponent)
  listItems!: QueryList<ListItemComponent>;

  @ViewChild('ui5ListElement') ui5ListElement!: ElementRef<any>;

  private _multiple: boolean = false;
  private _selectable: boolean = false;
  private _onChange = (value: any) => {
  }
  private _ui5SelectionChangeListener!: () => void;

  constructor(private renderer: Renderer2, @Optional() private ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: Array<any>): void {
  }

  ngAfterViewInit() {
    this._ui5SelectionChangeListener = this.renderer.listen(this.ui5ListElement.nativeElement, 'selection-change', ($event: any) => {
      const value = $event.detail.selectedItems.map((item: any) => {
        return item.value;
      });
      this._onChange(value);
    });
  }

  ngOnDestroy() {
    this._ui5SelectionChangeListener()
  }
}
