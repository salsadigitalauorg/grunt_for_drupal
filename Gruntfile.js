var fs = require('fs');

function loadExternalGruntSettings() {
  try {
    var data = fs.readFileSync('.local_grunt_settings.json', 'utf8');
    var ob = JSON.parse(data);
    console.log('Using Local Settings');
    return ob;
  }
  catch(e) {
    return false;
  }
}

module.exports = function(grunt) {

  var localSettings = loadExternalGruntSettings();

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // ================================================
    // JAVASCRIPT
    // ================================================
    jsbeautifier : {
      files : ["../src/js/**/*.js", "../src/sass/**/*.scss"],
      options : {
        html: {
          braceStyle: "collapse",
          indentChar: " ",
          indentScripts: "keep",
          indentSize: 2,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          unformatted: ["a", "sub", "sup", "b", "i", "u"],
          wrapLineLength: 0
        },
        css: {
          fileTypes: [".scss"],
          indentChar: " ",
          indentSize: 2,
          selectorSeparatorNewline: false
        },
        js: {
          braceStyle: "collapse",
          breakChainedMethods: false,
          e4x: false,
          evalCode: false,
          indentChar: " ",
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false,
          jslintHappy: false,
          keepArrayIndentation: false,
          keepFunctionIndentation: false,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          spaceBeforeConditional: true,
          spaceInParen: false,
          unescapeStrings: false,
          wrapLineLength: 0,
          endWithNewline: true
        }
      }
    },
    jshint: {
      all: ['../src/js/*.js']
    },
    concat: {
      options: {
        separator: '\n\n',
      },
      dist: {
        src: ['../src/js/*.js'],
        dest: '../js/script.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '../js/script.js',
        dest: '../js/script.min.js'
      }
    },
    // ================================================
    // STYLESHEETS
    // ================================================
    compass: {
      dist: {
        options: {
          basePath: '../',
          config: '../config.rb'
        }
      }
    },
    // ================================================
    // PHP
    // ================================================
    phpcs: {
      application: {
        src: ['../template.php', '../templates/*.php']
      },
      options: {
        bin: localSettings.phpcs_bin || '/Users/salsadigital/pear/bin/phpcs',
        standard: 'Drupal',
        severity: 1,
        errorSeverity: 1,
        warningSeverity: 0
      }
    }
  });

  // To Implement: Load a user created grunt_settings.js file.

  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-phpcs');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'jsbeautifier', 'concat', 'uglify', 'compass', 'phpcs']);
};