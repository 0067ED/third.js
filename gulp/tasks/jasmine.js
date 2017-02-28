var gulp = require('gulp');
var copy = require('gulp-contrib-copy');
var config = require('../config/config');

gulp.task('jasmine', function () {
    gulp.src(config.path.jasmine + '/**/*')
        .pipe(copy())
        .pipe(gulp.dest(config.path.dest + '/jasmine'));
});
