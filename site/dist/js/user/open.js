webpackJsonp([32,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(28/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(4),
		__webpack_require__(15),
		__webpack_require__(10),
	]; (function($, Vue, common, layer, swiper, cookie) {
		$(document).on({
	        'ajaxStart': function() {
	            var index = layer.open({type: 2,shadeClose: false});
	            layer.close(index);
	        },
	        'ajaxComplete': function() {
	            var index = layer.open({type: 2,shadeClose: false});
	            layer.close(index);
	        }
	    });

	    var come_from = common.getUrlData('come_from');//邀请渠道，7为普通邀请码邀请，8为公众号邀请
	    var yq_code = common.getUrlData('yq_code');//邀请码
	    cookie.set('yq_code',yq_code,{ expires: 1 });
	    var yq_reward = common.getUrlData('yq_reward');//邀请金额
	    var is_yq = common.getUrlData('is_yq');//代表是从邀请开店页来的
	    var open_click_num = cookie.get('open_click_num');
	    //非APP内的进此页面时清除token
	    if(common.checkAPP() != 'miyan'){
	    	cookie.remove('token');
	    }

		var open = new Vue({
			el: '#open',
			data: {
				info: {},
				is_yq: is_yq,
				is_pay: common.isWeShopPayment(),
				is_app: common.checkAPP()
			},
			ready: function() {
				common.globalAjax({
					urlEdition: 'v3_0',
					action: 'Shop.openShop',
					data: {
						come_from: come_from
					},
					done: function(res) {
						open.$set('info', res.data.info);
						//蜜妍APP内调用分享
						if(common.checkAPP() == 'miyan' && is_yq == 1){
							var title = '独立生活，开一间属于自己的店';
							var shareDesc = '诚邀您做蜜妍掌柜，进口美妆货源，海量低价，一件代发，一起赚钱吧！';
							var shareUrl = 'http://'+window.location.host+'/page/open.html?come_from='+come_from+'￥yq_code='+yq_code;
							var shareImg = 'http://'+window.location.host+'/dist/images/shoplogo.png';
							var share_content = "<font color='#999999'>推广了邀请好友开店页</font>获得20积分<font color='#999999'>（0.2元）</font>";
							window.location.href = "callApp://shareMsg?shareTitle="+title+"&shareDesc="+shareDesc+"&linkUrl="+shareUrl+"&firstShow=0&isShare=1&shareImg="+shareImg+"&score=20&yq_reward="+yq_reward+"&share_content="+share_content;
							// if(res.data.info.need_pay == 1){
							// 	window.location.href = "callApp://shareMsg?shareTitle="+title+"&shareDesc="+shareDesc+"&linkUrl="+shareUrl+"&firstShow=0&isShare=1&shareImg="+shareImg+"&score=20&yq_reward="+yq_reward+"&share_content="+share_content;
							// }else{
							// 	window.location.href = "callApp://shareMsg?shareTitle="+title+"&shareDesc="+shareDesc+"&linkUrl="+shareUrl+"&firstShow=0&isShare=1&shareImg="+shareImg+"&score=20&share_content="+share_content+"&yq_nopay=30%";
							// }
			        	}
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
						var mySwiper;
						document.onreadystatechange = function() {
							if(document.readyState == "complete"){
								$(".swiper-wrapper").show();
							}
						};
						//动画效果函数
						function swiperAnimateCache() {
							for (allBoxes = window.document.documentElement.querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++) allBoxes[i].attributes["style"] ? allBoxes[i].setAttribute("swiper-animate-style-cache", allBoxes[i].attributes["style"].value) : allBoxes[i].setAttribute("swiper-animate-style-cache", " "), allBoxes[i].style.visibility = "hidden"
						}

						function swiperAnimate(a) {
							clearSwiperAnimate();
							var b = a.slides[a.activeIndex].querySelectorAll(".ani");
							for (i = 0; i < b.length; i++) b[i].style.visibility = "visible", effect = b[i].attributes["swiper-animate-effect"] ? b[i].attributes["swiper-animate-effect"].value : "", b[i].className = b[i].className + "  " + effect + " " + "animated", style = b[i].attributes["style"].value, duration = b[i].attributes["swiper-animate-duration"] ? b[i].attributes["swiper-animate-duration"].value : "", duration && (style = style + "animation-duration:" + duration + ";-webkit-animation-duration:" + duration + ";"), delay = b[i].attributes["swiper-animate-delay"] ? b[i].attributes["swiper-animate-delay"].value : "", delay && (style = style + "animation-delay:" + delay + ";-webkit-animation-delay:" + delay + ";"), b[i].setAttribute("style", style)
						}

						function clearSwiperAnimate() {
							for (allBoxes = window.document.documentElement.querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++) allBoxes[i].attributes["swiper-animate-style-cache"] && allBoxes[i].setAttribute("style", allBoxes[i].attributes["swiper-animate-style-cache"].value), allBoxes[i].style.visibility = "hidden", allBoxes[i].className = allBoxes[i].className.replace("animated", " "), allBoxes[i].attributes["swiper-animate-effect"] && (effect = allBoxes[i].attributes["swiper-animate-effect"].value, allBoxes[i].className = allBoxes[i].className.replace(effect, " "))
						}
						//判断是否触发orientationchange事件
						var lock = function() {
									var e = document.getElementById("lock");
									return {
										show: function() {
											window.scroll(0, 0), e.style.display = "block"
										},
										hide: function() {
											window.scroll(0, 0), e.style.display = "none"
										}
									}
								}()
						// var htmlH = document.documentElement.clientHeight;
						// var htmlW = $(".swiper-container").width();
						// if(htmlW>htmlH){
						// 	lock.show();
						// }
						var changeIpone = !("onorientationchange" in window);
						changeIpone || (window.addEventListener("orientationchange", function() {
								window.orientation != 0 ? lock.show() : lock.hide()
							}, !1), window.orientation != 0 && lock.show());
						//加载
						var load = $("#loading"),
							loadTxt = $("#loading_text"),
							imgData = function() {
								var e = ["/dist/images/opens/iphone.png?201407271030", "/dist/images/opens/1.jpg?201407271030", "/dist/images/opens/2.jpg?201407271030", "/dist/images/opens/3.jpg?201407271030", "/dist/images/opens/4.jpg?201407271030", "/dist/images/opens/5.jpg?201407271030", "/dist/images/opens/6.jpg?201407271030", "/dist/images/opens/1_01.png?201407271030", "/dist/images/opens/1_02.png?201407271030", "/dist/images/opens/2_01.png?201407271030", "/dist/images/opens/2_02.png?201407271030", "/dist/images/opens/3_01.png?201407271030", "/dist/images/opens/3_02.png?201407271030", "/dist/images/opens/3_03.png?201407271030", "/dist/images/opens/4_01.png?201407271030", "/dist/images/opens/4_02.png?201407271030", "/dist/images/opens/4_03.png?201407271030", "/dist/images/opens/6_01.jpg?201407271030", "/dist/images/opens/6_02.jpg?201407271030", "/dist/images/opens/6_03.jpg?201407271030", "/dist/images/opens/6_04.jpg?201407271030"],//图片数组集合
									t = e.length,
									n = 0,
									r = function(e) {
										var r = new Image;
										r.onload = function() {
											++n, loadTxt.text(parseInt(n / t * 100) + "%")
										}, r.src = e
									};
								for (var i = 0; i < t; ++i) r(e[i]);
								var s = 60,
									o = function() {
										0 >= s ? n / t > .5 ? u() : alert("加载图片失败，请返回刷新尝试!") : (s -= .5, n == t ? u() : setTimeout(o, 500))
									},
									u = function() {};
								return function(e) {
									typeof e == "function" && (u = e), o()
								}
							}();
						imgData(function() {load.hide();swipers()});//执行图片大小计算
						var swipers = function() {//动画效果

							/* zoom swiper-container */
							fixPageHeight();
							window.onresize = fixPageHeight;
							function fixPageHeight() {
								$("body, .swiper-container").height( window.innerHeight ); //修正整数页面高度
								return "page has been resized!";
							}

							//授权证书
							mySwiper =  new Swiper("#swiper-container-h", {
						        slidesPerView: "auto",
						        centeredSlides: !0,
						        spaceBetween: 15,
						        pagination: '#swiper-pagination-h',
						        loop: true,
						        autoplay: '3000'
						    })

							/* Initialize swiper */
							mySwiper = new Swiper('#swiper-container-v',{
								// options
								pagination: '#swiper-pagination-v',
					        	paginationClickable: true,
					        	keyboardControl: true,
					        	mousewheelControl: true,
					        	direction: 'vertical',
								onInit: function(swiper) {
									swiper.myactive = 0;
								    swiperAnimateCache(swiper);
								    swiperAnimate(swiper);
								    var wdsW = window.innerWidth;
								    var wdsH = window.innerHeight
								    if(wdsW>750){
								    	wdsW = 750;
								    }else{
								    	wdsW = window.innerWidth;
								    }
								},
								onSlideChangeEnd : Swipercallback
							});
						}

						/* 每页背景列表 */
						var bgList = [
						              "/dist/images/opens/1.jpg?201407271030",
						              "/dist/images/opens/2.jpg?201407271030",
						              "/dist/images/opens/3.jpg?201407271030",
						              "/dist/images/opens/4.jpg?201407271030",
						              "/dist/images/opens/5.jpg?201407271030",
						              "/dist/images/opens/6.jpg?201407271030"
						              ];
						for ( var i in bgList) {
							var img = new Image();
							img.src = bgList[i];
						}

						/* SlideChangeEndCallback */
						function Swipercallback(swiper){
						    var act = swiper.activeIndex;
						    setTimeout(function() {
						    	$("#swiper-container-v").css("background-image", 'url("' + bgList[act] + '")');
							}, 1200);
						    swiperAnimate(swiper);
						}

						//处理未付款显示弹框
						if(open.info.yq_code != '' || open.info.yq_code != null){
							var yq_code_s = open.info.yq_code;
						}else{
							var yq_code_s = common.getUrlData('yq_code');
						}
						if(common.isWeShopPayment() == 0 && open_click_num != 3 && is_yq != 1){
					    	if(open_click_num == undefined){
					    		cookie.set('open_click_num',1,{ expires: 1 });
					    	}else if(open_click_num == 1){
					    		cookie.set('open_click_num',2,{ expires: 1 });
					    	}else if(open_click_num == 2){
					    		cookie.set('open_click_num',3,{ expires: 1 });
					    	}
					    	layer.open({
								content: '<p>哇，这么好的功能怎么用不了，<br/>要开通微店才会开放哦！</p>',
								btn:['好的，去开通'],
								yes: function(index){
							        layer.close(index);
							        // window.location.href = '/page/user/open-checkout.html?yq_code='+yq_code_s;
							    }
							})
					    }
					})
				}
			},
			methods: {
				open: function(){
					if(common.getUrlData('is_yq') == 1){
						window.location.href = 'callApp://clickShare';
					}else{
						if(open.info.yq_code != ''){
							var yq_code = open.info.yq_code;
						}else{
							var yq_code = common.getUrlData('yq_code');
						}
						if(common.checkAPP() == 'miyan'){
							window.location.href = '/page/user/open-checkout.html?come_from='+come_from+'&yq_code='+yq_code;
						}else{
							if(cookie.get('token')){
								window.location.href = '/page/user/open-checkout.html?come_from='+come_from+'&yq_code='+yq_code;
							}else{
								window.location.href = "/page/user/login.html?come_from="+come_from+"&yq_code="+yq_code;
							}
						}
					}
				}
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);