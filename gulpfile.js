/**
 * Created by miezis on 3/27/14.
 */

var gulp = require('gulp');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('init', function() {
    bower()
        .pipe(gulp.dest('app/Resources/lib/'))
});

gulp.task('default', function() {
    gulp.src('app/Resources/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('web/css'));

    gulp.src(['app/Resources/lib/jquery/jquery.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('web/js'));

    gulp.src('app/Resources/lib/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*')
        .pipe(gulp.dest('web/fonts'));
});