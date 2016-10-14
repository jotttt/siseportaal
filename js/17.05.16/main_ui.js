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
        (function(factory) {

            if (typeof exports == 'object') {
                // CommonJS
                factory(require('jquery'), require('spin.js'));
            } else if (typeof define == 'function' && define.amd) {
                // AMD, register as anonymous module
                define(['jquery', 'spin'], factory);
            } else {
                // Browser globals
                if (!window.Spinner) throw new Error('Spin.js not present')
                factory(window.jQuery, window.Spinner);
            }

        }(function($, Spinner) {

            $.fn.spin = function(opts, color) {

                return this.each(function() {
                    var $this = $(this),
                        data = $this.data();

                    if (data.spinner) {
                        data.spinner.stop();
                        delete data.spinner;
                    }
                    if (opts !== false) {
                        opts = $.extend(
                            { color: color || $this.css('color') }, $.fn.spin.presets[opts] || opts
                        );
                        data.spinner = new Spinner(opts).spin(this);
                    }
                });
            };

            $.fn.spin.presets = {
                tiny:  { lines:  8, length: 2, width: 2, radius: 3 }, small: { lines:  8, length: 4, width: 3, radius: 5 }, large: { lines: 10, length: 8, width: 4, radius: 8 },
                ttu: {
                    lines: 13, // The number of lines to draw
                    length: 28, // The length of each line
                    width: 14, // The line thickness
                    radius: 42, // The radius of the inner circle
                    scale: 1, // Scales overall size of the spinner
                    corners: 1, // Corner roundness (0..1)
                    color: '#000', // #rgb or #rrggbb or array of colors
                    opacity: 0.25, // Opacity of the lines
                    rotate: 0, // The rotation offset
                    direction: 1, // 1: clockwise, -1: counterclockwise
                    speed: 1, // Rounds per second
                    trail: 60, // Afterglow percentage
                    fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
                    zIndex: 2e9, // The z-index (defaults to 2000000000)
                    className: 'spinner', // The CSS class to assign to the spinner
                    top: '50%', // Top position relative to parent
                    left: '50%', // Left position relative to parent
                    shadow: false, // Whether to render a shadow
                    hwaccel: false, // Whether to use hardware acceleration
                    position: 'fixed', // Element positioning}
                }
            };

        }));
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


        /**********************************************************
		GENERAL SCRIPTS END
    **********************************************************/

        /**********************************************************
		DASHBOARD
		**********************************************************/



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
