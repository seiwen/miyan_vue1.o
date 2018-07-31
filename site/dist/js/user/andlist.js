webpackJsonp([23,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(7/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(4),
		__webpack_require__(11),
	]; (function($, Vue, common, layer) {
		var andlist_data = [];
		var new_data,data_new = [];
		var nextPage = 1;
	    var flag = 2;
	    var is_scroll = true;
	    //请求更多
		function getMoreRecru(flag_one,cut_id,gift_id,opt_id,filter_id,ck_id,fl_id,pp_id) {
	    	common.globalAjax({
				action: 'Cart.TogetherASingle',
				data: {
					full_cut_id: cut_id,
					full_gift_id: gift_id,
					optional_id: opt_id,
					warehouse_id: ck_id,
					filter: filter_id,
					brand_id: pp_id,
					cate_id: fl_id,
					page_size: 10,
					p: flag_one
				},
				done: function(res) {
					new_data = res.data.info.product_list;
					var list_length = new_data.length;
					var data_new = andlist_data.concat(new_data);
					andlist_data = data_new;
					andlist.$set('and_list', data_new);
					andlist.$set('active_info', res.data.info.active_info);
					andlist.$set('padding_top', $('#andlist-header').height());
					$('#masker').hide();
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
						$(".gengduo-ajax i").hide();
	                    $('#loading').html('没有更多内容了...');
	                    nextPage +=2;
					}
				},
				fail: function(res){
					//404显示
					var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面~</span></p>';
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
	    }

	    //针对筛选请求更换数据
	    function getListData(flag_two,cut_id,gift_id,opt_id,filter_id,ck_id,fl_id,pp_id) {
	    	event.preventDefault();
	        $("body,html").animate({scrollTop:$("body").offset().top});
	        nextPage = 2;
	        andlist_data = [];
			new_data,data_new = [];
	    	common.globalAjax({
				action: 'Cart.TogetherASingle',
				data: {
					full_cut_id: cut_id,
					full_gift_id: gift_id,
					optional_id: opt_id,
					warehouse_id: ck_id,
					filter: filter_id,
					brand_id: pp_id,
					cate_id: fl_id,
					page_size: 10,
					p: flag_two
				},
				done: function(res) {
					new_data = res.data.info.product_list;
					var list_length = new_data.length;
					var data_new = andlist_data.concat(new_data);
					andlist_data = data_new;
					andlist.$set('and_list', data_new);
					andlist.$set('active_info', res.data.info.active_info);
				}
			})
			flag = 2;
	    }

	    //单独请求修改活动信息
	    function getListDataNav(flag_tre,cut_id,gift_id,opt_id,filter_id,ck_id,fl_id,pp_id) {
	    	nextPage = 2;
	    	andlist_data = [];
			new_data,data_new = [];
	    	common.globalAjax({
				action: 'Cart.TogetherASingle',
				data: {
					full_cut_id: cut_id,
					full_gift_id: gift_id,
					optional_id: opt_id,
					warehouse_id: ck_id,
					filter: filter_id,
					brand_id: pp_id,
					cate_id: fl_id,
					page_size: 10,
					p: flag_tre
				},
				done: function(res) {
					new_data = res.data.info.product_list;
					var list_length = new_data.length;
					var data_new = andlist_data.concat(new_data);
					andlist_data = data_new;
					andlist.$set('and_list', data_new);
					andlist.$set('active_info', res.data.info.active_info);
				}
			})
	    	flag = 2;
	    }

		var andlist = new Vue({
			el: '#andlist',
			data: {
				active_info: [],
				and_list: [],
				category: [],
				brand: [],
				padding_top: '',
				filter: common.getUrlData('filter'),
				full_cut_id: common.getUrlData('full_cut_id'),
				full_gift_id: common.getUrlData('full_gift_id'),
				optional_id: common.getUrlData('optional_id'),
				warehouse_id: common.getUrlData('warehouse_id'),
				cate_id: common.getUrlData('cate_id'),
				brand_id: common.getUrlData('brand_id'),
				index: ''
			},
			ready: function() {
				// var cut_id = common.getUrlData('full_cut_id');
				// var gift_id = common.getUrlData('full_gift_id');
				// var filter_id = common.getUrlData('filter');
				// var ck_id = common.getUrlData('warehouse_id');
				getMoreRecru(1,common.getUrlData('full_cut_id'),common.getUrlData('full_gift_id'),common.getUrlData('optional_id'),common.getUrlData('filter'),common.getUrlData('warehouse_id'),common.getUrlData('cate_id'),common.getUrlData('brand_id'));
			},
			watch: {
				'active_info': function() {
					this.$nextTick(function(){
						$('img.lz').lazyload();
						//获取顶部固定高度
						$(window).resize(function(event) {
							andlist.padding_top = $('#andlist-header').height();
						});
						andlist.padding_top = $('#andlist-header').height();
						$('.andlist-cont').css('padding-top', andlist.padding_top+'px');
						$('.nav-box-one,.nav-box-four').css('top', andlist.padding_top+'px');
						if(andlist.index != ''){
							$('.nav-box-one li:nth-child('+ andlist.index +')').addClass('on');
						}
					});
				},
				'and_list': function(val) {
					this.$nextTick(function(){
						if(is_scroll = true){
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
					                    getMoreRecru(nextPage,andlist.full_cut_id,andlist.full_gift_id,andlist.optional_id,andlist.filter,andlist.warehouse_id,andlist.cate_id,andlist.brand_id);

					                }
					            }
					        });
				        }
				    })
				}
			},
			methods: {
				navAll: function(e){
					if (e) e.preventDefault();
					var _this = e.currentTarget;
					if($(_this).find('i').hasClass('clickeDown')){
						$(_this).find('i').removeClass('clickeDown');
						$(_this).find('i').addClass('clickeUp');
						$('.nav-box-one,.hideBox,.nav-box-four,.hideBox_ad').hide();
					}else{
						$(_this).find('i').removeClass('clickeUp');
						$(_this).find('i').addClass('clickeDown');
						$('.nav-box-one,.hideBox').show();
						if($('.four i').hasClass('clickeDown')){
							$('.four i').removeClass('clickeDown');
							$('.four i').addClass('clickeUp');
						}
						$('.nav-box-four,.hideBox_ad').hide();
					}
				},
				closeBottom: function(){
					event.preventDefault();
					$('.one i').removeClass('clickeDown');
					$('.one i').addClass('clickeUp');
					$('.nav-box-one,.hideBox,.nav-box-four,.hideBox_ad').hide();
				},
				classAll: function(e){
					if (e) e.preventDefault();
					var _this = e.currentTarget;
					if($(_this).attr('data-on') == undefined){
						common.globalAjax({
							action: 'Cart.GetFitlerBrandsAndCates',
							data: {
								full_cut_id: common.getUrlData('full_cut_id'),
								full_gift_id: common.getUrlData('full_gift_id'),
								optional_id: common.getUrlData('optional_id')
							},
							done: function(res) {
								andlist.$set('category', res.data.info.category);
								andlist.$set('brand', res.data.info.brand);
								$(_this).attr('data-on', '1');
								if($(_this).find('i').hasClass('clickeDown')){
									$(_this).find('i').removeClass('clickeDown');
									$(_this).find('i').addClass('clickeUp');
									$('.nav-box-one,.hideBox,.nav-box-four,.hideBox_ad').hide();
								}else{
									$(_this).find('i').removeClass('clickeUp');
									$(_this).find('i').addClass('clickeDown');
									$('.nav-box-four,.hideBox_ad').show();
									is_scroll = false;
									if($('.one i').hasClass('clickeDown')){
										$('.one i').removeClass('clickeDown');
										$('.one i').addClass('clickeUp');
									}
									$('.nav-box-one,.hideBox').hide();
								}
							},
							fail: function(res){
								layer.open({
									content: res.data.msg,
									skin: 'msg',
									time: 1.5
								})
							}
						})
					}else{
						if($(_this).find('i').hasClass('clickeDown')){
							$(_this).find('i').removeClass('clickeDown');
							$(_this).find('i').addClass('clickeUp');
							$('.nav-box-one,.hideBox,.nav-box-four,.hideBox_ad').hide();
						}else{
							$(_this).find('i').removeClass('clickeUp');
							$(_this).find('i').addClass('clickeDown');
							$('.nav-box-four,.hideBox_ad').show();
							is_scroll = false;
							if($('.one i').hasClass('clickeDown')){
								$('.one i').removeClass('clickeDown');
								$('.one i').addClass('clickeUp');
							}
							$('.nav-box-one,.hideBox').hide();
						}
					}
				},
				closeAd: function(){
					event.preventDefault();
					$('.four i').removeClass('clickeDown');
					$('.four i').addClass('clickeUp');
					$('.nav-box-one,.hideBox,.nav-box-four,.hideBox_ad').hide();
				},
				classList: function(e){
					if (e) e.preventDefault();
					var _this = e.currentTarget;
					$(_this).addClass('on').siblings('li').removeClass('on');
					if($(_this).hasClass('bind-nav')){
						$('.nav-box-four-list-right .class').removeClass('select');
						$('.nav-box-four-list-right .bind').addClass('select');
					}if($(_this).hasClass('class-nav')){
						$('.nav-box-four-list-right .bind').removeClass('select');
						$('.nav-box-four-list-right .class').addClass('select');
					}
				},
				nav_List_one: function(e,$index){
					if (e) e.preventDefault();
					var _this = e.currentTarget;
					andlist.filter = $(_this).attr("data-filter");
					$(_this).addClass('on').siblings('li').removeClass('on');
					$('#andlist-header-nav .one').addClass('select');
					$('#andlist-header-nav .two,#andlist-header-nav .three').removeClass('select');
					$('#andlist-header-nav .three i').removeClass('three-top');
					$('#andlist-header-nav .three i').removeClass('three-bot');
					$('#andlist-header-nav .three').attr('data-filter', 'price');
					if($('.four i').hasClass('clickeDown')){
						$('.four i').removeClass('clickeDown');
						$('.four i').addClass('clickeUp');
					}
					$('.nav-box-four,.hideBox_ad').hide();
					getListData(1,andlist.full_cut_id,andlist.full_gift_id,andlist.optional_id,andlist.filter,andlist.warehouse_id,andlist.cate_id,andlist.brand_id);
					//记录当前筛选活动项
					if($index == undefined){
						andlist.index = 1;
					}else{
						andlist.index = $index + 2;
					}
					setTimeout(function(){
						if($(_this).html() == '活动'){
							var new_html = $(_this).html();
						}else{
							var new_html = ($(_this).html()).substring(0,4)+"...";
						}
						$('#andlist-header-nav em').html(new_html);
						$('#andlist-header-nav .one i').removeClass('clickeDown');
						$('#andlist-header-nav .one i').addClass('clickeUp');
						$('.nav-box-one,.hideBox,.nav-box-four,.hideBox_ad').hide();
					},300);
				},
				navList_one: function(e){
					if (e) e.preventDefault();
					var _this = e.currentTarget;
					andlist.filter = $(_this).attr("data-filter");
					$('#andlist-header-nav .one').addClass('select');
					$('#andlist-header-nav .two,#andlist-header-nav .three').removeClass('select');
					$('#andlist-header-nav .three i').removeClass('three-top');
					$('#andlist-header-nav .three i').removeClass('three-bot');
					$('#andlist-header-nav .three').attr('data-filter', 'price');
					if($('.four i').hasClass('clickeDown')){
						$('.four i').removeClass('clickeDown');
						$('.four i').addClass('clickeUp');
					}
					$('.nav-box-four,.hideBox_ad').hide();
					getListData(1,andlist.full_cut_id,andlist.full_gift_id,andlist.optional_id,andlist.filter,andlist.warehouse_id,andlist.cate_id,andlist.brand_id);
				},
				navList_two: function(e){
					if (e) e.preventDefault();
					var _this = e.currentTarget;
					andlist.filter = $(_this).attr("data-filter");
					$('#andlist-header-nav .two').addClass('select');
					$('#andlist-header-nav .one,#andlist-header-nav .three').removeClass('select');
					$('#andlist-header-nav .three i').removeClass('three-top');
					$('#andlist-header-nav .three i').removeClass('three-bot');
					$('#andlist-header-nav .three').attr('data-filter', 'price');
					$('#andlist-header-nav em').html('活动');
					$('.nav-box-one li').removeClass('on');
					getListData(1,andlist.full_cut_id,andlist.full_gift_id,andlist.optional_id,andlist.filter,andlist.warehouse_id,andlist.cate_id,andlist.brand_id);
					setTimeout(function(){
						$('#andlist-header-nav .one i').removeClass('clickeDown');
						$('#andlist-header-nav .one i').addClass('clickeUp');
						$('.nav-box-one,.hideBox,.nav-box-four,.hideBox_ad').hide();
					},300);
					if($('.four i').hasClass('clickeDown')){
						$('.four i').removeClass('clickeDown');
						$('.four i').addClass('clickeUp');
					}
					$('.nav-box-four,.hideBox_ad').hide();
				},
				navList_three: function(e){
					if (e) e.preventDefault();
					var _this = e.currentTarget;
					$('#andlist-header-nav .three').addClass('select');
					$('#andlist-header-nav .two,#andlist-header-nav .one').removeClass('select');
					$('#andlist-header-nav em').html('活动');
					$('.nav-box-one li').removeClass('on');
					if($('.four i').hasClass('clickeDown')){
						$('.four i').removeClass('clickeDown');
						$('.four i').addClass('clickeUp');
					}
					$('.nav-box-four,.hideBox_ad').hide();
					if($('#andlist-header-nav .three i').hasClass('three-bot')){
						$('#andlist-header-nav .three i').removeClass('three-bot');
						$('#andlist-header-nav .three i').addClass('three-top');
						$(_this).attr('data-filter', '_price');
					}else{
						$('#andlist-header-nav .three i').removeClass('three-top');
						$('#andlist-header-nav .three i').addClass('three-bot');
						$(_this).attr('data-filter', 'price');
					}
					andlist.filter = $(_this).attr("data-filter");
					getListData(1,andlist.full_cut_id,andlist.full_gift_id,andlist.optional_id,andlist.filter,andlist.warehouse_id,andlist.cate_id,andlist.brand_id);
					setTimeout(function(){
						$('#andlist-header-nav .one i').removeClass('clickeDown');
						$('#andlist-header-nav .one i').addClass('clickeUp');
						$('.nav-box-one,.hideBox,.nav-box-four,.hideBox_ad').hide();
					},300);
				},
				brandList: function(e,id){
					if (e) e.preventDefault();
					var _this = e.currentTarget;
					$(_this).addClass('on').siblings('li').removeClass('on');
					andlist.brand_id = id;
				},
				categoryList: function(e,id){
					if (e) e.preventDefault();
					var _this = e.currentTarget;
					$(_this).addClass('on').siblings('li').removeClass('on');
					andlist.cate_id = id;
				},
				searchList: function(){
					getListData(1,andlist.full_cut_id,andlist.full_gift_id,andlist.optional_id,andlist.filter,andlist.warehouse_id,andlist.cate_id,andlist.brand_id);
					setTimeout(function(){
						$('#andlist-header-nav .four').addClass('select');
						$('#andlist-header-nav .four i').removeClass('clickeDown');
						$('#andlist-header-nav .four i').addClass('clickeUp');
						$('.nav-box-one,.hideBox,.nav-box-four,.hideBox_ad').hide();
					},300);
				},
				resetList: function(){
					andlist.cate_id = 0;
					andlist.brand_id = 0;
					getListData(1,andlist.full_cut_id,andlist.full_gift_id,andlist.optional_id,andlist.filter,andlist.warehouse_id,0,0);
					setTimeout(function(){
						$('#andlist-header-nav .four').removeClass('select');
						$('#andlist-header-nav .four i').removeClass('clickeDown');
						$('.class-nav,.nav-box-four-list-right li').removeClass('on');
						$('#andlist-header-nav .bind-nav').addClass('on');

						$('#andlist-header-nav .four i').addClass('clickeUp');
						$('#andlist-header-nav em').html('活动');
						$('.nav-box-one li').removeClass('on');
						$('.nav-box-one li:nth-child(1)').addClass('on');
						$('.nav-box-one,.hideBox,.nav-box-four,.hideBox_ad').hide();
					},300);
				},
				clickCart: function(id,type){
					common.globalAjax({
						action: 'Cart.AddToCart',
						data: {
							pid: id,
							count: 1
						},
						done: function(res) {
							layer.open({
								content: res.data.msg,
								skin: 'msg',
								time: 1.5
							})
							getListDataNav(1,andlist.full_cut_id,andlist.full_gift_id,andlist.optional_id,andlist.filter,andlist.warehouse_id,andlist.cate_id,andlist.brand_id);
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
		})
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);