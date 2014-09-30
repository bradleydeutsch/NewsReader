/** @jsx React.DOM */

describe('Utils', function () {
    it('can determine a variable is of a given type', function () {
        // Expectations
        expect(nh.utils.typeCompare([], '[object Array]')).toBe(true);
        expect(nh.utils.typeCompare([], '[object String]')).toBe(false);
        expect(nh.utils.typeCompare('string', '[object String]')).toBe(true);
        expect(nh.utils.typeCompare('string', '[object Function]')).toBe(false);
        expect(nh.utils.typeCompare({}, '[object Object]')).toBe(true);
        expect(nh.utils.typeCompare({}, '[object String]')).toBe(false);
        expect(nh.utils.typeCompare(function () {}, '[object Function]')).toBe(true);
        expect(nh.utils.typeCompare(function () {}, '[object Object]')).toBe(false);
        expect(nh.utils.typeCompare(false, '[object Boolean]')).toBe(true);
        expect(nh.utils.typeCompare('true', '[object Boolean]')).toBe(true);
    });
});