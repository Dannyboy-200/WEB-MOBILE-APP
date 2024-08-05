const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// File paths
const files = {
  scssPath: 'src/scss/**/*.scss',
  jsPath: 'src/js/**/*.js'
};

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return gulp.src(files.scssPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

// JavaScript task: concatenates and uglifies JS files to script.js
function jsTask() {
  return gulp.src(files.jsPath)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(files.scssPath, scssTask);
  gulp.watch(files.jsPath, jsTask);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

// Default task: run tasks in parallel
exports.default = gulp.series(
  gulp.parallel(scssTask, jsTask),
  watchTask
);
