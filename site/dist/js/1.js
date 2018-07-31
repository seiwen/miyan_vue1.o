webpackJsonp([1,53],[
/* 0 */,
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Vue;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(4),
		__webpack_require__(2),
		__webpack_require__(9),
	    __webpack_require__(10),
		], __WEBPACK_AMD_DEFINE_RESULT__ = function($, layer, Vue, vueTap, cookie) {
		'use strict';
		// 注册tap事件
		Vue.use(vueTap);

	    //注册lazyload
	    //$('img.lz').lazyload();
	    $(document).on({
	        'ajaxStart': function() {
	            layer.open({type: 2,shadeClose: false});
	        },
	        'ajaxComplete': function() {
	            var index = layer.open({type: 2,shadeClose: false});
	            layer.close(index);
	        }
	    });

	    var common = {};
	    //var token = cookie.get('token');
	    var token = 'df844d347608ef727a60c4e53e7325';//546ee1ccb3c907c10081dbed85f75e --133号  c7acafbf17ba87d3b527284c58a8d4--130


	    //获取开店付费状态 0为未付款 1为已付款
	    common.isWeShopPayment = function(){
	        return cookie.get('isWeShopPayment');
	        //return 0;
	    }

	    common.globalAjax = function(options) {
	        //针对不同版本进行判断
	        switch (options.urlEdition) {
	            case 'v3_0':
	                options.urlEdition = options.urlEdition;
	                break;
	            default:
	                options.urlEdition = 'v1';
	                break;
	        }
	        //所有接口统一请求模板
	        $.ajax({
	            url: '//api.miyanmz.hqygou.com/'+options.urlEdition+'/web.php',
	            data: $.extend({
	                service: options.action,
	                token: token
	            }, options.data),
	            dataType: 'jsonp',
	            success: function(res) {
	            	res.data && res.data.code == 0 ?
	            		options.done && options.done(res) :
	            		options.fail && options.fail(res);

	            },
	            error: function(res) {
	            	layer.open({
	            		content: '网络连接失败，请稍后再试!',
	            		time: 1.5
	            	})
	            }
	        })
	    }

	    //支付地址测试和正式切换
	    common.payUrl = function() {
	        var payUrl = 'http://beauty.miyanmz.hqygou.com'
	        return payUrl;
	    }


	    common.getUrlData = function(param) {
	    	var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
	    	var val = window.location.search.substr(1).match(reg);
	    	if (val != null) return unescape(val[2]);
	    	return null;
	    }

	    common.backWithParama = function(url) {
	        if(common.getUrlData('cartid') && common.getUrlData('cartid') != null){
	            window.location.href = url + window.location.search;
	        }else {
	            window.location.href = url;
	        }
	    }

	    var wait=60;
	    common.endTime = function(){
	        if (wait == 0) {
	            $('.input-group-addon,.send-code').removeAttr('disabled');
	            $('.input-group-addon,.send-code').val("重新获取验证码");
	            wait = 60;
	        } else {
	            $('.input-group-addon,.send-code').attr('disabled', 'disabled');
	            $('.input-group-addon,.send-code').val("" + wait + "秒后重新获取");
	            wait--;
	            setTimeout(function() {
	                common.endTime();
	            },
	            1000)
	        }
	    }

	    common.checkUA = function() {
	    	var uaMap = {
	    	    'android': /Android/i,
	    	    'ios': /(?:iPhone|iPad)/i
	    	};
	    	var ua = window.navigator.userAgent;

	    	for (var i in uaMap) {
	    	    if (uaMap[i].test(ua)) {
	    	        return i;
	    	    }
	    	}
	    	return null;
	    }

	    common.checkAPP = function() {
	        var uaApp = {
	            'miyan': /miyan/i,
	            'wechat': /micromessenger/i
	        };
	        var ua = window.navigator.userAgent;

	        for (var i in uaApp) {
	            if (uaApp[i].test(ua)) {
	                return i;
	            }
	        }
	        return null;
	    }

	    common.shareApp = function(shareTitle,shareDesc,shareUrl,firstShow,isShare,shareImg) {
	        return window.location.href = "callApp://shareMsg?shareTitle="+shareTitle+"&shareDesc="+shareDesc+"&linkUrl="+shareUrl+"&firstShow="+firstShow+"&isShare="+isShare+"&shareImg="+shareImg+"&score=20&share_shoping_score=300&makemoney=0&share_profit=150%&share_score=320";
	    }

	    Vue.filter('zero', function (value) {
	        if(parseFloat(value) == 0){
	            return '0.00'
	        }else{
	            if(value == undefined){
	                return ' ';
	            }else{
	                var new_value = Math.round(value*100)/100;
	                return new_value
	            }
	        }
	    })

	    //返回顶部
	    $('.right-fixed').on('click', '.top-fixed', function(event) {
	        event.preventDefault();
	        $("body,html").animate({scrollTop:$("body").offset().top});
	    });
	    $(window).scroll(function() {
	        if ($(this).scrollTop()>500) {
	            $('.right-fixed').show();
	        }else{
	            $('.right-fixed').hide();
	        }
	    });

	    //获取对象数据的个数
	    common.objCount = function(obj) {
	        var count = 0;
	        for(var i in obj) {
	            if(obj.hasOwnProperty(i)) {
	                count++;
	            }
	        }
	        return count;
	    }

	    if(common.checkAPP() == 'miyan'){
	        if(!token) window.location.href = 'callApp://goLogin';
	        //获取APP的版本号
	        common.version = function(){
	            if(cookie.get('version') != undefined){
	                var version = parseInt((cookie.get('version')).replace(/\./g,''));
	                // var version = 200;
	            }else{
	                var version = 130;
	            }
	            return version;
	        }
	    }

	    return common;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__(5);
	/*! layer mobile-v2.0 弹层组件移动版 License LGPL http://layer.layui.com/mobile By 贤心 */
	;!function(a){"use strict";var b=document,c="querySelectorAll",d="getElementsByClassName",e=function(a){return b[c](a)},f={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:"scale"},g={extend:function(a){var b=JSON.parse(JSON.stringify(f));for(var c in a)b[c]=a[c];return b},timer:{},end:{}};g.touch=function(a,b){a.addEventListener("click",function(a){b.call(this,a)},!1)};var h=0,i=["layui-m-layer"],j=function(a){var b=this;b.config=g.extend(a),b.view()};j.prototype.view=function(){var a=this,c=a.config,f=b.createElement("div");a.id=f.id=i[0]+h,f.setAttribute("class",i[0]+" "+i[0]+(c.type||0)),f.setAttribute("index",h);var g=function(){var a="object"==typeof c.title;return c.title?'<h3 style="'+(a?c.title[1]:"")+'">'+(a?c.title[0]:c.title)+"</h3>":""}(),j=function(){"string"==typeof c.btn&&(c.btn=[c.btn]);var a,b=(c.btn||[]).length;return 0!==b&&c.btn?(a='<span yes type="1">'+c.btn[0]+"</span>",2===b&&(a='<span no type="0">'+c.btn[1]+"</span>"+a),'<div class="layui-m-layerbtn">'+a+"</div>"):""}();if(c.fixed||(c.top=c.hasOwnProperty("top")?c.top:100,c.style=c.style||"",c.style+=" top:"+(b.body.scrollTop+c.top)+"px"),2===c.type&&(c.content='<i></i><i class="layui-m-layerload"></i><i></i><p>'+(c.content||"")+"</p>"),c.skin&&(c.anim="up"),"msg"===c.skin&&(c.shade=!1),f.innerHTML=(c.shade?"<div "+("string"==typeof c.shade?'style="'+c.shade+'"':"")+' class="layui-m-layershade"></div>':"")+'<div class="layui-m-layermain" '+(c.fixed?"":'style="position:static;"')+'><div class="layui-m-layersection"><div class="layui-m-layerchild '+(c.skin?"layui-m-layer-"+c.skin+" ":"")+(c.className?c.className:"")+" "+(c.anim?"layui-m-anim-"+c.anim:"")+'" '+(c.style?'style="'+c.style+'"':"")+">"+g+'<div class="layui-m-layercont">'+c.content+"</div>"+j+"</div></div></div>",!c.type||2===c.type){var k=b[d](i[0]+c.type),l=k.length;l>=1&&layer.close(k[0].getAttribute("index"))}document.body.appendChild(f);var m=a.elem=e("#"+a.id)[0];c.success&&c.success(m),a.index=h++,a.action(c,m)},j.prototype.action=function(a,b){var c=this;a.time&&(g.timer[c.index]=setTimeout(function(){layer.close(c.index)},1e3*a.time));var e=function(){var b=this.getAttribute("type");0==b?(a.no&&a.no(),layer.close(c.index)):a.yes?a.yes(c.index):layer.close(c.index)};if(a.btn)for(var f=b[d]("layui-m-layerbtn")[0].children,h=f.length,i=0;h>i;i++)g.touch(f[i],e);if(a.shade&&a.shadeClose){var j=b[d]("layui-m-layershade")[0];g.touch(j,function(){layer.close(c.index,a.end)})}a.end&&(g.end[c.index]=a.end)},a.layer={v:"2.0",index:h,open:function(a){var b=new j(a||{});return b.index},close:function(a){var c=e("#"+i[0]+a)[0];c&&(c.innerHTML="",b.body.removeChild(c),clearTimeout(g.timer[a]),delete g.timer[a],"function"==typeof g.end[a]&&g.end[a](),delete g.end[a])},closeAll:function(){for(var a=b[d](i[0]),c=0,e=a.length;e>c;c++)layer.close(0|a[0].getAttribute("index"))}}, true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return layer}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):function(){var a=document.scripts,c=a[a.length-1],d=c.src,e=d.substring(0,d.lastIndexOf("/")+1);c.getAttribute("merge")||document.head.appendChild(function(){var a=b.createElement("link");return a.href=e+"need/layer.css?2.0",a.type="text/css",a.rel="styleSheet",a.id="layermcss",a}())}()}(window);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/sass-loader/index.js!./layer.scss", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/sass-loader/index.js!./layer.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, ".layui-m-layer {\n  position: relative;\n  z-index: 19891014; }\n\n.layui-m-layer * {\n  -webkit-box-sizing: content-box;\n  -moz-box-sizing: content-box;\n  box-sizing: content-box; }\n\n.layui-m-layermain,\n.layui-m-layershade {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%; }\n\n.layui-m-layershade {\n  background-color: rgba(0, 0, 0, 0.5);\n  pointer-events: auto; }\n\n.layui-m-layermain {\n  display: table;\n  font-family: Helvetica, arial, sans-serif;\n  pointer-events: none; }\n\n.layui-m-layermain .layui-m-layersection {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  color: #666; }\n\n.layui-m-layerchild {\n  position: relative;\n  display: inline-block;\n  text-align: left;\n  background-color: #fff;\n  font-size: 16px;\n  border-radius: 0.10667rem;\n  box-shadow: 0 0 0.10667rem rgba(0, 0, 0, 0.1);\n  pointer-events: auto;\n  -webkit-overflow-scrolling: touch;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n  -webkit-animation-duration: .2s;\n  animation-duration: .2s; }\n  [data-dpr=\"2\"] .layui-m-layerchild {\n    font-size: 32px; }\n  [data-dpr=\"3\"] .layui-m-layerchild {\n    font-size: 48px; }\n\n@-webkit-keyframes layui-m-anim-scale {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5); }\n  100% {\n    opacity: 1;\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n\n@keyframes layui-m-anim-scale {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5); }\n  100% {\n    opacity: 1;\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n\n.layui-m-anim-scale {\n  animation-name: layui-m-anim-scale;\n  -webkit-animation-name: layui-m-anim-scale; }\n\n@-webkit-keyframes layui-m-anim-up {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(800px);\n    transform: translateY(800px); }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0); } }\n\n@keyframes layui-m-anim-up {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(800px);\n    transform: translateY(800px); }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0); } }\n\n.layui-m-anim-up {\n  -webkit-animation-name: layui-m-anim-up;\n  animation-name: layui-m-anim-up; }\n\n.layui-m-layer0 .layui-m-layerchild {\n  max-width: 90%;\n  min-width: 4.0rem; }\n\n.layui-m-layer1 .layui-m-layerchild {\n  border: none;\n  border-radius: 0; }\n\n.layui-m-layer2 .layui-m-layershade {\n  background: none !important; }\n\n.layui-m-layer2 .layui-m-layerchild {\n  width: auto;\n  max-width: 6rem;\n  min-width: 0.533333rem;\n  border: none;\n  background: 0 0;\n  box-shadow: none;\n  color: #fff; }\n\n.layui-m-layerchild h3 {\n  padding: 0 0.6rem 0 0.133333rem;\n  height: 0.933333rem;\n  line-height: 0.933333rem;\n  font-size: 16px;\n  font-weight: 400;\n  border-radius: 0.10667rem 0.10667rem 0 0;\n  border-bottom: 1px solid #EBEBEB;\n  text-align: center; }\n  [data-dpr=\"2\"] .layui-m-layerchild h3 {\n    font-size: 32px; }\n  [data-dpr=\"3\"] .layui-m-layerchild h3 {\n    font-size: 48px; }\n\n.layui-m-layerbtn span,\n.layui-m-layerchild h3 {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap; }\n\n.layui-m-layercont {\n  min-width: 6rem;\n  padding: 0.666667rem 0.4rem;\n  line-height: 1.1;\n  word-wrap: break-word;\n  word-break: break-all;\n  text-align: center; }\n\n.layui-m-layer1 .layui-m-layercont {\n  padding: 0;\n  text-align: left; }\n\n.layui-m-layer2 .layui-m-layercont {\n  text-align: center;\n  padding: 0;\n  line-height: 0; }\n\n.layui-m-layerbtn,\n.layui-m-layerbtn span {\n  position: relative;\n  text-align: center;\n  border-radius: 0 0 0.066667rem 0.066667rem; }\n\n@-webkit-keyframes layui-m-anim-loading {\n  0%,\n  100%,\n  80% {\n    transform: scale(0);\n    -webkit-transform: scale(0); }\n  40% {\n    transform: scale(1);\n    -webkit-transform: scale(1); } }\n\n@keyframes layui-m-anim-loading {\n  0%,\n  100%,\n  80% {\n    transform: scale(0);\n    -webkit-transform: scale(0); }\n  40% {\n    transform: scale(1);\n    -webkit-transform: scale(1); } }\n\n.layui-m-layer2 .layui-m-layercont i:first-child {\n  display: none; }\n\n.layui-m-layer2 .layui-m-layercont i.layui-m-layerload {\n  display: inline-block;\n  margin: 10% auto;\n  border-bottom: 0.04rem solid #fff;\n  border-left: 0.04rem solid #ff3574;\n  border-right: 0.04rem solid #ff3574;\n  border-top: 0.04rem solid #ff3574;\n  border-radius: 100%;\n  height: 0.933333rem;\n  width: 0.933333rem;\n  -webkit-animation: spin 1s infinite linear;\n  -moz-animation: spin 1s infinite linear;\n  -ms-animation: spin 1s infinite linear;\n  -o-animation: spin 1s infinite linear;\n  animation: spin 1s infinite linear; }\n\n@keyframes \"spin\" {\n  from {\n    -webkit-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    -o-transform: rotate(0deg);\n    -ms-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  to {\n    -webkit-transform: rotate(359deg);\n    -moz-transform: rotate(359deg);\n    -o-transform: rotate(359deg);\n    -ms-transform: rotate(359deg);\n    transform: rotate(359deg); } }\n\n@-moz-keyframes spin {\n  from {\n    -moz-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  to {\n    -moz-transform: rotate(359deg);\n    transform: rotate(359deg); } }\n\n@-webkit-keyframes \"spin\" {\n  from {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  to {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg); } }\n\n@-ms-keyframes \"spin\" {\n  from {\n    -ms-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  to {\n    -ms-transform: rotate(359deg);\n    transform: rotate(359deg); } }\n\n@-o-keyframes \"spin\" {\n  from {\n    -o-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  to {\n    -o-transform: rotate(359deg);\n    transform: rotate(359deg); } }\n\n.layui-m-layer2 .layui-m-layercont > div {\n  line-height: 0.293333rem;\n  padding-top: 0.093333rem;\n  margin-bottom: 0.266667rem;\n  font-size: 16px; }\n  [data-dpr=\"2\"] .layui-m-layer2 .layui-m-layercont > div {\n    font-size: 32px; }\n  [data-dpr=\"3\"] .layui-m-layer2 .layui-m-layercont > div {\n    font-size: 48px; }\n\n.layui-m-layerbtn {\n  display: box;\n  display: -moz-box;\n  display: -webkit-box;\n  width: 100%;\n  height: 1.3rem;\n  line-height: 1.3rem;\n  font-size: 0;\n  border-top: 1px solid #D0D0D0;\n  background-color: #F2F2F2; }\n  [data-dpr=\"2\"] .layui-m-layerbtn {\n    font-size: 0; }\n  [data-dpr=\"3\"] .layui-m-layerbtn {\n    font-size: 0; }\n\n.layui-m-layerbtn span {\n  display: block;\n  -moz-box-flex: 1;\n  box-flex: 1;\n  -webkit-box-flex: 1;\n  font-size: 14px;\n  cursor: pointer; }\n  [data-dpr=\"2\"] .layui-m-layerbtn span {\n    font-size: 28px; }\n  [data-dpr=\"3\"] .layui-m-layerbtn span {\n    font-size: 42px; }\n\n.layui-m-layerbtn span[yes] {\n  height: 1.3rem;\n  color: #ff3574;\n  background-color: #fff;\n  border-radius: 0 0 0 0.10667rem; }\n\n.layui-m-layerbtn span[no] {\n  border-right: 1px solid #D0D0D0;\n  border-radius: 0 0 0 0.10667rem; }\n\n.layui-m-layerbtn span:active {\n  background-color: #F6F6F6; }\n\n.layui-m-layerend {\n  position: absolute;\n  right: 0.093333rem;\n  top: 0.133333rem;\n  width: 0.4rem;\n  height: 0.4rem;\n  border: 0;\n  font-weight: 400;\n  background: 0 0;\n  cursor: pointer;\n  -webkit-appearance: none;\n  font-size: 30px; }\n  [data-dpr=\"2\"] .layui-m-layerend {\n    font-size: 60px; }\n  [data-dpr=\"3\"] .layui-m-layerend {\n    font-size: 90px; }\n\n.layui-m-layerend::after,\n.layui-m-layerend::before {\n  position: absolute;\n  left: 0.066667rem;\n  top: 0.2rem;\n  content: '';\n  width: 0.24rem;\n  height: 0.013333rem;\n  background-color: #999;\n  transform: rotate(45deg);\n  -webkit-transform: rotate(45deg);\n  border-radius: 0.04rem; }\n\n.layui-m-layerend::after {\n  transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg); }\n\nbody .layui-m-layer .layui-m-layer-footer {\n  position: fixed;\n  width: 95%;\n  max-width: 100%;\n  margin: 0 auto;\n  left: 0;\n  right: 0;\n  bottom: 0.133333rem;\n  background: 0 0; }\n\n.layui-m-layer-footer .layui-m-layercont {\n  padding: 0.266667rem;\n  border-radius: 0.10667rem 0.10667rem 0 0;\n  background-color: rgba(255, 255, 255, 0.8); }\n\n.layui-m-layer-footer .layui-m-layerbtn {\n  display: block;\n  height: auto;\n  background: 0 0;\n  border-top: none; }\n\n.layui-m-layer-footer .layui-m-layerbtn span {\n  background-color: rgba(255, 255, 255, 0.8); }\n\n.layui-m-layer-footer .layui-m-layerbtn span[no] {\n  color: #FD482C;\n  border-top: 1px solid #c2c2c2;\n  border-radius: 0 0 0.10667rem 0.10667rem; }\n\n.layui-m-layer-footer .layui-m-layerbtn span[yes] {\n  margin-top: 0.133333rem;\n  border-radius: 0.10667rem; }\n\nbody .layui-m-layer .layui-m-layer-msg {\n  width: auto;\n  max-width: 90%;\n  margin: 0 auto;\n  background-color: rgba(0, 0, 0, 0.7);\n  color: #fff; }\n\n.layui-m-layer-msg .layui-m-layercont {\n  min-width: auto;\n  padding: 0.666667rem 0.4rem; }\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by 二哲 on 15/12/6.
	 */
	/*
	* 不带参数指令
	* v-tap=handler
	* or
	* 带参数指令
	* v-tap=handler($index,el,$event)
	*
	* !!!新增!!!
	* 把tapObj对象注册在原生event对象上
	* event.tapObj拥有6个值
	* pageX,pageY,clientX,clientY,distanceX,distanceY
	* 后面2个分别的手指可能移动的位置(以后可用于拓展手势)
	*
	* */
	;(function() {
	    var vueTap = {};
	    vueTap.install = function(Vue) {
	        Vue.directive('tap', {
	            isFn : true,
	            acceptStatement : true,
	            bind : function() {
	                 //bind callback
	            },
	            update : function(fn) {
	                var self = this;
	                    self.tapObj = {};

	                if(typeof fn !== 'function') {
	                    return console.error('The param of directive "v-tap" must be a function!');
	                }
	                self.handler = function(e) { //This directive.handler
	                    e.tapObj = self.tapObj;
	                    fn.call(self,e);
	                }
	                this.el.addEventListener('touchstart',function(e) {

	                    if(self.modifiers.stop)
	                        e.stopPropagation();
	                    if(self.modifiers.prevent)
	                        e.preventDefault();
	                    self.touchstart(e,self);
	                },false);
	                this.el.addEventListener('touchend',function(e) {
	                    //e.preventDefault();
	                    self.touchend(e,self,fn);
	                },false);
	            },
	            unbind : function() {},
	            isTap : function() {
	                var self   = this;
	                if(self.el.disabled || self.el.classList.contains('disabled')){
	                  return false;
	                }
	                var tapObj = this.tapObj;
	                return this.time < 150 && Math.abs(tapObj.distanceX) < 4 && Math.abs(tapObj.distanceY) < 4;
	            },
	            touchstart : function(e,self) {
	                var touches = e.touches[0];
	                var tapObj = self.tapObj;
	                tapObj.pageX = touches.pageX;
	                tapObj.pageY = touches.pageY;
	                tapObj.clientX = touches.clientX;
	                tapObj.clientY = touches.clientY;
	                self.time = +new Date();
	            },
	            touchend : function(e,self) {
	                var touches = e.changedTouches[0];
	                var tapObj = self.tapObj;
	                self.time = +new Date() - self.time;
	                tapObj.distanceX = tapObj.pageX - touches.pageX;
	                tapObj.distanceY = tapObj.pageY - touches.pageY;

	                if (self.isTap(tapObj))
	                    self.handler(e);
	            }
	        });
	    };

	    if (true) {
	        module.exports = vueTap;
	    } else if (typeof define == "function" && define.amd) {
	        define([], function(){ return vueTap })
	    } else if (window.Vue) {
	        window.vueTap = vueTap;
	        Vue.use(vueTap);
	    }

	})();


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * JavaScript Cookie v2.1.2
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function () {
		function extend () {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[ i ];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}

		function init (converter) {
			function api (key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}

				// Write

				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);

					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}

					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}

					if (!converter.write) {
						value = encodeURIComponent(String(value))
							.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}

					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);

					return (document.cookie = [
						key, '=', value,
						attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
						attributes.path    && '; path=' + attributes.path,
						attributes.domain  && '; domain=' + attributes.domain,
						attributes.secure ? '; secure' : ''
					].join(''));
				}

				// Read

				if (!key) {
					result = {};
				}

				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;

				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');

					if (cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}

					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ?
							converter.read(cookie, name) : converter(cookie, name) ||
							cookie.replace(rdecode, decodeURIComponent);

						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}

						if (key === name) {
							result = cookie;
							break;
						}

						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}

				return result;
			}

			api.set = api;
			api.get = function (key) {
				return api(key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};

			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};

			api.withConverter = init;

			return api;
		}

		return init(function () {});
	}));

/***/ }
]);