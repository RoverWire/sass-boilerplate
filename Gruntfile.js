module.exports = function(grunt) {
  var shell        = require("shelljs");
  var bourbon_path = shell.exec("bundle show bourbon", { async: false, silent: true }).output.replace("\n", "") + '/app/assets/stylesheets';
  var neat_path    = shell.exec("bundle show neat", { async: false, silent: true }).output.replace("\n", "") + '/app/assets/stylesheets';
  var support_path = shell.exec("bundle show support-for", { async: false, silent: true }).output.replace("\n", "") + '/sass';
  var typey_path   = shell.exec("bundle show typey", { async: false, silent: true }).output.replace("\n", "") + '/stylesheets';

  grunt.initConfig({
    connect: {
      server: {
        options: {
          base: './',
          port: '3000',
          host: '*',
          livereload: true
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          loadPath: [ neat_path, bourbon_path, 'assets/stylesheets' ],
          sourcemap: 'none',
          require: 'sass-globbing',
          noCache: true
        },
        files: {
          'assets/stylesheets/application.css':'assets/stylesheets/application.css.scss'
        }
      }
    },
    haml: {
      dist: {
        options: {
          format: 'html5'
        },
        files: {
          'index.html':'views/index.haml'
        }
      }
    },
    watch: {
      layout: {
        files: 'views/**/*.haml',
        tasks: ['haml'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      styles: {
        files: 'assets/stylesheets/**/*.scss',
        tasks: ['sass'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      scripts: {
        files: 'assets/javascripts/*.js',
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-haml2html');

  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('build', ['sass', 'haml']);
}
