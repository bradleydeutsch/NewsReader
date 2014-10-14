/** @jsx nh.React.DOM */

(function (templates) {
    templates.PageLoader = nh.React.createClass({
        render: function () {
            return (
                <div id="pageLoader">
                    <h1>Please wait...</h1>
                </div>
            );
        }
    })
})(nh.templates);