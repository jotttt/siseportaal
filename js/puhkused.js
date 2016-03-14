/*jshint browser: true, jquery: true*/

/**********************************************************
DATA
**********************************************************/

var data =  {
	source: [{
		name: "Anna Kolossova",
		values: [{
			from: "2016-01-17",
			to: "2016-01-31",
			type: "Puhkus"
		}]
	},{
		name: "Sander Marandi",
		values: [{
			from: "2016-01-04",
			to: "2016-02-15",
			type: "Puhkus"
		}]
	},{
		name: "Villu Vooglaid",
		values: [{
			from: "2016-01-25",
			to: "2016-02-05",
			type: "Lähetus"
		}]
	},{
		name: "Madis Jõhvik",
		values: [{
			from: "2016-01-02",
			to: "2016-01-25",
			type: "Koolitus"
		}]
	},{
		name: "Peeter Kuusik",
		values: [{
			from: "2016-01-17",
			to: "2016-01-29",
			type: "Lähetus"
		}]
	},{
		name: "Mall Pärn",
		values: [{
			from: "2016-01-14",
			to: "2016-01-25",
			type: "Puhkus"
		}]
	},{
		name: "Signe Lepp",
		values: [{
			from: "2016-01-17",
			to: "2016-01-28",
			type: "Koolitus"
		}]
	},{
		name: "Olavi Kesk",
		values: [{
			from: "2016-01-11",
			to: "2016-01-23",
			type: "Koolitus"
		}]
	},{
		name: "Pärtel Meerits",
		values: [{
			from: "2016-01-17",
			to: "2016-01-25",
			type: "Puhkus"
		}, {
			from: "2016-03-17",
			to: "2016-04-15",
			type: "Lähetus"
		}]
	},{
		name: "Anna Kolossovaas",
		values: [{
			from: "2016-01-17",
			to: "2016-01-31",
			type: "Puhkus"
		}]
	},{
		name: "Sander Marandias",
		values: [{
			from: "2016-01-04",
			to: "2016-02-15",
			type: "Puhkus"
		}]
	},{
		name: "Villu Vooglaidas",
		values: [{
			from: "2016-01-25",
			to: "2016-02-05",
			type: "Lähetus"
		}]
	},{
		name: "Madis Jõhvikas",
		values: [{
			from: "2016-01-02",
			to: "2016-01-25",
			type: "Koolitus"
		}]
	},{
		name: "Peeter Kuusikas",
		values: [{
			from: "2016-01-17",
			to: "2016-01-29",
			type: "Lähetus"
		}]
	},{
		name: "Mall Pärnas",
		values: [{
			from: "2016-01-14",
			to: "2016-01-25",
			type: "Puhkus"
		}]
	},{
		name: "Signe Leppas",
		values: [{
			from: "2016-01-17",
			to: "2016-01-28",
			type: "Koolitus"
		}]
	},{
		name: "Olavi Keskas",
		values: [{
			from: "2016-01-11",
			to: "2016-01-23",
			type: "Koolitus"
		}]
	},{
		name: "Pärtel Meeritsas",
		values: [{
			from: "2016-01-17",
			to: "2016-01-25",
			type: "Puhkus"
		}, {
			from: "2016-03-17",
			to: "2016-04-15",
			type: "Lähetus"
		}]
	},{
		name: "Anna Kolossovalo",
		values: [{
			from: "2016-01-17",
			to: "2016-01-31",
			type: "Puhkus"
		}]
	},{
		name: "Sander Marandilo",
		values: [{
			from: "2016-01-04",
			to: "2016-02-15",
			type: "Puhkus"
		}]
	},{
		name: "Villu Vooglaidlo",
		values: [{
			from: "2016-01-25",
			to: "2016-02-05",
			type: "Lähetus"
		}]
	},{
		name: "Madis Jõhviklo",
		values: [{
			from: "2016-01-02",
			to: "2016-01-25",
			type: "Koolitus"
		}]
	},{
		name: "Peeter Kuusiklo",
		values: [{
			from: "2016-01-17",
			to: "2016-01-29",
			type: "Lähetus"
		}]
	},{
		name: "Mall Pärnlo",
		values: [{
			from: "2016-01-14",
			to: "2016-01-25",
			type: "Puhkus"
		}]
	},{
		name: "Signe Lepplo",
		values: [{
			from: "2016-01-17",
			to: "2016-01-28",
			type: "Koolitus"
		}]
	},{
		name: "Olavi Kesklo",
		values: [{
			from: "2016-01-11",
			to: "2016-01-23",
			type: "Koolitus"
		}]
	},{
		name: "Pärtel Meeritslo",
		values: [{
			from: "2016-01-17",
			to: "2016-01-25",
			type: "Puhkus"
		}, {
			from: "2016-03-17",
			to: "2016-04-15",
			type: "Lähetus"
		}]
	},{
		name: "Anna Kolossovas",
		values: [{
			from: "2016-01-17",
			to: "2016-01-31",
			type: "Puhkus"
		}]
	},{
		name: "Sander Marandis",
		values: [{
			from: "2016-01-04",
			to: "2016-02-15",
			type: "Puhkus"
		}]
	},{
		name: "Villu Vooglaids",
		values: [{
			from: "2016-01-25",
			to: "2016-02-05",
			type: "Lähetus"
		}]
	},{
		name: "Madis Jõhviks",
		values: [{
			from: "2016-01-02",
			to: "2016-01-25",
			type: "Koolitus"
		}]
	},{
		name: "Peeter Kuusiks",
		values: [{
			from: "2016-01-17",
			to: "2016-01-29",
			type: "Lähetus"
		}]
	},{
		name: "Mall Pärns",
		values: [{
			from: "2016-01-14",
			to: "2016-01-25",
			type: "Puhkus"
		}]
	},{
		name: "Signe Lepps",
		values: [{
			from: "2016-01-17",
			to: "2016-01-28",
			type: "Koolitus"
		}]
	},{
		name: "Olavi Kesks",
		values: [{
			from: "2016-01-11",
			to: "2016-01-23",
			type: "Koolitus"
		}]
	},{
		name: "Pärtel Meeritsis",
		values: [{
			from: "2016-01-17",
			to: "2016-01-25",
			type: "Puhkus"
		}, {
			from: "2016-03-17",
			to: "2016-04-15",
			type: "Lähetus"
		}]
	},{
		name: "Anna Kolossovale",
		values: [{
			from: "2016-01-17",
			to: "2016-01-31",
			type: "Puhkus"
		}]
	},{
		name: "Sander Marandile",
		values: [{
			from: "2016-01-04",
			to: "2016-02-15",
			type: "Puhkus"
		}]
	},{
		name: "Villu Vooglaide",
		values: [{
			from: "2016-01-25",
			to: "2016-02-05",
			type: "Lähetus"
		}]
	},{
		name: "Madis Jõhvike",
		values: [{
			from: "2016-01-02",
			to: "2016-01-25",
			type: "Koolitus"
		}]
	},{
		name: "Peeter Kuusike",
		values: [{
			from: "2016-01-17",
			to: "2016-01-29",
			type: "Lähetus"
		}]
	},{
		name: "Mall Pärne",
		values: [{
			from: "2016-01-14",
			to: "2016-01-25",
			type: "Puhkus"
		}]
	},{
		name: "Signe Leppe",
		values: [{
			from: "2016-01-17",
			to: "2016-01-28",
			type: "Koolitus"
		}]
	},{
		name: "Olavi Keske",
		values: [{
			from: "2016-01-11",
			to: "2016-01-23",
			type: "Koolitus"
		}]
	},{
		name: "Pärtel Meeritse",
		values: [{
			from: "2016-01-17",
			to: "2016-01-25",
			type: "Puhkus"
		}, {
			from: "2016-03-17",
			to: "2016-04-15",
			type: "Lähetus"
		}]
	}]
};
/**********************************************************
END DATA
**********************************************************/


