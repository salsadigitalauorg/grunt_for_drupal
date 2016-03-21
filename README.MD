Using The Grunt for Drupal v2.4 Setup
=======

Setting Up
-----------

### Do you have NodeJS / NPM installed?

If not you can get it from [here](https://nodejs.org/download/)

### Do you have Grunt installed?

If not you can get it by running `npm install -g grunt-cli` in command line

### Do you have PHP_CodeSniffer installed?

  1. Use PEAR to install PHP_CodeSniffer
    1. `sudo pear install PHP_CodeSniffer`
  2. Find PHP_CodeSniffer home
    1. You can use `pear list-files PHP_CodeSniffer` to find the directory
      1. [PEAR info on packages](https://pear.php.net/manual/en/guide.users.commandline.packageinfo.php)
      2. Reference: [Check solution](http://stackoverflow.com/questions/14257209/php-codesniffer-include-once-error)
    2. Use PHP_CodeSniffer location in bin option in:
       `.local_grunt_settings.json` (See below - 'How do I use my personal preferences with grunt?').
  3. Install Drupal Standard
    1. Go to [here](https://www.drupal.org/project/coder) and download coder 8.x-2.3
    2. Add `coder_sniffer/Drupal` folder to your CodeSniffer Standards folder.
       E.g. `/Users/salsadigital/pear/share/pear/PHP/CodeSniffer/Standards/`

Using Grunt - The quick version
-----------

  1. Add you JS and SCSS files in '/src/js' and '/src/sass' directories.
  2. Use command line to navigate to the root directory (directory containing Gruntfile.js) and type `npm install` to install needed modules.
  3. Type `grunt` for a full compile.
  4. If you wish to use the auto-compile, type `grunt watch`. It will compile the necessary parts depending on what files change.

Where do I put my theme script, styles and images?
-----------

Within the '/src' folder, place all working SCSS, JS and image files in their respective subdirectories.
When run, Grunt will populate the '/dist/css', '/dist/js' and 'dist/images' folders.

An example of a src folder setup is:

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

What is Grunt doing?
-----------

Within the `Gruntfile.js`, the following processes are run:

  * jsbeautifier
    * Formats working JS and SCSS files.
  * concat
    * Merges all JS files into 1. Allows breaking up of JS files into components.
  * sass
    * Compile the SCSS.
  * phpcs
    * Code Sniffer for Drupal PHP files.

How do I use my personal preferences with grunt?
-----------

If you create a JSON file called `.local_grunt_settings.json` in the same directory
as Gruntfile.js.  When grunt runs it will use the settings from this file instead of
the defaults.

### Example JSON for `.local_grunt_settings.json`:

{
  "custom_modules_directory": "../../modules/custom/",
  "theme_directory": "../",
  "phpcs_bin": "/Users/salsadigital/pear/bin/phpcs",
  "use_compass": false
}

### Supported Settings:
- `custom_modules_directory`
  - This is the directory to your custom modules.
    If not defined then no custom module files will be validated.
- `theme_directory`
  - This is the directory to your theme.
    If not defined, theme directory will default to one folder level above this.
- `phpcs_bin`
  - This is your local system's directory to PHP Code Sniffer.
    If not defined, then PHPCS will not run.
- `use_compass`
  - If set to `true` will use compass config.rb to compile stylesheets.
    If not defined, will default to LibSass.
- `use_image_compression`
  - If set to `true` will use compress SVG / PNG / JPG images in src/images folder.