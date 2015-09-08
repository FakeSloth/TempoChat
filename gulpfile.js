var gulp = require('gulp');
var browserify = require('gulp-browserify');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('lint', function() {
  gulp.src(['*.js', 'app/**/*.js', 'config/*.js', 'test/*.js'])
    .pipe(jshint({linter: require('jshint-jsx').JSXHINT}))
    .pipe(jshint.reporter(stylish));
});

gulp.task('scripts', function() {
  gulp.src('app/client.js')
    .pipe(browserify({
      debug: true,
      transform: ['reactify']
    }))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('style', function() {
  gulp.src(['*.js', 'app/controllers/*.js', 'config/*.js', 'test/*.js'])
    .pipe(jscs());
});

gulp.task('watch', function() {
  gulp.watch(['app/*.js', 'app/components/*.js'], ['scripts']);
});

gulp.task('default', ['lint', 'style', 'watch']);
