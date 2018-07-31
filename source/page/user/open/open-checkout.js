require([
	'jquery',
	'Vue',
	'vendor/common.js',
	'plugins/layer/layer.js',
	'lib/jquery.lazyload.js',
	'lib/cookie',
], function($, Vue, common, layer, lazyload, cookie) {
	if(common.checkAPP() == 'wechat'){
        var payment_select = 'wechat';
    }else{
        var payment_select = 'aliwap';
    }
    var come_from = common.getUrlData('come_from');//邀请渠道，7为普通邀请码邀请，8为公众号邀请
    var yq_code = common.getUrlData('yq_code');
    if(yq_code != '' || yq_code != null){
		var yq_codes = yq_code;
	}else{
		var yq_codes = '002723';
	}
    cookie.set('yq_code',yq_codes,{ expires: 1 });
	var open_checkout = new Vue({
		el: '#open-checkout',
		data: {
			payment: payment_select,
			info: {},
			virtual_goods: {}
		},
		ready: function() {
			common.globalAjax({
				urlEdition: 'v3_0',
				action: 'Shop.openShopCheck',
				data: {
					yq_code: yq_codes
				},
				done: function(res) {
					open_checkout.$set('info', res.data.info);
					open_checkout.$set('virtual_goods', res.data.info.virtual_goods);
					if(res.data.info.need_pay == 0){
						event.preventDefault();
						if(common.checkAPP() == 'miyan'){
							layer.open({
			                    content: '您已经开通了微店！',
			                    btn:['去查看'],
								shadeClose: false,
								yes: function(index){
							        window.location.href = 'callApp://goShop';
							        layer.close(index);
							    }
			                });
						}else{
							layer.open({
			                    content: '您已经开通了微店！',
			                    btn:['下载APP去查看'],
								shadeClose: false,
								yes: function(index){
							        window.location.href = 'http://www.miyanmz.com/index.php?m=pc&a=app';
							        layer.close(index);
							    }
			                });
						}
					}
					$('#masker').hide();
				},
				fail: function(res){
					$('#masker').hide();
					if(res.data.code==2){
						event.preventDefault();
						if(common.checkAPP() == 'miyan'){
							layer.open({
			                    content: res.data.msg,
			                    btn:['去查看'],
								shadeClose: false,
								yes: function(index){
							        window.location.href = 'callApp://goShop';
							        layer.close(index);
							    }
			                });
		                }else{
		                	layer.open({
			                    content: res.data.msg,
			                    btn:['下载APP去查看'],
								shadeClose: false,
								yes: function(index){
							        window.location.href = 'http://www.miyanmz.com/index.php?m=pc&a=app';
							        layer.close(index);
							    }
			                });
		                }
					}else{
						layer.open({
							content: res.data.msg,
							style: 'background-color:#000; color:#fff; border:none;',
	                    	time: 1.5
						})
						return;
					}
				}
			})
		},
		watch: {
			'info': function(val) {
				$('#open-checkout').show();
				this.$nextTick(function(){
					$('img.lz').lazyload();
					if(common.checkAPP() != 'miyan'){
						if(common.checkAPP() == 'wechat'){
							$('#aliwap').attr('disabled', 'disabled');
							$('#aliwap').parents('li').addClass('disabled');
						}else{
	                        $('#wechat').attr('disabled', 'disabled');
	                        $('#wechat').parents('li').addClass('disabled');
	                    }
                    }
				})
			}
		},
		methods: {
			goPay: function(type) {
				var option = {};
				var _this = this;
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

				if(this.info.virtual_goods != null){
					common.globalAjax({
						action: 'Agency.submitOpenShopOrder',
						data: {
							open_order_sn: _this.info.open_order_sn,
							pay_ment: _this.payment,
							app_type: common.checkAPP() || 'web'
						},
						done: function(res) {
							if(res.data.info.need_pay == 1){
								if(common.checkAPP() == 'miyan'){
									window.location.href = 'callApp://pay?type='+ _this.payment +'&amount=' + res.data.info.total_fee + '&order_sn=' + res.data.info.out_trade_no + '&notify_url=' + res.data.info.notify_url + '&return_url=' + res.data.info.return_url;
								}else{
									if(_this.payment == 'aliwap') {
										var html_aliwap = '<form id="paysubmit" name="paysubmit" action="https://mapi.alipay.com/gateway.do?" method="get">'
		                                                +'<input type="hidden" name="_input_charset" value="'+res.data.info._input_charset+'" />'
		                                                +'<input type="hidden" name="body" value="'+res.data.info.body+'" />'
		                                                +'<input type="hidden" name="notify_url" value="'+res.data.info.notify_url+'" />'
		                                                +'<input type="hidden" name="out_trade_no" value="'+res.data.info.out_trade_no+'" />'
		                                                +'<input type="hidden" name="partner" value="'+res.data.info.partner+'" />'
		                                                +'<input type="hidden" name="payment_type" value="'+res.data.info.payment_type+'" />'
		                                                +'<input type="hidden" name="return_url" value="'+res.data.info.return_url+'" />'
		                                                +'<input type="hidden" name="seller_id" value="'+res.data.info.seller_id+'" />'
		                                                +'<input type="hidden" name="service" value="'+res.data.info.service+'" />'
		                                                +'<input type="hidden" name="subject" value="'+res.data.info.subject+'" />'
		                                                +'<input type="hidden" name="total_fee" value="'+res.data.info.total_fee+'" />'
		                                                +'<input type="hidden" name="sign" value="'+res.data.info.sign+'" />'
		                                                +'<input type="hidden" name="sign_type" value="'+res.data.info.sign_type+'" />'
		                                                +'</form>';
		                                $('#go-aliwap').append(html_aliwap);
		                                setTimeout(function(){
		                                    document.forms['paysubmit'].submit();
		                                }, 500);
									}else{
										window.location.href = 'http://beauty.miyanmz.com/index.php?g=home&m=api&a=wechatlogin&wechatScope=snsapi_base&returnurl='+common.payUrl()+'%2findex.php%3fg%3dhome%26m%3dpay%26a%3dpayOrderForOpenshop%26oid%3d'+res.data.info.order_no+'%26token%3d'+cookie.get('token')+'%26shop_id%3d482';								}
								}
							}else{
								window.location.href = '/page/cart/open-success.html';
							}
						},
						fail: function(res) {
							if(res.ret==200){
								event.preventDefault();
								if(res.data.code==2){
									layer.open({
		                                content: rs.data.msg,
		                                skin: 'msg',
    									time: 1.5,
		                                shadeClose: false
		                            });
								}else if(res.data.code==1){
									if(common.checkAPP() == 'miyan'){
										layer.open({
											content: '您的订单已生成!',
											btn:['去查看'],
											shadeClose: false,
											yes: function(index){
										        window.location.href = '/page/user/orderDetialAll.html?type=0';
										        layer.close(index);
										    }
										})
									}else{
										layer.open({
											content: '您的订单已生成!',
											btn:['下载APP去查看'],
											shadeClose: false,
											yes: function(index){
										        window.location.href = 'http://www.miyanmz.com/index.php?m=pc&a=app';
										        layer.close(index);
										    }
										})
									}
								}
							}else{
								layer.open({
	                                content: '订单提交失败！',
	                                skin: 'msg',
    								time: 1.5,
	                                shadeClose: false
	                            });
							}
						}
					})
				}
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