webpackJsonp([40,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(1/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(4),
	]; (function($, Vue, common, layer) {
		var reward_info_data = [];
		var new_data,data_new = [];
		var nextPage = 1;
	    var flag = 2;
		function getMoreRecru(flag) {
	    	common.globalAjax({
	    		urlEdition: 'v3_0',
				action: 'Funds.incentiveDetail',
				data: {
					list_type: 1,
					p: flag
				},
				done: function(res) {
					new_data = res.data.info.list;
					var list_length = new_data.length;
					var data_new = reward_info_data.concat(new_data);
					reward_info_data = data_new;
					reward_info.$set('list', data_new);
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
					$('.reward-info-list ul').hide();
					$('.reward-info-list-no').show();
				}
			})
	    }

		var reward_info = new Vue({
			el: '#user-reward-info',
			data: {
				info: {},
				list: []
			},
			ready: function() {
				common.globalAjax({
					urlEdition: 'v3_0',
					action: 'Funds.incentiveDetail',
					done: function(res) {
						//获取数据
						reward_info.$set('info', res.data.info);
						getMoreRecru(1);
						$('.root').show();
	                    if(common.checkAPP() == 'miyan'){
	                        window.location.href = "callApp://articleUrl?url=http://page.miyanmz.com/page/user/weixinText.html?article_id="+res.data.info.explain_id;
	                    }
					},
					fail: function(res){
						//404显示
						var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面~</span></p>';
						$('#user-reward-info').hide();
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
				'list': function(val) {
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
			},
			methods: {
				click: function(){
					event.preventDefault();
					layer.open({
						content: '<h3>待结算奖励金</h3><br/><p>APP进货或微店订单若未确认收货，此时商品对应的奖励金计入「待结算奖励金」；</p><br/><p>当确认收货后，该笔订单的奖励金即可提现（个人中心-我的钱包可见提现金额）。</p>',
						btn:['好的'],
						yes: function(index){
					        layer.close(index);
					    }
					})
				},
				goIndex: function() {
					window.location.href = 'callApp://goIndex'
				}
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);