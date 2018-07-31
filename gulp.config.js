const path  = require('path');

const fileBase = path.join(__dirname, '/source/'),
	buildPath = path.join(__dirname, '/site/'),
	depPath = path.join(__dirname, 'dep/');

const config = {
	fileBase: fileBase,
	commonFile: fileBase + 'common/',
	commonSassFile: fileBase + 'common/sass/**/*.scss',
	commonSassPath: fileBase + 'common/sass/base.scss',
	commonJsPath: fileBase + 'common/js/**/**/**',

	pagePath: fileBase + 'page/**/',
	pageJsPath: fileBase + 'page/**/**/**.js',
	pageSassPath: fileBase + 'page/**/*.scss',
	singleJsPath: fileBase + 'page/**/**.js',
	singleSassPath: fileBase + 'page/**/**/*.scss',

	//build path
	buildPath: buildPath,
	buildPagePath: buildPath + 'page/',
	buildJsPath: buildPath + 'dist/js/',
	buildCssPath: buildPath + 'dist/css/',

	depPath: depPath
}

module.exports = config;