var exec = require('child_process').exec;
var gutil = require('gulp-util');
var path = require('path');
var through = require('through2');
var _ = require('lodash');

module.exports = function (options) {

	var defaultOptions = {
		failOnError: false,
		quiet: false
	};

	_.defaults(options, defaultOptions)

	return through.obj(function (file, encoding, callback) {

		var that = this;

		var cflintPath = './node_modules/.bin/cflint';

		if (process.platform === 'win32') {
			cflintPath = path.normalize(cflintPath);
		}

		if (!options.quiet) {
			gutil.log('cflint: ' + file.path);
		}

		exec(cflintPath + ' -stdout -json -q -file ' + file.path, function (err, stdout, stderr) {

			var errorData = [];

			try {
				errorData = JSON.parse(stdout);
			} catch (e) {
				// Not valid JSON.
			}

			if (errorData.length > 0) {

				var errorMessage = '';

				errorData.forEach(function (element) {

					element.locations.forEach(function (location) {

						errorMessage = element.severity + ' ' + location.message;

						gutil.log(gutil.colors.magenta(location.file + ':' + location.line));
						gutil.log(gutil.colors.red(errorMessage));
					});

				});

				if (options.failOnError) {
					var error = new gutil.PluginError('gulp-cflint', 'CFLint error in: ' + location.file);
				}
			}

			// take appropriate action then
			that.push(file);
			callback(error);
		});

	});
};