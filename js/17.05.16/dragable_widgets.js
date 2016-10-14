/*jshint jquery: true*/

/****************************************************************
GET WIDGETS POSITIONS
****************************************************************/

function widgetPositions(){

	//clear info div
	$("#info").empty();

	//column selectors into variables for readability
	var leftColumn = $("#sortable-left > .ibox");
	var middleColumn = $("#sortable-middle > .ibox");
	var rightColumn = $("#sortable-right > .ibox");

	//collect widgets to arrays according to column
	var array1 = leftColumn.toArray();
	var array2 = middleColumn.toArray();
	var array3 = rightColumn.toArray();

	//count widgets in columns
	var leftCount = leftColumn.length;
	var middleCount = middleColumn.length;
	var rightCount = rightColumn.length;

	//init position info array
	var arrayPos = [[]];

	//add positions info to "arrayPos" array
	//print the results to info div
	$("#info").append("left widgets: ");

	for (var i = 0; i < leftCount; i++) {
		arrayPos[0[i]] = $(array1[i]).attr("id");
		$("#info").append("[" + arrayPos[0[i]] + "] ");
	}

	$("#info").append("<br>middle widgets: ");

	for (var j = 0; j < middleCount; j++) {
		arrayPos[1[j]] = $(array2[j]).attr("id");
		$("#info").append("[" + arrayPos[1[j]] + "] ");
	}

	$("#info").append("<br>right widgets: ");


	for (var k = 0; k < rightCount; k++) {
		arrayPos[2[k]] = $(array3[k]).attr("id");
		$("#info").append("[" + arrayPos[2[k]] + "] ");
	}

}

widgetPositions();

/****************************************************************
END GET WIDGETS POSITIONS
****************************************************************/


/****************************************************************
REMOVE WIDGET WHEN CLOSE BUTTON IS PRESSED AND SAVE POSITIONS TO DB
****************************************************************/

$(".close-link").click(function() {
	setTimeout(function() {
		widgetPositions()
	}, 10);
});

/****************************************************************
END REMOVE WIDGET
****************************************************************/


/****************************************************************
DRAGABLE WIDGETS
****************************************************************/
function WinMove() {
	var element = "[class*=ui-sortable]";
	var handle = ".ibox-title";
	var connect = "[class*=ui-sortable]";
	$(element).sortable(
		{
			containment: "#sortable-view",
			items: "> div",
			handle: handle,
			connectWith: connect,
			helper: 'clone',
			tolerance: 'pointer',
			forcePlaceholderSize: true,
			opacity: 0.8,
			appendTo: 'body',
			update : function () {
				widgetPositions();
			}
		}
	);
}

WinMove();

/****************************************************************
END DRAGABLE WIDGETS
****************************************************************/

