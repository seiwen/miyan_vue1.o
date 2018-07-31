webpackJsonp([36,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(18/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(15),
		__webpack_require__(11)
	]; (function($, Vue, common, lazyload) {
		var poster_data = [];
		var new_data,data_new = [];
		var nextPage = 1;
	    var flag = 2;
		function getMoreRecru(flag) {
	    	common.globalAjax({
				action: 'products.getProductPosterList',
				data: {
					list_type: 1,
					p: flag
				},
				done: function(res) {
					new_data = res.data.info;
					var list_length = new_data.length;
					var data_new = poster_data.concat(new_data);
					poster_data = data_new;
					poster.$set('info', data_new);
					$('#masker-list').hide();
					$('.root').show();
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
					var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面~</span></p>';
					$('#masker-list').hide();
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
		var poster = new Vue({
			el: '#poster-cont',
			data: {
				info: []
			},
			ready: function() {
				getMoreRecru(1);
				if(common.checkUA() == 'ios'){
					window.location.href = "callApp://truth_complete";
				}
			},
			watch: {
				'info': function(val) {
					var swiper = new Swiper('.swiper-container', {
				        pagination: '.swiper-pagination',
				        paginationClickable: true,
				        spaceBetween: 30,
				        lazyLoading : true,
				        autoplay: 5000,
				    });
					this.$nextTick(function(){
						$('img.lz').lazyload();
						//对未开通微店进行URL拦截
						if(common.isWeShopPayment() == 0){
							$('a').attr('href', '/page/open.html');
						}
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

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);