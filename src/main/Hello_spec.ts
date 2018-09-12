import assert from 'assert';
import Hello from './Hello';

describe('hello', () => {
    it('returns true', () => {
        assert(new Hello().hello());
    });
});
