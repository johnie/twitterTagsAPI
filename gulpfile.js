var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
 
gulp.task('sass', function () {
    gulp.src('public/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public'));
});

gulp.task('automate', function () {
    gulp.watch('*.scss', ['sass']);
});
 
gulp.task('min', function() {
  return gulp.src('public/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/min'));
});