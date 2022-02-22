var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var browserSync = require('browser-sync').create();
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var mocha = require('gulp-spawn-mocha');

var paths = {
    pages: ['src/**/*.html'],
    assets: ['assets/**/*.png'],
    vendor: ['vendor/**/*.js']
};

gulp.task('clean', function(cb) {
    return del(['built/**'], function(err) {
        cb(err);
    });
});

gulp.task('copy-pages', function() {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('built'));
});

gulp.task('copy-assets', function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest('built/assets'));
});

gulp.task('copy-vendor', function () {
    return gulp.src(paths.vendor)
        .pipe(gulp.dest('built/vendor'));
});

gulp.task('default', ['copy-pages', 'copy-assets', 'copy-vendor'], function () {
    return browserify({
        basedir: 'src/lib',
        debug: true,
        entries: ['./game.ts'],
        cache: {},
        packageCache: {},
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('game.js'))
    .pipe(gulp.dest('built'));
});

gulp.task('watch', ['default'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('serve', ['default'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: 'built'
        },
        ghostMode: false,
        online: false
    });

    gulp.watch(['src/**/*.*'], ['watch']);
});

gulp.task('build-test', function () {
    return gulp.src('src/tests/**/*.ts', { read: false })
    .pipe(tap(function (file) {
      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, { debug: true })
        .plugin(tsify, { project: "./tsconfig.test.json" })
        .bundle();
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}) )
    .pipe(gulp.dest('built/tests'));
});

gulp.task('run-test', function() {
    gulp.src(['./built/tests/**/*.ts']).pipe(mocha());
});
