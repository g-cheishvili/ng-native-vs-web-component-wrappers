export interface BundleAsset {
  type: 'main' | 'polyfills' | 'runtime';
  label: string,
  size: number,
  parsed: number,
  gzipSize: number
  deltas: {
    size: {
      bytes: number,
      percentage: number
    },
    parsed: {
      bytes: number,
      percentage: number
    },
    gzipSize: {
      bytes: number,
      percentage: number
    }
  }
}

export type TechType = 'angularComponents' | 'webComponents';

export type ProjectType = 'withoutSelection' | 'withSelection';

export type AnalyzedData = Record<TechType, Record<ProjectType, { projectName: string, assets: BundleAsset[] }>>;
