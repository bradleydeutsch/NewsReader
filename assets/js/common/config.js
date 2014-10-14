(function (context, window) {
    var exports;

    exports = function (nh, window) {
        nh = nh || {};

        nh.config = {
            BASE_AJAX_URL: nh.PROPS.BASE_AJAX_URL,
            URLS: {
                ARTICLES : nh.PROPS.BASE_AJAX_URL + 'assets/data/articles.txt'
            },
            NODE: {
                URL: 'http://localhost',
                PORT: 8000,
                TRANSPORTS: ['websocket'],
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

        nh.eventHandler = {};

        nh.views = {};

        nh.applications = {};

        nh.pages = {};

        nh.templates = {};

        if (window && window.React) {
            nh.React = window.React;
            delete window.React;
        }
    };

    if (context.hasOwnProperty('exports')) {
        context.exports = exports;
    } else {
        exports(context, window);
    }
})(typeof module === 'undefined' ? nh : module, typeof module === 'undefined' ? window : null);
