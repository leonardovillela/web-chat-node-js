module.exports = function(grunt) {

	grunt.initConfig({

		'http-server': {

			'dev': {
				root: './',
				port: 8000,
				host: "127.0.0.1"
			}
			
		}
	});

	grunt.loadNpmTasks('grunt-http-server');

	grunt.registerTask('server', ['http-server:dev']);
};
