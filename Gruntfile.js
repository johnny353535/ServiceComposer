module.exports = function (grunt) {

    // Configure paths
    var config = {
        dist: 'dist'
    };


    /**
     *
     * Project configuration
     *
     */

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Creates a local, static server with livereload
        connect: {
            options: {
                hostname: 'localhost',
                port: 8080,
                livereload: 35729
            },
            livereload: {
            }

        },

        // Watches HTML, JS, CSS and reloads the page
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            html: {
                files: ['{,*/}*.html']
            },
            less: {
                files: ['less/**/*.less'],
                tasks: ['less:dev']
            },
            react: {
                files: ['js/**/*.js'],
                tasks: ['react']
            },
            jshint: {
                files: ['build/**/*.js'],
                tasks: ['jshint:all']
            },
        },

        // Compiles LESS
        less: {
            options: {
                sourceMap: true,
                sourceMapRootpath: '..'
            },
            dev: {
                options: {
                    sourceMapFilename: 'css/style.css.map',
                    sourceMapURL: 'style.css.map' // the complete url and filename put in the compiled css file
                },
                files: [
                    { src: "less/style.less", dest: "css/style.css"}
                ]
            },
            dist: {
                options: {
                    sourceMapFilename: config.dist + '/css/style.css.map',
                    sourceMapURL: 'style.css.map', // the complete url and filename put in the compiled css file
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: [
                    { src: "less/style.less", dest: config.dist + "/css/style.css"}
                ]
            }
        },

        // Checks for JS errors
        jshint: {
            options: {
              devel: true,
              force: true,
              browser: true,
              globalstrict: false,
              asi: true,
              globals: {
                jQuery: true,
                Events: true,
                define: true
              }
            },
            all: [
              'Gruntfile.js',
              'build/**/*.js',
              '!bower_components/**/*.js',
              '!node_modules/**/*.js',
              '!js/vendor/**/*.js'
            ]

        },

        react: {
            dynamic_mappings: {
              files: [
                {
                  expand: true,
                  cwd: 'js',
                  src: ['**/*.js'],
                  dest: 'build'
                }
              ]
            }
          },

        // Empties the /dist directory
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            config.dist,
                                '!' + config.dist + '.git*'
                        ]
                    }
                ]
            }
        },

        // Concatinates and compresses the JS files
        requirejs: {
            compile: {
                options: {
                    include: 'main',
                    name: '../bower_components/almond/almond',
                    mainConfigFile: 'build/main.js',
                    baseUrl: 'build',
                    out: config.dist + '/js/main.min.js',
                    optimize: 'uglify2',
                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    inlineText: true,
                    findNestedDependencies: true
                }
            }
        },

        // Adds vendor-prefixes to style.css
        autoprefixer: {
            options: {
                browsers: ['last 3 version'],
                map: true
            },
            dist: {
                files: [
                    {
                        src: config.dist + '/css/style.css',
                        dest: config.dist + '/css/style.css'
                    }
                ]
            }
        },

        // Process index.html for distribution
        processhtml: {
            dist: {
                files: {
                    'dist/index.html': 'index.html'
                }
            }
        },

        // Copies all specified folders and files over to /dist
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        dest: config.dist,
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '{,*/}*.html', // Copy all HTML files
                            'img/{,*/}*.*', // Copy all pictures
                            'fonts/{,*/}*.*', // Copy all fonts
                            'data/{,*/}*.*', // Copy all data
                        ]
                    }
                ]

            }
        },
        bower: {
            all: {
                rjsConfig: 'build/main.js',
                options: {
                    transitive: true
                }
            }
        }
    });


    /**
     *
     * Load plugins
     *
     */

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-react');


    /**
     *
     * Register tasks
     *
     */

    grunt.registerTask('default', ['dev']); // The default task just runs the dev task
    grunt.registerTask('dev', ['less:dev', 'react', 'jshint', 'connect', 'watch']);
    grunt.registerTask('dist', ['clean:dist', 'copy:dist', 'requirejs', 'less:dist', 'autoprefixer:dist', 'processhtml:dist']);

};
