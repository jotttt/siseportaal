/*jshint -W117 */
$(function() {

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
	//--------------------------------------------------------------



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
	//--------------------------------------------------------------

	//SELECTABLE BADGES, ONE AT A TIME
	//--------------------------------------------------------------
	$(".selectable-badges ul li").click(function(){
		$(".selectable-badges ul li").removeClass("active");
		$(this).toggleClass("active");
		console.log("tere");
	});

	//TOGGLE 1ST LVL BUTTON STATE
	//--------------------------------------------------------------
	$(".goal-badge").click(function(){
		$(this).toggleClass("active");
	});

	/****************************************************************
	SRM SCRIPTS
	****************************************************************/

	//TOGGLE SRM TABS AND LOAD CONTENT
	//--------------------------------------------------------------
	$(".card").click(function(){
		$(this).toggleClass("active").siblings().removeClass("active");
		//Load content
		if($("#orders").hasClass("active")) {
			$("#inbox-widget").addClass("hidden");
			$("#take-order-widget").addClass("hidden");
			$("#orders-widget").removeClass("hidden");
		}
		else if($("#inbox").hasClass("active")) {
			$("#orders-widget").addClass("hidden");
			$("#take-order-widget").addClass("hidden");
			$("#inbox-widget").removeClass("hidden");
		}
		else if($("#take-order").hasClass("active")) {
			$("#orders-widget").addClass("hidden");
			$("#inbox-widget").addClass("hidden");
			$("#take-order-widget").removeClass("hidden");
		}
	});

	//TOGGLE BETWEEN SRM ORDERS FILTERING/SEARCH AND LOAD CONTENT
	//--------------------------------------------------------------
	$(".btn-caret").click(function(){
		$(this).toggleClass("active").siblings().removeClass("active");
		//Load content
		if($("#srm-filter").hasClass("active")) {
			$("#srm-search-content").addClass("hidden");
			$("#srm-filter-content").removeClass("hidden");
		}
		else if($("#srm-search").hasClass("active")) {
			$("#srm-filter-content").addClass("hidden");
			$("#srm-search-content").removeClass("hidden");
		}
	});

	//TOGGLE SRM TAB TEXT TO ICON
	//--------------------------------------------------------------



	//MOBILE SEARCH TOGGLE
	//--------------------------------------------------------------
	$("#open-mobile-search").click(function(){
		$("#mobile-search").toggleClass("hidden");
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

});
