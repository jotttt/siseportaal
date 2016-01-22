/*
 *
 *   INSPINIA - Responsive Admin Theme
 *   version 2.0
 *
 */
/*jshint -W117 */
$(document).ready(function () {

	// Full height of sidebar
	function fix_height() {
		var heightWithoutNavbar = $("#page-wrapper").height() - 1;
		$("#m-menu").css("min-height", heightWithoutNavbar + 76 + "px");

		var navbarHeigh = $('#m-menu').height();
		var wrapperHeigh = $('#page-wrapper').height();

		if(navbarHeigh > wrapperHeigh){
			$('#page-wrapper').css("min-height", navbarHeigh + "px");
		}

		if(navbarHeigh < wrapperHeigh){
			$('#page-wrapper').css("min-height", $(window).height()  + "px");
		}
	}
	//fix_height();

	// Add body-small class if window less than 768px
	if ($(this).width() < 769) {
		$('body').addClass('body-small');
	} else {
		$('body').removeClass('body-small');
	}

	// MetisMenu
	$('#side-menu').metisMenu();

	// Collapse ibox function
	$('.collapse-link').click( function() {
		var ibox = $(this).closest('div.ibox');
		var button = $(this).find('i');
		var content = ibox.find('div.ibox-content, div.ibox-content-full');
		content.slideToggle(200);
		button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
		setTimeout(function () {
			ibox.resize();
			ibox.find('[id^=map-]').resize();
		}, 50);
	});

	// Close ibox function
	$('.close-link').click( function() {
		var content = $(this).closest('div.ibox');
		content.remove();
	});

	// Close menu in canvas mode
	$('.close-canvas-menu').click( function() {
		$("body").toggleClass("mini-navbar");
		SmoothlyMenu();
	});

	// Open close right sidebar
	$('.right-sidebar-toggle').click(function(){
		$('#right-sidebar').toggleClass('sidebar-open');
	});

	// Initialize slimscroll for right sidebar
	/*$('.sidebar-container').slimScroll({
		height: '100%',
		railOpacity: 0.4,
		wheelStep: 10
	});*/

	// Open close small chat
	$('.open-small-chat').click(function(){
		$(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
		$('.small-chat-box').toggleClass('active');
	});

	// Initialize slimscroll for small chat
	/*$('.small-chat-box .content').slimScroll({
		height: '234px',
		railOpacity: 0.4
	});*/

	// Small todo handler
	$('.check-link').click( function(){
		var button = $(this).find('i');
		var label = $(this).next('span');
		button.toggleClass('fa-check-square').toggleClass('fa-square-o');
		label.toggleClass('todo-completed');
		return false;
	});

	// Minimalize menu
	$('.navbar-minimalize').click(function () {
		$("body").toggleClass("mini-navbar");
		SmoothlyMenu();

	});

	// Tooltips demo
	$('.tooltip-demo').tooltip({
		selector: "[data-toggle=tooltip]",
		container: "body"
	});

	// Move modal to body
	// Fix Bootstrap backdrop issu with animation.css
	$('.modal').appendTo("body");





	// Fixed Sidebar
	/*$(window).bind("load", function () {
		if ($("body").hasClass('fixed-sidebar')) {
			$('.sidebar-collapse').slimScroll({
				height: '100%',
				railOpacity: 0.9
			});
		}
	});*/

	// Move right sidebar top after scroll
	$(window).scroll(function(){
		if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav') ) {
			$('#right-sidebar').addClass('sidebar-top');
		} else {
			$('#right-sidebar').removeClass('sidebar-top');
		}
	});

	/*$(document).bind("load resize scroll", function() {
		if(!$("body").hasClass('body-small')) {
			fix_height();
		}
	});*\

	$("[data-toggle=popover]")
		.popover();

	// Add slimscroll to element
	/*$('.full-height-scroll').slimscroll({
		height: '100%'
	});*/

});


// Minimalize menu when screen is less than 768px
$(window).bind("resize", function () {
	if ($(this).width() < 769) {
		$('body').addClass('body-small');
	} else {
		$('body').removeClass('body-small');
	}
});

// For demo purpose - animation css script
function animationHover(element, animation){
	element = $(element);
	element.hover(
		function() {
			element.addClass('animated ' + animation);
		},
		function(){
			//wait for animation to finish before removing classes
			window.setTimeout( function(){
				element.removeClass('animated ' + animation);
			}, 2000);
		});
}

function SmoothlyMenu() {
	if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
		// Hide menu in order to smoothly turn on when maximize menu
		$('#side-menu').hide();
		// For smoothly turn on menu
		setTimeout(
			function () {
				$('#side-menu').fadeIn(500);
			}, 100);
	} else if ($('body').hasClass('fixed-sidebar')) {
		$('#side-menu').hide();
		setTimeout(
			function () {
				$('#side-menu').fadeIn(500);
			}, 300);
	} else {
		// Remove all inline style from jquery fadeIn function to reset menu state
		$('#side-menu').removeAttr('style');
	}
}

// Dragable panels
function WinMove() {
	var element = "[class*=col-lg]";
	var handle = ".ibox-title";
	var connect = "[class*=col]";
	$(element).sortable(
		{
			containment: ".wrapper-content",
			items: "> div",
			handle: handle,
			connectWith: connect,
			tolerance: 'pointer',
			forcePlaceholderSize: true,
			opacity: 0.8
		});

}




