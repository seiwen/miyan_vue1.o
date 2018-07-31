require([
	'jquery',
	'Vue',
	'vendor/common.js'
], function($, Vue, common) {
	var list_data = [];
	var new_data,data_new = [];
	var nextPage = 1;
    var flag = 2;
	function getMoreRecru(flag) {
		var brand_id = common.getUrlData('brand_id');
    	common.globalAjax({
			action: 'Share.GetScoreDetailData',
			data: {
				page_size: 20,
				p: flag
			},
			done: function(res) {
				list.$set('info', res.data.info);
				$('.root').show();
                //获取列表
				new_data = res.data.info;
				var list_length = new_data.length;
				var data_new = list_data.concat(new_data);
				list_data = data_new;
				list.$set('info', data_new);
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
				$('#jifen-info').hide();
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
	var list = new Vue({
		el: '#jifen-info',
		data: {
			info: []
		},
		ready: function() {
			getMoreRecru(1);
			if(common.checkAPP == 'miyan'){
                        window.location.href = "callApp://truth_complete";
                    }
		},
		watch: {
			'info': function(val) {
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
			        });
				});
			}
		}
	})

})