/**********************************************************
TABLE VIEW LOGIC
**********************************************************/
$(document).ready(function(){
	fnAdjustTable();
});

var fnAdjustTable = function(){

	var colCount = $('#firstTr>td').length; //get total number of column

	var m = 0;
	var n = 0;
	var brow = 'mozilla';

	jQuery.each(jQuery.browser, function(i, val) {
		if(val === true){
			brow = i.toString();
		}
	});

	$('.tableHeader').each(function(i){
		if (m < colCount){

			if (brow === 'mozilla'){
				$('#firstTd').css("width",$('.tableFirstCol').innerWidth());//for adjusting first td
				$(this).css('width',$('#table_div td:eq('+m+')').innerWidth());//for assigning width to table Header div
			}
			else if (brow === 'msie'){
				$('#firstTd').css("width",$('.tableFirstCol').width());
				$(this).css('width',$('#table_div td:eq('+m+')').width()-2);//In IE there is difference of 2 px
			}
			else if (brow === 'safari'){
				$('#firstTd').css("width",$('.tableFirstCol').width());
				$(this).css('width',$('#table_div td:eq('+m+')').width());
			}
			else {
				$('#firstTd').css("width",$('.tableFirstCol').width());
				$(this).css('width',$('#table_div td:eq('+m+')').innerWidth());
			}
		}
		m++;
	});

	$('.tableFirstCol').each(function(i){
		if(brow == 'mozilla'){
			$(this).css('height',$('#table_div td:eq('+colCount*n+')').outerHeight());//for providing height using scrollable table column height
		}
		else if(brow == 'msie'){
			$(this).css('height',$('#table_div td:eq('+colCount*n+')').innerHeight()-2);
		}
		else {
			$(this).css('height',$('#table_div td:eq('+colCount*n+')').height());
		}
		n++;
	});

};

