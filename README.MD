Grunt for Drupal
========
version v2.13
Maintained by [Salsa Digital](http://salsadigital.com.au/).

What is this?
-----------
Grunt for Drupal is a grunt project with commonly used tasks to assists Drupal theme and module development.

Before setting up
-----------

### Do you have NodeJS / NPM installed?

If not you can get it from [here](https://nodejs.org/download/).

### Do you have Grunt installed?

If not you can get it by running `sudo npm install -g grunt-cli` in command line.

### Do you have PHP_CodeSniffer installed?

  1. User COMPOSER to install PHP_CodeSniffer
     1. `composer global require "squizlabs/php_codesniffer=2.5.1"`
     2. Versions above 2.6.0 have an issue when [running within grunt](https://github.com/squizlabs/PHP_CodeSniffer/issues/993)
  2. Find PHP_CodeSniffer home
     1. By default: `~/.composer/vendor/bin/phpcs`
     2. Use PHP_CodeSniffer location in bin option in:
        `.local_grunt_settings.json` (See below - 'How do I use my personal preferences with grunt?').
  3. Install Drupal Standard
     1. Go to [here](https://www.drupal.org/project/coder) and download coder 8.x-2.*
     2. Extract and add `coder_sniffer/Drupal` folder to your CodeSniffer Standards folder.
        E.g. `~/.composer/vendor/squizlabs/php_codesniffer/CodeSniffer/Standards/Drupal`

First-time setup for Grunt for Drupal
-----------

  1. Navigate to your Drupal theme root folder.
  2. Clone the repo: `git clone https://github.com/salsadigitalauorg/grunt_for_drupal.git ./grunt`.
  3. Create your `./src` directory (See `example folder setup script` below for folder structure).
  4. Add your source files (SCSS, JS, Images) in `./src` sub-directories.
  5. Create a `./grunt/project_grunt_settings.json` file and configure project settings.

Using Grunt for Drupal - The quick version
-----------

  1. If you need personalised settings, create a `./grunt/.local_grunt_settings.json` file (see below).
  2. Use command line to navigate inside the `./grunt` directory and type `npm install` to install necessary modules.
  3. Type `grunt` for a full compile (everything).
  4. Type `grunt watch` for an automatic compile on file change (only necessary commands will run).

What is Grunt for Drupal doing?
-----------

Within the `Gruntfile.js`, the following processes are run:

  * jsbeautifier
    * Formats working JS and SCSS files.
  * concat
    * Merges all JS files into 1. Allows breaking up of JS files into components.
  * sass
    * Compile the SCSS.
  * auto prefixing
    * Automatically adds -webkit- -moz- -ms- prefixes to CSS styles.
  * pngmin, svgmin, imagemin
    * Optimize images.
  * phpcs
    * Code Sniffer for Drupal PHP files.

Where do I put my theme script, styles and images?
-----------

Within the '/src' folder, place all working SCSS, JS and image files in their respective subdirectories.
When run, Grunt will populate the '/dist/css', '/dist/js' and 'dist/images' folders.

An example of a src folder setup is:
```
src/
  sass/
    `styles.scss`
  js/
    `scripts.js`
  images/
    jpg/
      optimise/
        `optimise.jpg`
      raw/
        `raw.jpg`
    png/
      optimise/
        `optimise.png`
      raw/
        `raw.png`
    svg/
      optimise/
        `optimise.svg`
      raw/
        `raw.svg`
```

An example folder setup script (for bash) to run from within the theme/grunt folder:
```
mkdir ../dist
mkdir ../src
mkdir ../src/sass
mkdir ../src/js
mkdir ../src/images
mkdir ../src/images/jpg
mkdir ../src/images/jpg/optimise
mkdir ../src/images/jpg/raw
mkdir ../src/images/png
mkdir ../src/images/png/optimise
mkdir ../src/images/png/raw
mkdir ../src/images/svg
mkdir ../src/images/svg/optimise
mkdir ../src/images/svg/raw
```


How do I use my personal preferences with grunt?
-----------

Grunt for Drupal is set to run with defaults, but each project will likely
have it's own unique settings. You can use `.local_grunt_settings.json`
and `project_grunt_settings.json` to add these custom settings per-project.

Create a JSON file called `.local_grunt_settings.json` or `project_grunt_settings.json`
in the same directory as Gruntfile.js.  When grunt runs it will use the settings
from this file instead of the defaults.

### The `.local_grunt_settings.json` file:
This file is used for defining settings specific to the environment it's being
used on (your local computer). This shouldn't be a part of the repo as it relates
only to you, so make sure git is set to ignore this file.
```
{
  "phpcs_bin": "/Users/salsadigital/pear/bin/phpcs"
}
```

### The `project_grunt_settings.json` file:
This file relates to the project and should contain project-wide settings.
This should be included in the repository.
```
{
  "custom_modules_directory": "../../modules/custom/",
  "profile_modules_directory": "../../modules/custom/",
  "custom_script_paths": "custom/path/**/*.js",
  "custom_beautify": [],
  "theme_directory": "../",
  "use_compass": false,
  "use_image_compression": false,
  "use_prefixer": true,
  "use_scss_filename": ["styles"],
  "prefixer_browsers": ["last 2 versions", "not ie <= 8", "iOS >= 7"],
  "drupal_version": 8
}
```

### Supported Settings:
- `custom_modules_directory`
  - This is the directory to your custom modules.
    If not defined then no custom module files will be validated.
- `profile_modules_directory`
  - This is the directory to your profile modules.
    If not defined then no profile module files will be validated.
    Works the same as *custom_modules_directory*.
- `custom_script_paths`
  - Array of any additional scripts to add that may not be in /src folder.
    These will be beautified and concatenated with any `src/js` scripts.
- `custom_beautify`
  - Array of additional files to run through the beautifier. This can be used
    to include / exclude particular files.
- `theme_directory`
  - This is the directory to your theme.
    If not defined, theme directory will default to one folder level above this.
- `phpcs_bin`
  - This is your local system's directory to PHP Code Sniffer.
    If not defined, then PHPCS will not run.
    Note: This only works in *Local Setting*.
- `use_compass`
  - If set to `true` will use compass config.rb to compile stylesheets.
    If not defined, will default to LibSass.
- `use_image_compression`
  - If set to `true` will use compress SVG / PNG / JPG images in src/images folder.
- `drupal_version`
  - Set an integer (e.g. `7` or `8`).
- `use_prefixer`
  - Use the Auto Prefixer. Set to `true` by default.
- `use_scss_filename`
  - Set a string / array to the SCSS filename to target in the theme (e.g. `styles`).
    This will also affect the .css filename (e.g. "styles.scss" -> "styles.css").
- `prefixer_browsers`
  - Define what browsers Auto Prefixer should support.
    Default is `last 2 versions`, `not ie <= 8`.

Troubleshooting
-----------

- If the task is not running correctly, try `grunt --verbose` and search the output for issues.
