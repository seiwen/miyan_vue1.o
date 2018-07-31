webpackJsonp([9,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(1/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
	    __webpack_require__(1),
	    __webpack_require__(2),
	    __webpack_require__(3),
	    __webpack_require__(4)
	]; (function($, Vue, common, layer) {
	    function setSec(time) {
	        var day1 = Math.floor(time / (60 * 60 * 24)),
	            hour = Math.floor((time - day1 * 24 * 60 * 60) / 3600),
	            minute = Math.floor((time - day1 * 24 * 60 * 60 - hour * 3600) / 60),
	            second = Math.floor(time - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
	        pay.$set('day', day1 >= 10 ? day1 : day1);
	        pay.$set('hour', hour >= 10 ? hour : '0' + hour);
	        pay.$set('minute', minute >= 10 ? minute : '0' + minute);
	        pay.$set('second', second >= 10 ? second : '0' + second);
	    }

	    $('.yfk-pay-form').on('click', '.btn', function(e) {
	        if($('#smscode').val() == '') {
	            layer.open({
	                content: '请输入手机收到的验证码!',
	                skin: 'msg',
	                time: 1.5
	            })
	            return;
	        }
	    	$.ajax({
	    		url: $('.yfk-pay-form #submiturl').val(),
	    		data: {
	    			out_trade_no: $('#out_trade_no').val(),
	    			smscode: $('#smscode').val()
	    		},
	    		dataType: 'jsonp',
	    		success: function(res) {
	    			if(res.data.code == 0) {
	    				window.location.href = '/page/cart/pay-success.html?oid=' + $('#out_trade_no').val()
	    			}else {
	    				layer.open({
	    					content: res.data.msg,
	    					skin: 'msg',
	                        time: 1.5
	    				})
	    			}
	    		}
	    	})
	    })

	    $('.yfk-pay-form').on('click', '.input-group-addon', function(e) {
	    	common.globalAjax({
	    		action: 'Pay.YfkReSendSmsCode',
	    		done: function(res) {
	                common.endTime();//验证码倒计时
	    			layer.open({
	    				content: res.data.msg,
	    				skin: 'msg',
	                    time: 1.5
	    			})
	    		}
	    	})
	    })

	    var oid = common.getUrlData('oid');
	    var is_open = oid.substring(0,6);
	    var pay = new Vue({
	        el: '#cart-pay',
	        data: {
	            info: {},
	            end_pay_time: '',
	            payment: 'wechat',
	            day: '',
	   			hour: '',
	   			minute: '',
	   			second: '',
	            is_open: is_open
	        },
	        ready: function() {
	            var _this = this;
	            common.globalAjax({
	                action: 'Order.OrderPay',
	                data: {
	                    oid: oid
	                },
	                done: function(res) {
	                    pay.$set('info', res.data.info);
	                    pay.$set('end_pay_time', res.data.info.end_pay_time);
	                    var st = setInterval(function() {
	                        if(_this.end_pay_time == 0) clearInterval(st);
	                        setSec(_this.end_pay_time);
	                        _this.end_pay_time--
	                    }, 1000)
	                }
	            })

	            $('.root').show();
	            if(common.checkUA() == 'ios'){
	                window.location.href = "callApp://truth_complete";
	            }
	        },
	        methods: {
	        	goPay: function() {
	                var _this = this;
	        		if(this.payment == '') {
	                    event.preventDefault();
	        			layer.open({
	        				content: '请先选择付款方式！',
	        				btn: ['确定']
	        			})
	                    return;
	        		}
	        		common.globalAjax({
	        			action: 'pay.index',
	        			data: {
	        				oid: common.getUrlData('oid'),
	                        app_type: common.checkAPP() || 'web',
	        				pay_ment: _this.payment,
	        			},
	        			done: function(res) {
	        				if(_this.payment != 'yfk' && (common.checkUA() == 'ios' || common.checkUA() == 'android')) {
	                            // 移动端 且非预付款
	                            window.location.href = 'callApp://pay?type='+ _this.payment +'&amount=' + res.data.info.total_fee + '&order_sn=' + res.data.info.out_trade_no + '&notify_url=' + res.data.info.notify_url + '&return_url=' + res.data.info.return_url;
	                        }else {
	                            $('.yfk-pay-form').show();
	                            common.endTime();//验证码倒计时
	                            $('.yfk-pay-form').addClass('active').html(res.data.info.info);
	                        }
	        			},
	                    fail: function(res) {
	                        layer.open({
	                            content: res.data.msg,
	                            skin: 'msg',
	                            time: 1.5
	                        })
	                    }
	        		})
	        	}
	        }
	    })
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})


/***/ }
]);