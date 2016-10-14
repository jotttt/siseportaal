/*jshint multistr: true, jquery: true*/
function VacationsTable(container, config, data) {

    this.container = container;
    this.container.empty();
    this.config = config;
    this.start = config.start;
    this.end = config.end;
    this.data = data;
    this.dataCellWidth = 24;
    this.dataCellHeight = 24;
    this.months = config.months;
    this.dow = config.dow;
    this.leaveStyles = config.leaveStyles;
    this.currentDay = this.getCurrentDay();
    this.days = this.makeDaysArray(this.start, this.end);
    this.daysCount = this.days.length;
    this.makeTable();
    this.processJson();

    $('#table_div').scroll(function () {
        VacationsTable.prototype.scroll();
    });
    this.clickActions();
}

VacationsTable.prototype.makeDaysArray = function (start, end) {
    var days = [];
    var s = new Date(start);
    var e = new Date(end);
    var s_ = s.toISOString().slice(0, 10);
    var e_ = e.toISOString().slice(0, 10);
    var d_ = s_;

    while (d_ <= e_) {
        var d = new Date(d_);
        days.push(d);
        var dd = new Date(d);
        dd.setDate(d.getDate() + 1);
        d_ = dd.toISOString().slice(0, 10);
    }
    return days;
};

VacationsTable.prototype.makeTable = function () {
    this.container.append(
        '<table class="advancedTable"> <tr> <td id="firstTd"> </td> <td> \n\
<div id="divHeader" class="tableFixedTop"> \n\
<table class="tableYear"></table> \n\
<table class="tableMonth"></table> \n\
<table class="tableDay"></table> \n\
<table class="tableWeekDay"></table> \n\
</div> </td> </tr><tr> <td> <div id="firstcol"> \n\
<table class="tableFixedLeft"></table> \n\
</div> </td> <td valign="top"> \n\
<div id="table_div" class="tableDataContainer"> \n\
<div class="leaveBars"></div> \n\
<table class="tableData"></table> </div> </td> </tr> </table> \n\
<div class="advancedTableControls"> \n\
<span class="advancedTableControlsContainer"> \n\
<a id="advancedTableControlsUp" ><i class="fa fa-arrow-up"></i></a> \n\
<a id="advancedTableControlsDown"><i class="fa fa-arrow-down"></i></a> \n\
<a id="advancedTableControlsLeft"><i class="fa fa-arrow-left"></i></a> \n\
<a id="advancedTableControlsRight"><i class="fa fa-arrow-right"></i></a></span> \n\
</div> \n\
<div id="debugDiv"></div>');

};

VacationsTable.prototype.log = function (msg) {
    //$('#debugDiv').append('<p>' + msg + '</p>');
};

