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
            'assets/js/compiled/lib/utils.js',
            'assets/js/compiled/abstract.js',
            'assets/js/compiled/views/templates.js',

            'assets/js/compiled/views/news-poll-view.js',
            'assets/js/compiled/app/news-poll-application.js',
            'assets/js/compiled/page/news-poll-page.js',

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
