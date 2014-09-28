/** @jsx React.DOM */

(function (nh, $) {
    nh.applications.NewsPoll = function () {
        this.$el = document.getElementById('articleContainer');

        this.collection = [];

        this.init = function () {
            var _this = this;

            this.socket = io.connect(nh.config.NODE.URL, {
                port: nh.config.NODE.PORT,
                transports: ['websocket']
            });

            nh.utils.addPageLoader();

            $.ajax({
                dataType: 'json',
                url: nh.config.URLS.ARTICLES,
                cache: true,
                success: function (articles) {
                    _this.el = React.renderComponent(<nh.views.ArticleList articles={ articles } />, _this.$el);

                    _this.bindEvents();

                    nh.utils.removePageLoader();
                }
            });

            return _this;
        };

        this.bindEvents = function () {
            this.socket.on(nh.config.NODE.EVENTS.ARTICLE_ADDED, this.addArticle.bind(this));
            this.socket.on(nh.config.NODE.EVENTS.ARTICLES_ADDED, this.addArticles.bind(this));
        };

        this.addArticle = function (data) {
            this.el.addArticle(data);
        };

        this.addArticles = function (data) {
            this.el.addArticles(data);
        };

        return this.init();
    }
})(nh, $);