import {Component, ContentChild, OnInit, ViewEncapsulation} from '@angular/core';
import {ListItemTitle} from "../../tokens";
import {HasTemplateRef} from "../../types";

@Component({
  selector: 'li[ng-list-item]',
  templateUrl: './list-item.component.html',
  host: {
    '[class.fd-list__item]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class ListItemComponent implements OnInit {
  @ContentChild(ListItemTitle) title?: HasTemplateRef<void>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
