/** @jsx React.DOM */

(function (templates) {
    templates.PageLoader = React.createClass({displayName: 'PageLoader',
        render: function () {
            return (
                React.DOM.div({id: "pageLoader"}, 
                    React.DOM.h1(null, "Please wait...")
                )
            );
        }
    })
})(nh.templates);