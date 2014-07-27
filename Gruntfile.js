module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mocha: {
            all: {
                src: ['test/test.html']
            }, options: {
                run: true,
                log: true,
                reporter: "Nyan"
            }
        },
        jshint: {
            myFiles: ['zepto.autocomplete.js']
        },
        uglify: {
            js: {
                files: {
                    'zepto.autocomplete.min.js' : [ 'zepto.autocomplete.js' ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['mocha','jshint','uglify']);
};