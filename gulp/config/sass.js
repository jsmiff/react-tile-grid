var config = require('./')

module.exports = {
  autoprefixer: { browsers: ['last 2 version'] },
  src: config.sourceAssets + "/styles/**/*.{sass,scss}",
  dest: config.publicAssets + '/styles',
  settings: {
    indentedSyntax: true, // Enable .sass syntax!
    imagePath: 'assets/img' // Used by the image-url helper
  }
}