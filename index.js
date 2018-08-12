const exec = require('child_process').exec;
const gutil = require('gulp-util');
const path = require('path');
const through = require('through2');
const _ = require('lodash');

module.exports = (options) => {

	const defaultOptions = {
		failOnError: true,
		quiet: true,
		folder: '',
		logError: true,
		maxBuffer: 10000000
	};

	// Set the default options
	_.defaults(options, defaultOptions)

	return through.obj(function (file, encoding, callback) {

		var cflintPath = './node_modules/gulp-cflint/node_modules/.bin/cflint';

		if (process.platform === 'win32') {
			cflintPath = path.normalize('./node_modules/.bin/cflint');
		}

		var command = cflintPath + ' -stdout -json -quiet';

		if (options.logError) {
			command += ' -logerror';
		}

		if (options.folder.length) {
			var pathToUse = options.folder;
			command += ' -folder ';
		}else{
			var pathToUse = file.path;
			command += ' -file ';
		}

		command += pathToUse;

		if (!options.quiet) {
			gutil.log('cflint: ' + pathToUse);
		}

		exec(command, { maxBuffer: options.maxBuffer }, (err, stdout, stderr) => {

			if (err) {
				var error = new gutil.PluginError('gulp-cflint', err);
				callback(error);
			}

			var errorData = [];

			try {
				errorData = JSON.parse(stdout).issues;
			} catch (e) {
				// Not valid JSON.
			}

			if (errorData.length > 0) {

				errorData.forEach( (element) => {

					element.locations.forEach( (location) => {

						errorMessage = 'CFLint error in: ' + location.file

						gutil.log(gutil.colors.magenta(location.file + ' ' + location.line + ':' + location.column));
						gutil.log(gutil.colors.red(element.message));
						gutil.log(gutil.colors.red(location.message));


					});

				});

				if (options.failOnError) {
					var error = new gutil.PluginError('gulp-cflint', 'CFLint error in: ' + pathToUse);
				}
			}

			// take appropriate action then
			this.push(file);
			callback(error);
		});

	});
};