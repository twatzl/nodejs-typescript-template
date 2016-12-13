'use strict';

var path = require('path'),
	gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');

var TypescriptBuildFunctions = (function () {
    function typescriptBuildFunctions() {

		this.compileTypescript = function(sourceFolder, destinationFolder, callback, tsProject, tsDefinitionFiles = []) {
			console.log("CompileTypescript")
			console.log("Source: " + sourceFolder);
			console.log("Destination: " + destinationFolder);
 
			return	gulp.src([sourceFolder + '**/*.ts'].concat(tsDefinitionFiles))
				.pipe(sourcemaps.init())
				.pipe(tsProject())
				.pipe(sourcemaps.write('.' ,{includeContent: true, sourceRoot: path.join(__dirname, sourceFolder)}))
				.pipe(gulp.dest(destinationFolder));
		}

		this.copyViewFiles = function(sourceFolder, destinationFolder, callback) {
			console.log("CopyHTML");
			console.log("(and CSS)");
			console.log("Source: " + sourceFolder);
			console.log("Destination: " + destinationFolder);
			return gulp.src([sourceFolder + '**/*.html', sourceFolder + '**/*.css'])
				.pipe(gulp.dest(destinationFolder))
				.on('end', function() {
					//callback();
				});
		}

		this.copyJavascript = function(sourceFolder, destinationFolder, callback) {
			console.log("CopyJavascript")
			console.log("Source: " + sourceFolder);
			console.log("Destination: " + destinationFolder);
			return gulp.src([sourceFolder + '**/*.js'])
				.pipe(gulp.dest(destinationFolder))
				.on('end', function() {
					//callback();
				});
		}

		this.cleanFiles = function(buildPath, callback) {
			// delete the files
			del(buildPath, callback);
		}

    }
    return typescriptBuildFunctions;
})();
module.exports = TypescriptBuildFunctions;