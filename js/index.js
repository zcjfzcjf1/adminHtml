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
  $(".form_datetime").datetimepicker({
      minView:0,
      maxView:6,
      autoclose: true,
    todayHighlight: true,
    language:"zh-CN",
    format:"yyyy-mm-dd hh:ii:00"
  });
})

window.factoryId="";
window.valueName="";
window.currentTime=new Date();
window.currentDate="";
function front(){
    if(window.currentDate==""){
        window.currentDate=new Date().format("yyyy-MM-dd hh:mm:ss");
    }else{
        window.currentTime.setMinutes (window.currentTime.getMinutes () - 10);
        window.currentDate=window.currentTime.format("yyyy-MM-dd hh:mm:ss");
    }
    var his = $('.history', document).attr('class')
    findDateGetEcharShow(his,option1,window.currentDate);

}



function after(){
    if(window.currentDate==""){
        window.currentDate=new Date().format("yyyy-MM-dd hh:mm:ss");
    }else{
        window.currentTime.setMinutes (window.currentTime.getMinutes () + 10);
        window.currentDate=window.currentTime.format("yyyy-MM-dd hh:mm:ss");
    }
    var his = $('.history', document).attr('class');
    findDateGetEcharShow(his,option1,window.currentDate);
}

function search(){
    var his = $('.history', document).attr('class');
    findDateGetEcharShow(his,option1,$("#form_datetime1").val());
}



Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

function findDateGetEcharShow(selector, opt,date){
    var dom = document.getElementById(selector) || window.parent.document.getElementById(selector);
    var myChart = echarts.init(dom);
    var factoryId=window.factoryId;//工厂id
    var valueName=window.valueName;//值
    if (opt && typeof opt === "object") {
        myChart.setOption(opt, true);
    }
    $.ajax({
        method:'post',
        url:server_path+'/dev/getList',
        data:{
            factoryId:factoryId,
            valueName:valueName,
            Date:date
        },
        dataType:"json",
        async:false,
        success: function(data){
            echarDate= data.data.dataList;
            echarData= data.data.valueList;
        }
    })
    myChart.setOption({
        xAxis: {
            data: echarDate
        }
        ,
        series: [{
            name:'成交',
            data: echarData
        }]
    });
}


var echarDate = [];
var echarData = [];
option1 = {
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            return "时间:"+params[0].axisValue+" 值:"+params[0].data;
        },
        axisPointer: {
            animation: false
        }
    },

    xAxis: {
        type: 'category',
        boundaryGap: [0, '50%'],
        splitNumber:5,
        data: echarDate
    },
    yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value'
    },
    series: [
        {
            name:'成交',
            type:'line',
            smooth:true,
            symbol: 'none',
            stack: 'a',
            areaStyle: {
                normal: {}
            },
            data: echarData
        }
    ]
};