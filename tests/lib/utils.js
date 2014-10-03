(function (utils) {
    utils.mock = function (obj, overrides, name) {
        return utils.returnMock(obj.prototype, overrides, name);
    };

    utils.mockObj = function (obj, overrides, name) {
        return utils.returnMock(obj, overrides, name);
    };

    utils.returnMock = function (obj, overrides, name) {
        var keys = [],
            name = name || 'mock',
            key, ret;

        for (key in obj) {
            keys.push(key);
        }

        ret = (keys.length > 0) ? jasmine.createSpyObj(name, keys) : {};

        if (overrides) {
            for (key in overrides) {
                ret[key] = overrides[key];
            }
        }

        return ret;
    };
}(jasmine.util));