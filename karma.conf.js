// karma.conf.js

var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-chrome-launcher'
    ],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack']
    },
    reporters: ['dots'],
    webpack: {
      module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: ['babel-preset-es2015', "babel-preset-stage-1"].map(require.resolve),
              cacheDirectory: true
            }
        }]
      },
      // watch: true
    },
    webpackServer: {
      noInfo: true
    },
    webpackPort: 1234,
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
  });
};
