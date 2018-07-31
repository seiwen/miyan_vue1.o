require([
	'jquery',
	'Vue',
	'vendor/common.js',
	'plugins/layer/layer.js',
	'lib/jquery.lazyload.js',
	'plugins/swiper/swiper-3.3.1.jquery.min.js'
], function($, Vue, common, layer, lazyload, swiper) {
	var cart_url =  window.location.host + '/page/cart/'
	var activity_data = [];
	var new_data,data_new = [];
	var nextPage = 1;
    var flag = 2;
	var activity_id = common.getUrlData('activity_id');
	var data_dpr = $('html').attr('data-dpr');
	//倒计时函数
    common.updateEndTime = function(){
        var date = new Date();
        var time = date.getTime();  //当前时间距1970年1月1日之间的毫秒数

        $(".settime").each(function(i){

            var endDate = this.getAttribute("endtime"); //结束时间字符串
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
                $(this).html(day +'天'+ hour +':'+ minite +':'+ second);
            }
            else{
                $(".activity-header p").text('活动已结束！');
                $("#user-activity a").attr('href', 'javascript:;');
            }

        });
        setTimeout(function() {
             common.updateEndTime();
        }, 1000)
    }

    function pxToRem(_s){
	    //匹配:20px或: 20px不区分大小写
	    var reg = /(\:|: )+(([1-9]\d*\.?\d*)|(0\.\d*[1-9]))+(px)/gi;
	    return _s.replace(reg, function(_x){
	        _x = _x.replace(/(\:|: )/,'').replace(/px/i,'');
	        return ':' + parseFloat(_x) * data_dpr + 'px';
	    });
	}

    //滚动条事件
    function scroll_nav(){
    	if(activity.code != 1 && activity.cates_all.length > 3){
    		var window_h = $(window).height();
			var header_h = $('#user-activity .activity-header').height() + $('#user-activity .activity-textarea').height();
			var nav_h = $('#user-activity .activity-nav').height();
			var tar_tops = header_h - $(window).scrollTop();
			if(tar_tops < 0){
				$('#user-activity .activity-nav').css({
					position: 'fixed',
					top: '0',
					left: '0'
				});
				$('.active-nav-list,.active-nav-lei').css({
					position: 'fixed',
					top: nav_h +'px'
				});
			}else{
				$('.activity-nav,.active-nav-list,.active-nav-lei').css({
					position: 'relative',
					top: 0
				});
			}
			$(window).scroll(function(event) {
				var tar_top = header_h - $(window).scrollTop();
				if(tar_top < 0){
					$('#user-activity .activity-nav').css({
						position: 'fixed',
						top: '0',
						left: '0'
					});
					$('.active-nav-list,.active-nav-lei').css({
						position: 'fixed',
						top: nav_h +'px'
					});
				}else{
					$('.activity-nav,.active-nav-list,.active-nav-lei').css({
						position: 'relative',
						top: 0
					});
					if(tar_top > (window_h - nav_h)){
						$('.active-nav-list,.active-nav-lei,.hideBox_ad').hide();
						$('.activity-nav-left i,.activity-nav-right i').removeClass('clickeDown');
						$('.activity-nav-left i,.activity-nav-right i').addClass('clickeUp');
					}
				}
			});
		}
	}

	//商品列表分页
	function getMoreRecru(flag,activity_id,active_id_type,cate_id,brand_id) {
    	common.globalAjax({
			urlEdition: 'v3_0',
			action: 'Seminar.getActivityProducts',
			data: {
				activity_id: activity_id,
				active_id_type: active_id_type,
				cate_id: cate_id,
				brand_id: brand_id,
				page_size: 10,
				p: flag
			},
			done: function(res) {
				new_data = res.data.info.list;
				if( new_data != undefined){
				var list_length = new_data.length;
				var data_new = activity_data.concat(new_data);
				activity_data = data_new;
				activity.$set('and_list', data_new);
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

    //筛选
    function getListData(flag_one,activity_id,active_id_type,cate_id,brand_id){
    	event.preventDefault();
        nextPage = 2;
        activity_data = [];
		new_data,data_new = [];
    	common.globalAjax({
    		urlEdition: 'v3_0',
			action: 'Seminar.getActivityProducts',
			data: {
				activity_id: activity_id,
				active_id_type: active_id_type,
				cate_id: cate_id,
				brand_id: brand_id,
				page_size: 10,
				p: flag_one
			},
			done: function(res) {
				new_data = res.data.info.list;
				var list_length = new_data.length;
				var data_new = activity_data.concat(new_data);
				activity_data = data_new;
				activity.$set('and_list', data_new);
			}
		})
		flag = 2;
    }


	var activity = new Vue({
		el: '#user-activity',
		data: {
			nav: {},
			cates_brands: {},
			cates_all: {},
			tags: [],
			active_info: [],
			and_list: [],
			activity_id: '',
			active_id_type: '',
			cate_id: '',
			brand_id: '',
			index: '',
			promote_images: {}
		},
		ready: function() {
			common.globalAjax({
				urlEdition: 'v3_0',
				action: 'Seminar.getActivityTopic',
				data: {
					activity_id: activity_id
				},
				done: function(res) {
					//获取数据
					activity.$set('nav', res.data.info);
					window.location.href = "callApp://showCart?url="+cart_url;
					if(activity.nav.code != 1){
						activity.$set('cates_brands', res.data.info.cates_brands);
						activity.$set('cates_all', res.data.info.cates_brands.cates);
						activity.$set('tags', res.data.info.tags);
						activity.$set('activity_id', activity_id);
						if(data_dpr == 2 || data_dpr == 3){
							activity.$set('promote_images', pxToRem(res.data.info.promote_images));
						}else{
							activity.$set('promote_images', res.data.info.promote_images);
						}
						getMoreRecru(1,activity.activity_id);
					}
					$('#masker').hide();
					$('.root').show();
					setTimeout(function(){
						scroll_nav()
					},500);
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
		},
		watch: {
			'nav': function(){
				this.$nextTick(function(){
					common.updateEndTime();//活动倒计时
					//筛选tab
					var mySwiper = new Swiper('#activity-nav',{
		              freeMode : true,
		              slidesPerView : 'auto',
		              initialSlide :0,
		            });
					$('img.lz').lazyload();
				})
			},
			'and_list': function(){
				this.$nextTick(function(){
					$('img.lz').lazyload();
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
			                    getMoreRecru(nextPage,activity.activity_id,activity.active_id_type,activity.cate_id,activity.brand_id);

			                }
			            }
			        });
				})
			}
		},
		methods: {
			clickCart: function(id){
				if(common.isWeShopPayment() != 0){
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
							window.location.href = "callApp://showCart?url="+cart_url;
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
					window.location.href = '/page/open.html';
				}
			},
			navAll: function(e){
				if (e) e.preventDefault();
				var _this = e.currentTarget;
				scroll_nav();
				if($(_this).find('i').hasClass('clickeDown')){
					$(_this).find('i').removeClass('clickeDown');
					$(_this).find('i').addClass('clickeUp');
					$('.active-nav-list,.hideBox,.active-nav-lei,.hideBox_ad').hide();
				}else{
					$(_this).find('i').removeClass('clickeUp');
					$(_this).find('i').addClass('clickeDown');
					$('.active-nav-list,.hideBox').show();
					if($('.activity-nav-right i').hasClass('clickeDown')){
						$('.activity-nav-right i').removeClass('clickeDown');
						$('.activity-nav-right i').addClass('clickeUp');
					}
					$('.active-nav-lei,.hideBox_ad').hide();
				}
			},
			classAll: function(e){
				if (e) e.preventDefault();
				var _this = e.currentTarget;
				scroll_nav();
				if($(_this).find('i').hasClass('clickeDown')){
					$(_this).find('i').removeClass('clickeDown');
					$(_this).find('i').addClass('clickeUp');
					$('.active-nav-list,.hideBox,.active-nav-lei,.hideBox_ad').hide();
				}else{
					$(_this).find('i').removeClass('clickeUp');
					$(_this).find('i').addClass('clickeDown');
					$('.active-nav-lei,.hideBox_ad').show();
					if($('.activity-nav-left i').hasClass('clickeDown')){
						$('.activity-nav-left i').removeClass('clickeDown');
						$('.activity-nav-left i').addClass('clickeUp');
					}
					$('.active-nav-list,.hideBox').hide();
				}
			},
			tagsList: function(e,id,type) {
				if (e) e.preventDefault();
				var _this = e.currentTarget;
				scroll_nav();
				if(id == undefined){
					activity.active_id_type = '';
				}else{
					activity.active_id_type = id+'_'+type;
				}
				activity.cate_id = '';
				$('#activity-nav .swiper-slide').removeClass('active');
				$('.active-nav-lei li').removeClass('on');
				$(_this).addClass('on').siblings('li').removeClass('on');
				$('.activity-nav-left').addClass('on');
				if($('.activity-nav-right i').hasClass('clickeDown')){
					$('.activity-nav-right i').removeClass('clickeDown');
					$('.activity-nav-right i').addClass('clickeUp');
				}
				getListData(1,activity.activity_id,activity.active_id_type,activity.cate_id,activity.brand_id);
				setTimeout(function(){
					if($(_this).html() == '全部'){
						var new_html = $(_this).html();
					}else{
						var new_html = ($(_this).html()).substring(0,2);
					}
					$('.activity-nav-left em').html(new_html);
					$('.activity-nav-left i').removeClass('clickeDown');
					$('.activity-nav-left i').addClass('clickeUp');
					$('.active-nav-list,.hideBox').hide();
				},300);
			},
			brandList: function(e,$index,id){
				var _this = e.currentTarget;
				scroll_nav();
				if(id == undefined){
					activity.cate_id = '';
				}else{
					activity.cate_id = id;
				}
				activity.active_id_type = '';
				$('.active-nav-list li,.activity-nav-left').removeClass('on');
				$('.activity-nav-left em').html('全部');
				if($('.activity-nav-left i').hasClass('clickeDown')){
					$('.activity-nav-left i').removeClass('clickeDown');
					$('.activity-nav-left i').addClass('clickeUp');
					$('.active-nav-list,.hideBox').hide();
				}
				$(_this).parents('.swiper-slide').addClass('active').siblings('a').removeClass('active');
				getListData(1,activity.activity_id,activity.active_id_type,activity.cate_id,activity.brand_id);
				//记录当前筛选活动项
				if($index == undefined){
					activity.index = 1;
				}else{
					activity.index = $index + 1;
				}
				if(activity.index != ''){
					$('.active-nav-lei li:nth-child('+ activity.index +')').addClass('on').siblings('li').removeClass('on');
				}
				setTimeout(function(){
					if($('.activity-nav-right i').hasClass('clickeDown')){
						$('.activity-nav-right i').removeClass('clickeDown');
						$('.activity-nav-right i').addClass('clickeUp');
					}
					$('.active-nav-lei,.hideBox_ad').hide();
				},300);
			},
			cateList: function(e,$index,id){
				var _this = e.currentTarget;
				scroll_nav();
				if(id == undefined){
					activity.cate_id = '';
				}else{
					activity.cate_id = id;
				}
				activity.active_id_type = '';
				$('.active-nav-list li,.activity-nav-left').removeClass('on');
				$('.activity-nav-left em').html('全部');
				$(_this).addClass('on').siblings('li').removeClass('on');
				getListData(1,activity.activity_id,activity.active_id_type,activity.cate_id,activity.brand_id);
				//记录当前筛选活动项
				if($index == undefined){
					activity.index = 1;
				}else{
					activity.index = $index + 1;
				}
				if(activity.index != ''){
					$('#activity-nav .swiper-slide:nth-child('+ activity.index +')').addClass('active').siblings('a').removeClass('active');
				}
				setTimeout(function(){
					if($('.activity-nav-right i').hasClass('clickeDown')){
						$('.activity-nav-right i').removeClass('clickeDown');
						$('.activity-nav-right i').addClass('clickeUp');
					}
					$('.active-nav-lei,.hideBox_ad').hide();
				},300);
			},
			closeBottom: function(){
				event.preventDefault();
				$('.activity-nav-left i').removeClass('clickeDown');
				$('.activity-nav-left i').addClass('clickeUp');
				$('.active-nav-list,.hideBox,.active-nav-lei,.hideBox_ad').hide();
			},
			closeAd: function(){
				event.preventDefault();
				$('.activity-nav-right i').removeClass('clickeDown');
				$('.activity-nav-right i').addClass('clickeUp');
				$('.active-nav-list,.hideBox,.active-nav-lei,.hideBox_ad').hide();
			}
		}
	})
})