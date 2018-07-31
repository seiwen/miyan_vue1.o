require([
	'jquery',
	'Vue',
	'vendor/common.js'
], function($, Vue, common) {
	var address = new Vue({
		el: '#cart-address',
		data: {
			info: {},
			addressList: [],
			searchText: ''
		},
		ready: function() {
			common.globalAjax({
				action: 'Consignee.GetConsigneeLists',
				done: function(res) {
					address.$set('info', res.data.info);
					address.$set('addressList', res.data.info.list);
				}
			})
			$('#masker-list').hide();
			$('.root').show();
		},
		methods: {
			setDefault: function(id) {
				var _this = this;
				common.globalAjax({
					action: 'Consignee.SetDefaultConsignee',
					data: {
						address_id: id
					},
					done: function() {
						for (i in _this.addressList) {
							if(_this.addressList[i].address_id == id){
								_this.addressList[i].isdefault = 1;
							}else {
								_this.addressList[i].isdefault = 0;
							}
						}
						if(!common.getUrlData('is_my')){
							common.backWithParama('/page/cart/checkout.html?cartid=' + common.getUrlData('cartid'));
						}
						// if(common.getUrlData('cartid') && common.getUrlData('cartid') != null)
							// window.location.href = '/page/cart/checkout.html?cartid=' + common.getUrlData('cartid')
					}
				})
			},
			editAdd: function(id) {
				if(!common.getUrlData('is_my')){
					if(common.getUrlData('need_sid') == 1){
						window.location.href = '/page/cart/edit-address.html?cartid=' + id + '&addid=' + id +'&city_yes=1&need_sid=1';
					}else{
						window.location.href = '/page/cart/edit-address.html?cartid=' + id + '&addid=' + id +'&city_yes=1';
					}
				}else{
					if(common.getUrlData('need_sid') == 1){
						window.location.href = '/page/cart/edit-address.html?cartid=' + id + '&addid=' + id +'&city_yes=1&need_sid=1&is_my=1';
					}else{
						window.location.href = '/page/cart/edit-address.html?cartid=' + id + '&addid=' + id +'&city_yes=1&is_my=1';
					}
				}
			},
			newAdd: function() {
				if(!common.getUrlData('is_my')){
					if(common.getUrlData('need_sid') == 1){
						window.location.href = '/page/cart/edit-address.html?cartid=1&need_sid=1&';
					}else{
						window.location.href = '/page/cart/edit-address.html?cartid=1';
					}
				}else{
					if(common.getUrlData('need_sid') == 1){
						window.location.href = '/page/cart/edit-address.html?cartid=1&need_sid=1&is_my=1';
					}else{
						window.location.href = '/page/cart/edit-address.html?cartid=1&is_my=1';
					}
				}
			}
		}
	})

})