var gulp = require('gulp');
var karma	= require('gulp-karma');
var react = require('gulp-react');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var glob = require('glob');
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');

gulp.task('bundle-test', function() {

	var bundleMethod = global.isWatching ? watchify : browserify;

	var bundler = bundleMethod({
		// Specify the entry point of your app
		// TODO bundle all test-*.jsx files
		entries: ['./test/test-TileView.jsx'],
		// Add file extentions to make optional in your requires
		extensions: ['.js', '.hbs', '.jsx']
	});

	var bundle = function() {
		// Log when bundling starts
		bundleLogger.start();

		return bundler
			// Enable source maps!
			.bundle({debug: true})
			// Report compile errors
			.on('error', handleErrors)
			// Use vinyl-source-stream to make the
			// stream gulp compatible. Specifiy the
			// desired output filename here.
			.pipe(source('bundle-tests.js'))
			// Specify the output destination
			.pipe(gulp.dest('./test/build'))
			// Log when bundling completes!
			.on('end', bundleLogger.end);
	};

	if(global.isWatching) {
		// Rebundle with watchify on changes.
		bundler.on('update', bundle);
	}

	return bundle();

});

gulp.task('test', ['bundle-test'], function() {

	return gulp.src(['test/build/*.js'])
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}))
		.on('error', function(err) {

			console.log(err);

			// Make sure failed tests cause gulp to exit non-zero
			throw err;
		});

});
