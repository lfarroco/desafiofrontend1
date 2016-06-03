module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),				
		
		uglify: {
            options: {
                mangle: false,
                sourceMap: true,
                drop_console: true
            },
            my_target: {
                files: {
                    'dist/scripts.js': ['src/js/*.js']
                }
            }
        },
		
		concat: {
            options: {
                separator: ';\r\n',
            },
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'dist/scripts.js'                    
                ],
                dest: 'dist/scripts.js',
                nonull: true,
            }
        },
		
		cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/styles.css': ['src/css/*.css']
                }
            }
        },
		
		watch: {
		  scripts: {
			files: ['src/**/*.*'],
			tasks: ['build'],
			options: {
			  spawn: false,
			},
		  },
		},
		
	});

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.loadNpmTasks('grunt-contrib-watch');
	
    grunt.registerTask('build', ['uglify', 'concat','cssmin']);

};