//function to support scrolling of title and first column
var fnScroll = function(){
	$('#divHeader').scrollLeft($('#table_div').scrollLeft());
	$('#firstcol').scrollTop($('#table_div').scrollTop());
};

//determine table size
var leaveCalendarWidth = $(".wrapper-content").width()-210;
var leaveCalendarHeight = $(document).height()-350;

$(".tableFixedTop, .tableDataContainer, .tableData").css({
	"width": leaveCalendarWidth  + "px"
});

$("#firstcol, .tableDataContainer").css({
	"height": leaveCalendarHeight  + "px"
});
/**********************************************************
END TABLE VIEW LOGIC
**********************************************************/


/**********************************************************
FILL TABLE WITH YEAR DATA
**********************************************************/

//year to display
var year = 2016;

//find out if leap year
function leapYear(year)
{
	return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}
var isLeapYear = leapYear(year);

//find first weekday of the year
var indexOfFirstDayOfYear = new Date(year,0,1).getDay();
var months =	["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"];
var dow = ["E", "T", "K", "N", "R", "L", "P"];
var firstDayOfYear = indexOfFirstDayOfYear-1;
//----------------------------------

var monthA = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

var monthB = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

var monthC = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];

var monthD = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];

var regularYearSeq = [monthA,monthD,monthA,monthB,monthA,monthB,monthA,monthA,monthB,monthA,monthB,monthA];

var leapYearSeq = [monthA,monthC,monthA,monthB,monthA,monthB,monthA,monthA,monthB,monthA,monthB,monthA];


//add year element width
$(".tableYear, .tableData").css({
	"width": 9151 + "px"
});


//add year
$(".tableYear .tableHeader").html(year);


//add proper widths to month elements
$("#month_1,#month_3,#month_5,#month_7,#month_8,#month_10,#month_12 ").css({
	"width": 775 + "px"
});
$("#month_4,#month_6,#month_9,#month_11").css({
	"width": 750 + "px"
});
$("#month_2").css({
	"width": 700 + "px"
});
$("#month_2").css({
	"width": 725 + "px"
});
//----------------------------------

//add days of month
//----------------------------------
var daysHTML ='<tr>';
for(var j = 0; j < leapYearSeq.length; ++j) {
	for(var i = 0; i < leapYearSeq[j].length; ++i) {
		daysHTML += '<td><div class="tableHeader">' + leapYearSeq[j][i] + '</div></td>';
	}
}
daysHTML +='</tr>';
$(".tableDay").append(daysHTML);
console.log($(".tableDay").width());
//----------------------------------

