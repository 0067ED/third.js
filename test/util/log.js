import log from 'third/util/log';

describe('third/util/log', function() {
    it('log', function() {
        function test() {
            log('log');
            log.group('group_name');
            log('log in group');
            log.groupEnd('grou_name');
        }
        expect(test).not.toThrow();
    });
});
