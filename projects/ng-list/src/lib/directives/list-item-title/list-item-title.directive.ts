import {Directive, forwardRef, TemplateRef} from "@angular/core";
import {HasTemplateRef} from "../../types";
import {ListItemTitleToken} from "../../tokens";

@Directive({
  selector: '[ng-list-item-title]',
  providers: [{provide: ListItemTitleToken, useExisting: forwardRef(() => ListItemTitleDirective)}]
})
export class ListItemTitleDirective implements HasTemplateRef<void> {
  constructor(readonly templateRef: TemplateRef<void>) {
  }
}
