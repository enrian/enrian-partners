// initialize modules
const { src, dest, watch , series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const flexbugsFixes = require('postcss-flexbugs-fixes');
const favicons = require('gulp-favicons');
const babel = require('gulp-babel');
const webp = require('gulp-webp');

// File path variables
const files = {
  scssManualPath: 'www/scss/**/*.scss',
  scssManualMain: 'www/scss/main.scss',
  jsPath: 'www/js/',
  nodePath: 'www/node/',
  jsVendorsPath: 'www/js/vendor/**/*.js',
  jsResultPath: 'dist/www/js/*.js',
  pugPath: './**/*.pug',
  htmlSrc: './*.html',
  htmlDistPath: 'dist/**/*.html',
  imgSrc: 'www/img/**/*.*',
  logoSrc: 'www/logos/**.*',
  svgSrc: 'www/svg/**.*',
  faviconsSrc: 'www/favicons/*.*',
  fontsSrc: 'www/fonts/*.*',
}

// Sass task
function scssManualTask() {
  return src(files.scssManualMain)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer(), flexbugsFixes() ,cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/www/css'))
    .pipe(browserSync.stream()
  );
}

function jsVendorsTask() {
  return src(files.jsVendorsPath)
    .pipe(concat('vendors.js'))
    .pipe(dest('./www/js'))
}

// Uses babel on js files exept vendors is js/
function jsBabel() {
  return src(files.jsPath + '!(vendors)*.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(dest(files.jsPath))
}

// JS task - just concating files together
function jsTask() {
  return src([
      files.jsPath + '*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/www/js')
  );
}

// Pug task
function pugTask() {
  return src('*.pug')
    .pipe(pug({
      pretty: true,
    }))
    .pipe(dest('./dist')
  );
}

// HTML Task
function htmlTask() {
  return src(files.htmlSrc)
    .pipe(dest('./dist'))
}

function imgsTask() {
  return src(files.imgSrc)
    .pipe(dest('./dist/www/img'))
}

function imgsWebpTask() {
  return src(files.imgSrc)
    .pipe(webp())
    .pipe(dest('./dist/www/img'))
}

function logosTash() {
  return src(files.logoSrc)
    .pipe(dest('./dist/www/logos'))
}

function svgTask() {
  return src(files.svgSrc)
    .pipe(dest('./dist/www/svg'))
}

function faviconTask() {
  return src(files.faviconsSrc)
    .pipe(dest('./dist/www/favicons'))
}

function fontsTask() {
  return src(files.fontsSrc)
    .pipe(dest('./dist/www/fonts'))
}

function generateFavicons() {
  return src('./www/favicons/favicon.svg')
    .pipe(
      favicons({
        appName: 'Enrian web',
        appShortName: 'Enrian web',
        appDescription: 'Enrian Partners a.s. website',
        developerName: 'Enrian Partners a.s.',
        developerURL: 'https://enrian.com/',
        background: '#ffffff',
        path: '/www/favicons',
        url: 'https://enrian.com/',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/?homescreen=1',
        version: 1.0,
        logging: false,
        html: 'index.html',
        pipeHTML: true,
        replace: true,
      }) 
    )
    .pipe(dest('./www/favicons'))
}

function nodeApp() {
  return src('./app.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(dest('./dist'))
}

function nodeConfig() {
  return src(`${files.nodePath}config.js`)
    .pipe(dest('./dist/www/node'))
}

// Watch task
function watchTask() {
  browserSync.init({
    server: {
      baseDir: './dist/',
      // directory: true, // shows file structure -> for debugging
    }
  });

  watch(files.scssManualPath, scssManualTask);
  watch(files.jsPath, jsTask);
  watch(files.htmlSrc, htmlTask);
  watch(files.htmlDistPath).on('change', browserSync.reload);
  watch(files.jsPath).on('change', browserSync.reload);
}

// Default task
exports.default = series(
  htmlTask,
  jsVendorsTask,
  jsBabel,
  parallel(imgsTask, imgsWebpTask, logosTash, svgTask, faviconTask, fontsTask),
  parallel(scssManualTask, jsTask),
  watchTask
);

// Build Task
exports.build = series(
  htmlTask,
  jsVendorsTask,
  jsBabel,
  parallel(imgsTask, imgsWebpTask, logosTash, svgTask, faviconTask, fontsTask),
  nodeConfig,
  parallel(scssManualTask, jsTask)
);

exports.scssManualTask = scssManualTask;
exports.htmlTask = htmlTask;
exports.imgsTask = imgsTask;
exports.jsTask = jsTask;
exports.generateFavicons = generateFavicons;
exports.jsVendorsTask = jsVendorsTask;
