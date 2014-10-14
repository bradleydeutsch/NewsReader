/** @jsx nh.React.DOM */

(function (nh, $) {
    nh.applications.AbstractApp = nh.SuperObject.extend({
        constructor: function () {
            this.init();
        }
    });

    nh.applications.NewsPoller = nh.applications.AbstractApp.extend({
        ARTICLE_LIMIT: 10,

        init: function () {
            var _this = this;

            nh.applications.NewsPoller.__super__.init.apply(_this, arguments);

            _this.socket = io.connect(nh.config.NODE.URL, {
                port: nh.config.NODE.PORT,
                transports: nh.config.NODE.TRANSPORTS
            });

            _this.$el = $('#articlesContainer');
            _this.el = nh.React.renderComponent(
                <nh.views.ArticlesListing articles={ _this.extractArticles(_this.$el) } limit={ _this.ARTICLE_LIMIT } />,
                _this.$el[0]
            );

            _this.bindEvents();

            return _this;
        },

        extractArticles: function (el) {
            var articles = [];

            el.find('li').each(function () {
                articles.push({
                    id: $(this).data('article-id'),
                    title: $(this).find('h3').text().trim(),
                    description: $(this).find('div').html().trim(),
                    isNew: false
                });
            });

            return articles;
        },

        bindEvents: function () {
            this.socket.on(nh.config.NODE.EVENTS.ARTICLE_ADDED, this.addArticle.bind(this));
            this.socket.on(nh.config.NODE.EVENTS.ARTICLES_ADDED, this.addArticles.bind(this));
        },

        addArticle: function (data) {
            console.log(data);

            this.el.addArticle(data);
        },

        addArticles: function (data) {
            console.log(data);

            this.el.addArticles(data);
        }
    });

    nh.applications.NewsArticle = nh.applications.AbstractApp.extend({
        ARTICLE_LIMIT: 10,

        init: function () {
            var _this = this;

            nh.applications.NewsArticle.__super__.init.apply(_this, arguments);

            _this.$el = $('#articleContainer');
            _this.render(_this.extractArticle(_this.$el));

            return _this;
        },

        extractArticle: function (el) {
            return {
                id: el.find('article').data('article-id'),
                title: el.find('h1').text().trim(),
                description: el.find('.articleContent').html().trim()
            };
        },

        render: function (article) {
            this.el = nh.React.renderComponent(
                <nh.views.Article id={ article.id } title={ article.title } description={ article.description } />,
                this.$el[0]
            );
        }
    });
})(nh, $);