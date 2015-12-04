/*jshint -W117 */
$(function(){

	/****************************************************************
	GENERAL SCRIPTS
	****************************************************************/

	//INIT M-MENU
	//--------------------------------------------------------------
	$("#m-menu").mmenu({
		"navbar": {
			"title":""
		}
	});
	//end-------------------------------------------------------------

	//TOGGLE MOBILE MENU
	//-------------------------------------------------------------
	$("#open-mobile-menu").click(function(){
		$("#m-menu.min").addClass("open");
		$("#c-mask").addClass("active");
	});

	$("#c-mask").click(function(){
		$("#m-menu.min").removeClass("open");
		$("#c-mask").removeClass("active");
	});
	//end-------------------------------------------------------------

	//MOBILE SEARCH TOGGLE
	//--------------------------------------------------------------
	$("#open-mobile-search").click(function(){
		$("#mobile-search").toggleClass("hidden");
	});
	//end-------------------------------------------------------------

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
	//end-------------------------------------------------------------

	//DRAG'N'DROP
	WinMove();

	//FUNCTION TO DISPLAY PLACEHOLDERS IN IE8+
	$('input, textarea').placeholder();

	// MEGA MENU SCRIPTS
	//----------------------------------------------------------------
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
	//end------------------------------------------------------------

	/***************************************************************
	GENERAL SCRIPTS END
	****************************************************************/

	/***************************************************************
	DASHBOARD
	****************************************************************/

	//NEWS LEAD ON HOVER
	//---------------------------------------------------------------
	$(".news-module").mouseenter(function(){
		if(!$(this).find('.news-lead').is(':visible')) {
			clearTimeout($(this).data('timeoutId'));
			$(this).find('.news-lead').slideDown(300);
		}
	}).mouseleave(function(){
		var item = $(this),
				timeoutId = setTimeout(function(){
					item.find('.news-lead').slideUp(900);
					clearTimeout($(this).data('timeoutId'));
				}, 500);
		item.data('timeoutId', timeoutId);
	});
	//---------------------------------------------------------------


	/*****************************************************************
	CONTENT PAGES
	*****************************************************************/




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
	//---------------------------------------------------------------
	//FULLSCREEN MODE END

	/****************************************************************
	ARENGUKAVA SCRIPTS
	****************************************************************/

	//TOGGLE 1ST LVL BUTTON STATE
	//--------------------------------------------------------------

	/*$(".goal-badge").click(function(){

		$(".goal-badge").find(".goal-details-open-button").remove();

		if ($(this).hasClass("active") && $(this).find("a").hasClass(".goal-details-open-button")) {
			$(this).removeClass("active");
			$("#goal-details").addClass("hidden");
		}
		else  {
			$(".goal-badge").removeClass("active");
			$(this).addClass("active");
			$(this).find('a').after("<a href='#' class='goal-details-open-button' data-toggle='modal' data-target='#goal-details'><i class='fa fa-search text-white pull-right'></i></a>");
			$(".goal-details-open-button").click(function(){

			});
			$("#goal-details").removeClass("hidden");
		}

	});*/

	//FILTER LOGIC
	//--------------------------------------------------------------
	/*$("#right-sidebar-filter").find("a").click(function() {
		$(this).toggleClass("selected");
	});*/


	//TOGGLE GOAL BADGE WITH BUTTONS TO OPEN GOAL DETAILS AND ADD NEW GOAL
	//--------------------------------------------------------------

	/*$(".goal-badge").click(function(){

		$(".goal-details-open-button").remove();
		$(".add-new-action-button").remove();

		if ($(this).hasClass("active") && $(this).find("a").hasClass(".goal-details-open-button")) {
			$(this).removeClass("active");
		}
		else  {
			$(".goal-badge").removeClass("active");
			$(this).addClass("active");
			$(this).find('a').after("<a href='#' class='goal-details-open-button' data-toggle='modal' data-target='#goal-details'><i class='fa fa-search text-white right m-t-xxs'></i></a>");
			$(this).after("<a href='#' class='add-new-action-button'><i class='fa fa-plus'></i></a>");
		}

	});*/

	/****************************************************************
	ARENGUKAVA SCRIPTS END
	****************************************************************/

});
