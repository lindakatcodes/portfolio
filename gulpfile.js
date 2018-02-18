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
webpack = require('webpack'),
uglify = require('gulp-uglify');

// Uses all the CSS plugins so style files will work as expected
gulp.task('styles', function() {
    return gulp.src('./assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssVars, nested, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./compiledFiles/styles'));
})

// joins all my script files into a single file
gulp.task('scripts', function(callback) {
    webpack(require('./webpack.config.js'), function(err, stats) {
        if (err) {
            console.log(err.toString());
        }

        console.log(stats.toString());
        callback();
    })
})

// Watch task - showing everything for local development
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
        gulp.start('scriptsRefresh');
    })
});

// Puts a compiled CSS file into a new folder
gulp.task('cssStyles', ['styles'], function() {
    return gulp.src('./compiledFiles/styles/styles.css')
    .pipe(browserSync.stream());
})

gulp.task('scriptsRefresh', ['scripts'], function() {
    browserSync.reload();
})

// Build task - remove the previous version of my files so nothing's contaminated
gulp.task('deleteDistFolder', function() {
    return del('./docs');
});

// Build task - copies all of the needed files into a central location
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
        .pipe(gulp.dest('./docs'));
});

// Build task - triggers the usemin task, which minimizes the css and js files
gulp.task('useminTrigger', ['deleteDistFolder'], function() {
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {
    return gulp.src('./index.html')
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest('./docs'));
});

// Actual build - runs all needed tasks
gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'useminTrigger']);
