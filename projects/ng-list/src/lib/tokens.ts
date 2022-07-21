import {InjectionToken} from "@angular/core";
import {HasTemplateRef} from "./types";

export const ListItemTitle = new InjectionToken<HasTemplateRef<void>>('ListItemTitle');
