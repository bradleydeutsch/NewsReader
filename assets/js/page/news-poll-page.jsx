/** @jsx React.DOM */

(function (nh) {
    nh.pages.AbstractPage = nh.SuperObject.extend({
        constructor: function () {
            this.init();
        }
    });

    nh.pages.PageController = nh.pages.AbstractPage.extend({
        init: function () {
            var _this = this;

            nh.pages.PageController.__super__.init.apply(this, arguments);

            this.newsPoll = new nh.applications.NewsPoll();
        }
    });
})(nh);