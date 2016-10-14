/*jshint browser: true, jquery: true*/


$(function() {

	/****************************************************************
	GENERAL PAGE SCRIPTS
	****************************************************************/


	//INIT M-MENU
	//--------------------------------------------------------------
	$("#m-menu").mmenu({
		"navbar": {
			"title":""
		}
	});


	//TOGGLE MOBILE MENU
	//-------------------------------------------------------------
	$("#open-mobile-menu").click(function(){
		$("#m-menu.min").addClass("open");
		$("#c-mask").addClass("active");
		$("body").css("position","fixed").css("overflow", "hidden");
	});

	$("#c-mask").click(function(){
		$("#m-menu.min").removeClass("open");
		$("#c-mask").removeClass("active");
		$("body").css("position","relative").css("overflow", "visible");
	});


	//MOBILE SEARCH TOGGLE
	//--------------------------------------------------------------
	$("#open-mobile-search").click(function(){
		$("#mobile-search").toggleClass("hidden");
	});


	//MEGA MENUS
	//--------------------------------------------------------------
	//SHOW LEVEL 3 ELEMENTS ON LEVEL 2 HOVER
	$(".l3").hide();
	$(".level-2 a").mouseenter(function(){
		//get height and width of lvl 2 elem. and position lvl 3 elem
		var height = ($(this).position()).top - 16;
		var width = $(this).width() + 32;
		$(this).parent().nextUntil('.level-2').css("left",width).css("top",height).show();
	});

	//HIDE LEVEL 3 ELEMENT
	// hide on lvl 3 element box mouse out
	$(".l3").mouseleave(function(){
		$(this).hide();
	});
	// hide on another lvl 2 element mouse in
	$(".level-2").mouseenter(function(){
		$(".l3").hide();
	});

	//ADD CHEVRON TO LEVEL 2 ELEMENTS THAT HAVE CHILDREN
	$(".l3").prev().children().addClass("menu-chevron");
	//end mega menus------------------------------------------------


	//RIGHT SIDEBAR TOGGLE
	//--------------------------------------------------------------
	$('.right-sidebar a').click(function(){
		$(this).parent().toggleClass('open');
	});


	//SELECTABLE BADGES, ONE AT A TIME
	//--------------------------------------------------------------
	$(".selectable-badges ul li").click(function(){
		$(".selectable-badges ul li").removeClass("active");
		$(this).toggleClass("active");
	});


	//HIDE NAVBAR ON SCROLL DOWN, SHOW ON SCROLL UP
	//--------------------------------------------------------------
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.navbar-static-top').outerHeight();

	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();

		// Make sure they scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta) {
			return;
		}
		// If they scrolled down and are past the navbar, add class .nav-up.
		// This is necessary so you never see what is "behind" the navbar.
		if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			$('.navbar-static-top').removeClass('nav-down').addClass('nav-up');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('.navbar-static-top').removeClass('nav-up').addClass('nav-down');
			}
		}

		lastScrollTop = st;
	}
	//end navbar hiding/showing ------------------------------------


	//POPUP
	//--------------------------------------------------------------

	//open
	$(".popup-open").click(function() {
		$(".popup").removeClass("fadeOutUp");
		$(".popup").addClass("open");
		$(".popup").addClass("fadeInDown");
	});

	//close
	$(".popup-no, .popup-yes").click(function() {
		setTimeout(function() {
			$(".popup").removeClass("open");
		}, 1000);
		$(".popup").removeClass("fadeInDown");
		$(".popup").addClass("fadeOutUp");

		if ($(this).hasClass("popup-no")) {
			console.log("Ei");
		}
		else if ($(this).hasClass("popup-yes")) {
			console.log("Jah");
		}
	});

	//end popup ----------------------------------------------------


	//SPINNER WHILE LOADING CONTENT
	//--------------------------------------------------------------
	$(".search-loading").empty().append("<div class='sk-spinner sk-spinner-circle'><div class='sk-circle1 sk-circle'></div><div class='sk-circle2 sk-circle'></div><div class='sk-circle3 sk-circle'></div><div class='sk-circle4 sk-circle'></div><div class='sk-circle5 sk-circle'></div><div class='sk-circle6 sk-circle'></div><div class='sk-circle7 sk-circle'></div><div class='sk-circle8 sk-circle'></div><div class='sk-circle9 sk-circle'></div><div class='sk-circle10 sk-circle'></div><div class='sk-circle11 sk-circle'></div><div class='sk-circle12 sk-circle'></div></div>");

	$(".search-ready").empty().addClass("badge badge-primary");
	//end spinner ----------------------------------------------------

	//FULLSCREEN MODE
	//--------------------------------------------------------------
	//display on hover only
	$("#fullscreen-btn").hover(function(){
		$(this).css({
			"opacity":"1",
			"transition" : "opacity .25s ease-in-out",
			"-moz-transition" : "opacity .25s ease-in-out",
			"-webkit-transition" : "opacity .25s ease-in-out;"
		});
	}, function() {
		$(this).css("opacity","0");
	});

	//toggle fullscreen
	$("#fullscreen-btn").click(function(){
		$(this).toggleClass("active");
		if($("#fullscreen-btn").hasClass("active")) {
			$("nav.navbar-static-top, nav.navbar-fixed-top, nav#m-menu,#page-wrapper.min, .breadcrumb, .footer").addClass("closed");
		}
		else {
			$("nav.navbar-static-top, nav.navbar-fixed-top, nav#m-menu, #page-wrapper.min, .breadcrumb, .footer").removeClass("closed");
		}
	});
	//end fullscreen mode-------------------------------------------


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
	//end back to top button----------------------------------------


	/****************************************************************
	END GENERAL PAGE SCRIPTS
	****************************************************************/


	/****************************************************************
	SCORECARD SCRIPTS
	****************************************************************/


	//TOGGLE GOAL BADGE WITH BUTTONS TO OPEN GOAL DETAILS AND ADD NEW GOAL
	//--------------------------------------------------------------
	$(".goal-badge").click(function(){

		$(".goal-tools").remove();

		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(this).find('i').addClass("fa-chevron-down");
			$(this).find('a').after("");
			$(".goal-badge").show();
		}

		else  {
			$(".goal-badge").removeClass("active");
			$(".goal-badge").hide();
			$(this).show();
			$(this).addClass("active");
			$(this).find('i').removeClass("fa-chevron-down");
			$(this).find('a').after("<span class='goal-tools'><a href='#' class='goal-details-open-button' data-toggle='modal' data-target='#goal-details'><i class='fa fa-search text-white'></i></a><a href='#' class='add-new-action-button'><i class='fa fa-plus text-white'></i></a><a href='#' class='goal-delete-button'><i class='fa fa-trash text-white '></i></a></span>");
		}

	});
	//end-----------------------------------------------------------


	//BRING ACTIVE 1ST LVL ACTION BADGE TO FRONT OF ROW WITH ANIMATION
	//--------------------------------------------------------------
	$(".action-badge-select").click(function(){

		//INIT ARRAYS FOR SORTING
		var activeArray = [];
		var inactiveArray = [];

		//CLICK ON ACTIVE BADGE:
		if($(this).parent().parent()
			 .parent().parent().hasClass("active")) {

			// TURNS IT OFF
			$(this).parent().parent()
				.parent().parent().removeClass("active");

			//ADD ELEMENT TO INACTIVE ARRAY
			inactiveArray = $(this).parent().parent()
				.parent().parent().parent().toArray();

			//PREPEND DATA TO "INACTIVE" PLACEHOLDER DIV
			$("#inactive-action-placeholder").prepend(inactiveArray);
		}

		//CLICK ON INACTIVE BADGE:
		else {

			//REMOVE ALL ACTIVE
			$(".action-badge").removeClass("active").removeClass("inactive");

			//ADD ALL BADGES TO INACTIVE ARRAY
			inactiveArray = $(".action-badge").parent().toArray();

			//PREPEND DATA TO "INACTIVE" PLACEHOLDER DIV
			$("#inactive-action-placeholder").prepend(inactiveArray);

			//EMPTY ACTIVE ARRAY
			activeArray.length = 0;

			//MAKE CURRENT SELECTION ACTIVE AND ANIMATE
			$(this).parent().parent()
				.parent().parent().addClass("active").css({'display':'none', 'position':'relative'}).css({'display':'block', 'opacity':'0', 'right':'-90%'}).animate({'opacity':'1','right':'0'}, 500);

			//ADD INACTIVE CLASS TO ALL OTHER BADGES
			$("#inactive-action-placeholder").addClass("inactive");

			//ANIMATE INACTIVE BADGES CONTAINER
			$(".inactive").css({'display':'none', 'position':'relative'}).css({'display':'block', 'opacity':'0', 'left':'-25%'}).animate({'opacity':'1','left':'0'}, 500);

			//ADD ACTIVE BADGE TO ACTIVE ARRAY
			if($(".action-badge").hasClass("active")) {
				activeArray = $(".action-badge.active").parent().toArray();
				$("#active-action-placeholder").prepend(activeArray);
			}

		}
	});
	//end badge sorting --------------------------------------------




	//FILTER LOGIC
	//--------------------------------------------------------------
	//$("#action-filter").find("a").click(function() {
	//	$(this).toggleClass("selected");

	//});


	//GOAL DETAILS
	//--------------------------------------------------------------
	$(".action-badge-open-details").click(function(){
		$(this).parent().parent().parent().next("div").find(".action-badge-details").toggleClass("open");
	});

	//OPEN GOAL DETAILS
	//--------------------------------------------------------------
	//$("button").click(function(){
	//	$(this).closest("*").addClass("active");
	//	console.log("tere");
	//});


	/****************************************************************
	SCORECARD SCRIPTS END
	****************************************************************/


	//end everything------------------------------------------------
});
