var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

 
gulp.task('sass', function () {
    gulp.src('public/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/css'));
});
 
gulp.task('min', function() {
  return gulp.src('public/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
  gulp.watch('public/*.js', ['min']);
  gulp.watch('public/*.scss', ['sass']);
});

// Default Tasks
gulp.task('default', ['sass', 'watch', 'min']);

