/** @jsx nh.React.DOM */

(function (templates) {
    templates.PageLoader = nh.React.createClass({
        render: function () {
            return (
                nh.React.DOM.div({id: "pageLoader"}, 
                    nh.React.DOM.h1(null, "Please wait...")
                )
            );
        }
    })
})(nh.templates);