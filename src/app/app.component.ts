import {Component} from '@angular/core';
import data from './data.json';
import {AnalyzedData} from "./types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: AnalyzedData = data as any;
}
