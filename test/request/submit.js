import submit from 'S3/request/submit';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/request/submit', function() {
    var flag;
    var test;
    beforeEach(function() {
        test = document.createElement('div');
        test.innerHTML = ''
            + '<form action="/submitWithJSON/form/1" method="post" enctype="multipart/form-data">'
            + '<input type="hidden" name="secret" value="X_X"></input>'
            + '<input type="email" name="email" value="zmmbreeze0825@gmail.com"></input>'
            + '<input type="text" name="username" value="zmmbreeze"></input>'
            + '<input type="password" name="password" value="1234567"></input>'
            + '<input type="file" name="file"></input>'
            + '<input type="file" name="files" multiple></input>'
            + '</form>';
        document.body.appendChild(test);
        flag = false;
    });

    afterEach(function() {
        test.parentNode.removeChild(test);
    });

    it('submit(url, params, callback) return text', function () {
        runs(function () {
            submit(
                '/submitWithText/1',
                {
                    test: 'submit(url, params, callback) use xhr return text',
                    arr: [1, 2]
                },
                function (error, data) {
                    flag = true;
                    expect(data).toBe('{"test":"submit(url, params, callback) use xhr return text","arr":["1","2"],"from":"server"}');
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });

    it('submit(url, params, callback, opts) return json', function () {
        runs(function () {
            submit(
                '/submitWithJSON/1',
                {
                    test: 'submit(url, params, callback) use xhr return data',
                    arr: [1, 2]
                },
                function (error, data) {
                    flag = true;
                    expect(data.test).toBe('submit(url, params, callback) use xhr return data');
                },
                {
                    dataType: 'json'
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });

    it('submit(form, callback) return data', function () {
        runs(function () {
            submit(
                test.getElementsByTagName('form')[0],
                function (error, data) {
                    flag = true;
                    console.log(data);
                    expect(data.secret).toBe('X_X');
                },
                {
                    dataType: 'json'
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });
});
