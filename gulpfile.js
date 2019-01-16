const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
const del = require('del');
const rev = require('gulp-rev');
const prefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify-es').default;
//const concat = require('gulp-concat');
const resizeImg = require('gulp-image-resize');
const reduceImg = require('gulp-imagemin');
const renameImg = require('gulp-rename');


// Watch task - sets up browserSync & reloads on changes
gulp.task('watch', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './site'
        },
        port: 8080
    });

    watch('./site/index.html', function() {
        browserSync.reload();
    });

    watch('./site/assets/styles/**/*.css', function() {
        gulp.start('cssStyles');
    });

    watch('./site/assets/scripts/**/*.js', function() {
        gulp.start('scriptsRefresh');
    });
});

// Concat & minify CSS files
gulp.task('styles', function() {
    return gulp.src('./site/assets/styles/styles.css')
    .pipe(prefixer())
    .pipe(csso())
    .pipe(rev())
    .pipe(gulp.dest('./site/compiledFiles/styles'));
});

// get compiled CSS file and send to browserSync for live reload
gulp.task('cssStyles', gulp.series('styles', function() {
    return gulp.src('./site/compiledFiles/styles/styles.css')
    .pipe(browserSync.stream());
}));

// Minify JS files and output compiled file
gulp.task('scripts', function() {
    return gulp.src('./site/assets/scripts/scripts.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./site/compiledFiles/scripts'))
});

// get compiled file and send to browserSync for live reload
gulp.task('scriptsRefresh', gulp.series('scripts', function() {
    browserSync.reload();
}));

// Build tasks - remove the previous version of my files so nothing's contaminated
gulp.task('deleteDistFolder', function() {
    return del('./docs');
});

gulp.task('deleteOptImgs', function() {
    return del('./site/assets/images/optimized');
});

// Task to reduce, resize, and rename images
gulp.task('reduce-images', gulp.series('deleteOptImgs', function(done) {
    gulp.src('./site/assets/images/**/*.+(jpg|png)') 
        .pipe(resizeImg({ 
            width: 800, 
            quality: 0.5
        }))
        .pipe(reduceImg()) 
        .pipe(renameImg(function (path) { path.basename += "-optimized"; })) 
        .pipe(gulp.dest('./site/assets/images/optimized'))
        done();
}));

// Build task - copies all of the needed files into a central location
gulp.task('copyFiles', gulp.series('deleteDistFolder', function() {
    var pathsToCopy = [
        './site/index.html',
        './site/compiledFiles/scripts/**',
        './site/compiledFiles/styles/**',
        './site/assets/images/optimized/**'
    ]

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./docs'));
}));

// Actual build - runs all needed tasks
gulp.task('build', gulp.series('deleteDistFolder', 'deleteOptImgs', 'reduce-images', 'styles', 'scripts', 'copyFiles'));
