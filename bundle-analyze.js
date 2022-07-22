const {getViewerData} = require('webpack-bundle-analyzer/lib/analyzer');
const fs = require('fs');
const zlib = require('zlib');

const statsFolders = [
  'ng-list-demo',
  'ng-selectable-list-demo',
  'wc-list-demo',
  'wc-selectable-list-demo'
];
const getType = (fileName) => {
  if (fileName.startsWith('main')) {
    return 'main';
  }
  if (fileName.startsWith('polyfills')) {
    return 'polyfills';
  }
  if (fileName.startsWith('runtime')) {
    return 'runtime';
  }
}

const deltas = (before, after) => {
  const bytes = before - after;
  const percentage = Math.round(bytes / (before / 100))
  return {bytes, percentage};
}

const calculateDeltas = obj => {
  return {
    ...obj,
    withoutSelection: {
      ...obj.withoutSelection,
      assets: obj.withoutSelection.assets.map((asset, index) => {
        return {
          ...asset,
          deltas: {
            size: deltas(obj.withSelection.assets[index].size, asset.size),
            parsed: deltas(obj.withSelection.assets[index].parsed, asset.parsed),
            gzipSize: deltas(obj.withSelection.assets[index].gzipSize, asset.gzipSize)
          }
        }
      })
    }
  }
}

const analyzed = statsFolders.map(
  statsFolder => {
    const statsForNgList = JSON.parse(fs.readFileSync(`./dist/${statsFolder}/stats.json`, 'utf8'));
    return {
      projectName: statsFolder,
      assets: getViewerData(statsForNgList).map(asset => {
        const src = fs.readFileSync(`./dist/${statsFolder}/${asset.label}`, 'utf8');
        return {
          type: getType(asset.label),
          label: asset.label,
          size: asset.statSize,
          parsed: src.length,
          gzipSize: zlib.gzipSync(src, {level: 9}).length
        }
      })
    };
  }
);

const standardized = analyzed.reduce((acc, next) => {
  const target = next.projectName.includes('wc') ? acc['webComponents'] : acc['angularComponents'];
  const withSelection = next.projectName.includes('selectable');
  target[withSelection ? 'withSelection' : 'withoutSelection'] = next;
  return acc;
}, {angularComponents: {}, webComponents: {}});

standardized.angularComponents = calculateDeltas(standardized.angularComponents);
standardized.webComponents = calculateDeltas(standardized.webComponents);

fs.writeFileSync('./src/app/data.json', JSON.stringify(standardized));

