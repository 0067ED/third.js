const gulp = require('gulp');
const gutil = require('gulp-util');
const copy = require('gulp-contrib-copy');
const Vinyl = require('vinyl');
const through = require('through2');
const cheerio = require('cheerio');
const path = require('path');
const config = require('../config/config');
const hljs = require('highlight.js');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt({
    html: true,
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

const HEADER_HTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Third.js document</title>
        <link rel="stylesheet" href="../static/tomorrow.css">
        <link rel="stylesheet" href="../static/doc.css">
    </head>
    <body class="page-{pageClass}">
    <div class="main">
        <div class="header">
            <h1><a href="index.html">Third.js</a></h1>
            <div class="header-info">专注于第三方Javascript SDK开发的前端工具库</div>
        </div>
        <ul class="menu">
            <li><a href="tutorial.html">入门教程</a></li>
            <li><a href="api.html">API文档</a></li>
            <li><a href="https://github.com/0067ED/third.js" target="_blank">GITHUB</a></li>
        </ul>`;
const FOOTER_HTML = `
    </div>
    </body>
    </html>`;

function transApiDoc(pathname) {
    const files = [];
    gulp.src(`${config.path.doc}/${pathname}/*.md`)
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
            $('h2').each((i, h) => {
                const $h = $(h);
                let innerHtml = '';
                $h.nextAll('h3').each((i, h3) => {
                    const $h3 = $(h3);
                    let h3Text = $h3.text();
                    h3Text = h3Text.split('/');
                    if (h3Text.length > 1) {
                        h3Text.shift();
                    }
                    innerHtml += `<li><a href="#${$h3.attr('id')}">${h3Text.join('/')}</a></li>`;
                });

                html += `<li>
                    <a href="#${$h.attr('id')}">
                        ${$h.text()}
                    </a>
                    <ul class="outline-inner">${innerHtml}</ul>
                </li>`;
            });

            files.unshift(new Buffer(HEADER_HTML.replace('{pageClass}', 'api')));
            files.push(new Buffer(`
                    </div>
                    <div class="outline">
                        <h2>APIs</h2>
                        <ul class="outline-outter">
                            ${html}
                        </ul>
                    </div>
                </body>
                </html>
            `));
            this.push(new Vinyl({
                base: config.path.doc,
                path: `${config.path.doc}/${pathname}.html`,
                contents: Buffer.concat(files)
            }));
            callback();
        }))
        .pipe(gulp.dest(config.path.doc));
}


function transDoc(pathname) {
    gulp.src(`${config.path.doc}/${pathname}/*.md`)
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
                file.path = file.path.replace(/\.md$/, '.html');
                const pageClass = path.basename(file.path, '.html');
                file.contents = new Buffer(`${HEADER_HTML.replace('{pageClass}', pageClass)}
                    <div class="module">${md.render(file.contents.toString())}</div>
                    ${FOOTER_HTML}`);
                this.push(file);
            }
            catch (err) {
                callback(new gutil.PluginError('doc task', err, {
                    fileName: file.path,
                    showstack: true
                }));
            }
            callback();
        }))
        .pipe(gulp.dest(`${config.path.doc}/${pathname}`));
}


gulp.task('doc', function () {
    ['zh-CN'].forEach((language) => {
        transApiDoc(`${language}/api`);
        transDoc(language);
    });
});
