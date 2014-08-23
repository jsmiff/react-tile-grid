var gulp = require('gulp');

gulp.task('copy', function() {
	return gulp.src(['src/index.html','src/*.json'])
		.pipe(gulp.dest('dist'));
});
