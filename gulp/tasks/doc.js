const gulp = require('gulp');
const gutil = require('gulp-util');
const copy = require('gulp-contrib-copy');
const Vinyl = require('vinyl');
const through = require('through2');
const cheerio = require('cheerio');
const config = require('../config/config');
const hljs = require('highlight.js');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            }
            catch (e) {}
        }

        return ''; // use external default escaping
    }
});
md.use(require('markdown-it-anchor'), {});
md.use(require('markdown-it-container'), 'code', {});

function transDoc(pathname) {
    const files = [];
    gulp.src(config.path.doc + '/' + pathname + '/*.md')
        .pipe(through.obj(function (file, encoding, callback) {
            if (file.isNull() || file.contents == null) {
                callback(null, file);
                return;
            }

            if (file.isStream()) {
                callback(new gutil.PluginError('doc task', 'stream content is not supported'));
                return;
            }

            try {
                files.push(Buffer.concat([
                    new Buffer('<div class="module">'),
                    new Buffer(md.render(file.contents.toString())),
                    new Buffer('</div>')
                ]));
            }
            catch (_error) {
                const err = _error;
                callback(new gutil.PluginError('doc task', err, {
                    fileName: file.path,
                    showstack: true
                }));
            }
            callback();
        }, function (callback) {
            const $ = cheerio.load(Buffer.concat(files).toString());
            let html = '';
            $('h2').each((i, h2) => {
                const $h2 = $(h2);
                html += `<li><a href="#${$h2.attr('id')}">${$h2.attr('id')}</a></li>`;
            });
            files.unshift(new Buffer(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Third.js document</title>
    <link rel="stylesheet" href="../static/tomorrow.css">
    <link rel="stylesheet" href="../static/doc.css">
</head>
<body>
<div class="header">
    <h1>Third.js</h1>
    <ul class="outline">
        ${html}
    </ul>
</div>`));
            files.push(new Buffer(`</body></html>`));
            this.push(new Vinyl({
                base: config.path.doc,
                path: config.path.doc + '/' + pathname + '/index.html',
                contents: Buffer.concat(files)
            }));
            callback();
        }))
        .pipe(gulp.dest(config.path.dest + '/doc'));
}

gulp.task('doc', function () {
    ['zh-CN'].forEach(transDoc);
    const staticFiles = [
        config.path.doc + '/**/*',
        '!' + config.path.doc + '/**/*.md'
    ];
    gulp.src(staticFiles)
        .pipe(copy())
        .pipe(gulp.dest(config.path.dest + '/doc'));
});
