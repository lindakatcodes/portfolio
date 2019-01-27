const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const prefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');
const resizeImg = require('gulp-image-resize');
const reduceImg = require('gulp-imagemin');
const renameImg = require('gulp-rename');

// defining reload as it's own function
function reload(done) {
    browserSync.reload();
    done();
}

// take working CSS files, prefix & compress, then send to dist
function prepCSS() {
    return src('./site/css/styles.css', { sourcemaps: true })
    .pipe(prefixer())
    .pipe(csso())
    .pipe(dest('./dist/css', { sourcemaps: '.' }));
}

// take working JS files, compress, then send to dist
function prepJS() {
    return src('./site/js/scripts.js', { sourcemaps: true })
    .pipe(uglify())
    .pipe(dest('./dist/js', { sourcemaps: '.' }));
}

// grab HTML files, minify, then send to dist
function prepHTML() {
    return src('./site/index-new.html', { sourcemaps: true })
    .pipe(htmlmin())
    .pipe(dest('./dist', { sourcemaps: '.' }));
}

// optimize images (med & small sizes) & mark filename for size
function optMedImages(cb) {
    src('./site/assets/images/**/*.+(jpg|png)') 
        // mid size files
        .pipe(resizeImg({ 
            percentage: 75, 
            quality: 0.75
        }))
        .pipe(reduceImg()) 
        .pipe(renameImg(function (path) { path.basename += "-med"; })) 
        .pipe(dest('./site/assets/images/optimized'))
        .pipe(dest('./dist/assets/images'))
        cb();
}

function optSmallImages(cb) {
    src('./site/assets/images/**/*.+(jpg|png)')
    // small files
    .pipe(resizeImg({ 
        percentage: 50, 
        quality: 0.5
    }))
    .pipe(reduceImg()) 
    .pipe(renameImg(function (path) { path.basename += "-small"; }))
    .pipe(dest('./site/assets/images/optimized'))
    .pipe(dest('./dist/assets/images'))
    cb();
}

// copy icon images over to dist folder
function copyIcons() {
    return src('./site/assets/icons/*.svg')
    .pipe(dest('./dist/assets/icons'));
}

// clean functions - remove current folders, to avoid contamination of data
function cleanDistFiles() {
    return del('./dist/*.html', './dist/css', './dist/js')
}

function cleanImages() {
    return del('./site/assets/images/optimized', './dist/assets/images')
}

// browser-sync & watch function for live testing
function watcher() {
    browserSync.init({
        server: {
            baseDir: './site',
            index: 'index-new.html'
        },
        port: 8080
    });

    watch('./site/*.html', { delay: 100 }, series(prepHTML, reload));
    watch('./site/css/*.css', { delay: 100 }, series(prepCSS, reload));
    watch('./site/js/*js', { delay: 100 }, series(prepJS, reload));
}

// exports / task names
exports.prepImages = series(cleanImages, parallel(optMedImages, optSmallImages));

exports.prepFiles = series(cleanDistFiles, parallel(prepHTML, prepCSS, prepJS));

exports.fullBuild = series(parallel(cleanDistFiles, cleanImages), 
    parallel(prepHTML, prepCSS, prepJS, optMedImages, optSmallImages, copyIcons));

exports.watch = watcher;