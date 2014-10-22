(function (utils) {
    var APPENDED_STRING = '_DEF1029',
        originalStructure;

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

    function restrictRecursionDepth(key) {
        return key === 'React';
    }

    function renameKeysInObject(getKey, passedStr, depth, depthLimit) {
        utils.forEachKey(passedStr, function (key, getKey, depth, depthLimit) {
            var newKey = getKey(key);

            depth = depth || 0;

            if (newKey !== key) {
                this[newKey] = this[key];
                delete this[key];
            }

            if (restrictRecursionDepth((getKey === appendString) ? key : newKey)) {
                depthLimit = 1;
            }

            if ((Object.prototype.toString.call(this[newKey]) === '[object Object]')
                    && ((typeof(depthLimit) == 'undefined') || (depth < depthLimit))) {
                renameKeysInObject(getKey, this[newKey], depth + 1, depthLimit);
            }
        }, [getKey, depth, depthLimit]);
    }

    function appendString(key) {
        return key + APPENDED_STRING;
    }

    function removeString(key) {
        return key.replace(APPENDED_STRING, '');
    }

    utils.strippedObject = function (str, toKeepArr) {
        var i;

        if (typeof(str.hasBeenStripped) !== 'undefined') {
            throw new Error('Can\'t strip object as it has not yet been restored from its previous strip operation');
        }

        renameKeysInObject(appendString, str);
        str.hasBeenStripped = true;

        function renameKeys(passedStr, key, depthLimit) {
            var keyList = key.split('.'),
                topKey = keyList.shift(),
                renamedKey = appendString(topKey);

            passedStr[topKey] = passedStr[renamedKey];
            delete passedStr[renamedKey];

            if (restrictRecursionDepth(topKey)) {
                depthLimit = 1;
            }

            if (keyList.length > 0) {
                renameKeys(passedStr[topKey], keyList.join('.'), depthLimit);
            } else if (Object.prototype.toString.call(passedStr[topKey]) === '[object Object]') {
                renameKeysInObject(removeString, passedStr[topKey], 0, depthLimit);
            }
        }

        for (i = 0; i < toKeepArr.length; i++) {
            renameKeys(str, toKeepArr[i]);
        }
    };

    utils.restoreOriginalObject = function (str) {
        renameKeysInObject(removeString, str);

        delete str.hasBeenStripped;
    };

    utils.forEachKey = function (obj, fnc, args) {
        var key, arr;

        args = args || [];

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr = args.slice(0);
                arr.unshift(key);

                fnc.apply(obj, arr);
            }
        }
    };
}(jasmine.util));