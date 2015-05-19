module.exports = function(grunt) {

	grunt.initConfig({

		'http-server': {
			'dev': {
				root: './',
				port: 8000,
				host: "127.0.0.1"
			}
		},

		'wiredep': {
			'target': {
				src: './src/public/index.html'
			}
		}
	});

	grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-wiredep');

	grunt.registerTask('build', ['wiredep:target']);
	grunt.registerTask('server', ['http-server:dev']);
};
