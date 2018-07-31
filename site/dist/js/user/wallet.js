webpackJsonp([47,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(1/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(4),
	]; (function($, Vue, common, layer) {

		var wallet = new Vue({
			el: '#user-wallet',
			data: {
				info: {}
			},
			ready: function() {
				common.globalAjax({
					urlEdition: 'v3_0',
					action: 'Funds.agencyWallet',
					done: function(res) {
						//获取数据
						wallet.$set('info', res.data.info);
						$('.root').show();
						if(common.checkUA() == 'ios'){
	                        window.location.href = "callApp://truth_complete";
	                    }
					},
					fail: function(res){
						//404显示
						var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面~</span></p>';
						$('#user-wallet').hide();
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
			methods: {
				click: function(){
					event.preventDefault();
					layer.open({
						content: '<h3>可提现金额</h3><br/><p style="font-weight: bolder;color: #999;">可提现金额 = 可提现销售奖励 + 可提现总收入。</p><br/><p>您购买的订单若已确认收货，此时订单对应的销售奖励和收入即可提现；</p><br/><p>若订单未确认收货，即正在进行中的交易，对应的销售奖励和收入被计入「待结算收入」。</p>',
						btn:['好的'],
						yes: function(index){
					        layer.close(index);
					    }
					})
				},
				goIndex: function() {
					window.location.href = 'callApp://drawCash'
				},
				goWalletInfo: function() {
					window.location.href = 'callApp://goWalletInfo?agency_level='+wallet.info.agency_level;
				},
				goList: function() {
					window.location.href = '/page/user/settlement-list.html?tab_type=1'
				}
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);