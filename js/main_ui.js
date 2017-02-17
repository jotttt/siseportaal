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


        //TOGGLE M-MOBILE MENU
        //--------------------------------------------------------------
        $("#open-mobile-menu").click(function () {
            if($('#m-menu').hasClass('max')) {
                $("#m-menu").removeClass("max");
                $("#m-menu").addClass("min");
                $("#page-wrapper").addClass("min");
            }
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

        //CLOSE TOP MOBILE MENU ON SELECTION
        //--------------------------------------------------------------
        $(function(){
            var navMain = $(".navbar-collapse");

            navMain.on("click", ".dropdown-menu a", null, function () {
                navMain.collapse('hide');
            });
        });
        //end-----------------------------------------------------------


        //MOBILE SEARCH TOGGLE
        //--------------------------------------------------------------
        $(document).on('click', '#open-mobile-search', function (e) {

            if($('#mobile-search').hasClass('hidden')) {
                $("#mobile-search").removeClass("hidden");
                e.preventDefault();
            }
            else {
                $("#mobile-search").addClass("hidden");
                e.preventDefault();
            }
        });
        //end-------------------------------------------------------------


        //HIDE NAVBAR ON SCROLL DOWN, SHOW ON SCROLL UP
        //--------------------------------------------------------------
        /*var didScroll;
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
        }*/
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


        //SPINNER WHILE LOADING PAGE CONTENT
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
                tiny:  { lines:  8, length: 2, width: 2, radius: 3 },
                small: { lines:  8, length: 4, width: 3, radius: 5 },
                large: { lines: 10, length: 8, width: 4, radius: 8 },
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
        //end--------------------------------------------------


        //SPINNER WHILE LOADING SEARCH
        //------------------------------------------------------
        $(".search-loading").empty().append("<div class='sk-spinner sk-spinner-circle'><div class='sk-circle1 sk-circle'></div><div class='sk-circle2 sk-circle'></div><div class='sk-circle3 sk-circle'></div><div class='sk-circle4 sk-circle'></div><div class='sk-circle5 sk-circle'></div><div class='sk-circle6 sk-circle'></div><div class='sk-circle7 sk-circle'></div><div class='sk-circle8 sk-circle'></div><div class='sk-circle9 sk-circle'></div><div class='sk-circle10 sk-circle'></div><div class='sk-circle11 sk-circle'></div><div class='sk-circle12 sk-circle'></div></div>");

        $(".search-ready").empty().addClass("badge badge-primary");
        //end spinner -------------------------------------------


        //FUNCTION TO DISPLAY PLACEHOLDERS IN IE8+
        $('input, textarea').placeholder();

        /*// MEGA MENU SCRIPTS
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
        //end---------------------------------------------------*/


        //init chosen.js
        $(".chosen-select").chosen({width: "100%"});

        /****************************************************
        GENERAL SCRIPTS END
        ****************************************************/

        /*****************************************************
        DASHBOARD
        *****************************************************/

        //Carousels
        //----------------------------------------------------
        function playcarousel(){
            $('#carousel_desktop').carousel({
                interval: 10000
            });
            $('#carousel1').carousel({
                interval: 10000
            });
        }
        window.setTimeout(playcarousel, 1000);
        /*****************************************************
        CONTENT PAGES
        *****************************************************/

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
                $("nav.navbar-top, nav#m-menu, #page-wrapper, #page-wrapper.min, .wrapper-content, .breadcrumb, .footer").addClass("closed");
            }
            else {
                $("nav.navbar-top, nav#m-menu, #page-wrapper, #page-wrapper.min, .wrapper-content, .breadcrumb, .footer").removeClass("closed");
            }
        });
        //--------------------------------------------------
        //FULLSCREEN MODE END


        //INIT TOOLTIPS
        //----------------------------------------------------
        $('[data-toggle="tooltip"]').tooltip();
        //--------------------------------------------------
        //TOOLTIPS END


        //MASONRY BEHAVIOUR
        //----------------------------------------------------
        $('.grid').masonry({
            // options
            itemSelector: '.grid-sizer',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });
        //--------------------------------------------------
        //MASONRY BEHAVIOUR END



    };
    $().portalui();
}(jQuery));
