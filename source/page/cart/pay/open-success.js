require([
    'jquery',
    'Vue',
    'vendor/common.js'
], function($, Vue, common) {

    var paySuccess = new Vue({
        el: '#cart-pay',
        data: {
            is_app: common.checkAPP()
        },
        ready: function() {
        },
        methods: {
            gotoPage: function(page) {
                switch(page) {
                    case 'success':
                        window.location.href = 'callApp://goShop';
                        break;
                }
            },
            goDownload: function(){
                var downURL = "http://page.miyanmz.com/apk/miyan_v1.3.0_2017-02-09_official.apk"; //在浏览器打开下载地址
                var downURL_ios = "https://itunes.apple.com/us/app/mi-yan/id1130222944";//ios客户端下载链接
                var downURL_android = "http://a.app.qq.com/o/simple.jsp?pkgname=com.globalegrow.miyan";//android客户端下载链接
                if(common.checkAPP() == 'wechat'){
                    window.location.href = downURL_android;
                }else if(common.checkUA() == 'ios'){
                    window.location.href = downURL_ios;
                }else if(common.checkUA() == 'android'){
                    window.location.href = downURL_android;
                }else{
                    window.location.href = downURL;
                }

            }
        }
    })
})
