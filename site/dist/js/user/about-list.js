webpackJsonp([20,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(7/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(11),
		__webpack_require__(10)
	]; (function($, Vue, common, cookie) {

		var about_list = new Vue({
			el: '#about-list',
			data: {
				info: []
			},
			ready: function() {
				common.globalAjax({
					urlEdition: 'v3_0',
					action: 'AboutMy.sectionList',
					data: {
						section_id: common.getUrlData('section_id')
					},
					done: function(res) {
						about_list.$set('info', res.data.info);
						$('#masker').hide();
						$('.root').show();
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
						$('img.lz').lazyload();
					})
				}
			},
			methods: {
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);