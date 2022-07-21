import {InjectionToken} from "@angular/core";
import {HasTemplateRef, HasValue} from "./types";

export const ListItemTitleToken = new InjectionToken<HasTemplateRef<void>>('ListItemTitle');
export const SelectableListItemToken = new InjectionToken<HasValue>('SelectableListItem');
