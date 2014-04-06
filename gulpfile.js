/**
 * Created by miezis on 3/27/14.
 */

var gulp = require('gulp');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

gulp.task('init', function() {
    bower()
        .pipe(gulp.dest('app/Resources/lib/'))
});

gulp.task('default', function() {

    gulp.src(['app/Resources/lib/jquery/jquery.js',
            'app/Resources/lib/seiyria-bootstrap-slider/js/bootstrap-slider.js',
            'app/Resources/js/search-form.js',
            'app/Resources/js/typeahead.js',
            'app/Resources/lib/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js',
            'app/Resources/lib/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js',
            'app/Resources/lib/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js',
            'app/Resources/lib/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js',
            'app/Resources/lib/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
            'app/Resources/lib/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js',
            'app/Resources/lib/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js',
            'app/Resources/lib/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js',
            'app/Resources/lib/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js',
            'app/Resources/lib/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js',
            'app/Resources/lib/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js',
            'app/Resources/lib/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js',
            'app/Resources/lib/jquery-ui/ui/jquery.ui.slider.js'

        ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('web/js'));

    gulp.src('app/Resources/lib/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*')
        .pipe(gulp.dest('web/fonts'));

});

gulp.task('watch', function() {
    gulp.src('app/Resources/style.scss')
        .pipe(watch(function(files) {
            return files.pipe(sass())
                .pipe(gulp.dest('web/css'));
        }));
});

