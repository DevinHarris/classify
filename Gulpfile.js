const gulp = require('gulp'),
	sass = require('gulp-sass'),
	bs = require('browser-sync').create();


// sass task

gulp.task('sass', () => {
	return gulp.src('public/sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./public/css'))
		.pipe(bs.reload({stream: true}))
});

// default task with browser-sync

gulp.task('default', () => {
	console.log('working');

	bs.init({
		server: {
			baseDir: './'
		},

		https: true

	})

	gulp.watch('./public/sass/**/*.scss', ['sass']).on('change', bs.reload);
	gulp.watch('./public/js/**/*.js').on('change', bs.reload);
	gulp.watch('./*.html').on('change', bs.reload)
})