'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    browserSync = require('browser-sync'),
    superstatic = require('superstatic'),
	childProcess = require('child_process'),
    Config = require('./gulpfile.config'),
	Helper = require('./typescript-build-functions.js');

var config = new Config();
var helper = new Helper(config, config.tsProject);

/**
 * Copy HTML and CSS files
 */
gulp.task('copy-view', function (callback) {
	helper.copyViewFiles(config.viewSourceDir, config.viewBuildDir, callback);
})

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function (callback) {
	helper.compileTypescript(config.tsSourceDir, config.tsBuildDir, callback);
});

/**
 * Remove all generated and copied files from build directory.
 */
gulp.task('clean', function (callback) {
	helper.cleanFiles(config.buildDir, callback);
});

gulp.task('watch', function () {
    gulp.watch(config.tsSourceDir, ['build']);
});

gulp.task('build', ['compile-ts','copy-view'], function() {
	// yeah fine should be built here
})

gulp.task('serve', ['build', 'watch'], function () {
	process.stdout.write('Starting browserSync and superstatic...\n');
	browserSync({
		port: 3000,
		files: ['index.html', '**/*.js'],
		injectChanges: true,
		logFileChanges: false,
		logLevel: 'silent',
		logPrefix: 'angularin20typescript',
		notify: true,
		reloadDelay: 0,
		server: {
			baseDir: './',
			middleware: superstatic({ debug: false })
		}
	});
});

gulp.task('copy-definition', function() {
	gulp.src("./build/**/*.d.ts").
	pipe(gulp.dest(config.typings+"/app/"));
});

gulp.task('default', ['build']);