module.exports = function (nh, io, util) {
    nh.applications.NewsPoll = function () {
        this.collection = [];

        this.init = function () {
            var _this = this;

            _this.socket = io.listen(nh.config.NODE.PORT);

            _this.socket.configure(function () {
                _this.socket.set('transports', ['websocket']);
                _this.socket.set('log level', 2);
            });

            _this.setEventHandlers();

            _this.poller = _this.poll();

            return this;
        };

        this.setEventHandlers = function () {
            this.socket.sockets.on('connection', this.bindEvents.bind(this));
        };

        this.bindEvents = function (client) {
            var _this = this;

            _this.client = client;

            _this.client.on(nh.config.NODE.EVENTS.PUSH_ARTICLE, _this.handleArticlePushed.bind(_this));
            _this.client.on(nh.config.NODE.EVENTS.ADD_ARTICLE, _this.handleArticleAdded.bind(_this));
        };

        this.handleArticlePushed = function (data) {
            util.log('Article Pushed');

            this.client.emit(nh.config.NODE.EVENTS.ARTICLE_ADDED, data);
        };

        this.handleArticleAdded = function (data) {
            util.log('Article Added');

            this.collection.unshift(data);
        };

        this.poll = function () {
            var _this = this,
                interval;

            interval = setInterval(function () {
                if (_this.collection.length > 0) {
                    util.log('Articles Polled');

                    _this.client.emit(nh.config.NODE.EVENTS.ARTICLES_ADDED, _this.collection);
                    _this.collection = [];
                }
            }, nh.config.POLLING.ARTICLES);

            return interval;
        };

        return this.init();
    };
};