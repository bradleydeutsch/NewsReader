/** @jsx React.DOM */

(function (nh, $) {
    nh.applications.NewsPoll = function () {
        this.ARTICLE_LIMIT = 10;

        this.$el = $(document.getElementById('articleContainer'));

        this.init = function () {
            var _this = this;

            _this.socket = io.connect(nh.config.NODE.URL, {
                port: nh.config.NODE.PORT,
                transports: nh.config.NODE.TRANSPORTS
            });

            /*  Will load initial data set from the page

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
            });*/

            _this.el = React.renderComponent(
                <nh.views.ArticleList articles={ _this.extractArticles(_this.$el) } limit={ _this.ARTICLE_LIMIT } />,
                _this.$el[0]);

            _this.bindEvents();

            return _this;
        };

        this.extractArticles = function (el) {
            var articles = [];

            el.find('li').each(function () {
                articles.push({
                    id: $(this).data('article-id'),
                    title: $(this).find('h3').text(),
                    description: $(this).find('div').html(),
                    isNew: false
                });
            });

            return articles;
        };

        this.bindEvents = function () {
            this.socket.on(nh.config.NODE.EVENTS.ARTICLE_ADDED, this.addArticle.bind(this));
            this.socket.on(nh.config.NODE.EVENTS.ARTICLES_ADDED, this.addArticles.bind(this));
        };

        this.addArticle = function (data) {
            console.log(data);

            this.el.addArticle(data);
        };

        this.addArticles = function (data) {
            console.log(data);

            this.el.addArticles(data);
        };

        return this.init();
    }
})(nh, $);