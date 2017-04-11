import submit from 'S3/request/submit';
import parseJSON from 'S3/json/parse';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/request/submit', function() {
    var flag;
    function addForm(url) {
        var test = document.createElement('div');
        test.innerHTML = ''
            + '<form action="' + url + '" method="post" enctype="multipart/form-data">'
            + '<input type="hidden" name="secret" value="X_X"></input>'
            + '<input type="email" name="email" value="zmmbreeze0825@gmail.com"></input>'
            + '<input type="text" name="username" value="zmmbreeze"></input>'
            + '<input type="password" name="password" value="1234567"></input>'
            + '<input type="file" name="file"></input>'
            + '<input type="file" name="files" multiple></input>'
            + '</form>';
        document.body.appendChild(test);
        return test;
    }
    beforeEach(function() {
        flag = false;
    });

    afterEach(function() {
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
                },
                {
                    dataType: 'teXt'
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });

    it('submit(url, params, callback) return text but parse into json', function () {
        runs(function () {
            submit(
                '/submitWithText/3',
                {
                    test: 'submit(url, params, callback) use xhr return text but parse into json',
                    arr: [1, 2]
                },
                function (error, data) {
                    flag = true;
                    expect(data.test).toBe('submit(url, params, callback) use xhr return text but parse into json');
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
                '/submitWithJSON/2',
                {
                    test: 'submit(url, params, callback) use xhr return json',
                    arr: [1, 2]
                },
                function (error, data) {
                    flag = true;
                    expect(data.test).toBe('submit(url, params, callback) use xhr return json');
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });

    it('submit(form, callback) return text', function () {
        var test = addForm('/submitWithText/form/1');
        runs(function () {
            submit(
                test.getElementsByTagName('form')[0],
                function (error, data) {
                    flag = true;
                    data = parseJSON(data);
                    expect(data.secret).toBe('X_X');
                },
                {
                    dataType: 'teXt'
                }
            );
        });
        waitsFor(function() {
            if (test.parentNode) {
                test.parentNode.removeChild(test);
            }
            return flag;
        }, '', 200);
    });

    it('submit(form, callback) return text but parse into json', function () {
        var test = addForm('/submitWithText/form/3');
        runs(function () {
            submit(
                test.getElementsByTagName('form')[0],
                function (error, data) {
                    flag = true;
                    expect(data.secret).toBe('X_X');
                }
            );
        });
        waitsFor(function() {
            if (test.parentNode) {
                test.parentNode.removeChild(test);
            }
            return flag;
        }, '', 200);
    });

    /*
    it('submit(form, callback) return json', function () {
        var test = addForm('/submitWithJSON/form/2');
        runs(function () {
            submit(
                test.getElementsByTagName('form')[0],
                function (error, data) {
                    flag = true;
                    expect(data.secret).toBe('X_X');
                }
            );
        });
        waitsFor(function() {
            if (test.parentNode) {
                test.parentNode.removeChild(test);
            }
            return flag;
        }, '', 200);
    });
*/
});
