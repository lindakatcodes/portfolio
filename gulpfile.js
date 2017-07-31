const gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create(),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssVars = require('postcss-simple-vars');

gulp.task('styles', function() {
    return gulp.src('./styleguide.css')
    .pipe(postcss([cssVars, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./styles'));
})

gulp.task('watch', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './'
        }
    });

    watch('./index.html', function() {
        browserSync.reload();
    });

    watch('./styleguide.css', function() {
        gulp.start('cssStyles');
    });
});

gulp.task('cssStyles', ['styles'], function() {
    return gulp.src('./styles/styleguide.css')
    .pipe(browserSync.stream());
})