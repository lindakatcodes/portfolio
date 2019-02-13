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
    .pipe(dest('./docs/css', { sourcemaps: '.' }));
}

// take working JS files, compress, then send to docs
function prepJS() {
    return src('./site/js/scripts.js', { sourcemaps: true })
    .pipe(uglify())
    .pipe(dest('./docs/js', { sourcemaps: '.' }));
}

// grab HTML files, minify, then send to docs
function prepHTML() {
    return src('./site/index.html')
    .pipe(htmlmin())
    .pipe(dest('./docs'));
}

//copy datafile to docs folder
function prepData() {
    return (src('./site/assets/data/datafile.json'))
    .pipe(dest('./docs/assets/data'));
}


// optimize images (med & small sizes) & mark filename for size
function optMedImages(cb) {
    src('./site/assets/images/**/*.+(jpg|png)') 
        // mid size files
        .pipe(resizeImg({ 
            width: 800, 
            quality: 0.85
        }))
        .pipe(reduceImg()) 
        .pipe(renameImg(function (path) { path.basename += "-med"; })) 
        .pipe(dest('./site/assets/images/optimized'))
        .pipe(dest('./docs/assets/images'))
        cb();
}

function optSmallImages(cb) {
    src('./site/assets/images/**/*.+(jpg|png)')
    // small files
    .pipe(resizeImg({ 
        width: 420,
        quality: 0.75
    }))
    .pipe(reduceImg()) 
    .pipe(renameImg(function (path) { path.basename += "-small"; }))
    .pipe(dest('./site/assets/images/optimized'))
    .pipe(dest('./docs/assets/images'))
    cb();
}

// make sure to copy the original version of the images to the docs folder
function copyPhotos(cb) {
    src('./site/assets/images/**/*')
    .pipe(dest('./docs/assets/images'));
    cb();
}

// copy icon images over to docs folder
function copyIcons() {
    return src('./site/assets/icons/*.svg')
    .pipe(dest('./docs/assets/icons'));
}

// clean functions - remove current folders, to avoid contamination of data
function cleanDistFiles() {
    return del('./docs/*.html', './docs/*.map', './docs/css/**/*', './docs/js/**/*', './docs/assets/data/**/*')
}

function cleanImages() {
    return del('./site/assets/images/optimized/**/*', './docs/assets/images/**/*')
}

// browser-sync & watch function for live testing
function watcher() {
    browserSync.init({
        server: {
            baseDir: './docs',
            index: 'index.html'
        },
        port: 8080
    });

    watch('./site/*.html', { delay: 100 }, series(prepHTML, reload));
    watch('./site/css/*.css', { delay: 100 }, series(prepCSS, reload));
    watch('./site/js/*js', { delay: 100 }, series(prepJS, reload));
    watch('./site/assets/data/datafile.json', { delay: 100 }, series(prepData, reload));
}

// exports / task names
exports.prepImages = series(cleanImages, parallel(optMedImages, optSmallImages, copyPhotos));

exports.prepFiles = series(cleanDistFiles, parallel(prepHTML, prepCSS, prepJS, prepData));

exports.cleanDocs = parallel(cleanImages, cleanDistFiles);

exports.makesite = series(parallel(cleanDistFiles, cleanImages), 
    parallel(prepHTML, prepCSS, prepJS, prepData, optMedImages, optSmallImages, copyIcons, copyPhotos));

exports.watch = watcher;