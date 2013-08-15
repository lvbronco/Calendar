var month=["January","February","March","April","May","June",
    "July", "August","September","October","November","December"];

var dow=["sun", "mon", "tue", "wed", "thr", "fri", "sat"];

$(document).ready(function() {
    //var d = new Date("2011-08-17 12:09:36");
    var d = new Date();
    var g = new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0);
    var s = new Date("2013-05-01 00:00:00");
    var e = new Date("2013-05-01 00:00:00");
    $("#dateStore").val(g);
    fillCalendar(g);
    drawSchedule(s, e);
});

function fillCalendar(d) {
    var n = month[d.getMonth()];
    $("#month").html(n + " " + (1900 + d.getYear()));
    var dim = daysInMonth(d.getFullYear(), d.getMonth());
    var x = d.getDay();
    d.prevMonth();
    var tdim = daysInMonth(d.getFullYear(), d.getMonth());
    for(var j=x-1; j>=0; j--) {
        var tt = dow[j];
        var telem = "#w0 > ." + tt;
        $(telem).html(tdim).css("color", "#AAA");
        tdim = tdim - 1;
    }
    var w=0;
    for(var i=1; i<=dim; i++) {
        var t = dow[x];
        var elem = "#w" + w + " > ." + t;
        $(elem).html(i).css("color", "#000");
        x = x + 1;
        if(x === 7) {
            w = w + 1;
            x = 0;
        }
    }
    if(x < 7 && w < 6) {
        var ei = 1;
        while(w < 6) {
            var et = dow[x];
            var eelem = "#w" + w + " > ." + et;
            $(eelem).html(ei).css("color", "#AAA");
            x = x + 1;
            if(x === 7) {
                w = w + 1;
                x = 0;
            }
            ei = ei + 1;
        }
    }
}

function drawSchedule(s, e) {
    var numDays=dateDiffInDays(s,e);
    var remainder = numDays;
    var result = getDatePositionForDate(s);
    var week = result[0];
    var myDOW = dow[result[1]];
    do {
        var pDate = $("#w" + week + " > ." + myDOW);
        var pTop = pDate.offset().top + 18;
        var pStart = pDate.offset().left;
        var daysFill;
        if(remainder + result[1] > 7) {
            daysFill = 7 - result[1];
            remainder -= daysFill;
        } else {
            daysFill = remainder;
            remainder = 0;
        }
        var len = 150 * daysFill - 1;
        var styles = {"width": len, "height": "10px", 
            "background-color": "yellow", "position": "absolute", "left": pStart,
            "top": pTop };
        var newD = $('<div class="schedule"></div>');
        $('body').append( newD.css(styles) );
        week++;
        if(week >= 7) {
            break;
        }
        myDOW = "sun";
        result[1] = 0;
    } while( remainder > 0 ) ;
}

function clearSchedule() {
    $(".schedule").remove();
}

function daysInMonth(year, month) {
    var t = new Date(year, month+1, 0).getDate();
    return t;
}

function goPrevMonth() {
    //alert("Prev Month");
    var dd = new Date($("#dateStore").val());
    dd.prevMonth();
    $("#dateStore").val(dd);
    fillCalendar(dd);
    clearSchedule();
    
}

function goNextMonth() {
    var dd = new Date($("#dateStore").val());
    dd.nextMonth();
    $("#dateStore").val(dd);
    fillCalendar(dd);
    clearSchedule();
}

function goPrevYear() {
    //alert("Prev Year");
    var dd = new Date($("#dateStore").val());
    dd.prevYear();
    $("#dateStore").val(dd);
    fillCalendar(dd);
    clearSchedule();
}

function goNextYear() {
    var dd = new Date($("#dateStore").val());
    dd.nextYear();
    $("#dateStore").val(dd);
    fillCalendar(dd);
    clearSchedule();
}

function prevMonth(){
    var thisMonth = this.getMonth();
    this.setMonth(thisMonth-1);
    if(this.getMonth() != thisMonth-1 && (this.getMonth() != 11 || (thisMonth == 11 && this.getDate() == 1)))
        this.setDate(0);
}

function nextMonth(){
    var thisMonth = this.getMonth();
    this.setMonth(thisMonth+1);
    if(this.getMonth() != thisMonth+1 && this.getMonth() !== 0)
        this.setDate(0);
}

function prevYear(){
    var thisYear = this.getYear()+1899;
    this.setFullYear(thisYear);
}
function nextYear(){
    var thisYear = this.getYear()+1901;
    this.setFullYear(thisYear);
}

function getDatePositionForDate(d) {
    return getDatePosition(d.getFullYear(), d.getMonth(), d.getDate());
}

function getDatePosition(year, month, date) {
    var result = [];
    var fDay = new Date(year, month, 1).getDay();
    var week = Math.floor((date + fDay) / 7);
    var dow = new Date(year, month, date).getDay();
    result[0] = week;
    result[1] = dow;
    return result;
}

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    
    return Math.floor((utc2 - utc1) / _MS_PER_DAY) + 1;
}

Date.prototype.nextMonth = nextMonth;
Date.prototype.prevMonth = prevMonth;
Date.prototype.nextYear = nextYear;
Date.prototype.prevYear = prevYear;