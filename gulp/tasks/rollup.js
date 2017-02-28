var path = require('path');
var gulp = require('gulp');
var rollup = require('rollup').rollup;
var alias = require('rollup-plugin-alias');
var minify = require('uglify-js').minify;
var config = require('../config/config');
var getFiles = require('../util/getFiles');

function uglify(options = {}, minifier = minify) {
    return {
        name: 'uglify',

        transformBundle(code) {
            options.fromString = true;
            delete options.inSourceMap;
            delete options.outSourceMap;

            // trigger sourcemap generation
            if (options.sourceMap !== false) {
                options.outSourceMap = 'x';
            }

            const result = minifier(code, options);

            // Strip sourcemaps comment and extra \n
            if (result.map) {
                const commentPos = result.code.lastIndexOf('//#');
                result.code = result.code.slice(0, commentPos).trim();
            }

            return result;
        }
    };
}

gulp.task('rollup', function () {
    var rollups = [];
    var varConfig = config;
    var plugins = [];

    if (varConfig.path.alias) {
        plugins.push(alias(varConfig.path.alias));
    }

    if (varConfig.compress) {
        plugins.push(uglify());
    }

    var entrys = getFiles(varConfig.path.entrys).reduce(function (result, filepath) {
        result[path.basename(filepath, '.js')] = filepath;
        return result;
    }, {});
    for (var entry in entrys) {
        if (!entrys.hasOwnProperty(entry)) {
            continue;
        }

        var filePath = entrys[entry];
        var destFile = path.resolve(varConfig.path.dest, filePath);
        var r = rollup({
            entry: path.resolve(filePath),
            plugins: plugins
        })
        .then((function (entry, destFile) {
            return function (bundle) {
                return bundle.write({
                    format: 'iife',
                    dest: destFile,
                    useStrict: false,
                    moduleName: entry
                });
            };
        })(entry, destFile));
        rollups.push(r);
    }
    return Promise.all(rollups);
});
