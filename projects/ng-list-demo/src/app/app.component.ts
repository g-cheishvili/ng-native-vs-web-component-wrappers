import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-list-demo';
  items = new Array(10).fill(0).map((_, i) => `Item ${i}`);
}
