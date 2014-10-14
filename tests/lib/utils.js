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

    /*Object.prototype.renameProperty = function (from, to) {
        if (this.hasOwnProperty(from)) {
            this[to] = this[from];
            delete this[from];
        }
        return this;
    };*/

    function defunctKeysInObject(passedStr) {
        utils.forEachKey(passedStr, function (key) {
            var newKey = key + APPENDED_STRING;

            this[newKey] = this[key];
            delete this[key];

            if (Object.prototype.toString.call(this[newKey]) === '[object Object]') {
                defunctKeysInObject(this[newKey]);
            }
        });
    }

    function revertDefunctKeysInObject(passedStr) {
        utils.forEachKey(passedStr, function (key) {
            var newKey = key.replace(APPENDED_STRING, '');

            if (newKey !== key) {
                this[newKey] = this[key];
                delete this[key];
            }

            if (Object.prototype.toString.call(this[newKey]) === '[object Object]') {
                revertDefunctKeysInObject(this[newKey]);
            }
        });
    }

    utils.strippedObject = function (str, toKeepArr) {
        var ret = {},
            i, j, keyList, keyStart, keyStartRenamed, startLocalObj;

        if (typeof(str.hasBeenStripped) !== 'undefined') {
            throw new Error('Can\'t strip object as it has not yet been restored from its previous strip operation');
        }

        defunctKeysInObject(str);

        str.hasBeenStripped = true;

        function renameKeys(passedStr, key) {
            var keyList = key.split('.'),
                topKey = keyList.shift(),
                renamedKey = topKey + APPENDED_STRING;

            passedStr[topKey] = passedStr[renamedKey];
            delete passedStr[renamedKey];

            if (keyList.length > 0) {
                renameKeys(passedStr[topKey], keyList.join('.'));
            } else if (Object.prototype.toString.call(passedStr[topKey]) === '[object Object]') {
                revertDefunctKeysInObject(passedStr[topKey]);
            }
        }

        for (i = 0; i < toKeepArr.length; i++) {
            renameKeys(str, toKeepArr[i]);
        }
    };

    utils.restoreOriginalObject = function (str) {
        revertDefunctKeysInObject(str);

        delete str.hasBeenStripped;
    };

    utils.forEachKey = function (obj, fnc) {
        var key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                fnc.call(obj, key);
            }
        }
    };
}(jasmine.util));