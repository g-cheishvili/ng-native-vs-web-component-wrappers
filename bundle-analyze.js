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
const calculateDeltas = obj => {
  return {
    ...obj,
    withoutSelection: {
      ...obj.withoutSelection,
      assets: obj.withoutSelection.assets.map((asset, index) => {
        return {
          ...asset,
          deltas: {
            size: {
              bytes: asset.size - obj.withSelection.assets[index].size,
              percentage: Math.round((asset.size - obj.withSelection.assets[index].size) / asset.size * 100)
            },
            parsed: {
              bytes: asset.parsed - obj.withSelection.assets[index].parsed,
              percentage: Math.round((asset.parsed - obj.withSelection.assets[index].parsed) / asset.parsed * 100)
            },
            gzipSize: {
              bytes: asset.gzipSize - obj.withSelection.assets[index].gzipSize,
              percentage: Math.round((asset.gzipSize - obj.withSelection.assets[index].gzipSize) / asset.gzipSize * 100)
            }
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

