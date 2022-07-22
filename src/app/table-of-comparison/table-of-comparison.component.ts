import {Component, Input} from '@angular/core';
import {BundleAsset, ProjectType} from "../types";

@Component({
  selector: 'app-table-of-comparison',
  templateUrl: './table-of-comparison.component.html',
  styleUrls: ['./table-of-comparison.component.css']
})
export class TableOfComparisonComponent {
  @Input() data!: Record<ProjectType, { assets: BundleAsset[] }>;
  assetTypes = ['main', 'polyfills', 'runtime'];

  constructor() {
  }
}
