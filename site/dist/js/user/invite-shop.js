webpackJsonp([27,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(28, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(4),
		__webpack_require__(15),
		__webpack_require__(10),
	]; (function($, Vue, common, layer, swiper, cookie) {
		var list_data = [];
		var new_data,data_new = [];
		var nextPage = 1;
	    var flag = 2;
		function getMoreRecru(flag) {
	    	common.globalAjax({
	    		urlEdition: 'v3_0',
				action: 'Shop.inviteAgencyList',
				data: {
					page_size: 20,
					p: flag
				},
				done: function(res) {
	                //获取列表
					new_data = res.data.info.list;
					var list_length = new_data.length;
					var data_new = list_data.concat(new_data);
					list_data = data_new;
					invite.$set('info', data_new);
					$('.root').show();
					if (list_length>0) {
						nextPage += 1;
						if(list_length<10){
							$(".gengduo-ajax i").hide();
	                        $('#loading').html('没有更多内容了...');
	                        nextPage +=1;
	                    }else{
	                        $("#loading").text('上拉加载更多...');
	                    };
					}else{
						$('.gengduo-ajax').show();
						$(".gengduo-ajax i").hide();
	                    $('#loading').html('没有更多内容了...');
	                    nextPage +=2;
					}
				},
				fail: function(res){
					//404显示
					var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面!</span></p>';
					$('#invite-shop').hide();
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
	    }

	    if(common.getUrlData('is_invite') == 1){
	    	window.location.href = 'callApp://goStock'
	    	var isWeShopPayment = 1;
	    }else{
	    	var isWeShopPayment = common.isWeShopPayment();
	    }

		var invite = new Vue({
			el: '#invite-shop',
			data: {
				shopInfo: {},
				info: [],
				yq_rule_arr: [],
				rule_length: {},
				powerBase: [],
				isWeShopPayment: isWeShopPayment
			},
			ready: function() {
				common.globalAjax({
					urlEdition: 'v3_0',
					action: 'Shop.inviteOpenShop',
					done: function(res) {
						//获取数据
						invite.$set('shopInfo', res.data.info);
						invite.$set('powerBase', res.data.info.shop_power);
						if(invite.shopInfo.is_grads == 1){
						//返现进度条
						var tipsPadding = $(window).width()*0.027;//提示框的内边距宽度
						var progressW = $(window).width() * 0.84;//进度条宽度
						var yq_rule = res.data.info.yq_rule;
						var yq_rule_cont = parseInt(res.data.info.yq_total);//邀请人数
						var yq_rule_amount = res.data.info.reward_amount;//邀请获得的奖励金
						var yq_rule_length = parseInt(yq_rule.length);
						invite.$set('rule_length', yq_rule_length);
						if(yq_rule_length>3){
							var new_i = 0;
							for (i in yq_rule) {
								// 循环邀请规则,计算出已经邀请到的人数在那个规则上
								if(yq_rule_cont >= yq_rule[i].man){
									new_i = i;
								}
							}
							if(yq_rule_length == 4){
								switch(parseInt(new_i)) {
									case 0:
										var yq_rule_arr = yq_rule.slice(0, 3);
										break;
									case 1:
										var yq_rule_arr = yq_rule.slice(0, 3);
										break;
									case 2:
										var yq_rule_arr = yq_rule.slice(1, 4);
										break;
									case 3:
										var yq_rule_arr = yq_rule.slice(1, 4);
										break;
								}
							}
							if(yq_rule_length==5){
								switch(parseInt(new_i)) {
									case 0:
										var yq_rule_arr = yq_rule.slice(0, 3);
										break;
									case 1:
										var yq_rule_arr = yq_rule.slice(0, 3);
										break;
									case 2:
										var yq_rule_arr = yq_rule.slice(1, 4);
										break;
									case 3:
										var yq_rule_arr = yq_rule.slice(2, 5);
										break;
									case 4:
										var yq_rule_arr = yq_rule.slice(2, 5);
										break;
								}
							}
							if(yq_rule_length==6){
								switch(parseInt(new_i)) {
									case 0:
										var yq_rule_arr = yq_rule.slice(0, 3);
										break;
									case 1:
										var yq_rule_arr = yq_rule.slice(0, 3);
										break;
									case 2:
										var yq_rule_arr = yq_rule.slice(1, 4);
										break;
									case 3:
										var yq_rule_arr = yq_rule.slice(2, 5);
										break;
									case 4:
										var yq_rule_arr = yq_rule.slice(3, 6);
										break;
									case 5:
										var yq_rule_arr = yq_rule.slice(3, 6);
										break;
								}
							}
							invite.$set('yq_rule_arr', yq_rule_arr);
							var yq_rule_arr_length = 3;
						}
						if(yq_rule_length == 1){
							var rule_tiduNum_1 = parseInt(yq_rule[0].man);
						}else if(yq_rule_length == 2){
							var rule_tiduNum_1 = parseInt(yq_rule[0].man);
							var rule_tiduNum_2 = parseInt(yq_rule[1].man);
						}else if(yq_rule_length == 3){
							var rule_tiduNum_1 = parseInt(yq_rule[0].man);
							var rule_tiduNum_2 = parseInt(yq_rule[1].man);
							var rule_tiduNum_3 = parseInt(yq_rule[2].man);
						}else if(yq_rule_length > 3){
							var rule_tiduNum_1 = parseInt(yq_rule_arr[0].man);
							var rule_tiduNum_2 = parseInt(yq_rule_arr[1].man);
							var rule_tiduNum_3 = parseInt(yq_rule_arr[2].man);
						}
						var rule_interval = setInterval(rule_increment,50);//数值动画
						var rule_current = 0;//初始
						function rule_increment(){//数值动画主方法
							rule_current = rule_current + 1;
							if(rule_current >= yq_rule_cont){//处理数字累加到传给的值时停止
								clearInterval(rule_interval);
								rule_current = yq_rule_cont;
							}
							if(yq_rule_length == 1){
								switch(rule_current) {
									case 0:
										$('.invite-task .invite-tips').html('<span><em></em>还没行动喔，立即邀请得返现~</span>');
										$('.invite-task .invite-tips span').show('500');
										$(".invite-task .invite-progress progress").attr('value', '0');
										break;
									case rule_tiduNum_1:
										$('.invite-task .invite-progress span:first-child,.invite-task ul li:first-child').addClass('active');
										$('.invite-task .invite-tips').html('<span><em></em>您已邀请<b>'+yq_rule_cont+'</b>人，获得<b>'+yq_rule_amount+'</b>元返现</span>');
										var tipsW = $('.invite-task .invite-tips span').width();
										var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
										var newPro = (progressW-tipsW)*0.5;
										var marEm = tipsW*(1/2)+(tipsW+tipsPadding)*0.08;
										$('.invite-task .invite-tips span em').css('left', marEm+'px');
										var newLeft = newPro-newTips;
										$(".invite-task .invite-progress progress").attr('value', '15');
										$('.invite-task .invite-tips span').css('margin-left', newLeft+'px');
										$('.invite-task .invite-tips span').show('500');
										break;
									default:
										if(rule_current>rule_tiduNum_1){
											$('.invite-task .invite-tips').html('<span><em></em>你已邀请<b>'+yq_rule_cont+'</b>人，超过50%的代理');
										}else{
											$('.invite-task .invite-tips').html('<span><em></em>无敌最是寂寞，您已超过99%的代理</span>');
										}
										var tipsW = $('.invite-task .invite-tips span').width();
										var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
										if(0<rule_current && rule_current<rule_tiduNum_1){
											$(".invite-task .invite-progress progress").attr('value', '7.5');
											var newPro = progressW*(1/((yq_rule_length+1)*2));
											var newLeft = newPro-newTips;
											$('.invite-task .invite-tips span').css('margin-left', newLeft+'px');
										}else if(rule_current>rule_tiduNum_1){
											$('.invite-task .invite-tips span').css({
												'position': 'absolute',
												'right': '0'
											});
											var newPro = progressW*(1/((yq_rule_length+1)*2));
											var tipsRight = newPro-newTips;
											$('.invite-task .invite-tips span em').css({
													'left': 'auto',
													'right': tipsRight+'px'
												});
											$(".invite-task .invite-progress progress").attr('value', '30');
										}
										$('.invite-task .invite-tips span').show('500');
								}
							}else if(yq_rule_length == 2){
								switch(rule_current) {
									case 0:
										$('.invite-task .invite-tips').html('<span><em></em>还没行动喔，立即邀请得返现~</span>');
										$('.invite-task .invite-tips span').show('500');
										$(".invite-task .invite-progress progress").attr('value', '0');
										break;
									case rule_tiduNum_1:
										$('.invite-task .invite-progress span:first-child,.invite-task ul li:first-child').addClass('active');
										$('.invite-task .invite-tips').html('<span><em></em>恭喜！再邀请<b>'+(rule_tiduNum_2-yq_rule_cont)+'</b>人返现更高</span>');
										var tipsW = $('.invite-task .invite-tips span').width();
										var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
										var newPro = progressW*(1/(yq_rule_length+1));
										var newLeft = newPro-newTips;
										$('.invite-task .invite-tips span').css('margin-left', newLeft+'px');
										$('.invite-task .invite-tips span').show('500');
										$(".invite-task .invite-progress progress").attr('value', '10');
										break;
									case rule_tiduNum_2:
										$('.invite-task .invite-progress span:nth-child(2),.invite-task ul li:nth-child(2)').addClass('active');
										$('.invite-task .invite-tips').html('<span><em></em>你已邀请<b>'+yq_rule_cont+'</b>人，超过90%的代理</span>');
										var tipsW = $('.invite-task .invite-tips span').width();
										var newTips = (tipsW+tipsPadding)*0.08 - $(window).width()*0.014;
										if(progressW<1920){
											var newPro = progressW*(1/(yq_rule_length+1)) - newTips;
											$('.invite-task .invite-tips span').css({
												'position': 'absolute',
												'right': newPro+'px'
											});
											$('.invite-task .invite-tips span em').css({
												'position': 'absolute',
												'left': '92%'
											});
										}else{
											var newPro = progressW*(2/3);
											var newLeft = newPro-newTips;
											$('.invite-task .invite-tips span').css('margin-left', newPro+'px');
										}
										$('.invite-task .invite-tips span').show('500');
										$(".invite-task .invite-progress progress").attr('value', '20');
										break;
									default:
										if(0<rule_current && rule_current<rule_tiduNum_1){
											$('.invite-task .invite-tips').html('<span><em></em>您已邀请<b>'+yq_rule_cont+'</b>人，获得<b>'+yq_rule_amount+'</b>元返现</span>');
											$(".invite-task .invite-progress progress").attr('value', '5');
											var newPro = progressW*(1/((yq_rule_length+1)*2));
											var tipsW = $('.invite-task .invite-tips span').width();
											var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
											var newLeft = newPro-newTips;
											$('.invite-task .invite-tips span').css('margin-left', newLeft+'px');
										}else if(rule_tiduNum_1<rule_current && rule_current<rule_tiduNum_2){
											$('.invite-task .invite-tips').html('<span><em></em>还差<b>'+(parseInt(rule_tiduNum_2)-parseInt(yq_rule_cont))+'</b>人，人均返现增加<b>'+(parseInt(yq_rule[1].reward)-parseInt(yq_rule[0].reward))+'</b>元</span>');
											var tipsW = $('.invite-task .invite-tips span').width();
											var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
											if(progressW<480){
												var newPro = progressW*(1/(yq_rule_length+1));
												var marEm = progressW*(1/((yq_rule_length+1)*2))+(tipsW+tipsPadding)*0.08;
												$('.invite-task .invite-tips span em').css('left', marEm+'px');
											}else{
												var newPro = progressW*((yq_rule_length+1)/((yq_rule_length+1)*2));
											}
											var newLeft = newPro-newTips;
											$(".invite-task .invite-progress progress").attr('value', '15');
											$('.invite-task .invite-tips span').css('margin-left', newLeft+'px');
										}else if(rule_current>rule_tiduNum_2){
											$('.invite-task .invite-tips').html('<span><em></em>无敌最是寂寞，您已超过99%的代理</span>');
											$('.invite-task .invite-tips span').css({
												'position': 'absolute',
												'right': '0'
											});
											var newPro = progressW*(1/((yq_rule_length+1)*2));
											var tipsW = $('.invite-task .invite-tips span').width();
											var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
											var tipsRight = newPro-newTips;
											$('.invite-task .invite-tips span em').css({
													'left': 'auto',
													'right': tipsRight+'px'
												});
											$(".invite-task .invite-progress progress").attr('value', '30');
										}
										$('.invite-task .invite-tips span').show('500');
								}
							}else if(yq_rule_length == 3 || invite-tips_length == 3){
								switch(rule_current) {
									case 0:
										$('.invite-task .invite-tips').html('<span><em></em>还没行动喔，立即邀请得返现~</span>');
										$('.invite-task .invite-tips span').show('500');
										$(".invite-task .invite-progress progress").attr('value', '0');
										break;
									case rule_tiduNum_1:
										$('.invite-task .invite-progress span:first-child,.invite-task ul li:first-child').addClass('active');
										$('.invite-task .invite-tips').html('<span><em></em>恭喜！再邀请<b>'+(rule_tiduNum_2-yq_rule_cont)+'</b>人返现更高</span>');
										var tipsW = $('.invite-task .invite-tips span').width();
										var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
										var newPro = progressW*(1/(yq_rule_length+1));
										var newLeft = newPro-newTips;
										$('.invite-task .invite-tips span').css('margin-left', newLeft+'px');
										$('.invite-task .invite-tips span').show('500');
										$(".invite-task .invite-progress progress").attr('value', '7.5');
										break;
									case rule_tiduNum_2:
										$('.invite-task .invite-progress span:nth-child(2),.invite-task ul li:nth-child(2)').addClass('active');
										$('.invite-task .invite-tips').html('<span><em></em>恭喜！再邀请<b>'+(rule_tiduNum_3-yq_rule_cont)+'</b>人返现更高</span>');
										var tipsW = $('.invite-task .invite-tips span').width();
										var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
										var newPro = (progressW-tipsW)*0.5;
										var marEm = tipsW*(1/2)+(tipsW+tipsPadding)*0.08;
										$('.invite-task .invite-tips span em').css('left', marEm+'px');
										var newLeft = newPro-newTips;
										$(".invite-task .invite-progress progress").attr('value', '15');
										$('.invite-task .invite-tips span').css('margin-left', newLeft+'px');
										$('.invite-task .invite-tips span').show('500');
										break;
									case rule_tiduNum_3:
										$('.invite-task .invite-progress span:nth-child(3),.invite-task ul li:nth-child(3)').addClass('active');
										$('.invite-task .invite-tips').html('<span><em></em>进度条要满了，大神受我一拜</span>');
										var tipsW = $('.invite-task .invite-tips span').width();
										var newTips = (tipsW+tipsPadding)*0.08 - $(window).width()*0.014;
										if(progressW<1920){
											var newPro = progressW*(1/(yq_rule_length+1)) - newTips;
											$('.invite-task .invite-tips span').css({
												'position': 'absolute',
												'right': newPro+'px'
											});
											$('.invite-task .invite-tips span em').css({
												'position': 'absolute',
												'left': '92%'
											});
										}else{
											var newPro = progressW*(2/3);
											var newLeft = newPro-newTips;
											$('.invite-task .invite-tips span').css('margin-left', newPro+'px');
										}
										$('.invite-task .invite-tips span').show('500');
										$(".invite-task .invite-progress progress").attr('value', '22.5');
										break;
									default:
										if(0<rule_current && rule_current<rule_tiduNum_1){
											$('.invite-task .invite-tips').html('<span><em></em>您已邀请<b>'+yq_rule_cont+'</b>人，获得<b>'+yq_rule_amount+'</b>元返现</span>');
											$(".invite-task .invite-progress progress").attr('value', '3.75');
											var newPro = progressW*(1/((yq_rule_length+1)*2));
											var tipsW = $('.invite-task .invite-tips span').width();
											var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
											var newLeft = newPro-newTips;
											$('.invite-task .invite-tips span').css('margin-left', newLeft+'px');
										}else if(rule_tiduNum_1<rule_current && rule_current<rule_tiduNum_2){
											$('.invite-task .invite-tips').html('<span><em></em>还差<b>'+(parseInt(rule_tiduNum_2)-parseInt(yq_rule_cont))+'</b>人，人均返现增加<b>'+(parseInt(yq_rule[1].reward)-parseInt(yq_rule[0].reward))+'</b>元</span>');
											var tipsW = $('.invite-task .invite-tips span').width();
											var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
											if(progressW<900){
												var newPro = progressW*(1/(yq_rule_length+1));
												var marEm = progressW*(1/((yq_rule_length+1)*2))+(tipsW+tipsPadding)*0.08;
												$('.invite-task .invite-tips span em').css('left', marEm+'px');
											}else{
												var newPro = progressW*((yq_rule_length+1)/((yq_rule_length+1)*2));
											}
											var newLeft = newPro-newTips;
											$(".invite-task .invite-progress progress").attr('value', '11.25');
											$('.invite-task .invite-tips span').css('margin-left', newLeft+'px');
										}else if(rule_current>rule_tiduNum_2 && rule_current<rule_tiduNum_3){
											$('.invite-task .invite-tips').html('<span><em></em>你已邀请<b>'+yq_rule_cont+'</b>人，超过90%的代理</span>');
											var tipsW = $('.invite-task .invite-tips span').width();
											var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
											var newPro = progressW*(1/((yq_rule_length+1)*2));
											var tipsRight = (newPro-newTips)*2;
											var spanRight = progressW*(2/((yq_rule_length+1)*2))
											$('.invite-task .invite-tips span').css({
												'position': 'absolute',
												'right': spanRight+'px'
											});
											$('.invite-task .invite-tips span em').css({
													'left': 'auto',
													'right': tipsRight+'px'
												});
											$(".invite-task .invite-progress progress").attr('value', '18.75');
										}else if(rule_current>rule_tiduNum_3){
											$('.invite-task .invite-tips').html('<span><em></em>无敌最是寂寞，您已超过99%的代理</span>');
											var tipsW = $('.invite-task .invite-tips span').width();
											var newTips = (tipsW+tipsPadding)*0.08+$(window).width()*0.014;
											$('.invite-task .invite-tips span').css({
												'position': 'absolute',
												'right': '0'
											});
											var newPro = progressW*(1/((yq_rule_length+1)*2));
											var tipsRight = newPro-newTips;
											$('.invite-task .invite-tips span em').css({
													'left': 'auto',
													'right': tipsRight+'px'
												});
											$(".invite-task .invite-progress progress").attr('value', '30');
										}
										$('.invite-task .invite-tips span').show('500');
								}
							}
						}
						}
						getMoreRecru(1);
						//蜜妍APP内调用分享
						if(common.checkAPP() == 'miyan'){
							var title = '独立生活，开一间属于自己的店';
							var shareDesc = '诚邀您做蜜妍掌柜，进口美妆货源，海量低价，一件代发，一起赚钱吧！';
							var shareUrl = 'http://'+window.location.host+'/page/open.html?come_from=7￥yq_code='+invite.shopInfo.yq_code;
							var shareImg = invite.shopInfo.image;
							var share_content = "<font color='#999999'>推广了邀请好友开店页</font>获得20积分<font color='#999999'>（0.2元）</font>";
							window.location.href = "callApp://shareMsg?shareTitle="+title+"&shareDesc="+shareDesc+"&linkUrl="+shareUrl+"&firstShow=0&isShare=1&shareImg="+shareImg+"&score=20&yq_reward="+invite.shopInfo.reward+"&share_content="+share_content;
			        	}
						$('.root').show();
					},
					fail: function(res){
						//404显示
						var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面~</span></p>';
						$('#invite-shop').hide();
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
						$(window).scroll(function() {
				            var scrollTop = $(this).scrollTop();//获取滚动条高度
				            var scrollHeight = $(document).height();//获取内容高度
				            var windowHeight = $(this).height();//获取窗口高度
				            var scrollBot = scrollHeight - scrollTop - windowHeight;//滚动条距离底部的高度
				            if (scrollBot<5) {
				                if(flag==nextPage){
				                    flag++;
				                    $("#loading").html('正在加载中...');
				                    $(".gengduo-ajax").show();
				                    $(".gengduo-ajax i").css('display', 'inline');
				                    getMoreRecru(nextPage);

				                }
				            }
				            var list_top = $('.invite-list')[0].offsetTop-scrollTop;
				            if(list_top < 1){
				            	$('.invite-list-fiexd').css({
				            		'position': 'fixed',
				            		'top': '0',
				            		'left': '0',
				            		'z-index': '999'
				            	});
				            	$('.invite-list').addClass('padding');
				            }else{
				            	$('.invite-list-fiexd').css({
				            		'position': 'relative',
				            		'top': '0',
				            		'left': '0',
				            		'z-index': '0'
				            	});
				            	$('.invite-list').removeClass('padding');
				            }
				        });
				        //开店特权
				        var ztSwiper = new Swiper('#invite-privilege-info', {
					        pagination: '#invite-privilege-info .swiper-pagination',
					        slidesPerView: 'auto',
					        paginationClickable: true,
					        spaceBetween: 10
					    });
					})
				}
			},
			methods: {
				open: function(){
					if(common.isWeShopPayment() == 0){
						window.location.href = "/page/open.html";
					}else{
						window.location.href = "/page/open.html?come_from=7&yq_code="+invite.shopInfo.yq_code+"&is_yq=1&yq_reward="+invite.shopInfo.reward;
					}
				},
				clickYqm: function(){
					var shareTitle = '蜜妍APP下载，进货，开店，轻松搞定';
					var shareDesc = '蜜妍海淘O2O美妆平台，100%海外正品，优质低价货源，赶紧下载app体验吧~';
					var linkUrl = 'http://www.miyanmz.com/index.php?m=pc￥a=app';
					var shareImg = 'http://'+window.location.host+'/dist/images/shoplogo.png';
					window.location.href = "callApp://inviteShop?shareTitle="+shareTitle+"&shareDesc="+shareDesc+"&linkUrl="+linkUrl+"&shareImg="+shareImg+"&yq_code="+invite.shopInfo.yq_code;
				},
				clickDesc: function(e,title,desc){
					if (e) e.preventDefault();
					layer.open({
						content: '<h3>'+title+'</h3><br/><p>'+desc+'</p>',
						btn:['好的'],
						yes: function(index){
					        layer.close(index);
					    }
					})
				}
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);