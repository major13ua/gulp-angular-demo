var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    stylish = require('jshint-stylish'),
    karma = require('karma');

var files = ['js/**/*.js'];

gulp.task('scripts', function(){
  gulp.src(files)
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe($.ngAnnotate())
    .pipe($.sourcemaps.init())
    .pipe($.concat('bundle.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('bin/js'));
})

gulp.task('validate', function () {
    gulp.src(files)
        .pipe($.jshint())
        .pipe($.jshint.reporter(stylish))
})

gulp.task('default', ['scripts', 'validate'], function() {
    gulp.watch(files, ['scripts', 'validate'])
    }
)