module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        react: {
            files: {
                expand: true,
                cwd: 'assets/js',
                src: ['**/*.jsx'],
                dest: 'assets/js/compiled',
                ext: '.js'
            }
        },
        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            build: {
                src: [
                    'assets/js/lib/jquery-2.0.3.min.js',
                    'prop.js',
                    'assets/js/common/config.js',
                    'assets/js/compiled/lib/utils.js',
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

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['compass', 'react', 'concat', 'uglify', 'cssmin']);
};