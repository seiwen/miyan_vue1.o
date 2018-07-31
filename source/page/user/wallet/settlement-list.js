require([
	'jquery',
	'Vue',
	'vendor/common.js',
	'plugins/layer/layer.js',
], function($, Vue, common, layer) {
	var settlement_list_data = [];
	var new_data,data_new = [];
	var nextPage = 1;
    var flag = 2;
	function getMoreRecru(flag,type) {
    	common.globalAjax({
    		urlEdition: 'v3_0',
			action: 'Funds.pendingIncomeDetail',
			data: {
				tab_type: type,
				p: flag
			},
			done: function(res) {
				new_data = res.data.info.list;
				var list_length = new_data.length;
				var data_new = settlement_list_data.concat(new_data);
				settlement_list_data = data_new;
				settlement_list.$set('list', data_new);
				$('.root').show();
				if (list_length>0) {
					nextPage += 1;
					if(list_length<10){
						$(".gengduo-ajax i").hide();
                        $('#loading').html('到底了...');
                        nextPage +=1;
                    }else{
                        $("#loading").text('上拉加载更多...');
                    };
				}else{
					$(".gengduo-ajax i").hide();
                    $('#loading').html('到底了...');
                    nextPage +=2;
				}
			},
			fail: function(res){
				//404显示
				$('.settlement-list ul').hide();
				$('.settlement-list-no').show();
			}
		})
    }

	var settlement_list = new Vue({
		el: '#user-settlement-list',
		data: {
			list: [],
			tab_type: 1,
		},
		ready: function() {
			getMoreRecru(1,1);
		},
		watch: {
			'list': function() {
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
		                    getMoreRecru(nextPage,settlement_list.tab_type);

		                }
		            }
		        });

			}
		},
		methods: {
			clickList: function(type) {
				$('.settlement-list ul').hide();
				event.preventDefault();
        		$("body,html").animate({scrollTop:$("body").offset().top});
				common.globalAjax({
		    		urlEdition: 'v3_0',
					action: 'Funds.pendingIncomeDetail',
					data: {
						tab_type: type,
						p: 1
					},
					done: function(re) {
						settlement_list.list = re.data.info.list;
						settlement_list_data = re.data.info.list;
						$('.settlement-list ul').show();
					}
				})
				$('.settlement-list-nav li').removeClass('on');
				$('.gengduo-ajax').hide();
				nextPage = 2;
	    		flag = 2;
				settlement_list.tab_type = type;
				if(type == 1){
			    	$('.settlement-list-nav li:nth-child(1)').addClass('on');
			    }else if(type == 2){
			    	$('.settlement-list-nav li:nth-child(2)').addClass('on');
			    }else if(type == 3){
			    	$('.settlement-list-nav li:nth-child(3)').addClass('on');
			    }
			},
			goIndex: function() {
				window.location.href = 'callApp://goIndex'
			}
		}
	})

})