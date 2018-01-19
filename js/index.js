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

var dom1 = document.getElementById("history");
var myChart1 = echarts.init(dom1);
var echarDate1 = [];
var echarData1 = [];

var factoryId1="";//工厂id
var valueName1="";//值

$.ajax({
    method:'post',
    url:server_path+'/dev/getList',
    dataType:"json",
    async:false,
    success: function(data){
        echarDate= data.data.dataList;
        echarData= data.data.valueList;
    }
})

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
        data: echarDate1
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
            data: echarData1
        }
    ]
};

setInterval(function () {
    echarShow();
}, 30000);
if (option1 && typeof option1 === "object") {
    myChart1.setOption(option1, true);
}

function echarShow(){
    $.ajax({
        method:'post',
        url:server_path+'/dev/getList',
        data:{
            factoryId1:factoryId1,
            valueName1:valueName1
        },
        dataType:"json",
        async:false,
        success: function(data){
            echarDate1= data.data.dataList;
            echarData1= data.data.valueList;
        }
    })
    myChart1.setOption({
        xAxis: {
            data: echarDate1
        }
        ,
        series: [{
            name:'成交',
            data: echarData1
        }]
    });
}

//modal隐藏
$(function(){
    $('.close-mod').on('click',function(){
        $('.mask').css('display','none');
    })
})

// 更多历史查询时间选择
$(function () {
    $(".datepicker").datepicker({
        language: "zh-CN",
        autoclose: true,//选中之后自动隐藏日期选择框
        clearBtn: true,//清除按钮
        todayBtn: true,//今日按钮
        format: "yyyy-mm-dd"//日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
    });
});