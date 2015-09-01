module.exports = function(grunt) {

	require('time-grunt')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		dev: "src",

		prod: "build",

		// Validate JS
		jshint: {
			all: [
				"Gruntfile.js",
				"<%= dev %>/js/**/*.js"
			]
		},


		// Less compiler
		less: {
			css: {
				files: {
					'<%= dev %>/css/site.css': '<%= dev %>/less/site.less'
				},
				options: {
					//compress: true,
					//cleancss: true,
					sourceMap: true,
					sourceMapFilename: '<%= dev %>/css/<%= pkg.name %>.css.map',
					sourceMapRootpath: '../../',
					sourceMapURL: '<%= pkg.name %>.css.map'
				},
			}
		},

		// Auto vendor prefixes
		autoprefixer: {
			options: {
				browsers: ['last 4 versions']
			},
			css: {
				files: {
					'<%= dev %>/css/site.css': '<%= dev %>/css/site.css'
				}
			}
		},

		assemble: {
			options:{
				layoutdir: '<%= dev %>/html/layouts',
				flatten: true,
				layout: 'default.hbs',
				partials: '<%= dev %>/html/partials/**/*.hbs',
				helpers: ['helpers/**/*.js']
			},
			page: {
				files: {
					'<%= dev %>/': ['<%= dev %>/html/pages/**/*.hbs']
				}
			}
		},

		sampleCode: {
			basic:{
				files: [{
					expand:true,
					src: '<%= dev %>/*.html',
					dest: ''
				}]
			}
		},

		notify: {
			task_name: {
				options: {
				// Task-specific options go here.
				}
			},
			watch: {
				options: {
					//title: '',
					message: 'Less and Uglify finished running', //required
				}
			}
		},

		useminPrepare:{
			html: '<%= dev %>/index.html',
			options:{
				dest: '<%= prod %>'
			}
		},

		usemin:{
			html:['<%= prod %>/*.html', '<%= prod %>/partials/**/*.html'],
			css: ['<%= prod %>/css/*.css'],
			options: {
				dirs: ['<%= prod %>'],
				assetsDirs: ['<%= prod %>']
			}
		},

		clean: ['<%= prod %>'],

		copy: {
			main: {
				files: [
					// media
					{
						expand: true,
						cwd: '<%= dev %>/',
						src: [
							'css/**/*.map',
							'js/**/*.map',
							'fonts/**',
							'img/**',
							'api/**',
							'partials/**',
							'*.html',
							'*.txt',
							'*.ico',
							'*.png'
						],
						dest: '<%= prod %>/'
					}
				]
			}
		},

		version: {
			options:{
				prefix: '(\\* |")?[Vv]ersion[\'"]?\\s*[:=]?\\s*[\'"]?'
			},
			defaults: {
				src: ['bower.json', '<%= dev %>/src/*.js', '<%= dev %>/less/*.less']
			},
			patch: {
				options: {
					release: 'patch'
				},
				src: ['package.json', 'bower.json', '<%= dev %>/src/*.js', '<%= dev %>/less/*.less']
			},
			minor:{
				options: {
					release: 'minor'
				},
				src: ['package.json', 'bower.json', '<%= dev %>/src/*.js', '<%= dev %>/less/*.less']
			},
			major:{
				options: {
					release: 'major'
				},
				src: ['package.json', 'bower.json', '<%= dev %>/src/*.js', '<%= dev %>/less/*.less']
			}
		},

		// Watch Plugin
		watch: {
			less: {
				// We watch and compile less files as normal but don't live reload here
				files: ['<%= dev %>/less/**/*.less', '<%= dev %>/html/**/*.hbs'],
				tasks: ['default']
			}
		}
	});

	// Load project tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-version');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadTasks('tasks');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'version:defaults', 'less', 'autoprefixer', 'assemble', 'sampleCode']);
	grunt.registerTask('build', ['version:patch', 'default', 'clean', 'copy:main', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin']);
	grunt.registerTask('minor', ['build', 'version:minor']);
	grunt.registerTask('major', ['build', 'version:major']);
};