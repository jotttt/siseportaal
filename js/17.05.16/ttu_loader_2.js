(function($) {
    $.ttuLoader = function() {
        var tl = {
            target: '.ttuLoader',
            content: '<div class="ttuLoaderSpinner"><div class="loading-mask"></div><div class="loading-animation"><div class="loader-wrapper"><div class="loader"></div></div></div></div>',

            addLoader: function( ) {
                var h = $('.ttuLoader').outerHeight(true);
                var w = $('.ttuLoader').outerWidth(true);
                var pos = $('.ttuLoader').position();
                $(this.target).append(this.content);
                $('.loading-mask').css({
                    width: w + 1,
                    height: h,
                    top: pos.top,
                    left: pos.left,
                });
            },

            removeLoader: function( ) {
                $('.ttuLoaderSpinner').fadeOut('fast', function() {
                    $(this).empty();
                });
            }
        };
        return {
            addLoader: tl.addLoader,
            removeLoader: tl.removeLoader,
            target: tl.target,
            content: tl.content
        };
    };
})(jQuery);
