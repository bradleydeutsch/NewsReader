/** @jsx React.DOM */

(function (utils) {
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
            React.renderComponent(nh.templates.PageLoader(null),
                $('body').append('<div id="pageLoader" />').find('#pageLoader')[0]);
        }
    };

    utils.removePageLoader = function () {
        $('body #pageLoader').remove();
    };
}(nh.utils));