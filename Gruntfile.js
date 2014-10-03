module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        react: {
            files: {
                expand: true,
                cwd: 'assets/js',
                src: ['**/*.jsx'],
                dest: 'assets/js/compiled',
                ext: '.js'
            }
        },
        karma: {
            unit: {
                configFile: 'my.conf.js'
            }
        },
        compass: {
            dist: {
                options: {
                    environment: 'production',
                    sassDir: 'assets/styles/sass',
                    cssDir: 'assets/styles/css',
                    outputStyle: 'expanded',
                    noLineComments: true
                }
            }
        },
        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            build: {
                src: [
                    'assets/js/lib/react-0.11.2.js',
                    'assets/js/lib/JSXTransformer-0.11.2.js',
                    'assets/js/lib/jquery-2.0.3.min.js',
                    'prop.js',
                    'assets/js/common/config.js',
                    'assets/js/compiled/lib/utils.js',
                    'assets/js/lib/event-listener.js',
                    'assets/js/compiled/abstract.js',
                    'assets/js/compiled/views/templates.js',
                    'assets/js/compiled/views/news-poll-view.js',
                    'assets/js/compiled/app/news-poll-application.js',
                    'assets/js/compiled/page/news-poll-page.js',
                    'assets/js/boot.js'
                ],
                dest: 'assets/js/compiled/<%= pkg.name %>.js.concat.js'
            }
        },
        uglify: {
            options: {
                banner: '/**! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> **/\n'
            },
            javascript: {
                src: 'assets/js/compiled/<%= pkg.name %>.js.concat.js',
                dest: 'assets/js/compiled/<%= pkg.name %>.js.min.js'
            }
        },
        cssmin: {
            options: {
                banner: '/**! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> **/'
            },
            build: {
                src: 'assets/styles/css/style.css',
                dest: 'assets/styles/<%= pkg.name %>.min.css'
            }
        }
    });

    //grunt.loadNpmTasks('karma-browserify');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['react', 'karma', 'compass', 'concat', 'uglify', 'cssmin']);
};