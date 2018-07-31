webpackJsonp([22,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(18/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(4),
		__webpack_require__(11),
		__webpack_require__(15),
		__webpack_require__(10),
	]; (function($, Vue, common, layer, lazyload, swiper, cookie) {
	    var information_id = common.getUrlData('information_id');
	    var data_dpr = $('html').attr('data-dpr');

	    function pxToRem(_s){
		    //匹配:20px或: 20px不区分大小写
		    var reg = /(\:|: )+(([1-9]\d*\.?\d*)|(0\.\d*[1-9]))+(px)/gi;
		    return _s.replace(reg, function(_x){
		        _x = _x.replace(/(\:|: )/,'').replace(/px/i,'');
		        return ':' + parseFloat(_x) * data_dpr + 'px';
		    });
		}

	    //购物车数量接口
	    function addCart(){
	    	common.globalAjax({
				urlEdition: 'v3_0',
				action: 'Cart.getCartCountNum',
				done: function(re) {
					activity.$set('cart_num', re.data.info.num);
				}
			});
	    }

		var activity = new Vue({
			el: '#user-activity',
			data: {
				info: {},
				recommand_products: [],
				relation_topics: [],
				goods_list: [],
				content: {},
				fabulous: {},
				cart_num: {},
				zan_num: {}
			},
			ready: function() {
				common.globalAjax({
					urlEdition: 'v3_0',
					action: 'Seminar.getInformationTopic',
					data: {
						information_id: information_id
					},
					done: function(res) {
						//获取数据
						activity.$set('info', res.data.info);
						activity.$set('recommand_products', res.data.info.recommand_products);
						activity.$set('relation_topics', res.data.info.relation_topics);
						activity.$set('content', res.data.info.content);
						activity.$set('fabulous', res.data.info.fabulous);
						$(document).attr('title', res.data.info.title);
						//筛选出富文本框内的商品ID
						var ac_cont = activity.info.content;
						if(data_dpr == 2 || data_dpr == 3){
							var fontsize = $(window).width()/30;
							$('#activity-map').css('font-size', fontsize+'px');
						}
						if(ac_cont != undefined){
					 	var ac_str = ac_cont.match(/&lt;app&gt;[\s\S]*?&lt;\/app&gt;/ig);
					 	var ac_goods = [];
					 	for (i in ac_str) {
					 		ac_goods.push(ac_str[i].replace(/&lt;app&gt;/g,"").replace(/&lt;\/app&gt;/g,""));
					 	}
					 	if(ac_goods.length > 0){
					 	//请求富文本框内的商品
						 	common.globalAjax({
								urlEdition: 'v3_0',
								action: 'Products.getProductsByCodes',
								data: {
									product_codes: ac_goods,
									type: 'information',
									topic_id: information_id
								},
								done: function(ress) {
									activity.$set('goods_list', ress.data.info);
									var shop_list = activity.goods_list;
									var html_end = '</ul></div>';
									//匹配<list>1111</list>的个数
									var length_ul = ac_cont.match(/&lt;list&gt;[\s\S]*?&lt;\/list&gt;/ig);
									var ce_less = [];
									for (var i = 0; i < length_ul.length; i++) {
										//匹配<app>1111</app>的个数
										var ce_le = length_ul[i].match(/&lt;app&gt;[\s\S]*?&lt;\/app&gt;/ig).length;
										ce_less.push(ce_le);
									}

									//第一个
									var html_list_0 = '';
									var html_list_c0 = '';
									for (var i = 0; i < ce_less[0]; i++) {
										if(shop_list[i].id != undefined){
											var html_tag = '';//标签
											var tags_l = shop_list[i].tags.length;//标签个数
											//标签循环
											if(tags_l > 0){
												for (var s = 0; s < shop_list[i].tags.length; s++) {
													var tags_type = shop_list[i].tags[s].type;
													if(tags_type == "post"){
														var tags_html = '<span class="two">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "activity"){
														var tags_html = '<span class="three">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "grad"){
														var tags_html = '<span class="one">'+shop_list[i].tags[s].tag+'</span>';
													}
													var html_tag = html_tag + tags_html;
												}
											}else{
												var html_tag = '';
											}
											//图片上的标签
											if(shop_list[i].special_tag != ''){
												var html_spTag = '<em>'+shop_list[i].special_tag+'</em>';
											}else{
												var html_spTag = '';
											}
										}
										if(ce_less[0]>1){
											var html_strat = '<div class="video"><ul>';
											if(shop_list[i].id != undefined){
												//两列样式
												var html_list_c0 = html_list_c0 + '<li><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="video-img"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></div><span class="video-title">'+shop_list[i].product_name+'</span></a><div class="video-product-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span></div><div class="video-product-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div><div class="video-product-cart click-cart" data-id="'+shop_list[i].id+'">加入购物车</div></li>';
											}else{
												var html_list_c0 = html_list_c0 + '';
											}
										}else{
											var html_strat = '<div class="list"><ul>';
											if(shop_list[i].id != undefined){
												//一行样式
												var html_list_c0 = html_list_c0 + '<li><div class="list-box"><div class="list-img"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></a></div><div class="list-wraps"><div class="list-wrap"><div class="list-cont"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="list-title">'+shop_list[i].product_name+'</div><div class="list-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div></a><div class="list-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span><a href="javascript:;" class="click-cart" data-id="'+shop_list[i].id+'">加入购物车</a></div></div></div></div></div></li>';
											}else{
												var html_list_c0 = html_list_c0 + '';
											}
										}
										html_list_0 = html_strat+ html_list_c0;
									}
									var new_html_0 = html_list_0+html_end;

									//第二个
									var html_list_1 = '';
									var html_list_c1 = '';
									for (var i = ce_less[0]; i < ce_less[1]+ce_less[0]; i++) {
										if(shop_list[i].id != undefined){
											var html_tag = '';//标签
											var tags_l = shop_list[i].tags.length;//标签个数
											//标签循环
											if(tags_l > 0){
												for (var s = 0; s < shop_list[i].tags.length; s++) {
													var tags_type = shop_list[i].tags[s].type;
													if(tags_type == "post"){
														var tags_html = '<span class="two">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "activity"){
														var tags_html = '<span class="three">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "grad"){
														var tags_html = '<span class="one">'+shop_list[i].tags[s].tag+'</span>';
													}
													var html_tag = html_tag + tags_html;
												}
											}else{
												var html_tag = '';
											}
											//图片上的标签
											if(shop_list[i].special_tag != ''){
												var html_spTag = '<em>'+shop_list[i].special_tag+'</em>';
											}else{
												var html_spTag = '';
											}
										}
										if(ce_less[1]>1){
											var html_strat = '<div class="video"><ul>';
											if(shop_list[i].id != undefined){
												var html_list_c1 = html_list_c1 + '<li><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="video-img"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></div><span class="video-title">'+shop_list[i].product_name+'</span></a><div class="video-product-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span></div><div class="video-product-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div><div class="video-product-cart click-cart" data-id="'+shop_list[i].id+'">加入购物车</div></li>';
											}else{
												var html_list_c1 = html_list_c1 + '';
											}
										}else{
											var html_strat = '<div class="list"><ul>';
											if(shop_list[i].id != undefined){
												var html_list_c1 = html_list_c1 + '<li><div class="list-box"><div class="list-img"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></a></div><div class="list-wraps"><div class="list-wrap"><div class="list-cont"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="list-title">'+shop_list[i].product_name+'</div><div class="list-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div></a><div class="list-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span><a href="javascript:;" class="click-cart" data-id="'+shop_list[i].id+'">加入购物车</a></div></div></div></div></div></li>';
											}else{
												var html_list_c1 = html_list_c1 + '';
											}
										}
										html_list_1 = html_strat+html_list_c1;
									}
									var new_html_1 = html_list_1+html_end;

									//第三个
									var html_list_2 = '';
									var html_list_c2 = '';
									for (var i = ce_less[1]+ce_less[0]; i < ce_less[2]+ce_less[1]+ce_less[0]; i++) {
										if(shop_list[i].id != undefined){
											var html_tag = '';//标签
											var tags_l = shop_list[i].tags.length;//标签个数
											//标签循环
											if(tags_l > 0){
												for (var s = 0; s < shop_list[i].tags.length; s++) {
													var tags_type = shop_list[i].tags[s].type;
													if(tags_type == "post"){
														var tags_html = '<span class="two">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "activity"){
														var tags_html = '<span class="three">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "grad"){
														var tags_html = '<span class="one">'+shop_list[i].tags[s].tag+'</span>';
													}
													var html_tag = html_tag + tags_html;
												}
											}else{
												var html_tag = '';
											}
											//图片上的标签
											if(shop_list[i].special_tag != ''){
												var html_spTag = '<em>'+shop_list[i].special_tag+'</em>';
											}else{
												var html_spTag = '';
											}
										}
										if(ce_less[2]>1){
											var html_strat = '<div class="video"><ul>';
											if(shop_list[i].id != undefined){
												var html_list_c2 = html_list_c2 + '<li><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="video-img"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></div><span class="video-title">'+shop_list[i].product_name+'</span></a><div class="video-product-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span></div><div class="video-product-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div><div class="video-product-cart click-cart" data-id="'+shop_list[i].id+'">加入购物车</div></li>';
											}else{
												var html_list_c2 = html_list_c2 + '';
											}
										}else{
											var html_strat = '<div class="list"><ul>';
											if(shop_list[i].id != undefined){
												var html_list_c2 = html_list_c2 + '<li><div class="list-box"><div class="list-img"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></a></div><div class="list-wraps"><div class="list-wrap"><div class="list-cont"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="list-title">'+shop_list[i].product_name+'</div><div class="list-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div></a><div class="list-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span><a href="javascript:;" class="click-cart" data-id="'+shop_list[i].id+'">加入购物车</a></div></div></div></div></div></li>';
											}else{
												var html_list_c2 = html_list_c2 + '';
											}
										}
										html_list_2 = html_strat+html_list_c2;
									}
									var new_html_2 = html_list_2+html_end;

									//第四个
									var html_list_3 = '';
									var html_list_c3 = '';
									for (var i = ce_less[2]+ce_less[1]+ce_less[0]; i < ce_less[3]+ce_less[2]+ce_less[1]+ce_less[0]; i++) {
										if(shop_list[i].id != undefined){
											var html_tag = '';//标签
											var tags_l = shop_list[i].tags.length;//标签个数
											//标签循环
											if(tags_l > 0){
												for (var s = 0; s < shop_list[i].tags.length; s++) {
													var tags_type = shop_list[i].tags[s].type;
													if(tags_type == "post"){
														var tags_html = '<span class="two">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "activity"){
														var tags_html = '<span class="three">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "grad"){
														var tags_html = '<span class="one">'+shop_list[i].tags[s].tag+'</span>';
													}
													var html_tag = html_tag + tags_html;
												}
											}else{
												var html_tag = '';
											}
											//图片上的标签
											if(shop_list[i].special_tag != ''){
												var html_spTag = '<em>'+shop_list[i].special_tag+'</em>';
											}else{
												var html_spTag = '';
											}
										}
										if(ce_less[3]>1){
											var html_strat = '<div class="video"><ul>';
											if(shop_list[i].id != undefined){
												var html_list_c3 = html_list_c3 + '<li><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="video-img"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></div><span class="video-title">'+shop_list[i].product_name+'</span></a><div class="video-product-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span></div><div class="video-product-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div><div class="video-product-cart click-cart" data-id="'+shop_list[i].id+'">加入购物车</div></li>';
											}else{
												var html_list_c3 = html_list_c3 + '';
											}
										}else{
											var html_strat = '<div class="list"><ul>';
											if(shop_list[i].id != undefined){
												var html_list_c3 = html_list_c3 + '<li><div class="list-box"><div class="list-img"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></a></div><div class="list-wraps"><div class="list-wrap"><div class="list-cont"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="list-title">'+shop_list[i].product_name+'</div><div class="list-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div></a><div class="list-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span><a href="javascript:;" class="click-cart" data-id="'+shop_list[i].id+'">加入购物车</a></div></div></div></div></div></li>';
											}else{
												var html_list_c3 = html_list_c3 + '';
											}
										}
										html_list_3 = html_strat+html_list_c3;
									}
									var new_html_3 = html_list_3+html_end;

									//第五个
									var html_list_4 = '';
									var html_list_c4 = '';
									for (var i = ce_less[3]+ce_less[2]+ce_less[1]+ce_less[0]; i < ce_less[4]+ce_less[3]+ce_less[2]+ce_less[1]+ce_less[0]; i++) {
										if(shop_list[i].id != undefined){
											var html_tag = '';//标签
											var tags_l = shop_list[i].tags.length;//标签个数
											//标签循环
											if(tags_l > 0){
												for (var s = 0; s < shop_list[i].tags.length; s++) {
													var tags_type = shop_list[i].tags[s].type;
													if(tags_type == "post"){
														var tags_html = '<span class="two">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "activity"){
														var tags_html = '<span class="three">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "grad"){
														var tags_html = '<span class="one">'+shop_list[i].tags[s].tag+'</span>';
													}
													var html_tag = html_tag + tags_html;
												}
											}else{
												var html_tag = '';
											}
											//图片上的标签
											if(shop_list[i].special_tag != ''){
												var html_spTag = '<em>'+shop_list[i].special_tag+'</em>';
											}else{
												var html_spTag = '';
											}
										}
										if(ce_less[4]>1){
											var html_strat = '<div class="video"><ul>';
											if(shop_list[i].id != undefined){
												var html_list_c4 = html_list_c4 + '<li><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="video-img"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></div><span class="video-title">'+shop_list[i].product_name+'</span></a><div class="video-product-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span></div><div class="video-product-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div><div class="video-product-cart click-cart" data-id="'+shop_list[i].id+'">加入购物车</div></li>';
											}else{
												var html_list_c4 = html_list_c4 + '';
											}
										}else{
											var html_strat = '<div class="list"><ul>';
											if(shop_list[i].id != undefined){
												var html_list_c4 = html_list_c4 + '<li><div class="list-box"><div class="list-img"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></a></div><div class="list-wraps"><div class="list-wrap"><div class="list-cont"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="list-title">'+shop_list[i].product_name+'</div><div class="list-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div></a><div class="list-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span><a href="javascript:;" class="click-cart" data-id="'+shop_list[i].id+'">加入购物车</a></div></div></div></div></div></li>';
											}else{
												var html_list_c4 = html_list_c4 + '';
											}
										}
										html_list_4 = html_strat+html_list_c4;
									}
									var new_html_4 = html_list_4+html_end;

									//第六个
									var html_list_5 = '';
									var html_list_c5 = '';
									for (var i = ce_less[4]+ce_less[3]+ce_less[2]+ce_less[1]+ce_less[0]; i < ce_less[5]+ce_less[4]+ce_less[3]+ce_less[2]+ce_less[1]+ce_less[0]; i++) {
										if(shop_list[i].id != undefined){
											var html_tag = '';//标签
											var tags_l = shop_list[i].tags.length;//标签个数
											//标签循环
											if(tags_l > 0){
												for (var s = 0; s < shop_list[i].tags.length; s++) {
													var tags_type = shop_list[i].tags[s].type;
													if(tags_type == "post"){
														var tags_html = '<span class="two">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "activity"){
														var tags_html = '<span class="three">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "grad"){
														var tags_html = '<span class="one">'+shop_list[i].tags[s].tag+'</span>';
													}
													var html_tag = html_tag + tags_html;
												}
											}else{
												var html_tag = '';
											}
											//图片上的标签
											if(shop_list[i].special_tag != ''){
												var html_spTag = '<em>'+shop_list[i].special_tag+'</em>';
											}else{
												var html_spTag = '';
											}
										}
										if(ce_less[5]>1){
											var html_strat = '<div class="video"><ul>';
											if(shop_list[i].id != undefined){
												var html_list_c5 = html_list_c5 + '<li><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="video-img"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></div><span class="video-title">'+shop_list[i].product_name+'</span></a><div class="video-product-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span></div><div class="video-product-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div><div class="video-product-cart click-cart" data-id="'+shop_list[i].id+'">加入购物车</div></li>';
											}else{
												var html_list_c5 = html_list_c5 + '';
											}
										}else{
											var html_strat = '<div class="list"><ul>';
											if(shop_list[i].id != undefined){
												var html_list_c5 = html_list_c5 + '<li><div class="list-box"><div class="list-img"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></a></div><div class="list-wraps"><div class="list-wrap"><div class="list-cont"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="list-title">'+shop_list[i].product_name+'</div><div class="list-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div></a><div class="list-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span><a href="javascript:;" class="click-cart" data-id="'+shop_list[i].id+'">加入购物车</a></div></div></div></div></div></li>';
											}else{
												var html_list_c5 = html_list_c5 + '';
											}
										}
										html_list_5 = html_strat+html_list_c5;
									}
									var new_html_5 = html_list_5+html_end;

									//第七个
									var html_list_6 = '';
									var html_list_c6 = '';
									for (var i = ce_less[5]+ce_less[4]+ce_less[3]+ce_less[2]+ce_less[1]+ce_less[0]; i < ce_less[6]+ce_less[5]+ce_less[4]+ce_less[3]+ce_less[2]+ce_less[1]+ce_less[0]; i++) {
										if(shop_list[i].id != undefined){
											var html_tag = '';//标签
											var tags_l = shop_list[i].tags.length;//标签个数
											//标签循环
											if(tags_l > 0){
												for (var s = 0; s < shop_list[i].tags.length; s++) {
													var tags_type = shop_list[i].tags[s].type;
													if(tags_type == "post"){
														var tags_html = '<span class="two">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "activity"){
														var tags_html = '<span class="three">'+shop_list[i].tags[s].tag+'</span>';
													}else if(tags_type == "grad"){
														var tags_html = '<span class="one">'+shop_list[i].tags[s].tag+'</span>';
													}
													var html_tag = html_tag + tags_html;
												}
											}else{
												var html_tag = '';
											}
											//图片上的标签
											if(shop_list[i].special_tag != ''){
												var html_spTag = '<em>'+shop_list[i].special_tag+'</em>';
											}else{
												var html_spTag = '';
											}
										}
										if(ce_less[6]>1){
											var html_strat = '<div class="video"><ul>';
											if(shop_list[i].id != undefined){
												var html_list_c6 = html_list_c6 + '<li><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="video-img"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></div><span class="video-title">'+shop_list[i].product_name+'</span></a><div class="video-product-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span></div><div class="video-product-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div><div class="video-product-cart click-cart" data-id="'+shop_list[i].id+'">加入购物车</div></li>';
											}else{
												var html_list_c6 = html_list_c6 + '';
											}
										}else{
											var html_strat = '<div class="list"><ul>';
											if(shop_list[i].id != undefined){
												var html_list_c6 = html_list_c6 + '<li><div class="list-box"><div class="list-img"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><img class="img-fluid lz" src="/dist/images/indexImg/shopBg.jpg" data-original="'+shop_list[i].thumb+'" alt="'+shop_list[i].product_name+'">'+html_spTag+'<div class="no_cartData display'+shop_list[i].is_sale_out+'"><span class="shouqing">已售罄</span></div></a></div><div class="list-wraps"><div class="list-wrap"><div class="list-cont"><a href="/page/goods.html?product_id='+shop_list[i].id+'"><div class="list-title">'+shop_list[i].product_name+'</div><div class="list-tag">'+html_tag+'<label>已批'+shop_list[i].salescount+'件</label></div></a><div class="list-price"><span><i>￥</i>'+shop_list[i].sales_price+' <em><i>/ 赚</i>'+shop_list[i].earn_tag+'</em></span><a href="javascript:;" class="click-cart" data-id="'+shop_list[i].id+'">加入购物车</a></div></div></div></div></div></li>';
											}else{
												var html_list_c6 = html_list_c6 + '';
											}
										}
										html_list_6 = html_strat+html_list_c6;
									}
									var new_html_6 = html_list_6+html_end;

									if(length_ul.length == 1){
										var html = ac_cont.replace(/&lt;goods-1&gt;[\s\S]*?&lt;\/goods-1&gt;/ig, new_html_0);
									}if(length_ul.length == 2){
										var html = ac_cont.replace(/&lt;goods-1&gt;[\s\S]*?&lt;\/goods-1&gt;/ig, new_html_0).replace(/&lt;goods-2&gt;[\s\S]*?&lt;\/goods-2&gt;/ig, new_html_1);
									}if(length_ul.length == 3){
										var html = ac_cont.replace(/&lt;goods-1&gt;[\s\S]*?&lt;\/goods-1&gt;/ig, new_html_0).replace(/&lt;goods-2&gt;[\s\S]*?&lt;\/goods-2&gt;/ig, new_html_1).replace(/&lt;goods-3&gt;[\s\S]*?&lt;\/goods-3&gt;/ig, new_html_2);
									}if(length_ul.length == 4){
										var html = ac_cont.replace(/&lt;goods-1&gt;[\s\S]*?&lt;\/goods-1&gt;/ig, new_html_0).replace(/&lt;goods-2&gt;[\s\S]*?&lt;\/goods-2&gt;/ig, new_html_1).replace(/&lt;goods-3&gt;[\s\S]*?&lt;\/goods-3&gt;/ig, new_html_2).replace(/&lt;goods-4&gt;[\s\S]*?&lt;\/goods-4&gt;/ig, new_html_3);
									}if(length_ul.length == 5){
										var html = ac_cont.replace(/&lt;goods-1&gt;[\s\S]*?&lt;\/goods-1&gt;/ig, new_html_0).replace(/&lt;goods-2&gt;[\s\S]*?&lt;\/goods-2&gt;/ig, new_html_1).replace(/&lt;goods-3&gt;[\s\S]*?&lt;\/goods-3&gt;/ig, new_html_2).replace(/&lt;goods-4&gt;[\s\S]*?&lt;\/goods-4&gt;/ig, new_html_3).replace(/&lt;goods-5&gt;[\s\S]*?&lt;\/goods-5&gt;/ig, new_html_4);
									}if(length_ul.length == 6){
										var html = ac_cont.replace(/&lt;goods-1&gt;[\s\S]*?&lt;\/goods-1&gt;/ig, new_html_0).replace(/&lt;goods-2&gt;[\s\S]*?&lt;\/goods-2&gt;/ig, new_html_1).replace(/&lt;goods-3&gt;[\s\S]*?&lt;\/goods-3&gt;/ig, new_html_2).replace(/&lt;goods-4&gt;[\s\S]*?&lt;\/goods-4&gt;/ig, new_html_3).replace(/&lt;goods-5&gt;[\s\S]*?&lt;\/goods-5&gt;/ig, new_html_4).replace(/&lt;goods-6&gt;[\s\S]*?&lt;\/goods-6&gt;/ig, new_html_5);
									}if(length_ul.length == 7){
										var html = ac_cont.replace(/&lt;goods-1&gt;[\s\S]*?&lt;\/goods-1&gt;/ig, new_html_0).replace(/&lt;goods-2&gt;[\s\S]*?&lt;\/goods-2&gt;/ig, new_html_1).replace(/&lt;goods-3&gt;[\s\S]*?&lt;\/goods-3&gt;/ig, new_html_2).replace(/&lt;goods-4&gt;[\s\S]*?&lt;\/goods-4&gt;/ig, new_html_3).replace(/&lt;goods-5&gt;[\s\S]*?&lt;\/goods-5&gt;/ig, new_html_4).replace(/&lt;goods-6&gt;[\s\S]*?&lt;\/goods-6&gt;/ig, new_html_5).replace(/&lt;goods-7&gt;[\s\S]*?&lt;\/goods-7&gt;/ig, new_html_6);
									}
									//dpr为2的富文本框文章像素处理
									if(data_dpr == 2 || data_dpr == 3){
										$('#activity-map').append(pxToRem(html));
									}else{
										$('#activity-map').append(html);
									}
									$('.activity-map').show();
									$('img.lz').lazyload();
									//富文本框内加入购物车接口
									$('#activity-map .click-cart').click(function(event) {
										if(common.isWeShopPayment() != 0){
											var goods_id = $(this).attr('data-id');
											common.globalAjax({
												action: 'Cart.AddToCart',
												data: {
													pid: goods_id,
													count: 1
												},
												done: function(res) {
													layer.open({
														content: res.data.msg,
														skin: 'msg',
														time: 1.5
													})
													addCart();
												},
												fail: function(res){
													layer.open({
														content: res.data.msg,
														skin: 'msg',
														time: 1.5
													})
												}
											})
										}else{
											window.location.href = '/page/open.html';
										}
									});
								},
								fail: function(ress){
									//404显示
									var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面~</span></p>';
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
						}else{
							var html = res.data.info.content;
							//dpr为2的富文本框文章像素处理
							if(data_dpr == 2 || data_dpr == 3){
								$('#activity-map').append(pxToRem(html));
							}else{
								$('#activity-map').append(html);
							}
							$('.activity-map').show();
							$('img.lz').lazyload();
						}
						}
						//购物车数量接口
						addCart();
						//显示返回按钮
					    $(window).scroll(function() {
					        if ($(this).scrollTop()>500) {
					            $('.right-fixed').show();
					        }else{
					            $('.right-fixed').hide();
					        }
					    });
					    //存在isTips就隐藏提示弹框
					    // if(cookie.get('isTips')){
					    // 	$('.activity-hideBox,.activity-tips-box').hide();
					    // }
						$('#masker').hide();
						$('.root').show();
						//蜜妍APP内调用分享
						if(common.checkAPP() == 'miyan'){
							var shareTitle = activity.info.title;
							var shareImg = activity.info.banner;
							var shareDesc = activity.info.subtitle;
						    var shareTitle_length = shareTitle.length;
						    if(shareTitle_length > 10){
						    	var sub_name = shareTitle.substring(0,6)+"..."+shareTitle.substring(shareTitle_length-4,shareTitle_length);
						    }else{
						    	var sub_name = shareTitle;
						    }
						    if(common.version() && common.version() > 199){
						    	var share_content = "<font color='#999999'>推广了资讯活动页"+sub_name+"</font>获得"+activity.info.score+"积分";
						    }else{
						    	var share_content = "推广了资讯活动页"+sub_name+"获得"+activity.info.score+"积分";
						    }
							window.location.href = "callApp://shareMsg?shareTitle="+shareTitle+"&shareDesc="+shareDesc+"&linkUrl="+activity.info.share_url+"&firstShow=0&isShare=0&shareImg="+shareImg+'&score='+activity.info.score+'&share_content='+share_content+'&share_profit='+activity.info.profit+'&share_score='+activity.info.share_score+'&share_shoping_score='+activity.info.order_score+'&makemoney=0&is_activity=1';
						}
					},
					fail: function(res){
						//404显示
						var html_404 = '<p class="tipinfo"><img src="/dist/images/indexImg/404_03.jpg" alt="404"><span>无法打开页面~</span></p>';
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
			            //相关推荐
			            var swiper = new Swiper('#brand-tuijian', {
					        pagination: '#brand-tuijian .swiper-pagination',
					        paginationClickable: true,
					        spaceBetween: 10,
					        lazyLoading : true,
					        slidesPerView: 2,
	        				slidesPerColumn : 1,
					        loop : false,
					        autoplay: 5000,
					    });
					    //更多专题
					    var ztSwiper = new Swiper('#brand-zt', {
					        pagination: '#brand-zt .swiper-pagination',
					        slidesPerView: 'auto',
					        paginationClickable: true,
					        spaceBetween: 20
					    });
					    $('.index-fixed').hide();
						$('img.lz').lazyload();
					})
				}
			},
			methods: {
				clickCart: function(id){
					if(common.isWeShopPayment() != 0){
						common.globalAjax({
							action: 'Cart.AddToCart',
							data: {
								pid: id,
								count: 1
							},
							done: function(res) {
								layer.open({
									content: res.data.msg,
									skin: 'msg',
									time: 1.5
								})
								addCart();
							},
							fail: function(res){
								layer.open({
									content: res.data.msg,
									skin: 'msg',
									time: 1.5
								})
							}
						})
					}else{
						window.location.href = '/page/open.html';
					}
				},
				clickZan: function(num){
					if(common.isWeShopPayment() != 0){
						common.globalAjax({
							urlEdition: 'v3_0',
							action: 'Seminar.doFabulous',
							data: {
								type: 'information',
								id: information_id
							},
							done: function(rey) {
								activity.$set('fabulous', rey.data.info.status);
								layer.open({
									content: '点赞成功！',
									skin: 'msg',
									time: 1.5
								})
								activity.info.has_fabulous = 1;
							},
							fail: function(rey) {
								layer.open({
									content: rey.msg,
									skin: 'msg',
									time: 1.5
								})
							}
						});
					}else{
						window.location.href = '/page/open.html';
					}
				},
				clickShare: function(){
					//调起分享弹框
					window.location.href = "callApp://clickShare";
				}
				// ,
				// closeTips: function(){
				// 	event.preventDefault();
				// 	//关闭提示框
				// 	$('.activity-hideBox,.activity-tips-box').hide();
				// 	cookie.set('isTips',1,{ expires: 365 });//存isTips用于判断是否显示
				// 	window.location.href = "callApp://closeTips?isTips=1";//调起原生存入isTips到cookie中
				// }
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);