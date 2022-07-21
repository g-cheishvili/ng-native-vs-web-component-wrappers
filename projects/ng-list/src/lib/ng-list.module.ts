import {NgModule} from '@angular/core';
import {NgListComponent} from './ng-list.component';
import {ListComponent} from './components/list/list.component';
import {ListItemComponent} from './components/list-item/list-item.component';
import {ListItemTitleDirective} from "./directives/list-item-title/list-item-title.directive";
import {CommonModule} from "@angular/common";
import {SelectableListDirective} from "./directives/selectable-list/selectable-list.directive";


@NgModule({
  declarations: [
    NgListComponent,
    ListComponent,
    ListItemComponent,
    ListItemTitleDirective,
    SelectableListDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgListComponent,
    ListComponent,
    ListItemComponent,
    ListItemTitleDirective,
    SelectableListDirective
  ]
})
export class NgListModule {
}
