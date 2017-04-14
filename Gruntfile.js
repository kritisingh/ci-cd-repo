module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      DesktopInit: {
        options: {
          baseUrl: "public/js/app",
          paths: {
            "desktop": "init/DesktopInit"
          },
          wrap: true,
          name: "../libs/almond",
          preserveLicenseComments: false,
          optimize: "uglify",
          mainConfigFile: "public/js/app/config/desktopConfig.js",
          include: ["desktop"],
          out: "public/js/app/init/DesktopInit.min.js"
        }
      },
      desktopCSS: {
        options: {
          optimizeCss: "standard",
          cssIn: "./public/css/desktop.css",
          out: "./public/css/desktop.min.css"
        }
      },
    },
    jshint: {
      files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
      options: {
        globals: {
          jQuery: true,
          console: false,
          module: true,
          document: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['requirejs:DesktopInit', 'requirejs:desktopCSS']);
  grunt.registerTask('default', ['test', 'build']);

};
