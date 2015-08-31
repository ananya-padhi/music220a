var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create(),
    runSequence = require('run-sequence'),
    del         = require('del');

gulp.task('clean', del.bind(null, [
  '.publish'
]));

gulp.task('build-style', function () {
  return gulp.src('assets/*.css')
    .pipe(plugins.cssmin())
    .pipe(gulp.dest('assets/music220a.min.css'));
});

gulp.task('build-script', function () {
  return gulp.src('assets/*.js')
    .pipe(plugins.uglify({ mangle: false }))
    .pipe(gulp.dest('assets/music220a.min.js'));
});

gulp.task('build', function (cb) {
  runSequence('clean', 
    ['build-style', 'build-script'], cb);
});

gulp.task('dev', function () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    },
    browser: 'google chrome'
  });

  gulp.watch([
    'assets/**/*',
    'assets/**/*',
    'tutorials/**/*',
    'examples/**/*',
  ], browserSync.reload);
});

gulp.task('preview', function () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    },
    browser: 'google chrome'
  });
});

gulp.task('default', function (cb) {
  runSequence('build', 'preview', cb);
});