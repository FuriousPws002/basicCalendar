/**
 * 简单日历实现工具类
 */
(function($){
    function BasicCalendar(){}
    var curDate=new Date();
    BasicCalendar.prototype.curYear=curDate.getFullYear();
    BasicCalendar.prototype.curMonth=curDate.getMonth();
    BasicCalendar.prototype.__init= function (curYear,curMonth) {
        var curYear=this.curYear=curYear || this.curYear;
        var curMonth=this.curMonth=curMonth || this.curMonth;

        //得到当前月的第一天
        var firstDayToMonth=new Date(curYear,curMonth,1);
        //得到当前月的第一天对应的星期(星期天为0)
        var firstDayToWeek=firstDayToMonth.getDay();

        //计算当前月的天数
        var curMonthDays=calcTools.calcCurMonthDays(curYear,curMonth);
        //定义用来装载天数的容器
        var __td=[];
        //===================生成7*6的表格==================
        for(var i=1;i<=curMonthDays;i++){
            var _td="<td>"+i+"</td>";
            __td.push(_td);
        }

        for(var i=0;i<firstDayToWeek;i++){
            var _td="<td></td>";
            __td.unshift(_td);
        }
        var tdCount=__td.length;
        var restCount=42-tdCount;
        for(var i=0;i<restCount;i++){
            var _td="<td></td>";
            __td.push(_td);
        }

        for(var i=35;i>=7;){
            __td.splice(i,0,"</tr><tr>");
            i-=7;
        }
        __td.unshift("<tr>");
        __td.push("</tr>");
        //===================生成表格结束====================

        $("#calendar-days").append($(__td.join("")));

        //设置显示的当前年和当前月
        $("#viewYear").text(curYear);
        $("#viewMonth").text(curMonth+1);
    };

    //定义月份数
    var monthArr=[31,28,31,30,31,30,31,31,30,31,30,31];
    var monthLeapArr=[31,29,31,30,31,30,31,31,30,31,30,31];
    /**
     * 计算工具类
     * @type {{isLeapYear: calcTools.isLeapYear,        判断是否为闰年
     * calcCurMonthDays: calcTools.calcCurMonthDays,    计算当前月的天数
     * calcPrevMonth: calcTools.calcPrevMonth,          计算上一个月以及年份
     * calcNextMonth: calcTools.calcNextMonth}}         计算下一个月以及年份
     */
    var calcTools={
        isLeapYear:function (year){
            var cond1 = year % 4 == 0;  //条件1：年份必须要能被4整除
            var cond2 = year % 100 != 0;  //条件2：年份不能是整百数
            var cond3 = year % 400 ==0;  //条件3：年份是400的倍数
            //当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
            //如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
            //所以得出判断闰年的表达式：
            var cond = cond1 && cond2 || cond3;
            if(cond) {
                return true;
            } else {
                return false;
            }
        },
        calcCurMonthDays: function (year,month) {
            if (calcTools.isLeapYear(year)){
                return monthLeapArr[month];
            }
            return monthArr[month];

        },
        calcPrevMonth: function () {
            if(basicCalendar.curMonth==0){
                basicCalendar.curYear-=1;
                basicCalendar.curMonth=11;
            }else{
                basicCalendar.curMonth-=1;
            }
        },
        calcNextMonth: function () {
            if(basicCalendar.curMonth==11){
                basicCalendar.curYear+=1;
                basicCalendar.curMonth=0;
            }else{
                basicCalendar.curMonth+=1;
            }
        }
    };

    var basicCalendar=new BasicCalendar();

    $(function(){

        //上一月
        $("body").delegate("#prev-month","click",function(){
            $("#calendar-days").empty();
            calcTools.calcPrevMonth();
            basicCalendar.__init();
        });

        //下一月
        $("body").delegate("#next-month","click",function(){
            $("#calendar-days").empty();
            calcTools.calcNextMonth();
            basicCalendar.__init();
        });

        //设置天数点击事件
        $("body").delegate("#calendar-days td","click",function(){

        });
    })


    $.fn.extend({
        //生成日历组件
        createBasicCalendar: function (year,month) {
            var $__calBar=$('<div id="calendar-bar">'+
                                '<div id="bar-left">'+
                                '<span id="viewYear"></span>年'+
                                '<span id="viewMonth"></span>月'+
                                '</div>'+
                                '<div id="bar-rigth">'+
                                '<button id="prev-month">《</button>'+
                            '<button id="next-month">》</button>'+
                            '</div>'+
                            '</div>');

            var $__tabel=$('<table id="table-calendar" border="1px" bordercolor="#f3f3f3" cellspacing="0px" style="border-collapse:collapse">'+
                                '<thead id="calendar-week">'+
                                '<td>日</td>'+
                                '<td>一</td>'+
                                '<td>二</td>'+
                                '<td>三</td>'+
                                '<td>四</td>'+
                                '<td>五</td>'+
                                '<td>六</td>'+
                                '</thead>' +
                                '<tbody id="calendar-days">'+
                                '</tbody>'+
                                '</table>');

            $(this).append($__calBar).append($__tabel);

            basicCalendar.__init(year,month-1);

        }
    });
})(jQuery)