(function (gulp, gulpLoadPlugins, pkg) {
	'use strict';
	//|**
	//|
	//| Gulpfile
	//|
	//| This file is the streaming build system
	//|
	//| .-------------------------------------------------------------------.
	//| | NAMING CONVENTIONS:                                               |
	//| |-------------------------------------------------------------------|
	//| | Singleton-literals and prototype objects      | PascalCase        |
	//| |-------------------------------------------------------------------|
	//| | Functions and public variables                | camelCase         |
	//| |-------------------------------------------------------------------|
	//| | Global variables and constants                | UPPERCASE         |
	//| |-------------------------------------------------------------------|
	//| | Private variables                             | _underscorePrefix |
	//| '-------------------------------------------------------------------'
	//|
	//| Comment syntax for the entire project follows JSDoc:
	//| - http://code.google.com/p/jsdoc-toolkit/wiki/TagReference
	//|
	//| For performance reasons we're only matching one level down:
	//| - 'test/spec/{,*/}*.js'
	//|
	//| Use this if you want to recursively match all subfolders:
	//| - 'test/spec/**/*.js'
	//|
	//'*/
	var $ = gulpLoadPlugins({ pattern: '*', lazy: true }),
		_ = { src: './source', dist: './dist', test: './test' },
		inline = '// <%= pkg.name %>@v<%= pkg.version %>, <%= pkg.license %> licensed. <%= pkg.homepage %>\n',
		extended = [
		'/**',
		' * <%= pkg.name %> - <%= pkg.description %>',
		' * @version v<%= pkg.version %>',
		' * @link <%= pkg.homepage %>',
		' * @license <%= pkg.license %>',
		' */'
	].join('\n');

	//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//| ✓ validate
	//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	gulp.task('jshint', function () {
		var stream = gulp.src(_.src + '/*.js')
		.pipe($.plumber())
		.pipe($.jshint('.jshintrc'))
		.pipe($.jshint.reporter('default'))
		.pipe($.jscs());
		return stream;
	});

	gulp.task('mocha', function () {
		var stream = gulp.src(_.test + '/**/*.js')
		.pipe($.plumber())
		.pipe($.mocha({ reporter: 'list' }));
		return stream;
	});

	//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//| ✓ compress
	//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	gulp.task('build-shim', ['bump', 'validate', 'clean'], function () {
		var stream = gulp.src(_.src + '/jclip.shim.js')
		.pipe($.header(extended, { pkg: pkg } ))
		.pipe(gulp.dest(_.dist))
		.pipe($.rename('jclip.shim.min.js'))
		.pipe($.uglify())
		.pipe($.header(inline, { pkg: pkg } ))
		.pipe($.size())
		.pipe(gulp.dest(_.dist));
		return stream;
	});

	gulp.task('build', ['build-shim'], function () {
		var stream = gulp.src(_.src + '/jclip.js')
		.pipe($.header(extended, { pkg: pkg } ))
		.pipe(gulp.dest(_.dist))
		.pipe($.rename('jclip.min.js'))
		.pipe($.uglify())
		.pipe($.header(inline, { pkg: pkg } ))
		.pipe($.size())
		.pipe(gulp.dest(_.dist));
		return stream;
	});

	//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//| ✓ versioning
	//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	gulp.task('bump', function () {
		var bumpType = process.env.BUMP || 'patch';
		var stream = gulp.src(['package.json', 'bower.json'])
		.pipe($.bump({ type: bumpType }))
		.pipe(gulp.dest('./'));
		return stream;
	});

	gulp.task('tag', ['build'], function () {
		var version = 'v' + pkg.version;
		var message = 'Release ' + version;
		var stream = gulp.src('./')
		.pipe($.git.commit(message))
		.pipe($.git.tag(version, message))
		.pipe($.git.push('origin', 'master', '--tags'))
		.pipe($.gulp.dest('./'));
		return stream;
	});

	gulp.task('npm', ['tag'], function (done) {
		var process = require('child_process')
		.spawn('npm', ['publish'], { stdio: 'inherit' })
		.on('close', done);
		return process;
	});

	//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//| ✓ default
	//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	gulp.task('clean', function () {
		var stream = gulp.src(_.dist, { read: false })
		.pipe($.plumber())
		.pipe($.clean());
		return stream;
	});

	gulp.task('default', function() {
		gulp.start('validate');
	});

	//|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//| ✓ shortcuts
	//'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	gulp.task('validate', ['jshint', 'mocha']);
	gulp.task('release', ['npm']);
	gulp.task('ci', ['build']);

}(require('gulp'), require('gulp-load-plugins'), require('./package.json')));
