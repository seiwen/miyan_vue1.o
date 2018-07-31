webpackJsonp([51,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(7/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(11),
		__webpack_require__(10),
	]; (function($, Vue, common, lazyload, cookie) {

		var page = common.getUrlData('page');
		if(page == 'jy'){
			var info_arr = ['/dist/images/pxImg/px_11.jpg','/dist/images/pxImg/px_12.jpg','/dist/images/pxImg/px_13.jpg','/dist/images/pxImg/px_14.jpg'];
			$(document).attr('title', '精英训练营');
		}else if(page == 'mx'){
			var info_arr = ['/dist/images/pxImg/px_07.jpg','/dist/images/pxImg/px_08.jpg','/dist/images/pxImg/px_09.jpg','/dist/images/pxImg/px_10.jpg'];
			$(document).attr('title', '明星训练营');
		}else if(page == 'zs'){
			var info_arr = ['/dist/images/pxImg/px_04.jpg','/dist/images/pxImg/px_05.jpg','/dist/images/pxImg/px_06.jpg'];
			$(document).attr('title', '资深训练营');
		}else if(page == 'school'){
			var info_arr = ['/dist/images/pxImg/px_01.jpg','/dist/images/pxImg/px_02.jpg','/dist/images/pxImg/px_03.jpg'];
			$(document).attr('title', '微商小学');
		}else if(page == 'jq'){
			var info_arr = ['/dist/images/pxImg/px_15.jpg','/dist/images/pxImg/px_16.jpg'];
			$(document).attr('title', '激情加油站');
		}else if(page == 'zqbd'){
			var agency_level = common.getUrlData('agency_level');
			var info_arr = ['/dist/images/pxImg/px_17.jpg','/dist/images/pxImg/px_18.jpg','/dist/images/pxImg/px_19.jpg','/dist/images/pxImg/px_20.jpg','/dist/images/pxImg/px_21.jpg','/dist/images/pxImg/px_22.jpg','/dist/images/pxImg/px_23.jpg'];
			$(document).attr('title', '赚钱宝典');
		}else if(page == 'jfb'){
			var level = common.getUrlData('level');
			var info_arr = ['/dist/images/pxImg/jfb_01.jpg','/dist/images/pxImg/jfb_02.jpg','/dist/images/pxImg/jfb_03.jpg','/dist/images/pxImg/jfb_04.jpg','/dist/images/pxImg/jfb_05.jpg','/dist/images/pxImg/jfb_06.jpg','/dist/images/pxImg/jfb_07.jpg','/dist/images/pxImg/jfb_08.jpg'];
			$(document).attr('title', '积分榜攻略');
		}else if(page == 'zqb'){
			var level = common.getUrlData('level');
			if(level == 1){
				var info_arr = ['/dist/images/pxImg/jfb_01.jpg','/dist/images/pxImg/zqb_01.jpg','/dist/images/pxImg/zqb_02.jpg','/dist/images/pxImg/zqb_03.jpg','/dist/images/pxImg/zqb_04.jpg'];
			}else{
				var info_arr = ['/dist/images/pxImg/jfb_01.jpg','/dist/images/pxImg/zqb_01.jpg','/dist/images/pxImg/zqb_02.jpg','/dist/images/pxImg/zqb_03.jpg'];
			}
			$(document).attr('title', '赚钱榜攻略');
		}else if(page == 'video'){
			var level = common.getUrlData('level');
			var info_arr = ['/dist/images/pxImg/sp_01.jpg','/dist/images/pxImg/sp_02.jpg','/dist/images/pxImg/sp_03.jpg','/dist/images/pxImg/sp_04.jpg','/dist/images/pxImg/sp_05.jpg'];
			$(document).attr('title', '视频营销');
		}else if(page == 'zc'){
			var level = common.getUrlData('level');
			var info_arr = ['/dist/images/pxImg/zc_01.jpg','/dist/images/pxImg/zc_02.jpg','/dist/images/pxImg/zc_03.jpg','/dist/images/pxImg/zc_04.jpg','/dist/images/pxImg/zc_05.jpg','/dist/images/pxImg/zc_06.jpg','/dist/images/pxImg/zc_07.jpg'];
			$(document).attr('title', '种草攻略');
		}
		var school_info = new Vue({
			el: '#ws-school-info',
			data: {
				info: info_arr
			},
			ready: function() {
				$('.root').show();
				$('img.lz').lazyload();
				if(page == 'jfb' || page == 'zqb'){
					if(page == 'jfb'){
						var href_url = '<a class="right-a" href="/page/user/ws-school-info.html?page=zqb&level='+level+'"></a>';
					}else if(page == 'zqb'){
						var href_url = '<a class="left-a" href="/page/user/ws-school-info.html?page=jfb&level='+level+'"></a>';
					}
					$('.ws-school-info').append(href_url);
					$(window).scroll(function(event) {
						if($(this).scrollTop()>($(this).width()*0.426)){
							$('.ws-school-info img:nth-child(2)').css({
								'position': 'fixed',
								'top': '0',
								'left': '0',
								'z-index': '999'
							});
							$('.ws-school-info a.left-a,.ws-school-info a.right-a').css('top', '0');
						}else{
							$('.ws-school-info img:nth-child(2)').css({
								'position': 'relative',
								'top': 'none',
								'left': 'none',
								'z-index': '999'
							});
							var new_top = ($(this).width()*0.426) - $(this).scrollTop();
							$('.ws-school-info a.left-a,.ws-school-info a.right-a').css('top', new_top+'px');
						}
					});
				}
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);