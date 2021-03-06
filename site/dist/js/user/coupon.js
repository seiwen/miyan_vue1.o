webpackJsonp([24,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(25, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(15),
		__webpack_require__(12)
	]; (function($, Vue, common, swiper, moment) {
		//时间过滤器
		Vue.filter('moment', function (value, formatString) {
		    formatString = formatString || 'YYYY-MM-DD';
		    return moment(value).format(formatString);
		});
		var coupon = new Vue({
			el: '#wechat-coupon',
			data: {
				info: {}
			},
			ready: function() {
				common.globalAjax({
					action: 'Agency.getCouponInfo',
					done: function(res) {
						coupon.$set('info', res.data.info);
						$('#masker-list').hide();
						$('.root').show();
					}
				})
				if(common.checkUA() == 'ios'){
					window.location.href = "callApp://truth_complete";
				}
			},
			watch: {
				'info': function(val) {
					this.$nextTick(function(){
						var swiper = new Swiper('.swiper-container', {
					        pagination: '.swiper-pagination',
					        paginationClickable: true,
					        spaceBetween: 30,
					        lazyLoading : true,
					        autoHeight: true,
					        paginationBulletRender: function (index, className) {
					        	var num = [val.no_use_no_expire_num,val.haved_use_num,val.haved_expire_num];
					        	var indexs = ['未使用('+num[0]+')','已使用('+num[1]+')','已过期('+num[2]+')']
					        		return '<span class="' + className + '">' + indexs[index] + '</span>';
					        }

					    });
					    $(window).scroll(function() {
			        		console.log($(this).scrollTop());
					        if ($(this).scrollTop()>0) {
					            $('.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction').css('position', 'fixed');
					        }else{
					            $('.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction').css('position', 'absolute');
					        }
					    });
					})
				}
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);