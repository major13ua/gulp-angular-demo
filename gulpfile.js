var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    stylish = require('jshint-stylish'),
    karma = require('karma');

var files = ['js/**/*.js'];


//neet to get jquery.min, angular, angular-route, angular-mocks, bootstrap
var karmaFiles = [];
var spec = 'js/spec/*.js';
var bundle = 'bin/js/**/*.js';

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

gulp.task('tests', function (done) {

    var testFiles = [spec, bundle];
    testFiles = karmaFiles.concat(testFiles);

    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        files : testFiles,
        singleRun: true
    }, function () {
        done();
    }).start();
})

gulp.task('default', ['scripts', 'validate'], function() {
    gulp.watch(files, ['scripts', 'validate'])
    }
)