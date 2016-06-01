module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),				
		less: {
		  development: {
			options: {
			  paths: ['src']
			},
			files: {
			  'styles.css': 'styles/*.less'
			}
		  },
		  production: {
			options: {
			  paths: [''],
			  plugins: [
				new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
				new (require('less-plugin-clean-css'))(cleanCssOptions)
			  ]			  
			},
			files: {
			  'dist/styles.css': 'src/styles/*.less'
			}
		  }
		}
	});

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-less');
	
	 grunt.registerTask('less', ['less']);

    // Tasks
    grunt.registerTask('build', ['less','concat', 'uglify', 'copy', 'cssmin']);

};
