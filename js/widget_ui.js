//WIDGETS
(function ($) {
	$.fn.widgetui = function () {
		//--------------------------------------------------------------
		//GET WIDGETS POSITIONS
		var last_update = false;

		function widgetPositions() {

			//clear info div
			$("#info").empty();

			//column selectors into variables for readability
			var leftColumn = $("#sortable-left > .widget-wrapper");
			var middleColumn = $("#sortable-middle > .widget-wrapper");
			var rightColumn = $("#sortable-right > .widget-wrapper");

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

			//add positions info to "arrayPos" array and
			//print the results to info div
			$("#info").append("<br>left widgets: ");

			var grid = "";

			//LEFT COLUMN WIDGETS
			//-------------------------------------------------


			for (var i = 0; i < leftCount; i++) {

				//get widgets id
				arrayPos[0[i]] = $(array1[i]).attr("id");

				//find widgets chevron state

				var chevronSelector1 = $(array1[i].innerHTML).find(".collapse-link").children().attr("class");

				//test if widget has content
				if (chevronSelector1 === undefined) {
					arrayPos[0[i]] += "=empty";
				}

				else {
					//if cevron state is up, conclude that widget is open
					if (chevronSelector1 === "fa fa-chevron-up") {
						arrayPos[0[i]] += "=" + 11;
					}
					//else conclude that widget is closed
					else {
						arrayPos[0[i]] += "=" + 10;
					}
				}

				//Andrese kood
				grid += arrayPos[0[i]] + (i < (leftCount - 1) ? ":" : "");

				//Append results to info div
				$("#info").append("[" + arrayPos[0[i]] + "] ");
			}

			grid += ";";
			$("#info").append("<br>middle widgets: ");



			//MIDDLE COLUMN WIDGETS
			//-------------------------------------------------


			for (var j = 0; j < middleCount; j++) {
				arrayPos[1[j]] = $(array2[j]).attr("id");

				//find widgets chevron state
				var chevronSelector2 = $(array2[j].innerHTML).find(".collapse-link").children().attr("class");

				//test if widget has content
				if (chevronSelector2 === undefined) {
					arrayPos[1[j]] += "=empty";
				}

				else {
					//if cevron state is up, conclude that widget is open
					if (chevronSelector2 === "fa fa-chevron-up") {
						arrayPos[1[j]] += "=" + 11;
					}
					//else conclude that widget is closed
					else {
						arrayPos[1[j]] += "=" + 10;
					}
				}
				//Andrese kood (kas peab ikka i olema? või nüüd j?)
				grid += arrayPos[1[j]] + (j < (middleCount - 1) ? ":" : "");

				//Append results to info div
				$("#info").append("[" + arrayPos[1[j]] + "] ");
			}

			grid += ";";
			$("#info").append("<br>right widgets: ");





			//RIGHT COLUMN WIDGETS
			//-------------------------------------------------


			for (var k = 0; k < rightCount; k++) {
				arrayPos[2[k]] = $(array3[k]).attr("id");

				//find widgets chevron state
				var chevronSelector3 = $(array3[k].innerHTML).find(".collapse-link").children().attr("class");



				//test if widget has content
				if (chevronSelector3 === undefined) {
					arrayPos[2[k]] += "=empty";
				}

				else {
					//if cevron state is up, conclude that widget is open
					if (chevronSelector3 === "fa fa-chevron-up") {
						arrayPos[2[k]] += "=" + 11;
					}
					//else conclude that widget is closed
					else {
						arrayPos[2[k]] += "=" + 10;
					}
				}
				//Andrese kood (kas peab ikka i olema? või nüüd k?)
				grid += arrayPos[2[k]] + (k < (rightCount - 1) ? ":" : "");

				//Append results to info div
				$("#info").append("[" + arrayPos[2[k]] + "] ");
			}




			var ct = Date.now();

			if (!last_update || (ct - last_update) > 500) {
				$.post("/intranet-widget", {grid: grid});
				last_update = ct;
			}
		}


		if (portal_module == "intranet" && portal_focus == "main") {
			widgetPositions();
		}
		//end get widget pos-------------------------------------------

		// Collapse widget-wrapper function
		$(document).on("click", ".collapse-link", function() {
			var widgetWrapper = $(this).closest('.widget-wrapper');
			var button = $(this).find('i');
			var content = widgetWrapper.find('.ibox-content, .ibox-content-full');
			content.slideToggle(200);
			button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
			setTimeout(function () {
				widgetWrapper.resize();
				widgetWrapper.find('[id^=map-]').resize();
			}, 50);

			setTimeout(widgetPositions(),200);

		});

		// Close ibox function
		$(document).on("click", ".close-link", function() {
			var content = $(this).closest('.widget-wrapper');
			content.remove();

			setTimeout(function () {
				widgetPositions();
			}, 200);
		});

		// REMOVE WIDGET WHEN CLOSE BUTTON IS PRESSED AND SAVE POSITIONS TO DB
		//$(".close-link").click(function () {
		//});




		//DRAGABLE WIDGETS

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
					update: function () {
						setTimeout(widgetPositions(),200);
					}
				}
			);
		}
		WinMove();
		//end draggable widgets---------------------------------------

		//widgets end-------------------------------------------------
	};

	$().widgetui();
}(jQuery));
