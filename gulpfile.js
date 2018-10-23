//**************************************

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


//*************************************

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var twig = require('gulp-twig');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
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


gulp.task('scripts', function(){
	return gulp.src('dev/assets/_js/main.js')
		.pipe(babel({presets: ['@babel/env']}))
    .pipe((mode.production(uglify())))
		.pipe(gulp.dest(pathToCms.js))
		.pipe(browserSync.reload({
	      stream: true
	    }))
})


gulp.task('templates', function() {
    return gulp.src('dev/templates/**/*.html') // run the Twig template parser on all .html files in the "src" directory
        .pipe(twig())
        .pipe(gulp.dest(pathToCms.html)) // output the rendered HTML files to the "dist" directory
        .pipe(browserSync.reload({
	      stream: true
	    }))
});

gulp.task('copyHTML', function(){
  return gulp.src('dev/templates/**/*.html')
  .pipe(gulp.dest(pathToCms.html))
});

gulp.task('sass', function(){
  return gulp.src('dev/assets/_scss/main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass()) // Using gulp-sass
      .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe((mode.production(cleanCSS())))
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
        .pipe((mode.production(imagemin([imageminMozjpeg(), imagemin.optipng()]))))
        .pipe(gulp.dest(pathToCms.img))
        .pipe(browserSync.reload({
	      stream: true
	    }))
);

gulp.task('media', () =>
    gulp.src('dev/media/**/*.+(png|jpg|gif|svg)')
        .pipe((mode.production(imagemin([imageminMozjpeg(), imagemin.optipng()]))))
        .pipe(gulp.dest(pathToCms.media))
        .pipe(browserSync.reload({
	      stream: true
	    }))
);

gulp.task('clean', function(){
 return del.sync(['cms/web/assets/', 'cms/web/media', 'cms/templates', 'cms/dev_files']);
});

gulp.task('cleanDev', function(){
 return del.sync(['dev']);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'cms',
      index: pathToCms.indexHtml
    },
  });
});

gulp.task('copyDevFiles', function(){
  return gulp.src('dev/**/*')
    .pipe(gulp.dest(pathToCms.devFiles))
});


gulp.task('copyCMSFiles', function(){
  return gulp.src('cms/dev_files/**/*')
    .pipe(gulp.dest('dev'))
});


// Taks to run on command line

gulp.task('watch', ['clean', 'browserSync', 'sass', 'scripts', 'img', 'media', 'templates'], function(){
	gulp.watch('dev/assets/_scss/**/*.+(css|scss|sass)', ['sass']);
	gulp.watch('dev/assets/_js/**/*.js', ['scripts']);
	gulp.watch('dev/assets/img/**/*.+(png|jpg|gif|svg)', ['img']);
	gulp.watch('dev/media/**/*.+(png|jpg|gif|svg)', ['media']);
	gulp.watch('dev/templates/**/*.html', ['templates']);
});

gulp.task('build', ['clean', 'sass', 'scripts', 'img', 'media', 'copyHTML', 'copyDevFiles']);

gulp.task('buildDev', ['cleanDev', 'copyCMSFiles']);

// http://analyticl.com/blog/frontend-templating-with-gulp-and-twig-js