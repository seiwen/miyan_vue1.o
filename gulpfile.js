'use strict';
const gulp = require('gulp'),
	rename = require('gulp-rename'),				// 文件重命名
	webserver = require('gulp-webserver'),			// 本地服务器
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-clean-css'),			// css压缩
	uglify = require('gulp-uglify'),				// js 压缩
	gutil = require('gulp-util'),					// 工具库，打印日志
	rimraf = require('gulp-rimraf'),				// 文件清理
	watch = require('gulp-watch'),					// 文件监听
	include = require('gulp-include'),				// html块加载
	inlineSource = require('gulp-inline-source'),	// 样式js转为行内加载
	plumber = require('gulp-plumber'),				// 防止报错停止监听
	batch = require('gulp-batch'),					// 防止svn修改多文件时候报错
	gulpif = require('gulp-if'),					// if
	useref = require('gulp-useref'),				// 编译html里面的代码块
	gulpmatch = require('gulp-match'),				// 匹配文件
	sequence = require('gulp-sequence'),			// task顺序执行
	rev = require('gulp-rev'),						// 文件添加md5
	revReplace = require('gulp-rev-replace'),		// html引用文件替换md5名称
	webpack = require('webpack'),
	webpackConfig = require('./source/webpack.config.js');

var devCompiler = {};
const config = require('./gulp.config.js');
// const mockApi = require('./source/mockApi.js');

// 启动本地服务器
gulp.task('webserver', function() {
	gulp.src([config.buildPath, config.fileBase, config.depPath])
		.pipe(webserver({
			livereload: true,
			directoryListening: true,
			// middleware: function(req, res, next) {
			// 	let urlObj = req._parsedUrl.path,
			// 		method = req.method,
			// 		paramObj = urlObj.query;

			// 	mockApi(res, urlObj.pathname, paramObj, next);
			// }
		}))
})

//编译sass，添加前缀
gulp.task('sass', function() {
	var parentname;
	return gulp.src([config.pageSassPath, config.commonSassPath, config.singleSassPath])
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['Android >= 4.0', 'last 4 iOS versions', 'last 5 versions']
		}))
		.pipe(rename((path) => {
			path.dirname = path.dirname.split('\\')[0]
		}))
		.pipe(gulp.dest(config.buildCssPath))
})

// 编译html
gulp.task('parse-html', ['sass'], function() {
	gulp.src(config.pagePath + '*.html')
		.pipe(plumber())
		.pipe(include()).on('error', console.log)
		.pipe(inlineSource({
			rootpath: './site/'
		}))
		.pipe(rename((path) => {
			path.dirname = path.dirname.split('\\')[0]
		}))
		.pipe(gulp.dest(config.buildPagePath))
})

// webpack打包js

gulp.task('build-js', ['copy'], function(callback) {
		devCompiler.run((err, status) => {
			if(err) throw new gutil.PluginError('webpack: ', err);
			gutil.log('[webpack]', status.toString({
				color: true
			}));
			callback && callback();
		})
})


gulp.task('clean:devFile', function() {
	return gulp.src([config.buildJsPath + '*.js', config.buildJsPath + 'lib/*'], {read: false})
		.pipe(rimraf())
})

gulp.task('copy', function() {
	gulp.src(config.commonFile + 'js/lib/*.js')
		.pipe(gulp.dest(config.buildJsPath + 'lib'))

	gulp.src([config.commonFile + 'fonts/*'])
		.pipe(gulp.dest(config.buildPath + 'dist/fonts'))

	gulp.src([config.commonFile + 'images/**/*'])
		.pipe(gulp.dest(config.buildPath + 'dist/images'))

	gulp.src([config.commonFile + 'globalJs/**/*'])
		.pipe(gulp.dest(config.buildPath + 'dist/globalJs'))
})


gulp.task('watch', function() {
	watch([config.pageJsPath, config.commonJsPath], batch(function(events, done) {
		gulp.start('build-js', done)
	}))

	watch([
		config.pageSassPath, config.commonSassFile,
		config.singleSassPath,
		config.pagePath + '*.html',
		config.fileBase + 'module/*.html'
	], batch(function(events, done) {
		gulp.start('parse-html', done);
	}))
})

gulp.task('revSource', function() {
	return gulp.src(config.buildPagePath + '**/*.html')
		.pipe(rename((path) => {
			path.dirname = 'page/'.concat(path.dirname)
		}))
		.pipe(useref({
			searchPath: config.buildPath
		}))
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cssnano()))
		.pipe(gulpif((file) => {
			var match = gulpmatch(file, /.*\.(?:(?!(css|js)).)+/);
			return !match;
		}, rev()))
		.pipe(revReplace())
		.pipe(gulp.dest(config.depPath))
})

gulp.task('devCopy', function() {
	gulp.src(config.buildJsPath + '!(*chunk).js')
		.pipe(gulp.dest(config.depPath + 'dist/js'))

	gulp.src([config.buildPath + 'dist/fonts/*'])
		.pipe(gulp.dest(config.depPath + 'dist/fonts'))

	gulp.src([config.buildPath + 'dist/images/**/*'])
		.pipe(gulp.dest(config.depPath + 'dist/images'))

	gulp.src([config.buildPath + 'globalJs/**/*'])
		.pipe(gulp.dest(config.depPath + 'dist/globalJs'))
})

gulp.task('clean:depFile', function() {
	gulp.src(config.depPath, {read: false})
		.pipe(rimraf())
})

gulp.task('dev', function(cb) {
	devCompiler = webpack(webpackConfig(true));
	sequence('webserver', 'clean:devFile', 'build-js', 'parse-html', 'watch')(cb)
});
gulp.task('dep', function(cb) {
	devCompiler = webpack(webpackConfig(false));
	sequence('clean:devFile', 'clean:depFile', 'build-js', 'parse-html', 'devCopy', 'revSource')(cb)
});