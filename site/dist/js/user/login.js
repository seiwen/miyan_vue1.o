webpackJsonp([31,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(1/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(4),
		__webpack_require__(10),
	]; (function($, Vue, common, layer, cookie) {
		if(common.getUrlData('yq_code') != '' && common.getUrlData('yq_code') != null){
			var yq_code = common.getUrlData('yq_code');
		}else{
			var yq_code = '002723';
		}
		var come_from = common.getUrlData('come_from');//邀请渠道，7为普通邀请码邀请，8为公众号邀请
	    var login = new Vue({
			el: '#login',
			ready: function() {
				if(cookie.get('token')){
					layer.open({
	                    content: '您已经登录，需要重新登录吗？',
	                    btn: ['确认', '取消'],
	                    shadeClose: false,
	                    no: function(index){
	                        window.location.href = '/page/user/open-checkout.html?come_from='+come_from+'&yq_code='+yq_code;
	                    },
	                    yes: function(index){
	                    	layer.close(index);
	                        cookie.remove('token');
	                    }
	                });
				}
			},
			methods: {
				code: function(){
					var msg = this.$options.checkvalue_code();
					if(msg != '') {
						layer.open({
							content: msg,
							skin: 'msg',
	    					time: 1.5
						})
						return;
					};

					var options = {
						action: 'Agency.GetRegSmsCode',
						data: {
							mobile: $('#js_iphone').val()
						},
						done: function(res) {
							layer.open({
								content: res.data.msg,
								skin: 'msg',
	    						time: 1.5
							})
							common.endTime();
						},
						fail: function(res){
							layer.open({
								content: res.data.msg,
								skin: 'msg',
	    						time: 1.5
							})
						}
					}
					common.globalAjax(options);
				},
				login: function(){
					var msg = this.$options.checkvalue();
					if(msg != '') {
						layer.open({
							content: msg,
							skin: 'msg',
	    					time: 1.5
						})
						return;
					};
					cookie.remove('token');
					var options = {
						urlEdition: 'v3_0',
						action: 'Agency.Register',
						data: {
							mobile: $('#js_iphone').val(),
							sms_code: $('#js_smscode').val(),
							yq_code: yq_code,
							come_from: come_from,
							app_type: common.checkAPP() || 'web'
						},
						done: function(res) {
							var token = res.data.info.token;
							cookie.remove('is_zhifu');//清除支付返回阻止订单刷新的字段
							layer.open({
								content: res.data.msg,
								skin: 'msg',
	    						time: 1.5
							})

							cookie.set('token',token,{ expires: 1 });
							if(res.data.info.is_open_shop == 0){
								setTimeout(function(){
									window.location.href = '/page/user/open-checkout.html?come_from='+come_from+'&yq_code='+yq_code;
								}, 1500)
							}else{
								setTimeout(function(){
									window.location.href = '/page/cart/open-success.html';
								}, 1500)
							}
						},
						fail: function(res){
							layer.open({
								content: res.data.msg,
								skin: 'msg',
	    						time: 1.5
							})
						}
					}
					common.globalAjax(options);
				}
			},
			checkvalue_code: function() {
				var msg = '';
				if($('#js_iphone').val() == '') {
					msg = '请输入手机号码!';
				}else if(!/^1[3|4|5|7|8][0-9]\d{8}$/.test($('#js_iphone').val())) {
					msg = '请输入正确的手机号码!';
				}
				return msg;
			},
			checkvalue: function() {
				var msg = '';
				if($('#js_iphone').val() == '') {
					msg = '请输入手机号码!';
				}else if(!/^1[3|4|5|7|8][0-9]\d{8}$/.test($('#js_iphone').val())) {
					msg = '请输入正确的手机号码!';
				}else if($('#js_smscode').val() == ''){
					msg = '请输入验证码!';
				}
				return msg;
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);