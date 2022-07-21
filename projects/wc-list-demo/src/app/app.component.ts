import {Component} from '@angular/core';
import '@ui5/webcomponents/dist/Card.js';
import '@ui5/webcomponents/dist/CardHeader.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'wc-list-demo';
  items = new Array(10).fill(0).map((_, i) => `Item ${i}`);
}
