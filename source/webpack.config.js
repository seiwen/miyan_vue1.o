'use strict';
// plugins
// 打包公共块的插件
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

const path = require('path'),	// node path模块，组装地址
	fs = require('fs');			// ndoe file模块，读取文件

const webpack = require('webpack'),
	glob = require('glob');		

const filePath = {
	srcDir: path.resolve(process.cwd(), 'source/page'),
	outputDir:  path.resolve(process.cwd(), 'site/dist/js'),

	verdorPath: path.resolve(process.cwd(), 'source/common/js'),
	pluginPath: path.resolve(process.cwd(), 'source/common/js/plugins'),
	libPath: path.resolve(process.cwd(), 'source/common/js/lib')
}

// 组装入口文件对象
const entries = (() => {
	const entryFiles = glob.sync(filePath.srcDir + '/!(js)/**/*.js');
	let map = {};
	entryFiles.forEach((filePath) => {
		let indices = [];
		let idx = filePath.indexOf('\/');

		while(idx != -1) {
			indices.push(idx);
			idx = filePath.indexOf('\/', idx + 1);
		}
		let parentname = filePath.substring((indices[indices.length - 3] + 1), indices[indices.length - 2]);
		let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
		
		map[parentname + '\/' + filename] = filePath;
	})

	return map;
})

// webpack配置
module.exports = ((debug) => {
	const config = {
		entry: entries(),
		output: {
			path: filePath.outputDir,
			publicPath: '/dist/js/',
			filename: '[name].js',
			chunkFilename: debug ? '[name].js' : '[hash].[name].js'
		},
		externals: {
			'jquery': 'jQuery',
			'Vue': 'Vue',
			'PCAS': 'PCAS'
		},
		resolve: {
			alias: {
				vendor: filePath.verdorPath,
				plugins: filePath.pluginPath,
				lib: filePath.libPath
			}
		},
		module: {
			noParse: [
				path.join(filePath.verdorPath, 'zepto'),
				path.join(filePath.verdorPath, 'vue')
			],
			loaders: [
				{ test: /\.scss$/, loaders: ['style', 'css', 'sass']}
			]
		},
		plugins: [
			new CommonsChunkPlugin({
				minChunks: 3,
				name: 'common.chunk'
			})
		]
	}
	if(!debug) config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
    		compress: {
        		warnings: false
    		}
		})
	)
		
	return config;
})