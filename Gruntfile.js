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
  console.log("Grunt for Drupal - v2.2");
  console.log("================================================");
  var localSettings = loadExternalGruntSettings();
  var THEME_DIR     = localSettings.theme_directory || '../';
  var MODULE_DIR    = localSettings.custom_modules_directory || null;
  var PHPCS_BIN_DIR = localSettings.phpcs_bin || null;
  console.log("------------------------------------------------");

  // =========================================================
  // GLOBAL CONFIG
  // =========================================================
  var REGISTERED_TASKS = [];
  var GRUNT_CONFIG = {
    pkg: grunt.file.readJSON('package.json'),
    watch: {}
  };

  // ================================================
  // JavaScript / SASS Beautifier
  // ================================================
  grunt.loadNpmTasks("grunt-jsbeautifier");
  REGISTERED_TASKS = REGISTERED_TASKS.concat(['jsbeautifier']);

  var script_files = [THEME_DIR + "src/js/**/*.js"];
  var style_files = [THEME_DIR + "src/sass/**/*.scss"];
  if (MODULE_DIR !== null) {
    script_files = script_files.concat([
      MODULE_DIR + "**/*.js"
    ]);
  }
  var jsbeautifier_files = script_files.concat(style_files);

  GRUNT_CONFIG['jsbeautifier'] = {
    files : jsbeautifier_files,
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
  };

  GRUNT_CONFIG.watch['scripts'] = {
    files: script_files,
    tasks: ['jsbeautifier'],
    options: {
      spawn: false,
    },
  };

  GRUNT_CONFIG.watch['styles'] = {
    files: style_files,
    tasks: ['jsbeautifier'],
    options: {
      spawn: false,
    }
  };

  // ================================================
  // Concat
  // ================================================
  grunt.loadNpmTasks('grunt-contrib-concat');
  REGISTERED_TASKS = REGISTERED_TASKS.concat(['concat']);

  GRUNT_CONFIG['concat'] = {
    options: {
      separator: '\n\n',
    },
    dist: {
      src: [THEME_DIR + 'src/js/**/*.js'],
      dest: THEME_DIR + 'dist/js/script.js'
    }
  };

  GRUNT_CONFIG.watch.scripts.tasks.push('concat');

  // ================================================
  // SASS
  // ================================================
  grunt.loadNpmTasks('grunt-sass');
  REGISTERED_TASKS = REGISTERED_TASKS.concat(['sass']);

  var sass_config = {
    options: {
      sourceMap: true,
      outputStyle: 'expanded'
    },
    dist: {
      files: {}
    }
  };
  sass_config.dist.files[THEME_DIR + 'dist/css/styles.css'] = THEME_DIR + 'src/sass/styles.scss';

  GRUNT_CONFIG['sass'] = sass_config;

  GRUNT_CONFIG.watch.styles.tasks.push('sass');

  // ================================================
  // Drupal Code Sniffer
  // ================================================
  if (PHPCS_BIN_DIR !== null) {
    // Set up Grunt
    grunt.loadNpmTasks('grunt-phpcs');
    REGISTERED_TASKS = REGISTERED_TASKS.concat(['phpcs']);

    var phpcs_src_files = [
      THEME_DIR + 'template.php',
      THEME_DIR + 'templates/*.php'
    ];

    if (MODULE_DIR !== null) {
      phpcs_src_files = phpcs_src_files.concat([
        MODULE_DIR + '**/*.inc',
        MODULE_DIR + '**/*.install',
        MODULE_DIR + '**/*.module',
        MODULE_DIR + '**/*.php'
      ]);
    }

    // Config Settings
    GRUNT_CONFIG['phpcs'] = {
      application: {
        src: phpcs_src_files
      },
      options: {
        bin: PHPCS_BIN_DIR,
        standard: 'Drupal',
        severity: 1,
        errorSeverity: 1,
        warningSeverity: 0
      }
    };

    // Watch settings
    GRUNT_CONFIG.watch['templates'] = {
      files: phpcs_src_files,
      tasks: ['phpcs'],
      options: {
        spawn: false,
      },
    };
  }

  // =========================================================
  // GRUNT SETUP
  // =========================================================
  grunt.initConfig(GRUNT_CONFIG);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', REGISTERED_TASKS);
};