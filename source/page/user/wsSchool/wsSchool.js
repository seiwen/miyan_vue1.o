require([
	'jquery',
	'Vue',
	'vendor/common.js',
	'lib/cookie'
], function($, Vue, common, cookie) {

	Vue.filter('replace', function (value) {
    	//文章过滤html标签
		return value.replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, "").replace(/&nbsp;/ig, "").substring(0,150);
	});
	var school = new Vue({
		el: '#js-school',
		data: {
			info: {}
		},
		ready: function() {
			common.globalAjax({
				action: 'News.getWeiDianSchoolData',
				data: {
					section_id: common.getUrlData('section_id'),
					a: common.getUrlData('a')
				},
				done: function(res) {
					school.$set('info', res.data.info);
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
					$(window).scroll(function() {
			            var scrollTop = $(this).scrollTop();//获取滚动条高度
			            var scrollHeight = $(document).height();//获取内容高度
			            var windowHeight = $(this).height();//获取窗口高度
			            var scrollBot = scrollHeight - scrollTop - windowHeight;//滚动条距离底部的高度
			            if (scrollBot<30) {
			                $('.array').hide();
			            }else{
			                $('.array').show();
			            }
			        });
			        //对未开通微店进行URL拦截
					if(common.isWeShopPayment() == 0){
						$('a').attr('href', '/page/open.html');
					}
				})
			}
		},
		methods: {
		}
	})

})