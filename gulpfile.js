// config
var PATH_APP = 'render',
    PATH_DATA = 'data';

// imports
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    shell = require('gulp-shell');

// tasks
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: [PATH_APP, PATH_DATA]
  });
});

gulp.task('livereload', function() {
  gulp.src([PATH_APP + '/css/*.css', PATH_APP + '/scripts/*.js', PATH_APP + '/index.html'])
    .pipe(watch())
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  gulp.src(PATH_APP + '/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(PATH_APP + '/css'));
});

gulp.task('watch', function() {
  gulp.watch(PATH_APP + '/styles/*.scss', ['sass']);
});

gulp.task('export', function () {
  gulp.src('')
    .pipe(shell('phantomjs index.js'));
});

gulp.task('dev', ['sass', 'webserver', 'livereload', 'watch']);

gulp.task('run', ['sass', 'webserver', 'export']);

gulp.task('default', ['run']);