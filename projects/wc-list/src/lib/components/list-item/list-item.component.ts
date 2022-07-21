import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import '@ui5/webcomponents/dist/StandardListItem.js';

@Component({
  selector: 'li[wc-list-item]',
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  @ViewChild('ui5ListItem') ui5ListItemTemplate!: TemplateRef<void>;
  @Input() value: any;

  constructor() {
  }
}
