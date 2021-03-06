// Karma configuration
var CGIFactory = require('./gulp/middleware/CGIFactory');
var rollupAlias = require('rollup-plugin-alias');

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'src/**/*.js', included: false, served: false},
            {pattern: 'src/*.js', included: false, served: false},
            'test/**/*.js',
            'test/*.js'
        ],

        // list of files to exclude
        exclude: [
            '**/*.swp',
            'test/util.js'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': ['rollup', 'sourcemap'],
            'src/*.js': ['rollup', 'sourcemap'],
            'test/**/*.js': ['rollup', 'sourcemap'],
            'test/*.js': ['rollup', 'sourcemap']
        },

        rollupPreprocessor: {
            plugins: [
                rollupAlias({
                    S3: __dirname + '/src'
                })
            ],
            format: 'iife',               // helps prevent naming collisions
            moduleName: 'S3',             // required for 'iife' format
            sourceMap: 'inline'           // sensible for testing
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // browsers: ['Chrome', 'Firefox', 'Opera', 'PhantomJS'],
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        middleware: ['cgi'],
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-opera-launcher',
            'karma-jasmine',
            'karma-rollup-preprocessor',
            'karma-sourcemap-loader',
            'karma-rollup-preprocessor',
            {'middleware:cgi': ['factory', CGIFactory]}
        ]
    });
};
