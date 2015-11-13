var fs = require('fs');

function loadExternalGruntSettings() {
  try {
    var data = fs.readFileSync('.local_grunt_settings.json', 'utf8');
    var ob = JSON.parse(data);
    console.log('* Using Local Settings');
    return ob;
  }
  catch(e) {
    return false;
  }
}

module.exports = function(grunt) {

  console.log("================================================");
  console.log("Grunt for Drupal - v2.0");
  console.log("================================================");
  var localSettings = loadExternalGruntSettings();
  console.log("------------------------------------------------");

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // ================================================
    // JavaScript / SASS Beautifier
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
    // ================================================
    // Concat
    // ================================================
    concat: {
      options: {
        separator: '\n\n',
      },
      dist: {
        src: ['../src/js/**/*.js'],
        dest: '../dist/js/script.js'
      }
    },
    // ================================================
    // JS Transpiler
    // ================================================
    babel: {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: {
          '../dist/js/script.compat.js': '../dist/js/script.js'
        }
      }
    },
    // ================================================
    // SASS
    // ================================================
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          '../dist/css/styles.css': '../src/sass/styles.scss'
        }
      }
    },
    // ================================================
    // Drupal Code Sniffer
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
    },
    // ================================================
    // Watch
    // ================================================
    watch: {
      scripts: {
        files: ['../src/js/**/*.js'],
        tasks: ['jsbeautifier', 'concat', 'babel'],
        options: {
          spawn: false,
        },
      },
      styles: {
        files: ['../src/sass/**/*.scss'],
        tasks: ['jsbeautifier', 'sass'],
        options: {
          spawn: false,
        },
      },
      templates: {
        files: ['../template.php', '../templates/*.php'],
        tasks: ['phpcs'],
        options: {
          spawn: false,
        },
      }
    }
  });

  // To Implement: Load a user created grunt_settings.js file.

  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-phpcs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jsbeautifier', 'concat', 'babel', 'sass', 'phpcs']);
};