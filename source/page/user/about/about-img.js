require([
	'jquery',
	'Vue',
	'vendor/common.js',
	'lib/jquery.lazyload.js',
	'lib/cookie'
], function($, Vue, common, cookie) {

	var about_img = new Vue({
		el: '#about-list',
		data: {
			info: {},
			images: []
		},
		ready: function() {
			common.globalAjax({
				urlEdition: 'v3_0',
				action: 'AboutMy.posterDetail',
				data: {
					poster_id: common.getUrlData('id')
				},
				done: function(res) {
					about_img.$set('info', res.data.info);
					about_img.$set('images', res.data.info.images);
					$('#masker').hide();
					$('.root').show();
					//蜜妍APP内调用分享
					if(common.checkAPP() == 'miyan'){
						var shareTitle = about_img.info.title;
						var shareImg = about_img.info.img_url;
						var shareDesc = about_img.info.subtitle;
					    var shareTitle_length = shareTitle.length;
					    if(shareTitle_length > 10){
					    	var sub_name = shareTitle.substring(0,6)+"..."+shareTitle.substring(shareTitle_length-4,shareTitle_length);
					    }else{
					    	var sub_name = shareTitle;
					    }
					    if(common.version() && common.version() > 199){
					    	var share_content = "<font color='#999999'>推广了关于蜜妍页"+sub_name+"</font>获得"+about_img.info.share_score+"积分";
					    }else{
					    	var share_content = "推广了关于蜜妍页"+sub_name+"获得"+about_img.info.share_score+"积分";
					    }
						window.location.href = "callApp://shareMsg?shareTitle="+shareTitle+"&shareDesc="+shareDesc+"&linkUrl="+about_img.info.share_url+"&firstShow=0&isShare=0&shareImg="+shareImg+'&score='+about_img.info.score+'&share_content='+share_content+'&share_profit='+about_img.info.profit+'&share_score='+about_img.info.share_score+'&share_shoping_score='+about_img.info.order_score+'&makemoney=0';
					}
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

})