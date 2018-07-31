webpackJsonp([4,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(5, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(14),
		__webpack_require__(3),
		__webpack_require__(4)
	]; (function($, Vue, PCAS, common, layer) {

		var is_my = common.getUrlData("is_my");
		var editAddress = new Vue({
			el: '#cart-editAddress',
			data: {
				show: false,
				address_id: '',
				info: {},
				is_showSave: common.getUrlData('is_showSave'),
				is_my: is_my
			},
			ready: function() {
				var address_id = common.getUrlData('addid');
				var city_yes = common.getUrlData("city_yes");
				var _this = this;
				if(address_id) {
					common.globalAjax({
						action: 'Consignee.GetConsigneeById',
						data: {
							address_id: address_id
						},
						done: function(res) {
							editAddress.$set('info', res.data.info.list[0]);
							editAddress.$set('address_id', res.data.info.list[0].address_id);
							//地址
							if(parseInt(city_yes) == 1){
								new PCAS("province","city","area",_this.info.province_name,_this.info.city_name,_this.info.area_name);
							}
						}
					})
				}
				if(common.getUrlData('need_sid') == 1){
					$('.declare p').show();
				}

				$('#cart-editAddress').show();
				if(!parseInt(city_yes) == 1){
					new PCAS("province","city","area",_this.info.province_name,_this.info.city_name,_this.info.area_name);
				}
			},
			watch: {
				'info': function(val) {
					$('#cart-editAddress').show();
				}
			},
			methods: {
				saveAdd: function(isdefault) {
					var msg = this.$options.checkvalue();
					if(msg != '') {
						layer.open({
							content: msg,
							skin: 'msg',
	    					time: 1.5
						})
						return;
					}

					var options = {
						action: '',
						data: {
							nick_name: $('#name').val(),
							province_name: $('#province').val(),
							city_name: $('#city').val(),
							area_name: $('#area').val(),
							address_line: $('#address').val(),
							tel: $('#phone').val(),
							sid: $('#idCard').val(),
							isdefault: isdefault
						},
						done: function(res) {
							common.backWithParama('/page/cart/checkout.html')
						},
						fail: function(res) {
							if(res.ret == 200){
								if(res.data.code == 3){
									common.backWithParama('/page/cart/checkout.html')
								}else{
									layer.open({
										content: res.data.msg,
										skin: 'msg',
	    								time: 1.5
									})
								}
							}
						}
					}
					if(this.address_id == '') {
						options.action = 'Consignee.AddNewConsignee'
					}else {
						options.action = 'Consignee.EditConsignee';
						options.data.address_id = this.address_id;
					}
					common.globalAjax(options);
				},
				savesAdd: function(isdefault) {
					var msg = this.$options.checkvalue();
					if(msg != '') {
						layer.open({
							content: msg,
							skin: 'msg',
	    					time: 1.5
						})
						return;
					}

					var options = {
						action: '',
						data: {
							nick_name: $('#name').val(),
							province_name: $('#province').val(),
							city_name: $('#city').val(),
							area_name: $('#area').val(),
							address_line: $('#address').val(),
							tel: $('#phone').val(),
							sid: $('#idCard').val(),
							isdefault: isdefault
						},
						done: function(res) {
							if(is_my == 1){
								common.backWithParama('/page/cart/address.html?is_my=1')
							}else{
								common.backWithParama('/page/cart/address.html')
							}
						},
						fail: function(res) {
							if(res.data.code == 3){
								if(is_my == 1){
									common.backWithParama('/page/cart/address.html?is_my=1')
								}else{
									common.backWithParama('/page/cart/address.html')
								}
							}else{
								layer.open({
									content: res.data.msg,
									skin: 'msg',
	    							time: 1.5
								})
							}
						}
					}
					if(this.address_id == '') {
						options.action = 'Consignee.AddNewConsignee'
					}else {
						options.action = 'Consignee.EditConsignee';
						options.data.address_id = this.address_id;
					}
					common.globalAjax(options);
				},
				delAdd: function(){
					var _this = this;
					event.preventDefault();
					layer.open({
						content: '确定删除收货地址吗?',
						btn: ['确定', '取消'],
						no: function(index) {
							layer.close(index);
						},
						yes: function(index) {
							layer.close(index);
							common.globalAjax({
								action: 'Consignee.DeleteConsignee',
								data: {
									address_id: _this.address_id
								},
								done: function(res) {
									if(is_my == 1){
										common.backWithParama('/page/cart/address.html?is_my=1')
									}else{
										window.location.href = '/page/cart/address.html?cartid=' + common.getUrlData('cartid');
									}
								}
							})
						}
					})
				}
			},
			checkvalue: function() {
				var msg = '';
				var need_sid = common.getUrlData("need_sid");
				var reg_zw = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
				if($('#name').val() == '') {
					msg = '请输入真实姓名!';
				}
				if($('#phone').val() == '') {
					msg = '请输手机号码!';
				}
				if(!/^1[3|4|5|7|8][0-9]\d{8}$/.test($('#phone').val())) {
					msg = '请输入正确的手机号码!';
				}
				if($('select option:selected').val() == ''){
					msg = '请选择收货城市信息!';
				}
				if($('#address').val() == ''){
					msg = '请填写详细收货地址!';
				}
				if(parseInt(need_sid) == 1){
					if(!reg_zw.test($('#name').val())){
						msg = '请输入真实中文姓名!';
					}
					if($('#idCard').val() == '') {
						msg = '请输入身份证号！';
					}
					if(!/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test($('#idCard').val())) {
						msg = '请输入正确的身份证号！';
					}
				}

				return msg;
			}
		})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);