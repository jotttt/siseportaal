(function($) {
    $.ttuLoader = function() {
        var tl = {
            target: '.ttuLoader',
            content: '<img class="loading-gif" src="img/loader.gif" alt="loader">',

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
