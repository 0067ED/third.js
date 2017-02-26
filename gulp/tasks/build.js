var gulp = require('gulp');
var copy = require('gulp-contrib-copy');
var config = require('../config/config');

gulp.task('build', ['rollup'], function () {
    gulp.src(config.path.html + '/**/*')
        .pipe(copy())
        .pipe(gulp.dest(config.path.dest));
});
