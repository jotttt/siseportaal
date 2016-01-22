/*jshint -W117 */
(function ($) {
	$.fn.portalui = function () {

		/**************************************************************
   	GENERAL SCRIPTS
  	**************************************************************/

		//INIT M-MENU
		//--------------------------------------------------------------
		$("#m-menu").mmenu({
			"navbar": {
				"title": ""
			}
		});
		//end-----------------------------------------------------------

		//TOGGLE MOBILE MENU
		//--------------------------------------------------------------
		$("#open-mobile-menu").click(function () {
			$("#m-menu.min").addClass("open");
			$("#c-mask").addClass("active");
		});

		$("#c-mask").click(function () {
			$("#m-menu.min").removeClass("open");
			$("#c-mask").removeClass("active");
		});
		//end-----------------------------------------------------------

		//MOBILE SEARCH TOGGLE
		//--------------------------------------------------------------
		$("#open-mobile-search").click(function () {
			$("#mobile-search").toggleClass("hidden");
		});
		//end-------------------------------------------------------------

		//HIDE NAVBAR ON SCROLL DOWN, SHOW ON SCROLL UP
		//--------------------------------------------------------------
		var didScroll;
		var lastScrollTop = 0;
		var delta = 5;
		var last_update = false;
		var navbarHeight = $('.navbar-static-top').outerHeight();

		$(window).scroll(function (event) {
			didScroll = true;
		});

		setInterval(function () {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		}, 250);

		function hasScrolled() {
			var st = $(this).scrollTop();

			// Make sure they scroll more than delta
			if (Math.abs(lastScrollTop - st) <= delta) {
				return;
			}
			// If they scrolled down and are past the navbar, add class .nav-up.
			// This is necessary so you never see what is "behind" the navbar.
			if (st > lastScrollTop && st > navbarHeight) {
				// Scroll Down
				$('.navbar-static-top').removeClass('nav-down').addClass('nav-up');
			} else {
				// Scroll Up
				if (st + $(window).height() < $(document).height()) {
					$('.navbar-static-top').removeClass('nav-up').addClass('nav-down');
				}
			}

			lastScrollTop = st;
		}
		//end-------------------------------------------------------------

		//BACK TO TOP BUTTON
		//--------------------------------------------------------------
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});

		$('.scroll-up').click(function () {
			$("html, body").animate({
				scrollTop: 0
			}, 600);
			return false;
		});
		//end-----------------------------------------------------------


		//FUNCTION TO DISPLAY PLACEHOLDERS IN IE8+
		$('input, textarea').placeholder();

		// MEGA MENU SCRIPTS
		//--------------------------------------------------------------
		//SHOW LEVEL 3 ELEMENTS ON LEVEL 2 HOVER
		$(".l3").hide();
		$(".level-2 a").mouseenter(function () {
			//get height and width of lvl 2 elem. and position lvl 3 elem
			var height = ($(this).position()).top - 16;
			var width = $(this).width() + 32;
			$(this).parent().nextUntil('.level-2').css("left", width).css("top", height).show();
		});

		//HIDE LEVEL 3 ELEMENT
		// hide on lvl 3 element box mouse out
		$(".l3").mouseleave(function () {
			$(this).hide();
		});
		// hide on another lvl 2 element mouse in
		$(".level-2").mouseenter(function () {
			$(".l3").hide();
		});

		//ADD CHEVRON TO LEVEL 2 ELEMENTS THAT HAVE CHILDREN
		$(".l3").prev().children().addClass("menu-chevron");
		//end-----------------------------------------------------------

		/**********************************************************
   	GENERAL SCRIPTS END
    **********************************************************/

		/**********************************************************
    DASHBOARD
    **********************************************************/

		//NEWS LEAD ON HOVER
		//--------------------------------------------------------------
		$(".news-module").mouseenter(function () {
			if (!$(this).find('.news-lead').is(':visible')) {
				clearTimeout($(this).data('timeoutId'));
				$(this).find('.news-lead').slideDown(300);
			}
		}).mouseleave(function () {
			var item = $(this),
					timeoutId = setTimeout(function () {
						item.find('.news-lead').slideUp(900);
						clearTimeout($(this).data('timeoutId'));
					}, 500);
			item.data('timeoutId', timeoutId);
		});
		//end-----------------------------------------------------------


		//WIDGETS
		//--------------------------------------------------------------

		// Collapse widget-wrapper function
		$('.collapse-link').click( function() {
			var widgetWrapper = $(this).closest('.widget-wrapper');
			var button = $(this).find('i');
			var content = widgetWrapper.find('.ibox-content, .ibox-content-full');
			content.slideToggle(200);
			button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
			setTimeout(function () {
				widgetWrapper.resize();
				widgetWrapper.find('[id^=map-]').resize();
			}, 50);

			widgetPositions();

		});

		// Close ibox function
		$('.close-link').click( function() {
			var content = $(this).closest('.widget-wrapper');
			content.remove();
		});

		//GET WIDGETS POSITIONS

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
				var chevronSelector = array1[i].children[0].children[0].children[1].children[0].children[0];

				var chevronSelectorClass = $(chevronSelector).attr("class");

				//if cevron state is up, conclude that widget is open
				if (chevronSelectorClass === "fa fa-chevron-up") {
					arrayPos[0[i]] += ":" + 1;
				}
				//else conclude that widget is closed
				else {
					arrayPos[0[i]] += "" + 0;
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
				var chevronSelector2 = array2[j].children[0].children[0].children[1].children[0].children[0];

				var chevronSelectorClass2 = $(chevronSelector2).attr("class");

				//if cevron state is up, conclude that widget is open
				if (chevronSelectorClass2 === "fa fa-chevron-up") {
					arrayPos[1[j]] += ":" + 1;
				}
				//else conclude that widget is closed
				else {
					arrayPos[1[j]] += ":" + 0;
				}

				//Andrese kood (kas peab ikka i olema? või nüüd j?)
				grid += arrayPos[1[i]] + (j < (middleCount - 1) ? ":" : "");

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
				var chevronSelector3 = array3[k].children[0].children[0].children[1].children[0].children[0];

				var chevronSelectorClass3 = $(chevronSelector3).attr("class");

				//if cevron state is up, conclude that widget is open
				if (chevronSelectorClass3 === "fa fa-chevron-up") {
					arrayPos[1[k]] += ":" + 1;
				}
				//else conclude that widget is closed
				else {
					arrayPos[1[k]] += ":" + 0;
				}

				//Andrese kood (kas peab ikka i olema? või nüüd k?)
				grid += arrayPos[2[i]] + (k < (rightCount - 1) ? ":" : "");

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


		// REMOVE WIDGET WHEN CLOSE BUTTON IS PRESSED AND SAVE POSITIONS TO DB
		$(".close-link").click(function () {
			setTimeout(function () {
				widgetPositions();
			}, 10);
		});


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
						widgetPositions();
					}
				}
			);
		}

		WinMove();
		//end draggable widgets---------------------------------------

		//end---------------------------------------------------------

		/**********************************************************
    CONTENT PAGES
    **********************************************************/


		//RIGHT SIDEBAR TOGGLE
		//--------------------------------------------------------------
		$(document).on('click', '.right-sidebar .dropdown-menu', function (e) {
        e.stopPropagation();
    });

		//FULLSCREEN MODE
		//--------------------------------------------------------------
		//display on hover only
		$("#fullscreen-btn").hover(function () {
			$(this).css({
				"opacity": "1",
				"transition": "opacity .25s ease-in-out",
				"-moz-transition": "opacity .25s ease-in-out",
				"-webkit-transition": "opacity .25s ease-in-out;"
			});
		}, function () {
			$(this).css("opacity", "0");
		});
		//toggle fullscreen
		$("#fullscreen-btn").click(function () {
			$(this).toggleClass("active");
			if ($("#fullscreen-btn").hasClass("active")) {
				$("nav.navbar-static-top, nav.navbar-fixed-top, nav#m-menu,#page-wrapper.min, .breadcrumb, .footer").addClass("closed");
			}
			else {
				$("nav.navbar-static-top, nav.navbar-fixed-top, nav#m-menu, #page-wrapper.min, .breadcrumb, .footer").removeClass("closed");
			}
		});
		//--------------------------------------------------------------
		//FULLSCREEN MODE END

		/***************************************************************
    SRM SCRIPTS
   	***************************************************************/



		/***************************************************************
    SRM SCRIPTS END
   ****************************************************************/

		widgetPositions();

	};

	$().portalui();

}(jQuery));