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

task('lint:cf', () => {
  return src(cfFiles)
    .pipe(cflint({ failOnError: false, quiet: false }));
});

task('test:cf', () => {
  return src(cfFiles)
    .pipe(cflint({ failOnError: true, quiet: true }));
});
```
## Options

#### options.failOnError

Type: `Boolean`

When `true`, Stop a task/stream if an CFLint error has been reported for any file.

#### options.quiet

Type: `Boolean`

When `false`, this option will show each file name as its proccessed.
