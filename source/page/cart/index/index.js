require([
	'jquery',
	'Vue',
	'vendor/common.js',
	'plugins/layer/layer.js',
	'lib/jquery.lazyload.js',
], function($, Vue, common, layer, lazyload) {

	var option = {
		done: function(res) {
			cart.$set('warehouse', setWarehouseArray(res.data.cartlist));
			cart.$set('info', res.data.info);
			$('#masker').hide();
			$('.root').show();
		},
		fail: function(res){
			if(res.ret == 200){
				layer.open({
					content: res.data.msg,
					skin: 'msg',
					time: 1.5
				})
			}else {
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
		}
	}

	// 组装所有每个仓的cart_id
	function setWarehouseArray(data) {
		for(i in data) {
			var list = [],list_pt = [],list_active = [];
			//普通商品
			for(j in data[i].list) {
				list_pt.push(data[i].list[j].cart_id);
			}
			//活动商品
			for(h in data[i].acitve_info) {
				if(data[i].acitve_info[h].ismix == 1){
					//混合活动
					for(l in data[i].acitve_info[h].mix_actives){
						for(n in data[i].acitve_info[h].mix_actives[l].mix_active_list){
							list_active.push(data[i].acitve_info[h].mix_actives[l].mix_active_list[n].cart_id);
						}
					}
				}else{
					//不混合活动
					for(k in data[i].acitve_info[h].active_list){
						list_active.push(data[i].acitve_info[h].active_list[k].cart_id);
					}
				}
			}
			list = list_pt.concat(list_active);
			data[i].productList = list;
		}
		return data;
	}

	//组装productid
	function getProductId(data) {
		var list = [],list_pt = [],list_active = [],min_active = [];
		for(i in data) {
			//普通商品
			for(j in data[i].list) {
				if(data[i].list[j].isselect == 1)
					list_pt.push(data[i].list[j].cart_id);
			}
			//活动商品
			for(h in data[i].acitve_info) {
				for(k in data[i].acitve_info[h].active_list){
					if(data[i].acitve_info[h].active_list[k].isselect == 1)
						list_active.push(data[i].acitve_info[h].active_list[k].cart_id);
				}
				for(o in data[i].acitve_info[h].mix_actives){
					for(p in data[i].acitve_info[h].mix_actives[o].mix_active_list){
						if(data[i].acitve_info[h].mix_actives[o].mix_active_list[p].isselect == 1){
							min_active.push(data[i].acitve_info[h].mix_actives[o].mix_active_list[p].cart_id);
						}
					}
				}
			}
			list = (list_pt.concat(list_active)).concat(min_active);
		}
		return list;
	}


	var cart = new Vue({
		el: '#cart-index',
		data: {
			// 购物车信息
			info: {},
			// 购物车数据
			warehouse: []
		},
		ready: function() {
			// getCartData({action: 'Cart.GetCartLists'});
			common.globalAjax($.extend({
					action: 'Cart.GetCartLists'
				}, option))
		},
		watch: {
			'warehouse': function(val) {
				this.$nextTick(function(){
					$('#cart-index').show();
					$('img.lz').lazyload();
					if($('#cart-index').height()<$(window).innerHeight()){
						$('html,body').css('height', '100%');
					}
				})
			}
		},
		compiled: function() {
			var list = $('.cart-list');
			list.on('change', '.js-changeNum', function() {
				if (isNaN($(this).val()) || $(this).val() == 0) {
				    $(this).val($(this).attr('oval'));
				    return false;
				}
				if(parseInt($(this).val()) > parseInt($(this).attr('max'))) {
					layer.open({
						content: '此商品最多可购' + $(this).attr('max') + '件',
						skin: 'msg',
    					time: 1.5
					})
					$(this).val($(this).attr('oval'));
					return;
				}

				common.globalAjax($.extend({
					action: 'Cart.UpdateCartById',
					data: {
						cart_id: $(this).attr('cartid'),
						count: $(this).val()
					}
				},option))
			})
		},
		methods: {
			clickActive: function(e,id,ismix){
				if(common.isWeShopPayment() != 0){
				if (e) e.preventDefault();
				var _this = e.currentTarget;
				var div_length = $(_this).find('.cart-list-nav-a').length;
				var cut_arr = [];
				var gift_arr = [];
				var optional_arr = [];
				for (var i = 1; i < div_length + 1; i++) {
					var cut_data = $(_this).find('.cart-list-nav-a:nth-child('+i+')').attr('data-cut');
					if(cut_data != 0){
						var cut_data_new = cut_data;
						cut_arr.push(cut_data_new);
					}
					var gift_data = $(_this).find('.cart-list-nav-a:nth-child('+i+')').attr('data-gift');
					if(gift_data != 0){
						var gift_data_new = gift_data;
						gift_arr.push(gift_data_new);
					}
					var optional_data = $(_this).find('.cart-list-nav-a:nth-child('+i+')').attr('data-optional');
					if(optional_data != 0){
						var optional_data_new = optional_data;
						optional_arr.push(optional_data_new);
					}
				}
				// if(ismix == 1){
				// 	var div_b_length = $(_this).prevAll('.back-1').find('.cart-list-nav-b').length;
				// 	var gift_all_arr = [];
				// 	for (var i = 1; i < div_b_length + 1; i++) {
				// 		var gift_data_all = $(_this).prevAll('.back-1').find('.cart-list-nav-b:nth-child('+i+')').attr('data-gift');
				// 		if(gift_data_all != 0){
				// 			var gift_data_all_new = gift_data_all;
				// 			gift_all_arr.push(gift_data_all_new);
				// 		}
				// 	}
				// 	var new_gift = gift_all_arr.concat(gift_arr);
				// }else{
				// 	var new_gift = gift_arr;
				// }
				var new_gift = gift_arr;
				window.location.href = '/page/user/andlist.html?warehouse_id='+id+'&full_cut_id='+cut_arr+'&full_gift_id='+new_gift+'&optional_id='+optional_arr+'&filter=all&cate_id=0&brand_id=0';
				}else{
					window.location.href = '/page/open.html';
				}
			},
			updateCart: function(action, cart_id, countNum) {
				if(common.isWeShopPayment() != 0){
				var data = {
					cart_id: cart_id
				}
				if(countNum) $.extend(data, {count: countNum});


				common.globalAjax($.extend({
					action: action,
					data: data
				},option))
				}else{
					window.location.href = '/page/open.html';
				}
			},
			delProduct: function(cart_id) {
				event.preventDefault();
				if(common.isWeShopPayment() != 0){
				layer.open({
					content: '确定删除商品?',
					btn: ['确定', '取消'],
					no: function(index) {
						layer.close(index);
					},
					yes: function(index) {
						layer.close(index);
						common.globalAjax($.extend({
							action: 'Cart.DeleteCartById',
							data: {
								cart_id: cart_id
							}
						}, option));
					}
				})
				}else{
					window.location.href = '/page/open.html';
				}
			},
			selectMethod: function(data) {
				if(common.isWeShopPayment() != 0){
				common.globalAjax($.extend({
					action: 'Cart.CheckCartsItem',
					data: data
				}, option))
				}else{
					window.location.href = '/page/open.html';
				}
			},
			goCheckout: function() {
				if(common.isWeShopPayment() != 0){
				var cart_id = getProductId(this.warehouse);
				common.globalAjax({
					action: 'Cart.CheckOut',
					data: {
						cart_id: cart_id
					},
					done: function() {
						window.location.href = '/page/cart/checkout.html?cartid=' + cart_id;
					}
				})
				}else{
					window.location.href = '/page/open.html';
				}
			},
			goIndex: function() {
				if(common.isWeShopPayment() == 0){
					window.location.href = '/page/open.html';
				}else{
					window.location.href = 'callApp://goIndex'
				}
			}
		}
	})
})