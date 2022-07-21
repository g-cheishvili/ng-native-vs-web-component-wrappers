import {Component, ContentChildren} from '@angular/core';
import '@ui5/webcomponents/dist/List.js';
import {ListItemComponent} from "../list-item/list-item.component";

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
export class ListComponent {
  @ContentChildren(ListItemComponent)
  listItems!: ListItemComponent[];

  constructor() {
  }
}
