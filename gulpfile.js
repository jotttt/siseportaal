var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss'),
    uncss = require('postcss-uncss');

// PROCESS JS ----------------------------------------------------
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

// PROCESS CSS --------------------------------------------------
gulp.task('css', function () {
    return gulp.src(
        'css/deploy_plugins/*.css'
    )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('build'));
});
// UNCSS
gulp.task('uncss', function () {
    var plugins = [
        uncss({
            html: ['html/*.html','html/**/*.html']
        }),
    ];
    return gulp.src('css/style.css')
        .pipe(postcss(plugins))
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        //.pipe(minifyCSS())
        .pipe(gulp.dest('uncss'));
});

// COPY LESS AND CSS TO HTDOCS FOLDERS -------------------------
gulp.task('copy', function () {
    // CSS
    gulp.src([
        'css/style.css',
        'css/style.css.map'
    ])
        .pipe(gulp.dest('../htdocs/portal/1.0/css'));
    // LESS
    gulp.src([
        'less/**/*.less'
    ])
        .pipe(gulp.dest('../htdocs/portal/1.0/less'));
});
