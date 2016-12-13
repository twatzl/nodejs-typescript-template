'use strict';
var tsc = require('gulp-typescript');

var GulpConfig = (function () {
    function gulpConfig() {

        /**
         * js = javascript files
         * ts = typescript files (+ generated js)
         * view = html + css files
         */

        /**
         * Source directories
         */
        this.sourceDir = 'src/';

        this.jsSourceDir = this.sourceDir;
        this.tsSourceDir = this.sourceDir;
        this.viewSourceDir = this.sourceDir;

        /**
         * Destination directories
         */
        this.buildDir = './build/'

        this.jsBuildDir = this.buildDir;
        this.tsBuildDir = this.buildDir;
        this.viewBuildDir = this.buildDir;

        this.tsDefinitionFiles = [
            "typings/**/*.d.ts",
            "node_modules/@types/**/*.d.ts",
            "node_modules/@angular/**/*.d.ts"
        ]
        this.tsProject = tsc.createProject('tsconfig.json');

        /**
         * The directory from where the client node_modules will be served.
         * NOTE: If you change this directory configuration, you will also
         * have to change the corresponding path in server/index.ts.
         */
        this.clientNodeModulesDir = this.buildDir + "client/node_modules/"

        /**
         * Here are the node_modules specified which will be served to
         * the client.
         */
        this.clientNodeModules = [
            "@angular",
            "core-js",
            "zone.js",
            "reflect-metadata",
            "systemjs",
            "rxjs"
        ];

        console.log("Source directory: " + this.sourceDir);
        console.log("Output directory: " + this.buildDir);
        console.log("### directories can be changed in gulpfile.config.js\n");
    }
    return gulpConfig;
})();
module.exports = GulpConfig;