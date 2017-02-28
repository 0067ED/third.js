var gulp = require('gulp');
var copy = require('gulp-contrib-copy');
var config = require('../config/config');
var getFiles = require('../util/getFiles');
var htmlreplace = require('gulp-html-replace');

gulp.task('build', ['jasmine', 'rollup'], function () {
    var cssFiles = 'jasmine-1.3.1/jasmine.css';
    var jsFiles = [
        'test/event/getPageX.js',
        'test/event/getPageY.js',
        'test/event/getTarget.js',
        'test/event/off.js',
        'test/event/on.js',
        'test/event/preventDefault.js',
        'test/event/stopPropagation.js',
        'test/util/fif.js'
    ]; // getFiles(config.path.entrys);
    jsFiles.unshift('jasmine-1.3.1/jasmine-html.js');
    jsFiles.unshift('jasmine-1.3.1/jasmine.js');

    gulp.src(config.path.html + '/**/*.html')
        .pipe(copy())
        .pipe(htmlreplace({
            css: cssFiles,
            js: jsFiles
        }))
        .pipe(gulp.dest(config.path.dest));
});
