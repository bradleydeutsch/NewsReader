/** @jsx nh.React.DOM */

(function (nh) {
    nh.pages.AbstractPage = nh.SuperObject.extend({
        constructor: function () {
            this.init();
        }
    });

    nh.pages.PageController = nh.pages.AbstractPage.extend({
        init: function () {
            var _this = this;

            nh.pages.PageController.__super__.init.apply(_this, arguments);

            _this.newsArticle = new nh.applications.NewsArticle();
            _this.newsPoll = new nh.applications.NewsPoller();

            nh.eventHandler.subscribe(null, nh.eventHandler.events.ARTICLE_SELECTED,
                _this.handleArticleSelected.bind(_this));

            return _this;
        },

        handleArticleSelected: function (event, data) {
            this.newsArticle.render(data.props);
        }
    });
})(nh);