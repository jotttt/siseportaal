var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('js', function () {
    return gulp.src([
        'js/jquery-2.1.1.min.js',
        'js/bootstrap.min.js',
        'js/deploy_plugins/**/*.js',
        'js/main_ui.js',
        'js/widget_ui.js'
    ])
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('css', function () {
    return gulp.src(
        'css/deploy_plugins/*.css'
    )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('build'));
});
