'use strict';
var tsc = require('gulp-typescript');

var GulpConfig = (function () {
    function gulpConfig() {
        this.project = tsc.createProject('tsconfig.json');
		this.baseDir = '.';
        this.source = 'src/';
		this.sourceMapDir = '';//../../' + this.source;
		
        this.tsOutputPath = './build/';
        this.viewOutputPath = './build/view/'
        this.jsSrcFiles = [this.source + '/js/**/*.js'];
        this.tsSrcFiles = this.source + '**/*.ts';
        this.viewSrcFiles = this.source + 'view/**/*';

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = this.typings + '**/*.ts';

        console.log("Source directory: " + this.source);
        console.log("Output directory: " + this.tsOutputPath);
        console.log("### directories can be changed in gulpfile.config.js\n");
    }
    return gulpConfig;
})();
module.exports = GulpConfig;