VacationsTable.prototype.processJson = function () {
    this.createDaysOfMonth();
    this.createDaysOfWeeks();
    this.createMonthsAndYears();
    this.createPersonList();
    this.createDataCells();

    var isMobile = mobileAndTabletcheck();
    //determine table size
    var maxWidth = parseInt($(this.container).css('width')) - 233;
    var windowH = $(window).height();
    this.log('windowH=' + windowH);
    var maxHeight;
    if (isMobile) {
        maxHeight = $(window).height() - 150;
    } else {
        maxHeight = $(window).height() - 335;
    }
    //    var calendarHeight = this.data.vacations.length * (this.dataCellHeight + 1) - 15;
    var calendarHeight = this.data.vacations.length * (this.dataCellHeight + 1) - 4;

    this.log('maxHeight=' + maxHeight);

    if (calendarHeight > maxHeight) {
        calendarHeight = maxHeight;
    }
    this.log('calendarHeight=' + calendarHeight);
    var tableDataContainerWidth = this.calculateTableDataContainerWidth();
    $(".tableFixedTop").css({
        "width": (tableDataContainerWidth > maxWidth) ? maxWidth - 16 : tableDataContainerWidth - 16 + "px"
    });

    $(".tableDataContainer").css({
        "width": (tableDataContainerWidth > maxWidth) ? maxWidth : tableDataContainerWidth + "px", "min-width": "21px"
    });

    $("#firstcol").css({
        "height": calendarHeight + 4 + "px"
    });

    $(".tableData").css({
        "width": tableDataContainerWidth + "px"
    });

    var tableW = this.calculateTableWidth();
    $(".advancedTable").css({
        "width": (tableW + "px")
    });
    $(".advancedTableControls").css({
        "width": (tableW - 22 +  "px")
    });

    if (isMobile) {
        this.log('mobile detected');

        $(".tableDataContainer").css({
            "height": calendarHeight + 4 + "px"
        });


        var tableDataContainerH = $('.tableDataContainer').height();
        this.log('tableDataContainer h=' + tableDataContainerH);
        var firstcolH = $('#firstcol').height();
        this.log('firstcol h=' + firstcolH);
        $("#firstcol").css({
            "height": tableDataContainerH + "px", "border-bottom": "1px solid #e5e6e7"
        });

        var tableDataContainerWidth = $('.tableFixedTop').width();
        $(".tableFixedTop").css({
            "width": tableDataContainerWidth + 16 + "px", "box-shadow": "none"
        });

    } else {
        this.log('desktop detected');
        $(".tableFixedTop").css({
            '-webkit-box-shadow': '20px 0px 0px 0px #e5e6e7',
            '-moz-box-shadow': '20px 0px 0px 0px #e5e6e7',
            'box-shadow': '20px 0px 0px 0px #e5e6e7'
        });
        $(".tableDataContainer").css({
            "height": calendarHeight + 21 + "px"
        });
    }

    this.createLeaveIndicators();
    this.addCurrentDayMarker();
    this.scrollToCurrentDay();
};

VacationsTable.prototype.calculateTableWidth = function () {
    var tableFixedLeftW = $('.tableFixedLeft').width();
    var tableDataContainerW = $('.tableDataContainer').width();
    console.log('ontouchstart' in document.documentElement);
    return tableFixedLeftW + tableDataContainerW + 16;

};

VacationsTable.prototype.isWeekend_ = function (day) {
    return day % 6 === 0;
};

VacationsTable.prototype.isWeekend = function (date) {
    var d = new Date(date).getDay();
    return d % 6 === 0;
};

VacationsTable.prototype.makeDate = function (y, m, d) {
    m = (m < 9) ? ('0' + (m + 1)) : (m + 1);
    d = (d < 9) ? ('0' + (d + 1)) : (d + 1);
    return y + "-" + m + "-" + d;
};

VacationsTable.prototype.createDaysOfMonth = function () {
    var daysHTML = '<tr>';
    for (var i = 0; i < this.days.length; ++i) {
        var day = this.days[i].getDate();
        var date = this.days[i].toISOString().slice(0, 10);
        daysHTML += '<td><div data-date="' + date + '" class="tableHeader ';
        if (this.isWeekend(date)) {
            daysHTML += 'we';
        }
        //add special holiday class
        if ($.inArray(date, this.data.holidays) !== -1) {
            daysHTML += ' sh';
        }
        daysHTML += '">' + day + '</div></td>';
    }
    daysHTML += '</tr>';
    $(".tableDay").append(daysHTML);
};

VacationsTable.prototype.createPersonList = function () {
    var personsHTML = '';
    for (var i = 0; i < this.data.vacations.length; ++i) {
        if (this.data.vacations[i].name) {
            personsHTML += '<tr><td><div class="tableFirstCol">' + this.data.vacations[i].name + '</div></td></tr>';
        }
    }
    $(".tableFixedLeft").append(personsHTML);
};

//add data cells
VacationsTable.prototype.createDataCells = function () {
    var dataCellsHTML = '';
    for (var i = 0; i < this.data.vacations.length; i++) {
        var id = this.data.vacations[i].id;
        dataCellsHTML += '<tr data-id="' + id + '">';
        for (var j = 0; j < this.days.length; ++j) {
            var day = this.days[j].getDay();
            var date = this.days[j].toISOString().slice(0, 10);
            //add data atributes to every cell
            dataCellsHTML += '<td data-date="' + date + '"class="';
            //add weekend class
            if (this.isWeekend_(day) === true) {
                dataCellsHTML += 'we';
            }
            //add special holiday class
            if ($.inArray(date, this.data.holidays) !== -1) {
                dataCellsHTML += ' sh';
            }
            dataCellsHTML += '"></td>';
        }
        dataCellsHTML += '</tr>';
    }
    $(".tableData").append(dataCellsHTML);
};

