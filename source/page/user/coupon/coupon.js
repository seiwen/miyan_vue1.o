require([
	'jquery',
	'Vue',
	'vendor/common.js',
	'plugins/swiper/swiper-3.3.1.jquery.min.js',
	'lib/moment.js'
], function($, Vue, common, swiper, moment) {
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

})