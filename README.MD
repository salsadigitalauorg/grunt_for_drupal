Using The Grunt Setup
=======

Setting Up
-----------

### Do you have NodeJS / NPM installed?

If not you can get it from [here](https://nodejs.org/download/)

### Do you have Grunt installed?

If not you can get it by running `npm install -g grunt-cli` in command line

### Do you have SASS / Compass installed?

If not you will need:

1. [Ruby](https://www.ruby-lang.org/en/downloads/)
2. [SASS](http://sass-lang.com/install)
3. [Compass](http://compass-style.org/install/)

### Do you have PHP_CodeSniffer installed?

  1. Use PEAR to install PHP_CodeSniffer
    1. `sudo pear install PHP_CodeSniffer`
  2. Find PHP_CodeSniffer home
    1. You can use `pear list-files PHP_CodeSniffer` to find the directory
      1. [PEAR info on packages](https://pear.php.net/manual/en/guide.users.commandline.packageinfo.php)
      2. Reference: [Check solution](http://stackoverflow.com/questions/14257209/php-codesniffer-include-once-error)
    2. Use PHP_CodeSniffer location in bin option in:
       `Gruntfile.js` (`bin: '/Users/salsadigital/pear/bin/phpcs'`)
       OR
       in `.local_grunt_settings.json` (See below - 'How do I use my personal preferences with grunt?').
  3. Install Drupal Standard
    1. Go to [here](https://www.drupal.org/project/coder) and download coder 8.x-2.3
    2. Add `coder_sniffer/Drupal` folder to your CodeSniffer Standards folder.
       E.g. `/Users/salsadigital/pear/share/pear/PHP/CodeSniffer/Standards/`

Using Grunt - The quick version
-----------

  1. Add you JS and SCSS files in '/src/js' and '/src/sass' directories.
  2. Use command line to navigate to the root directory (directory containing Gruntfile.js) and type `grunt`.

Where do I put my code?
-----------

Within the '/src' folder, place all working SCSS and JS files in their respective subdirectories.
When run, Grunt will populate the '/css' and '/js' folders.

What is Grunt doing?
-----------

Within the `Gruntfile.js`, the following processes are run:

  * jsbeautifier
    * Formats working JS and SCSS files.
  * jshint
    * Runs a linter over the JS files and picks up on format issues.
  * concat
    * Merges all JS files into 1. Allows breaking up of JS files into components.
  * uglify
    * Minify the single JS file, for production use.
  * compass
    * Compile the SCSS using Compass, and the 'config.rb' file.
  * phpcs
    * Code Sniffer for Drupal PHP files.

How do I use my personal preferences with grunt?
-----------

If you create a JSON file called `.local_grunt_settings.json` in the same directory
as Gruntfile.js.  When grunt runs it will use the settings from this file instead of
the defaults.

Example JSON:
{
  "phpcs_bin": "/Users/salsadigital/pear/bin/phpcs"
}

Supported Settings:
- phpcs_bin
  - This is your local system's directory to PHP Code Sniffer.
