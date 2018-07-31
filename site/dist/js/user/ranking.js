webpackJsonp([38,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(7/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(11),
	]; (function($, Vue, common) {
		var list_type = common.getUrlData('list_type');
		var date_type = common.getUrlData('date_type');

		var ranking = new Vue({
			el: '#user-ranking',
			data: {
				agency_ranking: {},
				ranking_list: [],
				type: list_type, //1为积分 2为赚钱
				time: date_type  //1为本周 2为上周
			},
			ready: function() {
				common.globalAjax({
					action: 'Shop.GetRanking',
					data: {
						list_type: common.getUrlData('list_type'),
						date_type: common.getUrlData('date_type'),
						p: 1,
						page_size: 50
					},
					done: function(res) {
						//获取数据
						ranking.$set('agency_ranking', res.data.info.agency_ranking);
						ranking.$set('ranking_list', res.data.info.ranking_list);
						$('.root').show();
					},
					fail: function(res){
						//404显示
						var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面~</span></p>';
						$('#user-ranking').hide();
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
				'agency_ranking': function(val) {
		    		this.$nextTick(function(){
		    			$('img.lazy').lazyload();
		    			if($('#user-ranking').height() < $(window).height()){
		    				$('html,body,#user-ranking').css('height', '100%');
		    			}
		    		});
		    		// var topNav = $('.ranking-cont-nav').height();
		    		// $(window).scroll(function() {
			     //        var scrollTop = $(this).scrollTop();//获取滚动条高度
			     //        if (scrollTop >topNav) {
			     //            $('.ranking-cont-nav-bot').show();
			     //        }else{
			     //        	$('.ranking-cont-nav-bot').hide();
			     //        }
			     //    });
				}
			},
			methods: {
				colse: function(){
					$('.ranking-cont-nav-tips').hide();
				},
				clickA: function(){
					var href = 'http://'+window.location.host+'/page/user/ws-school-info.html?page=zqbd';
					window.location.href = "callApp://goHref?href="+href;
				}
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);