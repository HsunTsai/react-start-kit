// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.

const presets = ['@babel/preset-react'];
const plugins = [
  'react-hot-loader/babel',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import',
];

module.exports = function (api) {
  if (api.env('test')) {
    presets.push('@babel/preset-env');
    // test
  } else {
    // development
    presets.push([
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
        },
      },
    ]);
  }
  return {
    presets,
    plugins,
  };
};
