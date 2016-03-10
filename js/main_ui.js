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


		//KEEP LEFT NAVBAR OPEN BUTTON
		//--------------------------------------------------------
		$(document).on("click", "#navbar-expand", function() {
			$("#page-wrapper").toggleClass("min");
			$("#m-menu").toggleClass("min max");

			if($("#m-menu").hasClass("min")) {
				//console.log("tere");

			}
			setTimeout(function() {

			}, 1000);
			$(this).children("i").toggleClass("fa-expand fa-compress");

		});
		//end-----------------------------------------------------


		//TOGGLE MOBILE MENU
		//--------------------------------------------------------------
		$("#open-mobile-menu").click(function () {
			$("#m-menu.min").addClass("open");
			$("#c-mask").addClass("active");
			$("html, body").css("overflow","hidden");
		});

		$("#c-mask, .nav-second-level li a.ajax-load").click(function () {
			$("#m-menu.min").removeClass("open");
			$("#c-mask").removeClass("active");
			$("html, body").css("overflow","");
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
		//end------------------------------------------------------

		//BACK TO TOP BUTTON
		//----------------------------------------------------
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
		//end--------------------------------------------------


		//SPINNER WHILE LOADING CONTENT
		//------------------------------------------------------
		$(".search-loading").empty().append("<div class='sk-spinner sk-spinner-circle'><div class='sk-circle1 sk-circle'></div><div class='sk-circle2 sk-circle'></div><div class='sk-circle3 sk-circle'></div><div class='sk-circle4 sk-circle'></div><div class='sk-circle5 sk-circle'></div><div class='sk-circle6 sk-circle'></div><div class='sk-circle7 sk-circle'></div><div class='sk-circle8 sk-circle'></div><div class='sk-circle9 sk-circle'></div><div class='sk-circle10 sk-circle'></div><div class='sk-circle11 sk-circle'></div><div class='sk-circle12 sk-circle'></div></div>");

		$(".search-ready").empty().addClass("badge badge-primary");
		//end spinner -------------------------------------------


		//FUNCTION TO DISPLAY PLACEHOLDERS IN IE8+
		$('input, textarea').placeholder();

		// MEGA MENU SCRIPTS
		//---------------------------------------------------
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
		//end---------------------------------------------------


		//init chosen.js
		$(".chosen-select").chosen({width: "100%"});

		/**********************************************************
		GENERAL SCRIPTS END
    **********************************************************/

		/**********************************************************
		DASHBOARD
		**********************************************************/

		//NEWS VIEW ALT
		//-------------------------------------------------------
		function moddedNewsWidgetAlt() {
			//put all news elements to array
			var arr = $("#media-source .well").toArray();
			//init array for new news view
			var result = [];

			//construct new view from old view
			for(var i = 0; i < arr.length; i++) {

				result[i] = "<a href='" + $(arr[i]).find("a:first").attr("href") + "'><div class='masonry-item'><div class='well news-module-hero'>";

				if($(arr[i]).find("img").length !== 0){
					result[i] += "<img src='" + $(arr[i]).find("img:first").attr("src") + "' class='img-responsive'>";
				}

				else {
					result[i] += "<img src='img/voremodulatsioon_logo.jpg' class='img-responsive'>";
				}

				result[i] += "<div class='news-title'>" + $(arr[i]).children("h1,h2").html() + "</div>";

				result[i] += "</div></div></a>";

				$("#news-content").append(result[i]);
			}
		}
		//end news view-----------------------------------------


		//NEWS VIEW
		//-------------------------------------------------------
		function moddedNewsWidget() {
			//put all news elements to array
			var arr = $("#media-source .well").toArray();
			//init array for new news view
			var result = [];

			//construct new view from old view
			for(var i = 0; i < arr.length; i++) {


				//add picture to the first two articles
				if (i < 2) {

					result[i] = "<div class='col-md-6'><a class='news-module-hero' href='" + $(arr[i]).find("a:first").attr("href") + "'>";

					if ($(arr[i]).find("img").length !== 0){
						result[i] += "<img src='" + $(arr[i]).find("img:first").attr("src") + "' class='img-responsive'>";
					}

					else {
						result[i] += "<img src='../img/voremodulatsioon_logo.jpg' class='img-responsive'>";
					}


					result[i] += "<div class='news-title'>" + $(arr[i]).children("h1,h2").html() + "</div>";


					result[i] += "</a></div>";
				}

				//display all other articles as a list
				else {

					result[i] = "<div class='row'><div class='col-md-12'><a class='news-module' href='" + $(arr[i]).find("a:first").attr("href") + "'>";

					result[i] += "<span class='news-title'>" + $(arr[i]).children("h1,h2").html() + "</span>";

					result[i] += "</a></div>";
				}



				$("#news-content").append(result[i]);
			}
		}
		moddedNewsWidget();
		//end news view-----------------------------------------

		//MEDIA VIEW
		//-------------------------------------------------------
		function moddedEventWidget() {
			//put all news elements to array
			var arr = $("#media-source .well").toArray();
			//init array for new news view
			var result = [];

			//construct new view from old view
			for(var i = 0; i < arr.length; i++) {


				//add picture to the first two articles
				if (i < 2) {

					result[i] = "<div class='col-md-6'><a class='news-module-hero' href='" + $(arr[i]).find("a:first").attr("href") + "'>";

					if ($(arr[i]).find("img").length !== 0){
						result[i] += "<img src='" + $(arr[i]).find("img:first").attr("src") + "' class='img-responsive'>";
					}

					else {
						result[i] += "<img src='../img/voremodulatsioon_logo.jpg' class='img-responsive'>";
					}


					result[i] += "<div class='news-title'>" + $(arr[i]).children("h1,h2").html() + "</div>";


					result[i] += "</a></div>";
				}

				//display all other articles as a list
				else {

					result[i] = "<div class='row'><div class='col-md-12'><a class='news-module' href='" + $(arr[i]).find("a:first").attr("href") + "'>";

					result[i] += "<span class='news-title'>" + $(arr[i]).children("h1,h2").html() + "</span>";

					result[i] += "</a></div>";
				}



				$("#event-content").append(result[i]);
			}
		}
		moddedEventWidget();
		//end media view-----------------------------------------

		//NEWS LEAD HOVER
		//-------------------------------------------------------
		/*$(".news-module").mouseenter(function () {
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
		});*/
		//end---------------------------------------------------

		/**********************************************************
		DASHBOARD SCRIPTS END
		**********************************************************/


		/*********************************************************
   	CONTENT PAGES
    *********************************************************/


		//RIGHT SIDEBAR TOGGLE
		//-------------------------------------------------------
		$(document).on('click', '.right-sidebar .dropdown-menu', function (e) {
			e.stopPropagation();
		});


		//FULLSCREEN MODE
		//----------------------------------------------------
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
				$("nav.navbar-static-top, nav.navbar-fixed-top, nav#m-menu, #page-wrapper, #page-wrapper.min, .breadcrumb, .footer").addClass("closed");
			}
			else {
				$("nav.navbar-static-top, nav.navbar-fixed-top, nav#m-menu, #page-wrapper, #page-wrapper.min, .breadcrumb, .footer").removeClass("closed");
			}
		});
		//--------------------------------------------------
		//FULLSCREEN MODE END


		/********************************************************
    		SRM SCRIPTS
   		*****************************************************/



		/*******************************************************
    		SRM SCRIPTS END
   		*****************************************************/
	};

	$().portalui();
}(jQuery));
