# gulp-wpmanifest

 Gulp Plugin for automatically create a Wordpress manifest and write it at the beginning of the target .css file.


# Install

```
npm install gulp-wpmanifest --save-dev
```
or

```
yarn add gulp-wpmanifest
```
# Usage

```javascript
'use strict';

let gulp = require('gulp');
let wpmanifest = require("gulp-wpmanifest");

gulp.task('defualt', ()=>{
	gulp.src('./*.css')
	  	.pipe(wpmanifest({
	  		name: '...',
	  		description: '...',
	  		version: 1.0,
	  		uri: "...",
	  		tags: "...",
	  		author: {
	  			name: "..."
	  		},
	  		authorUri: "...",
	  		license: "GNU General Public License v2 or later",
	  		licenseUri: "http://www.gnu.org/licenses/gpl-2.0.html"
	  	}))
	  	.pipe(gulp.dest('./'))
});
```
