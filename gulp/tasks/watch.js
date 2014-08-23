var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
	gulp.watch('src/styles/**', ['compass']);
	gulp.watch('src/img/**', ['images']);
	gulp.watch('src/index.html', ['copy']);

	// Note: The browserify task handles jsx recompiling with reactify
	// gulp.watch('src/**/*.jsx', ['jsx']);

});
