var gulp = require('gulp');
var copy = require('gulp-contrib-copy');
var config = require('../config/config');
var getFiles = require('../util/getFiles');
var htmlreplace = require('gulp-html-replace');

gulp.task('build', ['jasmine', 'rollup'], function () {
    var cssFiles = 'jasmine/jasmine.css';
    var jsFiles = []; //getFiles(config.path.entrys);
    jsFiles.unshift('jasmine/boot.js');
    jsFiles.unshift('jasmine/jasmine-html.js');
    jsFiles.unshift('jasmine/jasmine.js');
    jsFiles.unshift('jasmine/json2.js');

    gulp.src(config.path.html + '/**/*')
        .pipe(copy())
        .pipe(htmlreplace({
            css: cssFiles,
            js: jsFiles
        }))
        .pipe(gulp.dest(config.path.dest));
});
