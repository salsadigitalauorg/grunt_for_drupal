# Installs the old grunt-jsbeautifier version.
rm -rf node_modules/grunt-jsbeautifier
tar -xzf ./grunt-jsbeautifier.zip
cp -R grunt-jsbeautifier node_modules/grunt-jsbeautifier
rm -rf grunt-jsbeautifier
