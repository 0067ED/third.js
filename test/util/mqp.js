import mqp from 'third/util/mqp';
import {getWindow, createIframe} from '../util';

describe('third/util/mqp', function() {
    it('mqp(target, proxy)', function() {
        var count = 1;
        window.__TEST_MQP = window.__TEST_MQP || [];
        __TEST_MQP.push(['create', 'abcdefg']);
        __TEST_MQP.push(function (count) {
            expect(count).toBe(2);
        });

        mqp('__TEST_MQP', {
            ready: function (callback) {
                count++;
                callback(count);
            },

            create: function (id) {
                expect(id).toBe('abcdefg');
            },

            done: function (a, b, c) {
                expect(a).toBe(1);
                expect(b).toBe(2);
                expect(c).toBe(3);
            }
        });

        __TEST_MQP.push(['done', 1, 2, 3]);
        __TEST_MQP.push(function (count) {
            expect(count).toBe(3);
        });
    });

    it('mqp(target, proxy, context)', function() {
        var contextIframe = createIframe();
        var contextWindow = getWindow(contextIframe);

        var count = 1;

        contextWindow.__TEST_MQP = [];
        contextWindow.__TEST_MQP.push(['create', 'abcdefg']);
        contextWindow.__TEST_MQP.push(function (count) {
            expect(count).toBe(2);
        });

        mqp(
            '__TEST_MQP',
            {
                ready: function (callback) {
                    count++;
                    callback(count);
                },

                create: function (id) {
                    expect(id).toBe('abcdefg');
                },

                done: function (a, b, c) {
                    expect(a).toBe(1);
                    expect(b).toBe(2);
                    expect(c).toBe(3);
                }
            },
            {
                context: contextWindow
            }
        );

        contextWindow.__TEST_MQP.push(['done', 1, 2, 3]);
        contextWindow.__TEST_MQP.push(function (count) {
            expect(count).toBe(3);
        });
    });

    it('mqp(target, proxy, {context})', function() {
        var contextIframe = createIframe();
        var contextWindow = getWindow(contextIframe);

        var count = 1;

        contextWindow.__TEST_MQP = [];
        contextWindow.__TEST_MQP.push(['create', 'abcdefg']);
        contextWindow.__TEST_MQP.push(function (count) {
            expect(count).toBe(2);
        });

        mqp('__TEST_MQP', {
            ready: function (callback) {
                count++;
                callback(count);
            },

            create: function (id) {
                expect(id).toBe('abcdefg');
            },

            done: function (a, b, c) {
                expect(a).toBe(1);
                expect(b).toBe(2);
                expect(c).toBe(3);
            }
        }, contextWindow);

        contextWindow.__TEST_MQP.push(['done', 1, 2, 3]);
        contextWindow.__TEST_MQP.push(function (count) {
            expect(count).toBe(3);
        });
    });

    it('mqp(target, proxy, {callback})', function() {
        window.__TEST_MQP_2 = window.__TEST_MQP_2 || [];
        __TEST_MQP_2.push(['send', 1, 2]);

        mqp(
            '__TEST_MQP_2',
            {
                name: 'TEST',
                send: function (callback) {
                    callback('done');
                }
            },
            {
                callback: function (proxy, methodName, params) {
                    expect(proxy.name).toBe('TEST');
                    expect(methodName).toBe('send');
                    expect(params[0]).toBe(1);
                    expect(params[1]).toBe(2);
                }
            }
        );
    });

    it('mqp(target, proxy, {ready})', function() {
        window.__TEST_MQP_3 = window.__TEST_MQP_3 || [];
        __TEST_MQP_3.push(function (name) {
            expect(name).toBe('done');
        });

        mqp(
            '__TEST_MQP_3',
            {
                ready: function (callback) {
                    callback('ready');
                },
                done: function (callback) {
                    callback('done');
                }
            },
            {
                ready: 'done'
            }
        );
    });
});
