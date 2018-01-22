
var player = new EZUIPlayer('myPlayer1');
var player = new EZUIPlayer('myPlayer2');
var player = new EZUIPlayer('myPlayer3');
var player = new EZUIPlayer('myPlayer4');
var player = new EZUIPlayer('myPlayer5');
var player = new EZUIPlayer('myPlayer6');
var player = new EZUIPlayer('myPlayer7');
var player = new EZUIPlayer('myPlayer8');

var echarDate = [];
var echarData = [];

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
option = {
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

function echarShow(selector, opt){
    var dom = document.getElementById(selector) || window.parent.document.getElementById(selector);
    var myChart = echarts.init(dom);
    var factoryId="";//工厂id
    var valueName="";//值
    if (opt && typeof opt === "object") {
        myChart.setOption(opt, true);
    }
    $.ajax({
        method:'post',
        url:server_path+'/dev/getList',
        data:{
            factoryId:factoryId,
            valueName:valueName
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

setInterval(function () {
    //addData(true);
    echarShow("container", option);
}, 3000);

$(function(){
    echarShow("container", option);
})
function updateEchar(factoryId,valueName){
    this.factoryId=factoryId;
    this.valueName=valueName;
    echarShow("container", option);
}

// search history modal show
$('.history-search').on('click',function(){
    $('.mask', parent.document).css('display','block');
    var his = $('.history', parent.document).attr('class')
    console.log(his);
    echarShow(his, option1);
})

//首页表单加载
$(function () {
    $('#example2').DataTable({
        "serverSide": true,
        ajax:{
            "url": server_path+'/factroy/getFactory',
            "data":{
                "a": 451
            }
        },
        "columns": [
            {"data": "factoryId", "bSortable": false},
            {"data": "factoryName"}
        ],
        "columnDefs": [
            {
                "render": function ( data, type, row ) {
                    return "<span onclick='updateEchar(\""+row['factoryId']+"\",\"enter_pressure\")'>"+row["enterPressure"]+" KPa</span>";
                },
                "targets": 2
            },
            {
                "render": function ( data, type, row ) {
                    return "<span>"+row["leavePressure"]+" KPa</span>";
                },
                "targets": 3
            },
            {
                "render": function ( data, type, row ) {
                    return "<span>"+row["enterTemperature"]+" ℃</span>";
                },
                "targets": 4
            },
            {
                "render": function ( data, type, row ) {
                    return "<span>"+row["leaveTemperature"]+" ℃</span>";
                },
                "targets": 5
            },
            {
                "render": function ( data, type, row ) {
                    return "<span>"+row["waterOpen"]+" %</span>";
                },
                "targets": 6
            },
            {
                "render": function ( data, type, row ) {
                    return "<span>"+row["plusPressure"]+" MPa</span>";
                },
                "targets": 7
            },
            {
                "render": function ( data, type, row ) {
                    return "<span>"+row["horizontalVibration"]+" mm/s</span>";
                },
                "targets": 8
            },
            {
                "render": function ( data, type, row ) {
                    return "<span>"+row["verticalVibration"]+" mm/s</span>";
                },
                "targets": 9
            },
            {
                "render": function ( data, type, row ) {
                    return "<span>"+row["millCurrent"]+" A</span>";
                },
                "targets": 10
            },
            {
                "render": function ( data, type, row ) {
                    return "<span>"+row["feedVolume"]+" t/h</span>";
                },
                "targets": 11
            }
        ],
        //'paging'      : true,
        'lengthChange': false,
        'searching'   : false,
        'ordering'    : false,
        'info'        : true,
        'autoWidth'   : false
    })
});