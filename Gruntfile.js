module.exports = function (grunt) {
   grunt.initConfig({
      browserify: {
         dist: {
            options: {
               transform: [
                  ["babelify", {
                     loose: "all"
                  }]
               ]
            },
            files: {
               // if the source file has an extension of es6 then
               // we change the name of the source file accordingly.
               // The result file's extension is always .js
               "./dist/static/js/index.js": ["./src/jsportal/index.js"],
               "./dist/static/js/square.js": ["./src/jsportal/square.js"],
               "./dist/static/js/matix.js": ["./src/jsportal/matix.js"],
               "./dist/static/js/circle.js": ["./src/jsportal/circle.js"]
            }
         }
      },
      watch: {
         js: {
           files: ["./src/*.js"],
           options: {livereload:true},
           tasks: ["browserify"]
         }
      }
   });

   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-watch");

   grunt.registerTask("default", ["watch"]);
   grunt.registerTask("build", ["browserify"]);
};