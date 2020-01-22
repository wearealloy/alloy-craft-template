'use strict';

//**************************************

// VARIABLES 

  // Destination path variables.
    
  var pathToCms = {
    js: 'cms/web/assets/js',
    css: 'cms/web/assets/css',
    media: 'cms/web/media',
    fonts: 'cms/web/assets/fonts',
    img: 'cms/web/assets/img',
    html: 'cms/templates/',
    indexHtml: './templates/index.html', // this path has to be in relation to the index.html file found in the cms folder
    devFiles: 'cms/dev_files'
  }

  //global variables

  var vHost = 'vHost address here';

//*************************************

var gulp = require('gulp');
const chmod = require('gulp-chmod');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var twig = require('gulp-twig');
var browserSync = require('browser-sync').create();
// var babel = require('gulp-babel');
// var order = require("gulp-order");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var imageminMozjpeg = require('imagemin-mozjpeg');
var cache = require('gulp-cache');
var mode = require('gulp-mode')({
  modes: ["production", "development"],
  default: "development",
  verbose: false
});
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
const webpack2 = require('webpack');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
// const webpackConfig = require('./webpack.config.js');

//*************************************

let webpackConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}

gulp.task('scripts', function() {
  return gulp.src('dev/assets/_js/main.js')
    .pipe(plumber())
    .pipe(named())
    .pipe(sourcemaps.init())
      .pipe(webpackStream(webpackConfig, webpack2))
      .pipe((mode.production(uglify())))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pathToCms.js))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('copyScripts', function() {
  return gulp.src('dev/assets/_js/scripts/**/*.js')
  .pipe(gulp.dest(pathToCms.js + '/scripts'))
})


gulp.task('templates', function() {

  return gulp.src('dev/templates/**/*.html') // run the Twig template parser on all .html files in the "src" directory
      .pipe(twig())
      .pipe(gulp.dest(pathToCms.html)) // output the rendered HTML files to the "dist" directory
      .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('revRewrite', ['sass', 'copyHTML'], function() {
  console.log('runninr rewrite')
  const manifest = gulp.src('cms/web/assets/css/rev-manifest.json');
 
  return gulp.src('cms/templates/_layout.html')
    .pipe(revRewrite({ manifest }))
    .pipe(gulp.dest(pathToCms.html));
});

gulp.task('copyHTML', function(){
  
  return gulp.src('dev/templates/**/*.html')
  .pipe(gulp.dest(pathToCms.html))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('sass', function(){

  return gulp.src('dev/assets/_scss/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass()) // Using gulp-sass
      .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe((mode.production(cleanCSS())))
    .pipe(rev())
    .pipe(gulp.dest(pathToCms.css))
    .pipe(rev.manifest())
    .pipe(gulp.dest(pathToCms.css))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('copyFonts', function(){
  return gulp.src('dev/assets/fonts/**/*')
    .pipe(gulp.dest(pathToCms.fonts))
});

gulp.task('img', () =>
    gulp.src('dev/assets/img/**/*.+(png|jpg|gif|svg)')
        // .pipe(chmod(777))
        .pipe(gulp.dest(pathToCms.img))
        .pipe(browserSync.reload({
        stream: true
      }))
);

gulp.task('media', () =>
    gulp.src('cms/web/media/**/*')
        // .pipe(chmod(777))
        .pipe(browserSync.reload({
        stream: true
      }))
);

gulp.task('clean', function(){
 return del.sync(['cms/web/assets/', 'cms/templates', 'cms/dev_files']);
});

gulp.task('cleanCss', function(){
 return del.sync(['cms/web/assets/css/']);
});

// gulp.task('cleanDev', function(){
//  return del.sync(['dev']);
// });

gulp.task('browserSync', function() {
  browserSync.init({
      // baseDir: 'cms',
      // index: pathToCms.indexHtml
      proxy: vHost
      // host: vHost
  });
});

// gulp.task('copyDevFiles', function(){
//   return gulp.src('dev/**/*')
//     .pipe(gulp.dest(pathToCms.devFiles))
// });


// gulp.task('copyCMSFiles', function(){
//   return gulp.src('cms/dev_files/**/*')
//     .pipe(gulp.dest('dev'))
// });


// Taks to run on command line

gulp.task('watch', ['clean', 'sass', 'scripts', 'copyScripts', 'img', 'media', 'copyFonts', 'copyHTML', 'revRewrite', 'browserSync'], function(){
  gulp.watch('dev/assets/_scss/**/*.+(css|scss|sass)', ['cleanCss','sass', 'copyHTML', 'revRewrite']);
  gulp.watch('dev/assets/_js/**/*.js', ['scripts']);
  gulp.watch('dev/assets/img/**/*.+(png|jpg|gif|svg)', ['img']);
  gulp.watch('dev/assets/fonts/**/*.+(eot|svg|ttf|woff)')
  gulp.watch('cms/web/media/**/*.+(png|jpg|gif|svg|mp4)', ['media']);
  gulp.watch('dev/templates/**/*.html', ['copyHTML', 'revRewrite']);
});

gulp.task('build', ['clean', 'sass', 'scripts', 'copyScripts', 'img', 'media', 'copyHTML', 'copyFonts', 'revRewrite']);

// gulp.task('buildDev', ['cleanDev', 'copyCMSFiles']);

// http://analyticl.com/blog/frontend-templating-with-gulp-and-twig-js