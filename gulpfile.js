const gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create(),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssVars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify');

gulp.task('styles', function() {
    return gulp.src('./assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssVars, nested, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./compiledFiles/styles'));
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

    watch('./assets/styles/**/*.css', function() {
        gulp.start('cssStyles');
    });

    watch('./assets/scripts/**/*.js', function() {
        browserSync.reload();
    })
});

gulp.task('cssStyles', ['styles'], function() {
    return gulp.src('./compiledFiles/styles/styles.css')
    .pipe(browserSync.stream());
})

gulp.task('deleteDistFolder', function() {
    return del('./currentbuild');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    var pathsToCopy = [
        './**/*',
        '!./index.html',
        '!./assets/styles/**',
        '!./assets/scripts/**',
        '!./compiledFiles',
        '!./compiledFiles/**'
    ]

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./currentbuild'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {
    return gulp.src('./index.html')
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest('./currentbuild'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'useminTrigger']);
