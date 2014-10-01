/** @jsx React.DOM */

(function (utils) {
    var cid = 0;

    utils.types = {
        ARRAY: '[object Array]',
        FUNCTION: '[object Function]',
        OBJECT: '[object Object]',
        STRING: '[object String]',
        BOOLEAN: '[object Boolean]',
        NUMBER: '[object Number]'
    };

    utils.typeCompare = function (val, type) {
        try {
            return (Object.prototype.toString.call(val) === type);
        } catch (e) {
            return false;
        }
    };

    utils.addPageLoader = function () {
        if ($('body').find('#pageLoader').length === 0) {
            React.renderComponent(<nh.templates.PageLoader />,
                $('body').append('<div id="pageLoader" />').find('#pageLoader')[0]);
        }
    };

    utils.removePageLoader = function () {
        $('body #pageLoader').remove();
    };

    utils.uniqueId = function () {
        return ++cid;
    };

    utils.extend = function (ret) {
        var deep = (utils.typeCompare(arguments[arguments.length - 1], utils.types.BOOLEAN)
                && arguments[arguments.length - 1]) || false,
            obj, i;

        ret = ret || {};

        for (i = 1; i < arguments.length; i++) {
            obj = arguments[i];

            if (!obj) {
                continue;
            }

            utils.forEachKey(obj, function (key) {
                if ((deep) && (typeof this[key] === 'object')) {
                    ret[key] = ret[key] || {};
                    utils.extend(ret[key], this[key], true);
                } else {
                    ret[key] = this[key];
                }
            });
        }

        return ret;
    };

    utils.objExtend = function (props, staticProps) {
        var _this = this,
            childInstance, Surrogate;

        if (props && props.hasOwnProperty('constructor')) {
            childInstance = props.constructor;
        } else {
            childInstance = function () {
                return _this.apply(this, arguments);
            };
        }

        utils.extend(childInstance, _this, staticProps);

        Surrogate = function () {
            this.constructor = childInstance;
        };
        Surrogate.prototype = _this.prototype;
        childInstance.prototype = new Surrogate;

        if (props) {
            utils.extend(childInstance.prototype, props);
        }

        childInstance.__super__ = _this.prototype;

        return childInstance;
    };

    utils.forEachKey = function (obj, fnc) {
        var key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                fnc.call(obj, key);
            }
        }
    };
}(nh.utils));