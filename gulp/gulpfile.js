var gulp = require('gulp'),
	sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload;


gulp.task('scripts', function() {
  return gulp.src('js/*.js')
	  .pipe(concat('../js/app.min.js'))
      //.pipe(uglify())
	  .pipe(gulp.dest('./'));
});

gulp.task('styles', function() {
    return gulp.src('sass/style.scss')
    .pipe(sass({
    	style: 'compressed'
    }))
    .pipe(gulp.dest('../css/'))
    .pipe(reload({stream:true}));
});

//Watches JS
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts', browserSync.reload]);
    gulp.watch('sass/sass/*.scss', ['styles']);
    gulp.watch('../**/*.html', ['move', browserSync.reload]);
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
		    baseDir: "../",
		    index: "index.html",
			stream: true
		}
    });
});

gulp.task('default',['scripts', 'styles', 'browser-sync', 'watch']);
