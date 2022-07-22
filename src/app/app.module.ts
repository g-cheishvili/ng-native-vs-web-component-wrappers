import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule, CardModule, LinkModule, ShellbarModule, TableModule} from "@fundamental-ngx/core";
import {InKbPipe} from './in-kb.pipe';
import {TableOfComparisonComponent} from './table-of-comparison/table-of-comparison.component';

@NgModule({
  declarations: [
    AppComponent,
    InKbPipe,
    TableOfComparisonComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    CardModule,
    TableModule,
    ShellbarModule,
    ButtonModule,
    LinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
