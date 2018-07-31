require([
	'jquery',
	'Vue',
	'vendor/common.js',
	'plugins/layer/layer.js',
	'lib/jquery.lazyload.js',
	'lib/moment.js'
], function($, Vue, common, layer, lazyload,moment) {

	//时间过滤器
	Vue.filter('moment', function (value, formatString) {
	    formatString = formatString || 'YYYY.MM.DD';
	    return moment(value).format(formatString);
	});

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

	var checkout = new Vue({
		el: '#cart-checkout',
		data: {
			payment: 'wechat',
			savings: '',
			address: {},
			info: {},
			coupon: {},
			recommend_coupon: {},
			agency_info: {}
		},
		ready: function() {
			var productArr = common.getUrlData('cartid').split(',');
			common.globalAjax({
				action: 'Cart.CheckOut',
				data: {
					cart_id: productArr
				},
				done: function(res) {
					checkout.$set('info', res.data.info);
					checkout.$set('agency_info', res.data.info.agency_info);
					checkout.$set('address', res.data.info.consignee_list);
					checkout.$set('coupon', res.data.info.coupon);
					checkout.$set('recommend_coupon', res.data.info.coupon.recommend_coupon);
				}
			})
			// console.log(this.$el);
			$('#masker').hide();
			$('.root').show();
			//点击红包
			$('.coupon').click(function(event) {
		    	$('.coupon-hide').show();
		    	$('.coupon-box').slideDown();
		    });
		    $('.coupon-hide,.coupon-close').click(function(event) {
		    	$('.coupon-hide').hide();
		    	$('.coupon-box').slideUp();
		    });
			if(common.checkUA() == 'ios'){
				window.location.href = "callApp://truth_complete";
			}
		},
		watch: {
			'info': function(val) {
				if(val.consignee_list == null){
					$('.address .info div').hide();
					$('.no_address').show();
				}
				$('#cart-checkout').show();
				this.$nextTick(function(){
					$('img.lz').lazyload();
				})
			},
			'savings': function(val){
				var maxLength = parseInt($('.textfield').attr('max'));
				if(val>maxLength){
					if (maxLength<0) {
						var money_ban = (checkout.info.order_money - checkout.info.preferential_money - checkout.recommend_coupon.face_value) * 50
						if(money_ban >= checkout.info.available_point){
							var newVal = checkout.info.available_point;
						}else{
							var newVal = parseInt(checkout.info.available_point/2);
						}
						$('.textfield').val(newVal);
						checkout.savings = newVal;
					}else{
						$('.textfield').val(val);
						checkout.savings = val;
					}
				}
			}
		},
		methods: {
			goAddress: function() {
				if(this.info.need_sid == 1){
					if(this.info.consignee_list == null) {
						window.location.href = '/page/cart/edit-address.html?cartid=' + common.getUrlData('cartid') + '&need_sid=' + this.info.need_sid +'&is_showSave=1';
					}else{
						window.location.href = '/page/cart/address.html?cartid=' + common.getUrlData('cartid') + '&need_sid=' + this.info.need_sid;
					}
				}else{
					if(this.info.consignee_list == null) {
						window.location.href = '/page/cart/edit-address.html?cartid=' + common.getUrlData('cartid') +'&is_showSave=1';
					}else{
						window.location.href = '/page/cart/address.html?cartid=' + common.getUrlData('cartid');
					}
				}
			},
			showList: function(e){
				if (e) e.preventDefault();
				var _this = e.currentTarget;
				if($(_this).hasClass('on')){
					$(_this).removeClass('on');
					$(_this).parents('.warehouse').find('.hide-box').slideUp();
					$(_this).parents('.warehouse').find('.list-product').css('border', 'none');
					$(_this).css('border-color', '#666');
					$(_this).removeClass('margin-top-10');
					$(_this).find('i').removeClass('clickeDown');
					$(_this).find('i').addClass('clickeUp');
					$(_this).find('.hide-ext').hide();
					$(_this).find('.show-ext').show();
				}else{
					$(_this).addClass('on');
					$(_this).parents('.warehouse').find('.list-product').slideDown();
					$(_this).parents('.warehouse').find('.list-product').css('border', '1px solid #dadada');
					$(_this).css('border-color', '#fff');
					$(_this).addClass('margin-top-10');
					$(_this).find('i').removeClass('clickeUp');
					$(_this).find('i').addClass('clickeDown');
					$(_this).find('.show-ext').hide();
					$(_this).find('.hide-ext').show();
				}
			},
			goPay: function(type) {
				var option = {};
				var _this = this;
				var need_sid = this.info.need_sid;
				var reg_zw = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
				var bz_kf = $("#bz_kf").val();
				// if(checkout.recommend_coupon.id == 0){
				// 	var coupon_id = checkout.recommend_coupon.id;
				// 	var is_coupon = 0;
				// }else{
				// 	var coupon_id = $('.coupon-box .on .coupon-box-price').attr('data-id');
				// 	var is_coupon = $('#js_needPrice').attr('data-coupon');
				// }
				var coupon_id = $('.coupon-box .on .coupon-box-price').attr('data-id');
				var is_coupon = $('#js_needPrice').attr('data-coupon');
				// if(is_coupon == 1){
				// 	var coupon_type = 1;
				// }else{
				// 	var coupon_type = 2;
				// }
				if(this.info.consignee_list == null) {
					option = {
						msg: '您尚未完善收货信息，马上去设置',
						btn: ['确定'],
						done: function() {
							window.location.href = '/page/cart/edit-address.html?cartid=' + common.getUrlData('cartid') +'&need_sid=' + need_sid +'&is_showSave=1';
						}
					}
				}else{
					var address_id = this.info.consignee_list.address_id;
					var sfz_sid = this.info.consignee_list.sid;
					var sid_name = this.info.consignee_list.sid_name;
					if(need_sid == 1 && sfz_sid == ''){
						option = {
							msg: '<h3>海关身份证实名验证</h3><br/><p class="red">须知：根据海关规定，身份证信息用于商品入境申报，请务必上传真实的姓名相关联的身份证信息！</p>',
							btn: ['去填写'],
							done: function() {
								window.location.href = '/page/cart/edit-address.html?cartid=' + common.getUrlData('cartid') + '&addid=' + address_id + '&need_sid=' + need_sid +'&city_yes=1&is_showSave=1';
							}
						}
					}
					if(need_sid == 1 && !reg_zw.test(sid_name)){
						option = {
							msg: '<h3>海关身份证实名验证</h3><br/><p class="red">须知：根据海关规定，身份证信息用于商品入境申报，请务必上传真实的姓名相关联的身份证信息！</p>',
							btn: ['去填写'],
							done: function() {
								window.location.href = '/page/cart/edit-address.html?cartid=' + common.getUrlData('cartid') + '&addid=' + address_id + '&need_sid=' + need_sid +'&city_yes=1&is_showSave=1';
							}
						}
					}
				}
				var money_ban = (checkout.info.order_money - checkout.info.preferential_money - checkout.recommend_coupon.face_value) * 50;//应付金额的一半
				if(money_ban >= this.info.available_point){
					var sj_jifen = parseInt(this.info.available_point);
				}else{
					var sj_jifen = parseInt(this.info.available_point/2)
				}
				if(this.savings != '' && this.savings > sj_jifen) {
					option = {
						msg: '您最多可以使用'+sj_jifen+'积分！',
						btn: ['确定']
					}
				}
				if(this.payment == '') {
					option = {
						msg: '请选择付款方式',
						btn: ['确定']
					}
				}

				if(option.msg) {
					this.$options.showMsg(option);
					return;
				}

				if(this.info.products != null){
					common.globalAjax({
						action: 'Cart.SubmitOrder',
						data: {
							address_id: _this.address.address_id,
							pay_ment: _this.payment,
							point: _this.savings,
							app_type: common.checkAPP() || 'web',
							sid: _this.address.sid,
							sid_name: _this.address.sid_name,
							coupon_id: coupon_id,
							coupon_type: is_coupon,
							order_bz: bz_kf
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
							// if(res.ret==200){
							// 	layer.open({
							// 		content: '您的订单已生成!',
							// 		btn:['去查看'],
							// 		shadeClose: false,
							// 		yes: function(index){
							// 	        window.location.href = '/page/user/orderDetialAll.html?type=0';
							// 	        layer.close(index);
							// 	    }
							// 	})
							// }else{
							// 	var maxJf = $('#js_needPrice').attr('max');
							// 	var kyjf = $('#js_needPrice').attr('kyjf');
							// 	if(parseInt(maxJf)>parseInt(kyjf)){
							// 		layer.open({
							// 			content: '您最多使用'+kyjf+'积分!',
							// 			time: 1.5
							// 		})
							// 	}else{
							// 		layer.open({
							// 			content: '您最多使用'+maxJf+'积分!',
							// 			time: 1.5
							// 		})
							// 	}
							// }
							if(res.ret==200){
								if(res.data.code==2){
									layer.open({
		                                content: rs.data.msg,
		                                skin: 'msg',
    									time: 1.5,
		                                shadeClose: false
		                            });
								}else if(res.data.code==1){
									event.preventDefault();
									layer.open({
										content: '您的订单已生成!',
										btn:['去查看'],
										shadeClose: false,
										yes: function(index){
									        window.location.href = '/page/user/orderDetialAll.html?type=0';
									        layer.close(index);
									    }
									})
								}
							}else{
								layer.open({
	                                content: res.msg,
	                                skin: 'msg',
    								time: 1.5,
	                                shadeClose: false
	                            });
							}
						}
					})
				}
			},
			selectCoupon: function(id,face_value,amount,index) {
				var money = $('#js_needPrice').attr('data-price');
				var fee = $('#js_needPrice').attr('data-fee');
				checkout.savings = 0;
				checkout.recommend_coupon.face_value = face_value;
				if(parseInt(amount)<=parseInt(money)){
					$('.coupon-box ul li:nth-child('+index+')').addClass('on').siblings().removeClass('on');
					$('#js_coupon').html('- &yen;<i>'+face_value+'</i>');
					$('#js_needPrice').attr({
						'data-coupon': 1
					});
				}else{
					var coupon_val = $('.coupon-box .on .coupon-box-price').attr('data-val');
					if(coupon_val == undefined){
						checkout.recommend_coupon.face_value = 0;
					}else{
						checkout.recommend_coupon.face_value = coupon_val;
					}
					layer.open({
                        content: '订单未满'+amount+'元（不含运费），<br/>不能使用此红包哦！',
                        skin: 'msg',
    					time: 1.5
                    });
				}
				$('.coupon-hide').hide();
				$('.coupon-box').slideUp();
			},
			lastCoupon: function(){
				$('.coupon-box ul li:last-child').addClass('on').siblings().removeClass('on');
				$('#js_coupon').html('不使用优惠券');
				$('#js_needPrice').attr({
					'data-coupon': '0'
				});
				checkout.recommend_coupon.face_value = 0;
				$('.coupon-hide').hide();
				$('.coupon-box').slideUp();
			},
			clickJifen: function(){
				event.preventDefault();
				layer.open({
					content: '<h3>积分使用规则</h3><br/><p>使用说明：积分是蜜妍在用户购物、分享、做任务等相关活动给予的奖励，可以抵扣商品金额，但不能抵扣运费；</p><br/><p>使用条件：使用积分抵扣现金时，不得超过商品应付金额的50%（不含运费）。</p>',
					btn:['我知道了'],
					yes: function(index){
				        layer.close(index);
				    }
				})
			}
		},
		showMsg: function(option) {
			event.preventDefault();
			layer.open({
				content: option.msg,
				btn: option.btn,
				yes: function(index) {
					if(option.done) {
						option.done()
					}else {
						layer.close(index);
					}
				},
				no: function(index) {
					layer.close(index);
				}
			})
		}
	})
})