//add days of week
VacationsTable.prototype.createDaysOfWeeks = function () {
    var daysHTML = '<tr>';
    for (var i = 0; i < this.days.length; ++i) {
        var day = this.days[i].getDay();
        var date = this.days[i].toISOString().slice(0, 10);
        daysHTML += '<td><div data-date="' + date + '" class="tableHeader ';
        //add weekend class
        if (this.isWeekend_(day) === true) {
            daysHTML += 'we';
        }
        //add special holiday class
        var date = this.days[i].toISOString().slice(0, 10);
        if ($.inArray(date, this.data.holidays) !== -1) {
            daysHTML += ' sh';
        }
        //add weekday letter
        day = day - 1;
        // 0 is sunday
        if (day < 0) {
            day = 6;
        }
        daysHTML += '">' + this.dow[day] + '</div></td>';
    }
    daysHTML += '</tr>';
    $(".tableWeekDay").append(daysHTML);
};

VacationsTable.prototype.parseDate = function (str) {
    var dmy = str.split('-');
    return new Date(dmy[0], dmy[1] - 1, dmy[2]);
};

VacationsTable.prototype.daydiff = function (from, to) {
    return Math.round((this.parseDate(to) - this.parseDate(from)) / (1000 * 60 * 60 * 24) + 1);
};

VacationsTable.prototype.createLeaveIndicators = function () {
    for (var i = 0; i < this.data.vacations.length; i++) {
        var leaveBarsHTML = '';
        var vacation = this.data.vacations[i];
        var personId = vacation.id;

        for (var j = 0; j < vacation.values.length; j++) {
            var id = vacation.values[j].id;
            var name = vacation.name;
            var from = vacation.values[j].from;
            var to = vacation.values[j].to;

            if (from > this.end || (from < this.start && to < this.start)) {
                continue; // out of range
            }
            if (from < this.start && to >= this.start) {
                from = this.start;
            }
            //var to = vacation.values[j].to;
            if (to > this.end) {
                to = this.end;
            }
            var numOfDays = this.daydiff(from, to);
            var leaveType = vacation.values[j].type;
            var leaveName = vacation.values[j].label;
            var leaveStyle = this.leaveStyles[vacation.values[j].type];
            var pos = $('tr[data-id="' + personId + '"] td[data-date="' + from + '"]').position();
            var barSize = numOfDays * this.dataCellWidth - 8;
            var top = pos.top + 3;
            var left = pos.left + 4;

            leaveBarsHTML += '<div id="' + id + '" data-name="' + name + '" data-from="' + from
                + '" data-to="' + to + '"  data-type="' + leaveType
                + '" data-toggle="tooltip" title="' + leaveName + '" style="top: ' + top
                + 'px;left: ' + left + 'px;width: ' + barSize + 'px" class="leaveBar '
                + leaveStyle + '"><div class="leaveBarText">' + leaveName + '</div></div>';
            $(".leaveBars").append(leaveBarsHTML);
        }
    }
};

//find width of table
VacationsTable.prototype.calculateTableDataContainerWidth = function () {
    return(this.daysCount * this.dataCellWidth + 1);
};

