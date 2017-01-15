const gulp = require('gulp');
const config = require('../config/config');

gulp.task('watch', function () {
    gulp.watch(`${config.path.src}/**/*.js`, ['rollup']);
    gulp.watch(`${config.path.test}/**/*.js`, ['rollup']);
});
