# Using The Grunt Setup

## Setting Up

### Do you have NodeJS / NPM installed?
  - If not you can get it from [here](https://nodejs.org/download/)

### Do you have Grunt installed?
  - If not you can get it by running `npm install -g grunt-cli` in command line

### Do you have SASS / Compass installed?

### Do you have PHP_CodeSniffer installed?
  - Use PEAR to install PHP_CodeSniffer
    - `sudo pear install PHP_CodeSniffer`
  - Find PHP_CodeSniffer home
    - You can use `pear list-files PHP_CodeSniffer` to find the directory
      - [PEAR info on packages](https://pear.php.net/manual/en/guide.users.commandline.packageinfo.php)
      - Reference: [Check solution](http://stackoverflow.com/questions/14257209/php-codesniffer-include-once-error)
    - Use PHP_CodeSniffer location in bin option on `Gruntfile.js` (`bin: '/Users/salsadigital/pear/bin/phpcs'`)
  - Install Drupal Standard
    - Go to [here](https://www.drupal.org/project/coder) and download coder 8.x-2.3
    - Add `coder_sniffer/Drupal` folder to `/Users/salsadigital/pear/share/pear/PHP/CodeSniffer/Standards/`

## Using Grunt - The quick version
1. Add you JS and SCSS files in '/src/js' and '/src/sass' directories.
2. Use command line to navigate to the root directory (directory containing Gruntfile.js) and type `grunt`.

## Where do I put my code?
Within the '/src' folder, place all working SCSS and JS files in their respective subdirectories.
When run, Grunt will populate the '/css' and '/js' folders.

## What is Grunt doing?
- Within the `Gruntfile.js`, the following processes are run:
  - jsbeautifier
    - Formats working JS and SCSS files.
  - jshint
    - Runs a linter over the JS files and picks up on format issues.
  - concat
    - Merges all JS files into 1. Allows breaking up of JS files into components.
  - uglify
    - Minify the single JS file, for production use.
  - compass
    - Compile the SCSS using Compass, and the 'config.rb' file.
  - phpcs
    - Code Sniffer for Drupal PHP files.
