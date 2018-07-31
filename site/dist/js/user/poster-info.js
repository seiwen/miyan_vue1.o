webpackJsonp([37,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(1/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3)
	]; (function($, Vue, common) {
		var poster_info = new Vue({
			el: '#poster-info',
			data: {
				info: {}
			},
			ready: function() {
				common.globalAjax({
					action: 'products.createProductPoster',
					data: {
						pid: common.getUrlData('pid')
					},
					done: function(res) {
						poster_info.$set('info', res.data.info);
						$(document).attr("title",res.data.info.title);//设置文章title
						$('.root').show();
						if(common.checkUA() == 'ios'){
							window.location.href = "callApp://truth_complete";
						}
						var $body = $('body');
	                    // hack在微信等webview中无法修改document.title的情况
	                    var $iframe = $('<iframe width="0" height="0" src="/favicon.ico"></iframe>');
	                    $iframe.on('load',function() {
	                        setTimeout(function() {
	                            $iframe.off('load').remove();
	                        }, 0);
	                    }).appendTo($body);
						//蜜妍APP内调用分享
						if(common.checkAPP() == 'miyan'){
							var title = res.data.info.sharetitle;
							var shareDesc = res.data.info.sharedesc;
							var shareUrl = (res.data.info.shareurl).replace(/\&/g, "￥" );
							var shareImg = res.data.info.shareimg;
							var title_length = title.length;
							if(title_length > 8){
						    	var sub_name = title.substring(0,6)+"..."+title.substring(title_length-2,title_length);
						    }else{
						    	var sub_name = title;
						    }
						    if(common.version() && common.version() > 199){
								var share_content = "<font color='#999999'>推广了海报「"+sub_name+"」</font>获得20积分";
							}else{
								var share_content = "推广了海报「"+sub_name+"」获得20积分";
							}
							return window.location.href = "callApp://shareMsg?shareTitle="+title+"&shareDesc="+shareDesc+"&linkUrl="+shareUrl+"&firstShow=0&isShare=1&shareImg="+shareImg+"&score=20&share_shoping_score=100&makemoney=0&share_profit=150%&share_score=120&share_content="+share_content;
			        	}
					},
					fail: function(res){
						//404显示
						var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面~</span></p>';
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
				'info': function(val) {

				}
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);