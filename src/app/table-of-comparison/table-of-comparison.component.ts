import {Component, Input} from '@angular/core';
import {BundleAsset, ProjectType} from "../types";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-table-of-comparison',
  templateUrl: './table-of-comparison.component.html',
  styleUrls: ['./table-of-comparison.component.css']
})
export class TableOfComparisonComponent {
  @Input() data!: Record<ProjectType, { projectName: string; assets: BundleAsset[] }>;
  assetTypes = ['main', 'polyfills', 'runtime'];

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  projectStatsLink(projectName: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`/${projectName}/stats.html`);
  }
}
