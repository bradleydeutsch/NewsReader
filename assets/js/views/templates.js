/** @jsx React.DOM */

(function (templates) {
    templates.PageLoader = React.createClass({
        render: function () {
            return (
                <div id="pageLoader">
                    <h1>Please wait...</h1>
                </div>
            );
        }
    })
})(nh.templates);