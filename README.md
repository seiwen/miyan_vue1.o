"# miyan_vue1.o"


#目录规范
```
├ dep //项目产出目录依赖site(预发布环境以及正式环境)
├ site //项目产出目录(开发环境以及测试环境)
| gulp.config.js //gulp配置属性文件
| gulpfile.js //gulp配置文件
| source //项目开发目录
| ├ common //静态资源文件
| | ├ js //公共js
| | | ├ component //js插件
| | ├ sass || less //预编译css
| | ├ font // webfont icon
| ├ module //页面模块
| ├ page //页面入口
| | ├ index
| | | ├ index.js
| | | ├ index.sass
| | | ├ index.html
| ├ testjson //mock数据
```
***

#使用方法
打开terminal，初次使用`npm install`，后续开发使用`gulp dev`。
css预编译工具使用[sass](http://www.w3cplus.com/sassguide/)，js模块化打包使用[webpack](http://webpack.github.io/docs/)。本地服务器使用的是gulp-server，具有自动刷新及mock功能，具体参考[npm](https://www.npmjs.com/)

###task功能说明
`gulp dev` 依赖source目录
* 启动本地服务器
* 编译sass
* 编译html块，和inline-source
* 打包js
* 监听文件

`gulp dep` 依赖目录site，根据编译好的文件，添加md5，压缩js，css
* 压缩css
* 压缩js
* 添加md5

***

##iconfont字体文件生成
页面icon使用[icomoon](https://icomoon.io/app/#/select)生成

