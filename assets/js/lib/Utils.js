/** @jsx React.DOM */

(function (utils) {
    utils.addPageLoader = function () {
        if ($('body').find('#pageLoader').length === 0) {
            React.renderComponent(<nh.templates.PageLoader />,
                $('body').append('<div id="pageLoader" />').find('#pageLoader')[0]);
        }
    };

    utils.removePageLoader = function () {
        $('body #pageLoader').remove();
    };
}(nh.utils));