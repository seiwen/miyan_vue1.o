webpackJsonp([48,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(1/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(4),
	]; (function($, Vue, common, layer) {
		var wallet_info_data = [];
		var new_data,data_new = [];
		var nextPage = 1;
	    var flag = 2;
		function getMoreRecru(flag) {
	    	common.globalAjax({
	    		urlEdition: 'v3_0',
				action: 'Funds.incomeDetail',
				data: {
					list_type: 1,
					p: flag
				},
				done: function(res) {
					new_data = res.data.info.list;
					var list_length = new_data.length;
					var data_new = wallet_info_data.concat(new_data);
					wallet_info_data = data_new;
					wallet_info.$set('list', data_new);
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
					$('.wallet-info-list ul').hide();
					$('.wallet-info-list-no').show();
				}
			})
	    }

		var wallet_info = new Vue({
			el: '#user-wallet-info',
			data: {
				info: {},
				list: []
			},
			ready: function() {
				common.globalAjax({
					urlEdition: 'v3_0',
					action: 'Funds.incomeDetail',
					done: function(res) {
						//获取数据
						wallet_info.$set('info', res.data.info);
						getMoreRecru(1);
						$('.root').show();
	                    if(common.checkAPP() == 'miyan'){
	                        window.location.href = "callApp://articleUrl?url=http://page.miyanmz.com/page/user/weixinText.html?article_id="+res.data.info.explain_id;
	                    }
					},
					fail: function(res){
						//404显示
						var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面~</span></p>';
						$('#user-wallet-info').hide();
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
					if(wallet_info.info.exist_next_agency == 1){
						layer.open({
							content: '<h3>待结算</h3><br/><p style="font-weight: bolder">指我的店铺待结算收入和下级代理的待结算提成款。</p><br/><p>若订单未确认收货，即正在进行中的交易，对应的收入或提成款计入「待结算」；</p><br/><p>若已确认收货，此时订单对应的收入或提成款即可提现。（个人中心-我的钱包可见提现金额）。</p>',
							btn:['好的'],
							yes: function(index){
						        layer.close(index);
						    }
						})
					}else{
						layer.open({
							content: '<h3>待结算</h3><br/><p>若订单未确认收货，即正在进行中的交易，对应的收入计入「待结算」；</p><br/><p>若已确认收货，此时订单对应的收入即可提现。（个人中心-我的钱包可见提现金额）。</p>',
							btn:['好的'],
							yes: function(index){
						        layer.close(index);
						    }
						})
					}
				},
				mingxi: function(){
					event.preventDefault();
					layer.open({
						content: '<h3>收入明细</h3><br/><p>指「待结算」的明细，客户的订单付款后，即可查看该订单对应的收入明细；</p><br/><p>当待结算的订单确认收货后，该笔收入才「可提现」。</p>',
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