var through = require('through2').obj;
var fs = require('fs');
var _ = require('lodash');
var pkg = JSON.parse(fs.readFileSync('package.json', { encoding: 'utf8' }));
var gutil = require('gulp-util');

function writeWPManifest(options) {
  options = _.defaults(options || {}, {
    path: 'style.css',
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    uri: pkg.homepage,
    tags: pkg.keywords,
    author: pkg.author.name,
    authorUri: pkg.author.url,
    license: pkg.license,
    licenseUri: null
  });
  if (!options.path) {
    throw new gutil.PluginError('gulp-wpstylecss', '`path` is required!');
  }
  if (!options.name) {
    throw new gutil.PluginError('gulp-wpstylecss', '`name` is required!');
  }

  /*
  Theme Name:     <%= options.name %>
  Description:    <%= options.description %>
  Version:        <%= options.version %>
  Theme URI:      <%= options.homepage %>
  Tags:           <%= options.keywords %>
  Author:         <%= options.author.name %>
  Author URI:     <%= options.author.url %>
  License:        <%= options.license %>
  License URI:    <%= options.licenseUri %>
  */
  var contents = '/*\n';
  contents += 'Theme Name:     ' + options.name + '\n';
  if (options.description) {
    contents += 'Description:    ' + options.description + '\n';
  }
  if (options.version) {
    contents += 'Version:        ' + options.version + '\n';
  }
  if (options.uri) {
    contents += 'Theme URI:      ' + options.uri + '\n';
  }
  if (options.tags) {
    contents += 'Tags:           ' + options.tags + '\n';
  }
  if (options.author.name) {
    contents += 'Author:         ' + options.author.name + '\n';
  }
  if (options.author.uri) {
    contents += 'Author URI:     ' + options.author.uri + '\n';
  }
  if (options.license) {
    contents += 'License:        ' + options.license + '\n';
  }
  if (options.licenseUri) {
    contents += 'License URI:    ' + options.licenseUri + '\n';
  }
  contents += '*/\n';
  var manifest = new Buffer(contents);
  var stream = through(function (file, enc, callback) {
    if (file.isBuffer()) {
      file.contents = Buffer.concat([manifest, file.contents]);
      callback(null, file);
    }
  });
  return stream;
}
module.exports = writeWPManifest;
