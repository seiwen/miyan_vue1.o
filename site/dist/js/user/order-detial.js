webpackJsonp([34,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(7/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(4),
		__webpack_require__(11),
	]; (function($, Vue, common, layer, lazyload) {
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
	    if(common.checkAPP() == 'miyan'){
	   		var version_num = common.version();
	    }else{
	    	var version_num = 220;
	    }
		var order_detial = new Vue({
			el: '#order-detial',
			data: {
				info: {},
				order_option: {},
				version: version_num
			},
			ready: function() {
				common.globalAjax({
					action: 'Order.GetOrderDetail',
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
				cancelPay: function() {
					event.preventDefault();
					layer.open({
	                    content: '确认要取消订单吗？',
	                    btn: ['确认', '取消'],
	                    no: function(index){
	                        layer.close(index);
	                    },
	                    yes: function(index){
	                    	common.globalAjax({
								action: 'Order.CancelOrder',
								data: {
									oid: order_id
								},
								done: function(res) {
									layer.open({
										content: '取消订单成功！',
										skin: 'msg',
	    								time: 1.5
									})
									$('.order-detial-header .left').text('已取消');
									$('.order-detial-button,.order-detial-header .right').remove();
								},
								fail: function(res){
									layer.open({
										content: '取消订单失败！',
										skin: 'msg',
	    								time: 1.5
									})
								}
							})
	                    }
	                });
				},
				surePay: function() {
					event.preventDefault();
					layer.open({
	                    content: '确认要收货吗？',
	                    btn: ['确认', '取消'],
	                    no: function(index){
	                        layer.close(index);
	                    },
	                    yes: function(index){
	                    	common.globalAjax({
								action: 'Order.DeliveryConfirm',
								data: {
									oid: order_id
								},
								done: function(res) {
									layer.open({
										content: '确认收货成功！',
										skin: 'msg',
	    								time: 1.5
									})
									$('.order-detial-header .left').text('交易成功');
									$('.order-detial-button').remove();
								},
								fail: function(res){
									layer.open({
										content: '确认收货失败！',
										skin: 'msg',
	    								time: 1.5
									})
								}
							})
	                    }
	                });
				},
				copy: function(order_sn) {
					window.location.href = 'callApp://copy?order_sn='+order_sn;
				}
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);