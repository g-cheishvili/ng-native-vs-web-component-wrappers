import {Component, ContentChildren, Input, OnInit} from '@angular/core';
import '@ui5/webcomponents/dist/List.js';
import {ListItemComponent} from "../list-item/list-item.component";
import {BooleanInput, coerceBooleanProperty} from "@angular/cdk/coercion";
// @ts-ignore
import ListMode from "@ui5/webcomponents/dist/types/ListMode.js";

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
export class ListComponent implements OnInit {
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
  listItems!: ListItemComponent[];

  private _multiple: boolean = false;
  private _selectable: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.listMode)
  }
}
