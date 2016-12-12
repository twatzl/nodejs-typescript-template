'use strict';

var path = require('path'),
	gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');

var TypescriptBuildFunctions = (function () {
    function typescriptBuildFunctions(config, tsProject) {

		this.compileTypescript = function(sourceFolder, destinationFolder, callback) {
			console.log("CompileTypescript")
			console.log("Source: " + sourceFolder);
			console.log("Destination: " + destinationFolder);
			
			var sourceTsFiles = [sourceFolder + '**/*.ts',              //path to typescript files
				config.libraryTypeScriptDefinitions]; 				//reference to library .d.ts files
                        
			var tsResult = gulp.src(sourceTsFiles)
				.pipe(sourcemaps.init())
				.pipe(tsc(tsProject));

			tsResult.dts.pipe(gulp.dest(destinationFolder));
			return tsResult.js
				.pipe(sourcemaps.write('.' ,{includeContent: true, sourceRoot: path.join(__dirname, sourceFolder)}))
				.pipe(gulp.dest(destinationFolder))
				.on('end', function() {
					//callback();
				});
		}

		this.copyPartialViews = function(sourceFolder, destinationFolder, callback) {
			console.log("CopyHTML")
			console.log("Source: " + sourceFolder);
			console.log("Destination: " + destinationFolder);
			return gulp.src([sourceFolder + '**/*.html'])
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