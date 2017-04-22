import ping from 'third/request/ping';
import parseUrl from 'third/url/parse';
import hasSendBeacon from 'third/detect/sendBeacon';
import hasCors from 'third/detect/cors';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('third/request/ping', function() {
    var flag;
    beforeEach(function() {
        flag = false;
    });

    it('ping(url, params) with relative url', function () {
        try {
            ping(
                '/ping/1',
                {
                    test: 'ping(url, params) with relative url',
                    arr: [1, 2]
                }
            );
        }
        catch(e) {
            expect(e).not.toBeNull()
        }
    });

    it('ping(url, params) with callback', function () {
        runs(function () {
            var result = ping(
                'http://127.0.0.1:8888/ping/1',
                {
                    test: 'ping(url, params) with callback',
                    arr: [1, 2]
                },
                {
                    callback: function (err) {
                        expect(err).toBeNull();
                        flag = true;
                    }
                }
            );
            expect(result).toBe(true);
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });

    it('ping(url, params) with callback but failed', function () {
        runs(function () {
            var result = ping(
                'http://127.0.0.1:8888/null',
                {
                    test: 'ping(url, params) with callback but failed',
                    arr: [1, 2]
                },
                {
                    callback: function (err) {
                        expect(err).not.toBeNull();
                        flag = true;
                    }
                }
            );
            expect(result).toBe(true);
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });

    it('ping(url, params) use img transport', function () {
        runs(function () {
            var result = ping(
                'http://127.0.0.1:8888/ping/img',
                {
                    test: 'ping(url, params) use img transport',
                    arr: [1, 2]
                },
                {
                    transport: 'img',
                    callback: function (err) {
                        expect(err).toBeNull();
                        flag = true;
                    }
                }
            );
            expect(result).toBe(true);
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });

    it('ping(url, params) use xhr transport', function () {
        runs(function () {
            var result = ping(
                'http://127.0.0.1:8888/ping/xhr',
                {
                    test: 'ping(url, params) use xhr transport',
                    arr: [1, 2]
                },
                {
                    transport: 'xhr',
                    callback: function (err) {
                        expect(err).toBeNull();
                        flag = true;
                    }
                }
            );
            expect(result).toBe(hasCors() === 'xhr');
            if (hasCors() !== 'xhr') {
                flag = true;
            }
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });

    it('ping(url, params) use xhr transport but failed', function () {
        runs(function () {
            var result = ping(
                'http://127.0.0.1:8888/null/xhr',
                {
                    test: 'ping(url, params) use xhr transport',
                    arr: [1, 2]
                },
                {
                    transport: 'xhr',
                    callback: function (err) {
                        expect(err).not.toBeNull();
                        flag = true;
                    }
                }
            );
            expect(result).toBe(hasCors() === 'xhr');
            if (hasCors() !== 'xhr') {
                flag = true;
            }
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });

    it('ping(url, params) use beacon transport', function () {
        var result = ping(
            'http://127.0.0.1:8888/ping/beacon',
            {
                test: 'ping(url, params) use beacon transport',
                arr: [1, 2]
            },
            {
                transport: 'beacon'
            }
        );
        expect(result).toBe(hasSendBeacon());
    });

    it('ping(url, params) use beacon transport but failed', function () {
        var result = ping(
            'http://127.0.0.1:8888/null/beacon',
            {
                test: 'ping(url, params) use beacon transport',
                arr: [1, 2]
            },
            {
                transport: 'beacon'
            }
        );
        expect(result).toBe(hasSendBeacon());
    });
});
