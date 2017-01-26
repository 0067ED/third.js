import log from 'S3/util/log';

describe('S3/util/log', function() {
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
