webpackJsonp([45,53],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(46, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(2),
		__webpack_require__(3),
		__webpack_require__(4),
		__webpack_require__(16)
	]; (function($, Vue, common, layer, toJSON) {

		var tyz = new Vue({
			el: '#tyz-address',
			data: {
				info: {}
			},
			ready: function() {

			},
			methods: {
				clickAddress: function() {
					//点击调起选择地址
					setup();
					$('.address-li em').hide();
	        		$(".addressBox,.hideBox").show();
				},
				closeAddress: function() {
					//关闭地址选择框
					$(".addressBox").removeClass('bounceInUp');
			        $(".addressBox").addClass('bounceOutDown');
			        setTimeout(function(){
			            $("#country,.addressBox,.hideBox").hide();
			            $('#country li,#city li').remove();
			            $("#country").show();
			            $("#countryTxt-nav").addClass('active').siblings().removeClass('active');
			            $("#countryTxt-nav,#cityTxt-nav,#countryTxt-nav").html('请选择');
						$("#cityTxt-nav,#countryTxt-nav").hide();
			            $(".addressBox").removeClass('bounceOutDown');
			            $(".addressBox").addClass('bounceInUp');
			        },500);
			        $('.address-li em').show();
				},
				goSubmit: function(){
					var msg = this.$options.checkvalue();
					if(msg != '') {
						layer.open({
							content: msg,
							skin: 'msg',
	    					time: 1.5
						})
						return;
					}

					//组装体验装
					var js_arr = [];
					var productCode_all = common.getUrlData('productCode').split(',');
					var count_all = common.getUrlData('count').split(',');
		            for (var i = 0; i < productCode_all.length; i++) {
		            	js_arr[i] = {productCode:productCode_all[i],count:count_all[i]};
		            }
					var options = {
						action: 'Agency.submitTyz',
						urlEdition: 'v3_0',
						data: {
							js_name: $('#js_name').val(),
							js_iphone: $('#js_iphone').val(),
							js_shrprovince: $('#provinceTxt').html(),
							js_shrcity: $('#cityTxt').html(),
							js_countryTxt: $('#countryTxt').html(),
							js_address: $('#js_address').val(),
							productData: $.toJSON(js_arr)
						},
						done: function(res) {
							layer.open({
								content: '<h3>试用装领取成功！</h3><p>地址已保存~</p>',
								btn:['好的'],
								yes: function(index){
							        layer.close(index);
							        window.location.href = "/page/user/tiyanzhuang.html";
							    }
							})
						},
						fail: function(res) {
							layer.open({
								content: res.data.msg,
								skin: 'msg',
	    						time: 1.5
							})
						}
					}
					common.globalAjax(options);
				}
			},
			checkvalue: function() {
				var msg = '';

				if($('#js_name').val() == '') {
					msg = '请输入真实姓名!';
				}else if($('#js_iphone').val() == '') {
					msg = '请输入手机号码!';
				}else if(!/^1[3|4|5|7|8][0-9]\d{8}$/.test($('#js_iphone').val())) {
					msg = '请输入正确的手机号码!';
				}else if($('#provinceTxt').html() == ''){
					msg = '请选择收货城市信息!';
				}else if($('#js_address').val() == ''){
					msg = '请填写详细收货地址!';
				}
				return msg;
			}
	})

	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})

/***/ }
]);