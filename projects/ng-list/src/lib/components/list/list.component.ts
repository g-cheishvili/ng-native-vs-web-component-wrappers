import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ul[ng-list]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./list.component.scss'],
  host: {
    '[class.fd-list]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  @Input()
  set someDistinctNameForInput(val: string) {
    console.log({val})
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
