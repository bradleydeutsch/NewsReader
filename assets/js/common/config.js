(function (context) {
    var exports;

    exports = function (nh) {
        nh = nh || {};

        nh.config = {
            BASE_AJAX_URL: nh.PROPS.BASE_AJAX_URL,
            URLS: {
                ARTICLES : nh.PROPS.BASE_AJAX_URL + 'assets/data/articles.txt'
            },
            NODE: {
                URL: 'http://localhost',
                PORT: 8000,
                EVENTS: {
                    ADD_ARTICLE: 'add article',
                    PUSH_ARTICLE: 'push article',
                    ARTICLE_ADDED: 'article added',
                    ARTICLES_ADDED: 'articles added'
                }
            },
            POLLING: {
                ARTICLES: 10000
            }
        };

        nh.utils = {};

        nh.views = {};

        nh.applications = {};

        nh.pages = {};

        nh.templates = {};
    };

    if (context.hasOwnProperty('exports')) {
        context.exports = exports;
    } else {
        exports(context);
    }
})(typeof module === 'undefined' ? nh : module);
