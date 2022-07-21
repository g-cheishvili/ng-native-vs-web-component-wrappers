import {TemplateRef} from "@angular/core";
import {Observable} from "rxjs";

export interface HasTemplateRef<TemplateRefContext = any> {
  readonly templateRef: TemplateRef<TemplateRefContext>
}

export interface HasValue<ValueType = any> {
  readonly value: ValueType;
}

export interface SelectableItem<ValueType = any> extends HasValue<ValueType> {
  clicked: Observable<void>;
  get selectable(): boolean;
  get selected(): boolean
  select: () => void;
  deselect: () => void;
}
