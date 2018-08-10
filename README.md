# gulp-cflint
A Gulp plugin for identifying and reporting on patterns found in CFML code.

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install gulp-cflint --save-dev
```
## Usage

```javascript
const {src, task} = require('gulp');
const cflint = require('gulp-cflint');

const cfFiles = [
	'./**/*.cf[cm]',
	'!./WEB-INF/**/*',
  '!./CFIDE/**/*'
];

task('default', () => {
    return src(cfFiles)
        .pipe(cflint({ failOnError: false, quiet: false }));
});
```
