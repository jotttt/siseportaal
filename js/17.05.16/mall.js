/*jshint jquery: true*/

$(document).ready(function() {
    $('#mall_1').click(function(){
        $(".wrap-template-new").append("tere tere");
    });
});


(function($) {
    $.samplePlugin = function() {
        var sp = {
            attribute_1: 'some string',
            attribute_2: 1,

            method_1: function( ) {
                var a = 1;
                var b = 2;
                $(this).append(a+b);
            },

            method_2: function( ) {
                $('.selector').fadeOut('fast', function() {
                    $(this).empty();
                });
            }
        };
        return {
            attribute_1: sp. attribute_1,
            attribute_2: sp. attribute_1,
            method_1: sp.method_1,
            method_2: sp.method_2
        };
    };
})(jQuery);
