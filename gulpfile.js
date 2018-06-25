var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
// PostCss
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
	
	browserSync.init({
		server: "."
	});
	
	gulp.watch("app/scss/*.scss", ['sass']);
	gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("app/scss/*.scss")
		.pipe(postcss().pipe(sass().on('error', sass.logError)))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'safari >= 7.1', 'ie >= 10', 'opera >= 20', 'ios 8', 'android 4.4.4'],
			cascade: false
		}))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

// PostCss
gulp.task('css', function () {
	var postcss    = require('gulp-postcss');
	var sourcemaps = require('gulp-sourcemaps');
	
	return gulp.src('src/**/*.css')
		.pipe( sourcemaps.init() )
		.pipe( postcss([ require('precss'), require('autoprefixer') ]) )
		.pipe( sourcemaps.write('.') )
		.pipe( gulp.dest('build/') );
});
gulp.task('default', ['serve']);
