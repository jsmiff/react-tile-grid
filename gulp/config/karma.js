var config = require('./')
var karmaWebpack = require('karma-webpack')
var webpackConfig = require('./webpack')('test')

module.exports = {
  frameworks: ['mocha', 'sinon-chai'],
  files: [
    'src/assets/scripts/**/__tests__/*'
  ],
  preprocessors: {
    'src/assets/scripts/**/__tests__/*': ['webpack']
  },
  webpack: webpackConfig,
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: ['nyan'],
  browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')]
}