//add days of week
//----------------------------------
function createDaysOfWeek() {
	var weeksHTML ='<tr>';
	var i = firstDayOfYear;
	for(var j = 0; j < 53; ++j) {
		for(i; i < 7; ++i) {
			weeksHTML += '<td><div class="tableHeader">' + dow[i] + '</div></td>';
		}
		if(i === 7) {
			i = 0;
		}
	}
	weeksHTML +='</tr>';
	$(".tableWeekDay").append(weeksHTML);
}
createDaysOfWeek();
//----------------------------------

/**********************************************************
END FILL TABLE WITH YEAR DATA
**********************************************************/


/**********************************************************
FILL TABLE WITH PERSON DATA
**********************************************************/

//add persons
//----------------------------------
function createPersonList() {
	var personsHTML ='';
	for (var i = 0; i < data.source.length; ++i) {
		personsHTML += '<tr><td><div class="tableFirstCol">' + data.source[i].name + '</div></td></tr>';
	}
	$(".tableFixedLeft").append(personsHTML);
}
createPersonList();
//----------------------------------

//add weekend markers
//----------------------------------
$(".tableHeader:contains('L'),.tableHeader:contains('P')").css({
	"background-color": "#e5e6e7"
});
//---------------------------------

//add data cells
//---------------------------------
function createDataCells() {
	var dataCellsHTML ='';
	for (var j = 0; j < data.source.length; j++) {
		dataCellsHTML +='<tr >';
		for(var k = 0; k < leapYearSeq.length; ++k) {
			for(var i = 0; i < leapYearSeq[k].length; ++i) {
				dataCellsHTML += '<td data-name="'+ data.source[j].name +'"data-date="'+ year +'-'+ ('0' + [k+1]).slice(-2) +'-'+  ('0' + leapYearSeq[k][i]).slice(-2) +'"></td>';
			}
		}
		dataCellsHTML +='</tr>';
	}
	$(".tableData").append(dataCellsHTML);
}
createDataCells();
//--------------------------------

//find the length of leave
function parseDate(str) {
	var dmy = str.split('-');
	return new Date( dmy[0], dmy[1]-1, dmy[2]);
}

function daydiff(first, second) {
	return Math.round((second-first)/(1000*60*60*24)+1);
}
//--------------------------------

//determine leave indicator bar color
//--------------------------------
function barColorFinder(leaveType) {
	if (leaveType === "Puhkus") {
		return "green";
	}
	if (leaveType === "Lähetus") {
		return "blue";
	}
	if (leaveType === "Koolitus") {
		return "red";
	}
	else {
		return "default";
	}
}
//--------------------------------

//add leave indicator bars
//--------------------------------
function createLeaveIndicators() {

	for (var j = 0; j < data.source.length; j++) {

		var leaveBarsHTML ='';
		var person = data.source[j].name;

		for (var i = 0; i < data.source[j].values.length; i++) {

			var from = data.source[j].values[i].from;
			var to = data.source[j].values[i].to;
			var numOfDays = daydiff(parseDate(from), parseDate(to));
			var leaveType = data.source[j].values[i].type;
			var pos = $('*[data-date="' + from + '"][data-name="' + person + '"]').position();
			var cellSize = 25;
			var barSize = numOfDays * cellSize - 8;
			var topLoc = pos.top + 3;
			var leftLoc = pos.left + 4;

			leaveBarsHTML +='<div style="top: '+ topLoc +'px;left: '+ leftLoc +'px;width: '+ barSize + 'px" class="leaveBar '+ barColorFinder(leaveType) + '"><div class="leaveBarText">'+ leaveType +'</div></div>';

			$(".leaveBars").append(leaveBarsHTML);
		}
	}
}
createLeaveIndicators();
//--------------------------------

/**********************************************************
END FILL TABLE WITH PERSON DATA
**********************************************************/
