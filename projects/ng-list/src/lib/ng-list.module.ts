import {NgModule} from '@angular/core';
import {NgListComponent} from './ng-list.component';
import {ListComponent} from './components/list/list.component';
import {ListItemComponent} from './components/list-item/list-item.component';
import {ListItemTitleDirective} from "./directives/list-item-title/list-item-title.directive";
import {CommonModule} from "@angular/common";
import {SelectableListDirective} from "./directives/selectable-list/selectable-list.directive";
import {SelectableListItemDirective} from "./directives/selectable-list-item/selectable-list-item.directive";


@NgModule({
  declarations: [
    NgListComponent,
    ListComponent,
    ListItemComponent,
    ListItemTitleDirective,
    SelectableListDirective,
    SelectableListItemDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgListComponent,
    ListComponent,
    ListItemComponent,
    ListItemTitleDirective,
    SelectableListDirective,
    SelectableListItemDirective
  ]
})
export class NgListModule {
}
