require([
	'jquery',
	'Vue',
	'vendor/common.js',
	'plugins/layer/layer.js',
	'lib/jquery.lazyload.js',
	'lib/jquery.json.js'
], function($, Vue, common, layer, toJSON) {

	var tyz = new Vue({
		el: '#user-tiyanzhuang',
		data: {
			info: {},
			zz_free_qiandao: {},
			tyz_products: [],
			number: 0,
			shop_arr: []
		},
		ready: function() {
			common.globalAjax({
				urlEdition: 'v3_0',
				action: 'Agency.GetTyz',
				done: function(res) {
					//获取数据
					tyz.$set('info', res.data.info);
					tyz.$set('tyz_products', res.data.info.tyz_products);
					tyz.$set('zz_free_qiandao', res.data.info.zz_free_qiandao);
					$('.root').show();
					if(common.checkAPP == 'miyan'){
						var shareTitle = tyz.info.share_title;
						var shareDesc = tyz.info.share_content;
						var shareUrl = tyz.info.share_url;
						var shareImg = tyz.info.share_image;
                        window.location.href = "callApp://shareMsg?shareTitle="+shareTitle+"&shareDesc="+shareDesc+"&linkUrl="+shareUrl+"&firstShow=0&isShare=1&shareImg="+shareImg+"&isWechat=1&score="+tyz.info.score+'&share_content='+shareDesc
                    }
					//领取试用装数量判断
					var tyzCount = res.data.info.zz_free_qiandao.tyzCount;
					var tyz_num = $('.js_tiyanzhuang_num').val();
					if (tyzCount<1) {
						$('#submit').attr('disabled', 'disabled');
					}
				},
				fail: function(res){
					//404显示
					var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面~</span></p>';
					$('#user-tiyanzhuang').hide();
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
					$('img.lz').lazyload();
					// $('.tyz-goods .nav li').click(function(event) {
					// 	var index = $(this).index();
					// 	$(this).addClass('on').siblings().removeClass('on');
					// 	$(this).parents('.tyz-goods').find('.cont li').eq(index).addClass('on').siblings().removeClass('on');
					// });
					$('.tyz-goods-nav span').click(function(event) {
						var index = $(this).index();
						$(this).addClass('active').siblings().removeClass('active');
						$(this).parents('.tyz-goods').find('.content').eq(index).addClass('active').siblings().removeClass('active');
					});
					$(window).scroll(function(event) {
						var tar_top = $('.tyz-goods')[0].offsetTop-$(window).scrollTop();
						if(tar_top < 0){
							$('.tyz-goods .nav').css({
								position: 'fixed',
								top: '0',
								left: '0'
							});
						}else{
							$('.tyz-goods .nav').css({
								position: 'relative',
								top: 'none',
								left: 'none'
							});
						}
					});
				})
			}
		},
		methods: {
			reduce: function(e){
				if (e) e.preventDefault();
				var _this = e.currentTarget;
				var val_num = parseInt($(_this).next().val());
				if (!isNaN(val_num)) {
					$(_this).parents('.tiyanzhuang-item-num').find('.plus').removeClass('disabled');
					if (val_num < 2) {
						$(_this).next().val('0');
						$(_this).addClass('disabled');
					}else{
						$(_this).next().val(val_num-1);
						$(_this).removeClass('disabled');
					}
				}else{
					layer.open({
						content: '请输入数字！',
						skin: 'msg',
    					time: 1.5
					})
				}
			},
			plus: function(e){
				if (e) e.preventDefault();
				var _this = e.currentTarget;
				var val_num = parseInt($(_this).prev().val());
				if (!isNaN(val_num)) {
					$(_this).parents('.tiyanzhuang-item-num').find('.reduce').removeClass('disabled');
					var max_num = parseInt(tyz.zz_free_qiandao.tyzCount)
					if (val_num > max_num-2) {
						$(_this).prev().val(max_num);
						$(_this).addClass('disabled');
					}else{
						$(_this).prev().val(val_num+1);
						$(_this).removeClass('disabled');
					}
				}else{
					layer.open({
						content: '请输入数字！',
						skin: 'msg',
    					time: 1.5
					})
				}
			},
			goShare: function(){
				//调起分享弹框
				window.location.href = "callApp://clickShare";
			},
			goSubmit: function(isGet){
				if(isGet == 1){
					var msg = this.$options.checkvalue();
					if(msg != '') {
						layer.open({
							content: msg,
							skin: 'msg',
	    					time: 1.5
						})
						return;
					}

					//获取选择体验数量
					var productCode = [];
					var count = [];
		            $.each($('.js_tiyanzhuang_num'), function(index,val) {
		                productCode.push(val.name);
		                count.push(val.value);
		            });
		            window.location.href = "/page/user/tyz-address.html?productCode="+productCode+"&count="+count;
				}else{
					layer.open({
						content: '暂不能领取试用装，请联系客服！',
						skin: 'msg',
						time: 1.5
					})
				}
			}
		},
		checkvalue: function() {
			var msg = '';
			var max_num = parseInt($('.js_tiyanzhuang_num').attr('max'));
			//获取选择体验数量
			var allNum = 0;
            $.each($('.js_tiyanzhuang_num'), function(index,val) {
                allNum += parseInt(val.value);
            });

			if(allNum<1){
				msg = '请选择试用套装!';
			}else if(allNum>max_num) {
				msg = '您已超出领取数量！';
			}
			return msg;
		}
})

})