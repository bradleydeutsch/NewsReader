module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine', 'browserify'],

        files: [
            <!-- config -->

            'karma/prop.js',

            <!-- libraries -->

            'assets/js/lib/react-0.11.2.js',
            'assets/js/lib/jquery-2.0.3.min.js',
            'tests/lib/jasmine-jquery.js',
            'tests/lib/mock-ajax.js',
            'tests/lib/utils.js',
            'tests/lib/custom-matchers.js',
            'tests/lib/jasmine-config.js',
            'tests/lib/jasmine-react.js',

            <!-- source files -->

            'assets/js/common/config.js',
            'assets/js/lib/utils.jsx',
            'assets/js/lib/event-listener.js',
            'assets/js/abstract.jsx',
            'assets/js/views/templates.jsx',

            'assets/js/views/news-poll-view.jsx',
            'assets/js/app/news-poll-application.jsx',
            'assets/js/page/news-poll-page.jsx',

            <!-- specs -->

            'tests/spec/unit/UtilsSpec.js',
            'tests/spec/unit/NewsPollApplicationSpec.js',
            'tests/spec/unit/NewsPollPageSpec.js',

            'tests/spec/unit/NewsPollViewSpec.jsx',

            {
                pattern: 'tests/fixtures/*.html',
                watched: true,
                served: true,
                included: false
            }
        ],

        exclude: [],

        preprocessors: {
            '**/*.jsx': ['react-jsx']
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['Chrome', 'Firefox'],

        singleRun: true
    });
};
