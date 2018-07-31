webpackJsonp([50,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(1/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3)
	]; (function($, Vue, common) {

		var article_id = common.getUrlData('article_id');
		var is_reward_txt = common.getUrlData('is_reward_txt');
		var text = new Vue({
			el: '#weixin-text',
			data: {
				info: {},
				article_id: article_id,
				is_reward_txt: is_reward_txt
			},
			ready: function() {
				common.globalAjax({
					action: 'News.GetNewsDetailData',
					data: {
						article_id: article_id
					},
					done: function(res) {
						//获取数据
						text.$set('info', res.data.info);
						var title  = res.data.info.title;
						var content = res.data.info.content;
						var isShare = res.data.info.isshare;
						var first_share = res.data.info.first_share;
						$(document).attr("title",title);//设置文章title
						$('#masker,.right-fixed').hide();
						$('.root').show();
						if(common.checkAPP == 'miyan'){
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
							var shareDesc = content.replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, "").replace(/&nbsp;/ig, "").substring(0,99);//文章过滤html标签
							if(isShare == 1){
								common.shareApp( title,shareDesc,window.location.href.replace(/\&/g, "￥" ),first_share,isShare,'http://'+window.location.host+'/dist/images/shoplogo.png');
							}
			        	}
					},
					fail: function(res){
						//404显示
						var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>文章不存在!</span></p>';
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
				'info': function(){
					this.$nextTick(function(){
						//视频显示
	                    function videoStyle(){
	                        var contWidth = $('#js_content').width();
	                        $('.miyan-video').attr('width', contWidth);
	                        $('.miyan-video').attr('height', contWidth*0.75);
	                        $(".miyan-video").css({
	                            'display': 'block',
	                            'max-width': '100%',
	                            'width': contWidth+'px',
	                            'height': contWidth*0.75+'px',
	                            'box-sizing': ' border-box',
	                            'word-wrap': 'break-word',
	                            'overflow': 'hidden'
	                        });
	                        $('.miyan-music').css('max-width', '100%');
	                    }
	                    videoStyle();
	                    $(window).resize(function(event) {
	                        videoStyle()
	                    });
					})
				}
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);