VacationsTable.prototype.createMonthsAndYears = function () {
    var yearsHTML = '<tr>';
    var currentYear = this.days[0].getFullYear();
    var daysCountInYear = 0;
    var yearCellWidth = 0;

    var monthsHTML = '<tr>';
    var currentMonth = this.days[0].getMonth();
    var daysCountInMonth = 0;

    for (var i = 0; i < this.days.length; ++i) {
        var month = this.days[i].getMonth();
        if (month !== currentMonth || i === this.days.length - 1) {
            if (i === this.days.length - 1) {
                ++daysCountInMonth;
            }
            var monthCellWidth = this.dataCellWidth * daysCountInMonth - 1;
            monthsHTML += '<td><div class="tableHeader" style="width: ' + monthCellWidth + 'px"> ' + this.months[currentMonth] + '</div></td>';
            currentMonth = month;
            daysCountInMonth = 0;
            yearCellWidth += monthCellWidth + 1;
        }
        ++daysCountInMonth;

        var year = this.days[i].getFullYear();
        // if year changes or last elem of array
        // then make year's div
        if (year !== currentYear || i === (this.days.length - 1)) {
            //var yearCellWidth = this.dataCellWidth * daysCountInYear;
            yearCellWidth = yearCellWidth - 1;
            yearsHTML += '<td><div class="tableHeader" style="width: ' + yearCellWidth + 'px"> ' + currentYear + '</div></td>';
            currentYear = year;
            daysCountInYear = 0;
            yearCellWidth = 0;
        }
        ++daysCountInYear;

    }
    yearsHTML += '</tr>';
    $(".tableYear").append(yearsHTML);

    monthsHTML += '</tr>';
    $(".tableMonth").append(monthsHTML);
};

VacationsTable.prototype.scrollToCurrentDay = function () {
    var d = new Date(this.currentDay);
    // if current day is not in range, don't try to scroll
    if (d < new Date(this.start) || d > new Date(this.end)) {
        return;
    }
    var p = $(".tableDay div[data-date='" + this.currentDay + "']").position();
    $(".tableDataContainer").animate({scrollLeft: p.left - 248}, 0);

};

VacationsTable.prototype.addCurrentDayMarker = function () {
    $(".tableDay div[data-date='" + this.currentDay + "']").addClass("cdt");
    $(".tableWeekDay div[data-date='" + this.currentDay + "']").addClass("cdb");
};

VacationsTable.prototype.getCurrentDay = function () {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    return(d.getFullYear() + '-' +
           (('' + month).length < 2 ? '0' : '') + month + '-' +
           (('' + day).length < 2 ? '0' : '') + day);
};

//function to support scrolling of header
VacationsTable.prototype.scroll = function () {
    $('#divHeader').scrollLeft($('#table_div').scrollLeft());
    $('#firstcol').scrollTop($('#table_div').scrollTop());
};

//table click events
VacationsTable.prototype.clickActions = function () {
    var this_ = this;
    $('.leaveBar').click(function () {
        var id = $(this).attr('id');
        this_.config.onItemClick(id);
    });

    $('.tableData td').click(function () {
        //get current tablecell info
        var date = $(this).data('date');
        var id = $(this).parent().data('rid');
        this_.config.onAddClick(date, id);
    });

    $('#advancedTableControlsUp').click(function () {
        $('.tableDataContainer').css('overflow','hidden');
        $(".tableDataContainer").animate({scrollTop:($('.tableDataContainer').scrollTop() - 25 * 5)}, 'slow');
        $('.tableDataContainer').css('overflow','scroll');
    });

    $('#advancedTableControlsDown').click(function () {
        $('.tableDataContainer').css('overflow','hidden');
        $(".tableDataContainer").animate({scrollTop:($('.tableDataContainer').scrollTop() + 25 * 5)}, 'slow');
        $('.tableDataContainer').css('overflow','scroll');
    });

    $('#advancedTableControlsLeft').click(function () {
        $('.tableDataContainer').css('overflow','hidden');
        $(".tableDataContainer").animate({scrollLeft:($('.tableDataContainer').scrollLeft() - 24 * 5)}, 'slow');
        $('.tableDataContainer').css('overflow','scroll');
    });

    $('#advancedTableControlsRight').click(function () {
        $('.tableDataContainer').css('overflow','hidden');
        $(".tableDataContainer").animate({scrollLeft:($('.tableDataContainer').scrollLeft() + 24 * 5)}, 'slow');
        $('.tableDataContainer').css('overflow','scroll');
    });
};

//(function ($) {
//    $.fn.hasScrollBar = function () {
//        var e = this.get(0);
//        return {
//            vertical: e.scrollHeight > e.clientHeight,
//            horizontal: e.scrollWidth > e.clientWidth
//        };
//    }
//})(jQuery);

window.mobileAndTabletcheck = function () {
    var check = false;
        if (0 === 0) {
            check = true;
        }
    return check;
};
