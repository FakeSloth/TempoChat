var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('default', function() {
  gulp.src('app/client.js')
    .pipe(browserify({
      debug: true,
      transform: ['reactify']
    }))
    .pipe(gulp.dest('./public/js/'));
});
