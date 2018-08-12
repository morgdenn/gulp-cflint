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
    .pipe(cflint());
});

task('test:cf', () => {
  return src(cfFiles)
    .pipe(cflint({ failOnError: true, quiet: true }));
});
```
## Options

### failOnError

Type: `Boolean`

Default: `true`

When `true`, Stop a task/stream if a CFLint error has been reported for any file.

### quiet

Type: `Boolean`

Default: `true`

When `false`, this option will show each file name as its proccessed.

### folder

Type: `String`

If used, the file path will be ignored and cflint will process the folder instead using the '-folder' argument.

```javascript
task('test:cf', () => {
  return src(['./index.cfm'])
    .pipe(cflint({ failOnError: true, quiet: true, folder: './system/customtags' }));
});
```
### logerror

Type: `Boolean`

Default: `true`

When `true`, log parsing errors as bugs.

### maxBuffer

Type: `Number`

Default: `10000000` (10MB)

Largest amount of data in bytes allowed from the error.
When running with the folder option on a large project this might have to be ajusted.
If you exceed the limit you will get this error 'stderr maxBuffer exceeded'
