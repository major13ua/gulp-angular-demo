var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    stylish = require('jshint-stylish'),
    karma = require('karma'),
    args = require('yargs').argv;

var files = ['js/**/*.js'];

var prod = args.prod;

console.log(args);

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
    .pipe(!prod ? $.sourcemaps.init() : $.util.noop())
    .pipe($.concat('bundle.js'))
    .pipe(prod ? $.uglify() : $.util.noop())
    .pipe(!prod ? $.sourcemaps.write() : $.util.noop())
    .pipe(gulp.dest('bin/js'));
});

gulp.task('validate', function () {
    gulp.src(files)
        .pipe($.jshint())
        .pipe($.jshint.reporter(stylish))
        .pipe(prod ? $.jshint.reporter('fail') : $.util.noop());
});

gulp.task('tests', function (done) {

    var preprocessors = {};
    preprocessors[bundle] = ['coverage'];

    var testFiles = [spec, bundle];
    testFiles = karmaFiles.concat(testFiles);

    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        files : testFiles,
        preprocessors : preprocessors,
        singleRun: true
    }, function () {
        done();
    }).start();
});

gulp.task('default', ['scripts', 'validate'], function() {
    gulp.watch(files, ['scripts', 'validate'])
    }
);