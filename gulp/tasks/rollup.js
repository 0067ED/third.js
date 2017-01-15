const path = require('path');
const gulp = require('gulp');
const rollup = require('rollup').rollup;
const alias = require('rollup-plugin-alias');
const minify = require('uglify-js').minify;
const config = require('../config/config');

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

    for (var entry in varConfig.path.entrys) {
        if (!varConfig.path.entrys.hasOwnProperty(entry)) {
            continue;
        }

        var fileName = entry + '.js';
        var destFile = path.resolve(varConfig.path.dest, fileName);
        var r = rollup({
            entry: path.resolve(varConfig.path.src, varConfig.path.entrys[entry]),
            plugins: plugins
        })
        .then((function (e, dest) {
            return function (bundle) {
                return bundle.write({
                    format: 'iife',
                    dest: dest,
                    useStrict: false
                });
            };
        })(entry, destFile));
        rollups.push(r);
    }
    return Promise.all(rollups);
});
