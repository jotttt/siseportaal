/*jshint browser: true, jquery: true*/
var data = {
	source: [{
		name: "Anna Kolossova",
		values: [{
			from: "2016-01-17",
			to: "2016-01-31",
			type: "Puhkus",
			customClass: "leaveRed"
		}]
	},{
		name: "Sander Marandi",
		values: [{
			from: "2016-02-04",
			to: "2016-02-15",
			type: "Puhkus",
			customClass: "leaveRed"
		}]
	},{
		name: "Villu Vooglaid",
		values: [{
			from: "2016-02-01",
			to: "2016-02-05",
			type: "Lähetus",
			customClass: "leaveBlue"
		}]
	},{
		name: "Madis Jõhvik",
		values: [{
			from: "2016-04-17",
			to: "2016-04-25",
			type: "Lähetus",
			customClass: "leaveBlue"
		}]
	},{
		name: "Peeter Kuusik",
		values: [{
			from: "2016-01-17",
			to: "2016-01-25",
			type: "Lähetus",
			customClass: "leaveBlue"
		}]
	},{
		name: "Mall Pärn",
		values: [{
			from: "2016-01-17",
			to: "2016-01-25",
			type: "Puhkus",
			customClass: "leaveRed"
		}]
	},{
		name: "Signe Lepp",
		values: [{
			from: "2016-01-17",
			to: "2016-01-25",
			type: "Koolitus",
			customClass: "leaveOrange"
		}]
	},{
		name: "Olavi Kesk",
		values: [{
			from: "2016-01-17",
			to: "2016-01-25",
			type: "Koolitus",
			customClass: "leaveOrange"
		}]
	},{
		name: "Pärtel Meerits",
		values: [{
			from: "2016-01-17",
			to: "2016-01-25",
			type: "Puhkus",
			customClass: "leaveRed"
		}, {
			from: "2016-03-17",
			to: "2016-04-15",
			type: "Lähetus",
			customClass: "leaveBlue"
		}]
	}]
};

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

//determine length of year
$(".tableYear").css({
	"width": 1500 + "px"
});

//determine table size
var viewPortWidth = $(document).width();

$(".tableFixedTop, .tableDataContainer, .tableData").css({
	"width": 825 + "px"
});

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
//---------------------------------------------------------

var monthA = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

var monthB = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

var monthC = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];

var monthD = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];

var regularYearSeq = [monthA,monthD,monthA,monthB,monthA,monthB,monthA,monthA,monthB,monthA,monthB,monthA];

var leapYearSeq = [monthA,monthC,monthA,monthB,monthA,monthB,monthA,monthA,monthB,monthA,monthB,monthA];


for(var j = 0; j < 12; ++j) {

	switch(leapYearSeq[j].length) {
		case 31:
			$(".tableMonth td .tableHeader").eq(j).css({
				"width": 775 + "px"
			});
			break;

		case 30:
			$(".tableMonth td .tableHeader").eq(j).css({
				"width": 750 + "px"
			});
			break;

		case 29:
			$(".tableMonth td .tableHeader").eq(j).css({
				"width": 725 + "px"
			});
			break;

		case 28:
			$(".tableMonth td .tableHeader").eq(j).css({
				"width": 700 + "px"
			});
			break;

	}
}


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
//---------------------------------------------------------

//add days of month
//---------------------------------------------------------
var daysHTML ='<tr>';
for(var j = 0; j < leapYearSeq.length; ++j) {
	for(var i = 0; i < leapYearSeq[j].length; ++i) {
		daysHTML += '<td><div class="tableHeader">' + leapYearSeq[j][i] + '</div></td>';
	}
}
daysHTML +='</tr>';
$(".tableDay").append(daysHTML);
//---------------------------------------------------------

//add days of week
//---------------------------------------------------------
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
//---------------------------------------------------------

//add persons
//---------------------------------------------------------
var personsHTML ='';
for (var i = 0; i < data.source.length; ++i) {
	personsHTML += '<tr><td><div class="tableFirstCol">' + data.source[i].name + '</div></td></tr>';
}
$(".tableFixedLeft").append(personsHTML);
//---------------------------------------------------------

//add weekend markers
//---------------------------------------------------------
$(".tableHeader:contains('L'),.tableHeader:contains('P')").css({
	"background-color": "#e5e6e7"
});
//---------------------------------------------------------

//add data cells
//---------------------------------------------------------
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
//---------------------------------------------------------



//position leave bar
/*var c = $('*[data-date="2016-01-10"][data-name="Sander Marandi"]').position();
var cellSize = 25;
var days = 25;
$(".leaveBar").css({
	"top":c.top + 4,
	"left":c.left + 4,
	"width": days * cellSize - 8 + "px"
});*/
//---------------------------------------------------------

//find the length of leave
function parseDate(str) {
	var mdy = str.split('-');
	return new Date( mdy[0], mdy[1]-1, mdy[2]);
}

function daydiff(first, second) {
	return Math.round((second-first)/(1000*60*60*24));
}

var leaveDays = daydiff(parseDate(data.source[1].values[0].from), parseDate(data.source[1].values[0].to));

//---------------------------------------------------------


//add leave indicator bars
//---------------------------------------------------------
var leaveBarsHTML ='';
for (var j = 0; j < data.source.length; j++) {

	var person = data.source[j].name;

	for (var i = 0; i < data.source[j].values.length; i++) {

		var from = data.source[j].values[i].from;
		var to = data.source[j].values[i].to;
		var numOfDays = daydiff(parseDate(from), parseDate(to));
		var leaveType = data.source[j].values[i].type;
		var pos = $('*[data-date="' + from + '"][data-name="' + person + '"]').position();
		var cellSize = 25;
		var barSize = numOfDays * cellSize - 8;
		var topLoc = pos.top + 4;
		var leftLoc = pos.left + 4;
		/*$(".leaveBar").css({
			"top":pos.top + 4,
			"left":pos.left + 4,
			"width": numOfDays * cellSize - 8 + "px"
		});*/
		leaveBarsHTML +='<div style="top: '+ topLoc +'px;left: '+ leftLoc +'px;width: '+ barSize + 'px" class="leaveBar green"><div class="leaveBarText">'+ leaveType +'</div></div>';

		console.log(pos);
		$(".leaveBars").append(leaveBarsHTML);
	}
}
//---------------------------------------------------------
