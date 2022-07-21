import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ListComponent,
    ListItemComponent
  ],
  imports: [CommonModule],
  exports: [ListComponent, ListItemComponent]
})
export class WcListModule {
}
