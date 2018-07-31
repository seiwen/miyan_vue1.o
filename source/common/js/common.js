define('common',[
	'jquery',
	'plugins/layer/layer.js',
	'Vue',
	'lib/vue-tap',
    'lib/cookie',
	], function($, layer, Vue, vueTap, cookie) {
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
})
