import jsonp from 'S3/request/jsonp';
import parseUrl from 'S3/url/parse';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/request/jsonp', function() {
    var flag;
    beforeEach(function() {
        flag = false;
    });

    it('jsonp(url, callback) success', function () {
        runs(function () {
            jsonp(
                '/jsonp/1?arr=1&arr=2&from=client',
                function (err, data) {
                    expect(err).toBeNull();
                    expect(data.from).toBe('server');
                    expect(data.arr[0]).toBe('1');
                    expect(data.arr[1]).toBe('2');
                    flag = true;
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });

    it('jsonp(url, callback) success with specified callback', function () {
        runs(function () {
            jsonp(
                '/jsonp/1?callback=jsonpFunction&arr=1&arr=2&from=client',
                function (err, data) {
                    expect(err).toBeNull();
                    expect(data.from).toBe('server');
                    expect(data.arr[0]).toBe('1');
                    expect(data.arr[1]).toBe('2');
                    flag = true;
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });

    it('jsonp(url, callback) timeout', function () {
        runs(function () {
            jsonp(
                '/null/jsonp?arr=1&arr=2&from=client',
                function (err, data) {
                    expect(err).not.toBeNull();
                    expect(data == null).toBeTruthy();
                    flag = true;
                },
                {
                    timeout: 200
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 1200);
    });

    it('jsonp(url, callback, opts) success', function () {
        runs(function () {
            var iframe = createIframe();
            var context = getWindow(iframe);
            jsonp(
                '/jsonpWithCB/2?arr=1&arr=2&from=client',
                function (err, data) {
                    expect(err).toBeNull();
                    expect(data.from).toBe('server');
                    expect(data.arr[0]).toBe('1');
                    expect(data.arr[1]).toBe('2');
                    flag = true;
                },
                {
                    charset: 'gbk',
                    query: 'cb',
                    parent: context.document.body
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });
});
