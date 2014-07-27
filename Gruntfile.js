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
        }
    });
    grunt.loadNpmTasks('grunt-mocha');
    grunt.registerTask('default', ['mocha']);
};