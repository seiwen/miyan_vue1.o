require([
	'jquery',
	'Vue',
	'vendor/common.js',
	'lib/jquery.lazyload.js',
], function($, Vue, common, lazyload) {
    var type = common.getUrlData('type');
	if (type == 0) {
		$(document).attr('title', '全部订单');
	}else if (type == 1) {
		$(document).attr('title', '待付款');
	}else if (type == 2) {
		$(document).attr('title', '已付款');
	}else if (type == 3) {
		$(document).attr('title', '待收货');
	}else if (type == 4) {
		$(document).attr('title', '交易完成');
	}else if (type == 5) {
		$(document).attr('title', '已取消');
	}
	var list_data = [];
	var new_data,data_new = [];
	var nextPage = 1;
    var flag = 2;
	function getMoreRecru(flag) {
    	common.globalAjax({
			action: 'Order.GetWeiDianOrderList',
			data: {
				type: type,
				p: flag
			},
			done: function(res) {
				new_data = res.data.info;
				var list_length = new_data.length;
				var data_new = list_data.concat(new_data);
				list_data = data_new;
				//获取数据显示
				$('#masker').hide();
				$('.root').show();
				if(common.checkAPP == 'miyan'){
	                window.location.href = "callApp://truth_complete";
	            }
                //加载更多
                $('.gengduo-ajax').show();
				order_list.$set('info', data_new);
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
				if(res.ret == 200){
					if(res.data.code == 1){
						var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/order_01.jpg" alt="404"><span>您的订单为空~</span></p>';
					}
				}else{
					var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面!</span></p>';
				}
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


	var order_list = new Vue({
		el: '#order-list',
		data: {
			info: []
		},
		ready: function() {
			getMoreRecru(1);
		},
		watch: {
			'info': function(val){
				this.$nextTick(function(){
					$('img.lz').lazyload();
				})
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
		        });
			}
		}
	})

})