'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    tsProject = tsc.createProject('tsconfig.json'),
    browserSync = require('browser-sync'),
    superstatic = require('superstatic'),
	childProcess = require('child_process'),
    Config = require('./gulpfile.config'),
	Helper = require('./typescript-build-functions.js');

var config = new Config();
var helper = new Helper(config, config.tsProject);

gulp.task('copy-view', function (callback) {
	helper.copyPartialViews(config.viewSrcFiles, config.viewOutputPath, callback);
})

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function (callback) {
    helper.compileTypescript(config.source, config.tsOutputPath, callback);
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (callback) {
	helper.cleanFiles(config.tsOutputPath, callback);
});

gulp.task('watch', function () {
    gulp.watch([config.tsSrcFiles], ['build']);
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