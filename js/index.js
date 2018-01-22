/* 

I built this login form to block the front end of most of my freelance wordpress projects during the development stage. 

This is just the HTML / CSS of it but it uses wordpress's login system. 

Nice and Simple

*/

var index = new Vue({
    el: '#index',
    data: {
        pageUrl: "page/dataCenter.html"
    },
    methods: {
        jump: function(ss) {
            this.pageUrl = "page/" + ss + ".html";
        }
    }
});

window.onload = function () {
   function setIframeHeight(iframe) {
       if (iframe) {
           var iframeWin = iframe.contentWindow;
           if (iframeWin.document.body) {
               iframe.height = (iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight) + 500;
           }
       }
    }; 
    setIframeHeight(document.getElementById("mainIframe"));
}

//modal隐藏
$(function(){
    $('.close-mod').on('click',function(){
        $('.mask').css('display','none');
    })
})
// console.log($(".form_datetime"));
$(function(){
  $(".form_datetime").datepicker({
    autoclose: true,
    todayHighlight: true,
    language:"zh-CN", 
    format:"yyyy-mm-dd"
  });
})

