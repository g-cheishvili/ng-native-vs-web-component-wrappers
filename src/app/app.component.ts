import {Component} from '@angular/core';
import data from './data.json';
import {AnalyzedData} from "./types";
import packageJson from '../../package.json';
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: AnalyzedData = data as any;
  repoUrl = this.sanitizer.bypassSecurityTrustUrl(packageJson.repository.url);
  constructor(private sanitizer: DomSanitizer) {
  }
}
