import {TemplateRef} from "@angular/core";

export interface HasTemplateRef<TemplateRefContext = any> {
  readonly templateRef: TemplateRef<TemplateRefContext>
}
