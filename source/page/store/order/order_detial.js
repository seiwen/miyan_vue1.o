require([
	'jquery',
	'Vue',
	'vendor/common.js',
	'lib/jquery.lazyload.js',
], function($, Vue, common, lazyload) {
	//倒计时函数
    common.updateEndTime = function(){
        var date = new Date();
        var time = date.getTime();  //当前时间距1970年1月1日之间的毫秒数

        $(".settime").each(function(i){

            var endDate =this.getAttribute("endTime"); //结束时间字符串
            //转换为时间日期类型
            var endDate1 = eval('new Date(' + endDate.replace(/\d+(?=-[^-]+$)/, function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');

            var endTime = endDate1.getTime(); //结束时间毫秒数

            var lag = (endTime - time) / 1000; //当前时间和结束时间之间的秒数
            if(lag > 0)
            {
                var second = Math.floor(lag % 60);
                var minite = Math.floor((lag / 60) % 60);
                var hour = Math.floor((lag / 3600) % 24);
                var day = Math.floor((lag / 3600) / 24);
                if (day <= 9) day = '0' + day;
                if (hour <= 9) hour = '0' + hour;
                if (minite <= 9) minite = '0' + minite;
                if (second <= 9) second = '0' + second;
                $(this).html(day +'天'+ hour +'时'+ minite +'分'+ second +'秒');
            }
            else{
                $(".order-detial-header .left").text('已取消');
                $(".order-detial-button,.order-detial-header .right").remove();
                $(".order-detial-beizhu").css('border-bottom', '0.013333rem solid #ddd');
            }

        });
        setTimeout(function() {
             common.updateEndTime();
        }, 1000)
    }
    var order_id = common.getUrlData('order_id');
	var order_detial = new Vue({
		el: '#order-detial',
		data: {
			info: {},
			order_option: {},
			version: common.version()
		},
		ready: function() {
			common.globalAjax({
				action: 'Order.GetWeiDianOrderDetail',
				data: {
					order_id: order_id
				},
				done: function(res) {
					order_detial.$set('info', res.data.info);
					order_detial.$set('order_option', res.data.info.order_option);
					if(common.checkAPP == 'miyan'){
                        window.location.href = "callApp://truth_complete";
                    }
					$('.root').show();
				},
				fail: function(res){
					//404显示
					var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面!</span></p>';
					$('body').append(html_404);
					$("html,body").css('height', '100%');
	                $("body").css({
	                    display: 'table',
	                    width: '100%',
	                    background: '#f5f5f5'
	                });
	                $(".tipinfo").css('display', 'table-cell');
				}
			})
		},
		watch: {
			'info': function(val){
				this.$nextTick(function(){
					//拼团倒计时
					common.updateEndTime();
					$('img.lz').lazyload();
					if(order_detial.order_option.is_tyz == 1){
						$('.order-detial-cont ul a').attr('href', 'javascript:;');
					}
				})
			}
		},
		methods: {
			copy: function(order_sn) {
				window.location.href = 'callApp://copy?order_sn='+order_sn;
			}
		}
	})

})