webpackJsonp([26,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(18/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(4),
		__webpack_require__(11),
		__webpack_require__(15),
		__webpack_require__(10),
	]; (function($, Vue, common, layer, lazyload, swiper, cookie) {
		var product_id = common.getUrlData('product_id');
		if(common.checkAPP() == 'miyan'){
			var version = common.version();
		}else{
			var version = 130;
		}
		var goods = new Vue({
			el: '#goods',
			data: {
				info: {},
				pic_list: [],//商品banner图片
				number: '',//数量
				jieti_price: [],//阶梯价
				jiti_count: {},//阶梯价阶梯数量
				jiti_end: {},//阶梯价最后一个段位的开始值
				source: {},//素材
				source_img: [],//素材的图片
				brand_info: {},//相关品牌
				recommand_products: [],//相关品牌列表
				related_products: [],//相关推荐列表
				agency_price: '',//商品价格及阶梯价选中时的价格
				profit_price: '',//单件可以赚取的值
				new_img: '',//获取图文的第一张图片
				new_img_length: '',//图文详情中多少张图片
				max_stocks: '',//非保税商品最多购买500件
				version: version,//版本号
				cart_num: {}//购物车数量
			},
			ready: function() {
				common.globalAjax({
					action: 'Products.getOneProductDetail',
					data: {
						product_id: product_id
					},
					done: function(res) {
						goods.$set('info', res.data.info);
						goods.$set('pic_list', res.data.info.pic_list);
						goods.$set('jieti_price', res.data.info.jieti_price);
						if(goods.jieti_price != null){
							goods.$set('jiti_count', res.data.info.jieti_price.length);
						}
						goods.$set('source', res.data.info.source);
						goods.$set('source_img', res.data.info.source.images);
						goods.$set('brand_info', res.data.info.brand_products.brand_info);
						goods.$set('recommand_products', res.data.info.brand_products.recommand_products);
						goods.$set('related_products', res.data.info.related_products);
						goods.$set('cart_num', res.data.info.cart_num);
						if(goods.info.content != ''){
							var tu_img = goods.info.content.match(/<img[^>]+>/g);
							if(tu_img != null){
								goods.$set('new_img', tu_img[0]);
								goods.$set('new_img_length', tu_img.length);
							}else{
								goods.$set('new_img_length', 0);
							}
						}else{
							goods.$set('new_img_length', 0);
						}
						goods.$set('max_stocks', res.data.info.stocks);
						if(parseInt(goods.info.isbsproduct) != 1){
							goods.max_stocks = 500;//非保税商品最多购买500件
						}
						//循环阶梯值
						if(goods.jiti_count > 0){
							var val_jt = 0;
							$.each(goods.info.jieti_price, function(index, val) {
								val_jt = val.counts_start;

							});
							goods.$set('jiti_end', val_jt);
						}

						//默认选中最高的阶梯数量
						if(goods.jiti_count > 0){
							if(goods.jiti_end < goods.info.stocks){
								goods.number = goods.jiti_end;
								goods.profit_price = goods.info.agency_price - goods.info.jieti_price[goods.jiti_count - 1].price;
								goods.agency_price = goods.info.jieti_price[goods.jiti_count - 1].price;
							}else{
								if(goods.info.jieti_price[0].counts_end < goods.info.stocks){
									goods.number = goods.info.jieti_price[0].counts_start;
								}else{
									goods.number = goods.info.jieti_price[0].counts_end;
								}
								goods.profit_price = goods.info.agency_price - goods.info.jieti_price[0].price;
								goods.agency_price = goods.info.jieti_price[0].price;
							}
						}else{
							goods.$set('agency_price', res.data.info.agency_price);
							goods.number = 1;
							goods.profit_price = 0;
						}
						$('#masker').hide();
						$('.root').show();

						//蜜妍APP内调用分享
						if(common.checkAPP() == 'miyan'){
							var shareTitle = res.data.info.title;
							var old_money_app = res.data.info.sales_price;//进货原价
							var new_money_app = res.data.info.agency_price;//进货代理价
						    var makemoney = Math.round((old_money_app - new_money_app) * 100) / 100;//进货赚取价格
						    var share_profit = parseInt(((old_money_app-new_money_app)/old_money_app)*100)+'%';//进货利润
						    var share_score = parseInt(goods.info.score) + parseInt(goods.info.extra_point) + parseInt(goods.info.points);//分享得到的总积分
							var old_money_wd = res.data.info.sales_price_old;//微店销售原价
							var new_money_wd = res.data.info.sales_price;//微店销售执行价
							var share_test = '只卖'+new_money_wd+'元，';
							if(res.data.info.is_pintuan == 1){
								//团购商品
								var money_dow_wd = parseInt(((old_money_wd-new_money_wd)/old_money_wd)*100);
								var wd_title = '直降'+money_dow_wd+'%！仅需'+new_money_wd+'元！'+shareTitle;
							}else{
								//普通商品
								var money_dow_wd = parseFloat(Math.round((new_money_wd/old_money_wd)*100)/10);
								var wd_title = '「'+money_dow_wd+'折抢」仅需'+new_money_wd+'元！'+shareTitle;
							}
					    	var shareDesc = share_test + '喊您来买买买，低价大牌美妆任您选哦！赶紧点击购买！';
					    	var shareUrl = goods.info.share_url;
					    	if(goods.pic_list.length>0){
						    	var shareImg = goods.pic_list[0];
						    }else{
						    	var shareImg = 'http://'+window.location.host+'/dist/images/shoplogo.png';
						    }
						    var shareTitle_length = shareTitle.length;
						    if(shareTitle_length > 10){
						    	var sub_name = shareTitle.substring(0,6)+"..."+shareTitle.substring(shareTitle_length-4,shareTitle_length);
						    }else{
						    	var sub_name = shareTitle;
						    }
						    if(common.version() && common.version() > 199){
						    	var share_content = "<font color='#999999'>推广了商品"+sub_name+"</font>获得20积分";
						    }else{
						    	var share_content = "推广了商品"+sub_name+"获得20积分";
						    }
							window.location.href = "callApp://shareMsg?shareTitle="+shareTitle+"&shareDesc="+shareDesc+"&linkUrl="+shareUrl+"&firstShow=0&isShare=0&shareImg="+shareImg+"&isWechat=1&cardImg="+shareImg+"&cardTitle="+shareTitle+"&cardPrice="+new_money_wd+"&cardName="+goods.info.shop_name+"&cardEwm="+shareUrl+'&score='+goods.info.score+'&share_content='+share_content+'&makemoney='+makemoney+'&share_profit='+share_profit+'&share_score='+share_score+'&share_shoping_score='+goods.info.extra_point+'&cardprice_old='+old_money_wd+'&cardsales_num='+goods.info.salescount+'&cardshop_avatar='+goods.info.shop_avatar+'&cardnew_coupon='+goods.info.new_coupon;
			        	}
					},
					fail: function(res){
						//404显示
						var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面!</span></p>';
						$('#masker').hide();
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
						//商品详情图片轮播
						if(goods.info.pic_list.length < 2){
							var loop_star = false;
						}else{
							var loop_star = true;
						}
						var swiper = new Swiper('#goods-banner', {
					        pagination: '#goods-banner .swiper-pagination',
					        paginationClickable: true,
					        spaceBetween: 30,
					        lazyLoading : true,
					        loop : loop_star,
					        autoplay: false,
					    });
					    $('.swiper-pagination-bottom').show();
						$('img.lazy').lazyload();
						//素材图片居中处理
						var sucai_li = $('.goods-sucai .right li').length + 1;
						for (var i = 1; i < sucai_li; i++) {
							var sucai_img = $('.goods-sucai .right li:nth-child('+i+') img');
							var sucai_img_w = sucai_img.width();
							var sucai_img_h = sucai_img.height();
							if(sucai_img_h != sucai_img_w && sucai_img_h < sucai_img_w){
								sucai_img.css('height', '100%');
							}
							if(sucai_img_h != sucai_img_w && sucai_img_h > sucai_img_w){
								var new_sucai_img_h = (sucai_img_h - sucai_img_w) / 2;
								sucai_img.css('margin-top', -new_sucai_img_h+'px');
							}
						}
						//相关品牌轮播
						var window_w = $(window).width();
						var dpr = $('html').attr('data-dpr');
						if((dpr == 1 && window_w < 350) || (dpr == 2 && window_w < 641)){
							var slides_View = 2;
							if(goods.brand_products != undefined){
								if(goods.recommand_products.length < 3){
									$('#goods-brand .swiper-pagination').hide();
								}
							}
							if(goods.related_products != undefined){
								if(goods.related_products.length < 5){
									$('#goods-tuijian .swiper-pagination').hide();
								}
							}
						}else{
							var slides_View = 3;
							if(goods.brand_products != undefined){
								if(goods.recommand_products.length < 4){
									$('#goods-brand .swiper-pagination').hide();
								}
							}
							if(goods.related_products != undefined){
								if(goods.related_products.length < 7){
									$('#goods-tuijian .swiper-pagination').hide();
								}
							}
						}
						var swiper = new Swiper('#goods-brand', {
					        pagination: '#goods-brand .swiper-pagination',
					        paginationClickable: true,
					        spaceBetween: 20,
					        lazyLoading : true,
					        slidesPerView: slides_View,
	        				slidesPerGroup : slides_View,
					        loop : false,
					        autoplay: false,
					    });
					    //相关推荐
					    var tuijian_list_num = goods.related_products.length;
					    if(tuijian_list_num > 4){
					    	var slides_Column = 2;
					    }else{
					    	var slides_Column = 1;
					    }
					    var swiper = new Swiper('#goods-tuijian', {
					        pagination: '#goods-tuijian .swiper-pagination',
					        paginationClickable: true,
					        spaceBetween: 20,
					        lazyLoading : true,
					        slidesPerView: slides_View,
	        				slidesPerGroup : slides_View,
	        				slidesPerColumn: slides_Column,
					        loop : false,
					        autoplay: false,
					    });
						//购物车显示数量
						var cartNum = goods.info.cart_num;
						if(parseInt(cartNum)<1){
							$('#js_cartNum').hide();
						}
	                    var buyNum = $("#js_cartNum").text();
	                    if(parseInt(buyNum)>99){
	                        $("#js_cartNum").text("99");
	                    }
	                    //判断是否为活动
	                    var isms = goods.info.isms;//获取是否为活动
	                    if (isms == 1) {
	                        var time = (new Date()).getTime();//获取当前时间毫秒
	                        if (time<(msstart_time*1000)) {
	                            $('#js_shopCart').attr('disabled', 'disabled');
	                            $('#js_shopCart').html('活动还未开始!');
	                        }else if (time>(msend_time*1000)) {
	                            $('#js_shopCart').attr('disabled', 'disabled');
	                            $('#js_shopCart').html('活动已经结束!');
	                        }else{
	                            $('#js_shopCart').removeAttr('disabled');
	                            $('#js_shopCart').html('加入购物车');
	                        }
	                    }
					})
				},
				'number': function(val){
					var maxLength = $('.goods-count').attr('max');
					if(val>maxLength){
						if (maxLength<0) {
							var newVal = parseInt(val)+parseInt(maxLength);
							$('.goods-count').val(newVal);
							goods.number = 500;
						}else{
							$('.goods-count').val(val);
						}
						$('.plus').addClass('disabled');
					}else{
						$('.goods-count').val(val);
						$('.plus').removeClass('disabled');
					}
					if (val<1) {
						$('.reduce').addClass('disabled');
					}else{
						$('.reduce').removeClass('disabled');
					}
					$('.detial_buyBox ul li').removeClass('on');
					if(goods.jiti_count > 0 && goods.jiti_count == 3){
						if(val < parseInt(goods.jieti_price[1].counts_start)){
							$('.detial_buyBox ul li:nth-child(1)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[0].price;
							goods.agency_price = goods.jieti_price[0].price;
						}else if(val > parseInt(goods.jieti_price[0].counts_end) && val < parseInt(goods.jieti_price[2].counts_start)){
							$('.detial_buyBox ul li:nth-child(2)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[1].price;
							goods.agency_price = goods.jieti_price[1].price;
						}else if(val > parseInt(goods.jieti_price[1].counts_end)){
							$('.detial_buyBox ul li:nth-child(3)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[2].price;
							goods.agency_price = goods.jieti_price[2].price;
						}
					}else if(goods.jiti_count > 0 && goods.jiti_count == 2){
						if(val < parseInt(goods.jieti_price[1].counts_start)){
							$('.detial_buyBox ul li:nth-child(1)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[0].price;
							goods.agency_price = goods.jieti_price[0].price;
						}else if(val > parseInt(goods.jieti_price[0].counts_end)){
							$('.detial_buyBox ul li:nth-child(2)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[1].price;
							goods.agency_price = goods.jieti_price[1].price;
						}
					}
				}
			},
			methods: {
				reduce: function(num,max_num){
					goods.number = parseInt(num) - 1;
					if (parseInt(num) < 1) {
						goods.number = 0;
						$('.reduce').addClass('disabled');
					}
					if (parseInt(num) < parseInt(max_num)) {
						$('.plus').removeClass('disabled');
					}
					$('.detial_buyBox ul li').removeClass('on');
					if(goods.jiti_count > 0 && goods.jiti_count == 3){
						if ((parseInt(num)-1) < parseInt(goods.jieti_price[2].counts_start) && (parseInt(num)-1) > parseInt(goods.jieti_price[0].counts_end)){
							$('.detial_buyBox ul li:nth-child(2)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[1].price;
						}else if((parseInt(num)-1) < parseInt(goods.jieti_price[1].counts_start)){
							$('.detial_buyBox ul li:nth-child(1)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[0].price;
						}else if((parseInt(num) + 1) > parseInt(goods.jieti_price[1].counts_end)){
							$('.detial_buyBox ul li:nth-child(3)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[2].price;
						}
					}else if(goods.jiti_count > 0 && goods.jiti_count == 2){
						if((parseInt(num)-1) < parseInt(goods.jieti_price[1].counts_start)){
							$('.detial_buyBox ul li:nth-child(1)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[0].price;
						}else if((parseInt(num) - 1) > parseInt(goods.jieti_price[0].counts_end)){
							$('.detial_buyBox ul li:nth-child(2)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[1].price;
						}
					}
				},
				plus: function(num,max_num,isbs){
					if (parseInt(num) > parseInt(max_num) - 1) {
						goods.number = parseInt(max_num);
						$('.plus').addClass('disabled');
					}else{
						if(isbs == 1 && num > 4){
							goods.number = parseInt(num)
							layer.open({
			                    content: '保税商品最多购买5件喔~',
			                    skin: 'msg',
								time: 1.5
			                });
						}else{
							goods.number = parseInt(num) + 1;
							$('.reduce').removeClass('disabled');
						}
					}
					$('.detial_buyBox ul li').removeClass('on');
					if(goods.jiti_count > 0 && goods.jiti_count == 3){
						if ((parseInt(num)+1) < parseInt(goods.jieti_price[1].counts_start)){
							$('.detial_buyBox ul li:nth-child(1)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[0].price;
						}else if((parseInt(num)+1) > parseInt(goods.jieti_price[0].counts_end) && parseInt(num+1) < parseInt(goods.jieti_price[2].counts_start)){
							$('.detial_buyBox ul li:nth-child(2)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[1].price;
						}else if((parseInt(num) + 1) > parseInt(goods.jieti_price[1].counts_end)){
							$('.detial_buyBox ul li:nth-child(3)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[2].price;
						}
					}else if(goods.jiti_count > 0 && goods.jiti_count == 2){
						if((parseInt(num)+1) < parseInt(goods.jieti_price[1].counts_start)){
							$('.detial_buyBox ul li:nth-child(1)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[0].price;
						}else if((parseInt(num) + 1) > parseInt(goods.jieti_price[0].counts_end)){
							$('.detial_buyBox ul li:nth-child(2)').addClass('on');
							goods.profit_price = goods.info.agency_price - goods.jieti_price[1].price;
						}
					}
				},
				showBottom: function(stocks){
					if(common.isWeShopPayment() != 0){
						$('.detial_buyBox .dian em').addClass('ani');
						setTimeout(function() {
							$('.detial_buyBox .dian em').removeClass('ani')
						}, 1000);
						if(stocks > 0){
							$('.detial_buyBox,.hideBox').show();
							setTimeout(function() {
								$('.detial_buyBox').removeClass('bounceInUp');
							}, 1000);
						}else{
							layer.open({
			                    content: '库存不足，请选择其他商品',
			                    skin: 'msg',
		    					time: 1.5
			                });
						}
					}else{
						window.location.href = '/page/open.html';
					}
				},
				goodsShare: function(){
					//调起分享弹框
					window.location.href = "callApp://clickShare";
				},
				closeBottom: function(){
					event.preventDefault();
					$('.detial_buyBox').addClass('bounceOutDown');
					$('.hideBox').hide();
					setTimeout(function() {
						$('.detial_buyBox').hide();
						$('.detial_buyBox').removeClass('bounceOutDown');
						$('.detial_buyBox').addClass('bounceInUp');
					}, 100);
				},
				closeBuy: function(){
					event.preventDefault();
					$('.detial_buyBox').addClass('bounceOutDown');
					$('.hideBox').hide();
					setTimeout(function() {
						$('.detial_buyBox').hide();
						$('.detial_buyBox').removeClass('bounceOutDown');
						$('.detial_buyBox').addClass('bounceInUp');
					}, 100);
				},
				closeAd: function(){
					event.preventDefault();
					$('.goods-active-box').addClass('bounceOutDown');
					$('.hideBox_ad').hide();
					setTimeout(function() {
						$('.goods-active-box').hide();
						$('.goods-active-box').removeClass('bounceOutDown');
						$('.goods-active-box').addClass('bounceInUp');
					}, 100);
				},
				showActive: function(){
					$('.goods-active-box,.hideBox_ad').show();
					setTimeout(function() {
						$('.goods-active-box').removeClass('bounceInUp');
					}, 1000);
				},
				closeActive: function(){
					$('.goods-active-box').addClass('bounceOutDown');
					$('.hideBox_ad').hide();
					setTimeout(function() {
						$('.goods-active-box').hide();
						$('.goods-active-box').removeClass('bounceOutDown');
						$('.goods-active-box').addClass('bounceInUp');
					}, 100);
				},
				goBrand: function(name){
					//跳转原生品牌列表页
					window.location.href = "callApp://brand?title="+name;
				},
				clickeTab: function(e,counts_end,counts_start,price){
					if (e) e.preventDefault();
					var _this = e.currentTarget;//获取点击事件当前li标签
					$(_this).parent('ul').find('li').removeClass('on');
					$(_this).addClass('on');
					goods.profit_price = goods.info.agency_price - price;
					// if(counts_start == goods.jiti_end){
					// 	goods.number = counts_start;
					// }else{
					// 	goods.number = counts_end;
					// }
					goods.number = counts_start;
				},

				goCart: function(){
					var shopIngNum = $('.goods-count').val();
					if(!parseInt(shopIngNum) && typeof(shopIngNum) !="undefined" && parseInt(shopIngNum)!=0){
						layer.open({
		                    content: '购买数量不能为空!',
		                    skin: 'msg',
	    					time: 1.5
		                });
					}else{
						if(isNaN(shopIngNum)){
		                    layer.open({
		                        content: '数量不合法，请输入数字!',
		                        bskin: 'msg',
	    						time: 1.5
		                    });
		                }else if(parseInt(shopIngNum)==0){
		                	layer.open({
			                    content: '购买数量不能为空!',
			                    skin: 'msg',
	    						time: 1.5
			                });
		                }else{
							common.globalAjax({
								action: 'Cart.DirectBuy',
								data: {
									product_id: product_id,
									count: shopIngNum
								},
								done: function(res) {
									var cart_id = res.data.info.cart_id;
									common.backWithParama('/page/cart/checkout.html?cartid='+cart_id);
								},
								fail: function(res){
									layer.open({
										content: res.data.msg,
										skin: 'msg',
	    								time: 1.5
									})
								}
							})
						}
					}
				},
				clickCart: function(){
					var shopIngNum = $('.goods-count').val();
					if(!parseInt(shopIngNum) && typeof(shopIngNum)!="undefined" && parseInt(shopIngNum)!=0){
						layer.open({
		                    content: '购买数量不能为空!',
		                    skin: 'msg',
	    					time: 1.5
		                });
					}else{
						if(isNaN(shopIngNum)){
		                    layer.open({
		                        content: '数量不合法，请输入数字!',
		                        bskin: 'msg',
	    						time: 1.5
		                    });
		                }else if(parseInt(shopIngNum)==0){
		                	layer.open({
			                    content: '购买数量不能为空!',
			                    skin: 'msg',
	    						time: 1.5
			                });
		                }else{
							common.globalAjax({
								action: 'Cart.AddToCart',
								data: {
									pid: product_id,
									count: shopIngNum
								},
								done: function(res) {
									$('.detial_buyBox').addClass('bounceOutDown');
									$('.hideBox').hide();
									setTimeout(function() {
										$('.detial_buyBox').hide();
										$('.detial_buyBox').removeClass('bounceOutDown');
										$('.detial_buyBox').addClass('bounceInUp');
									}, 100);
									$('.goods-count').val('1');
									layer.open({
										content: res.data.msg,
										skin: 'msg',
	    								time: 1.5
									})
									//更新购物车数量
	        						common.globalAjax({
										urlEdition: 'v3_0',
										action: 'Cart.getCartCountNum',
										done: function(re) {
											goods.$set('cart_num', re.data.info.num);
										}
									});
	                                $('#js_cartNum').show();
								},
								fail: function(res){
									layer.open({
										content: res.data.msg,
										skin: 'msg',
	    								time: 1.5
									})
								}
							})
						}
					}
				},
				goSucai: function(){
					//调起原生素材页
					window.location.href = "callApp://source?product_id="+product_id;
				},
				clickImg: function(val){
					$('.detial .more').hide();
					$('.detial .detial_Text').html(val);
					$('.detial .detial_bot_img').addClass('lazy');
					$('.detial .detial_bot_img').show();
					$('img.lazy').lazyload();
					var top = $(".detial_Text").offset().top;
	        		$("body,html").animate({scrollTop:top});
				}
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);