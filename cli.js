'use strict';

const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const meow = require('meow');
const globby = require('globby');
const geojsonhint = require('geojsonhint');
const prettyFormatter = require('eslint-formatter-pretty');

const readFileAsync = promisify(fs.readFile);

const cli = meow(`
	Usage:
	  geojsonlint [options] <file|glob>...

	Options:
	  --disable-precision-warning  Disable the precision warning for coordinates.

	Examples:
	  geojsonlint *.geojson
	  geojsonlint **/*.geojson
	  geojsonlint --disable-precision-warning precise.geojson
`, {
	boolean: ['disable-precision-warning'],
	default: {
		'disable-precision-warning': false
	}
});

const lintFile = async (file, precisionWarning = true) => {
	const data = await readFileAsync(path.resolve(__dirname, file));
	const results = geojsonhint.hint(`${data}`, {
		precisionWarning
	});

	const counts = results.reduce((acc, result) => {
		const prop = result.level === 'message' ? 'warning' : 'error';
		acc[prop] += 1;
		return acc;
	}, { error: 0, warning: 0 });

	return {
		filePath: file,
		messages: results.map((result) => {
			return {
				severity: result.level === 'message' ? 1 : 2,
				message: result.message,
				line: result.line,
				column: 1
			};
		}),
		errorCount: counts.error,
		warningCount: counts.warning
	};
};

(async () => {
	const paths = await globby(cli.input);
	const promises = paths.map((file) => lintFile(file, !cli.flags.disablePrecisionWarning));
	const results = await Promise.all(promises);
	console.log(prettyFormatter([].concat(...results)));
})();
