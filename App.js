var util = require('util'),
    io = require('socket.io'),
    nh = {},
    application;

require('./assets/js/node/prop.js')(nh);

require('./assets/js/common/config.js')(nh);

require('./assets/js/node/news-poll-application')(nh, io, util);

application = new nh.applications.NewsPoller();