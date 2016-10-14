/*jshint -W117 */
$(function() {

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

	//DRAG'N'DROP
	WinMove();

	//FUNCTION TO DISPLAY PLACEHOLDERS IN IE8+
	$('input, textarea').placeholder();

	//HIDE NAVBAR ON SCROLL DOWN, SHOW ON SCROLL UP
	//--------------------------------------------------------------
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.navbar-fixed-top').outerHeight();

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
			$('.navbar-fixed-top').removeClass('nav-down').addClass('nav-up');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('.navbar-fixed-top').removeClass('nav-up').addClass('nav-down');
			}
		}

		lastScrollTop = st;
	}


});
