import {Component} from '@angular/core';
import ngListDemoStats from 'dist/ng-list-demo/stats.json';
import ngSelectableListDemoStats from 'dist/ng-selectable-list-demo/stats.json';
import wcListDemoStats from 'dist/wc-list-demo/stats.json';
import wcSelectableListDemoStats from 'dist/wc-selectable-list-demo/stats.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stats: Record<string, any> = {
    ngListDemoStats,
    ngSelectableListDemoStats,
    wcListDemoStats,
    wcSelectableListDemoStats
  };
  mainFileSizes: string[] = [];

  constructor() {
    Object.keys(this.stats).forEach((statsFileName: string) => {
      const statsFile = this.stats[statsFileName];
      const main = statsFile.chunks.map((chunk: any) => ({
        name: chunk.names[0],
        size: Math.round(chunk.size / 1024)
      })).find((c: any) => c.name === 'main');
      this.mainFileSizes.push(`size of ${statsFileName}'s main.js = ${main.size} kb`);
    });
  }
}
