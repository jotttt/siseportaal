//http://stackoverflow.com/questions/10133100/javascript-variable-scope-the-evils-of-globals/10133133#10133133
(function () {

    $.getScript('/lemon/plugins/vacation/VacationsTable.js', function () {
        $.getScript('/lemon/plugins/vacation/vacation.js', function () {
        });
    });

    load_css();

    function load_css() {
        if (!$("link[href='/lemon/plugins/vacation/main.css']").length) {
            var build = $('#_build').attr('class');
            $("head").append(
                    "<link rel='stylesheet' type='text/css' href='/lemon/plugins/vacation/main.css?" + build + "' />");
//            $("head").append(
//                    "<link rel='stylesheet' type='text/css' href='/lemon/plugins/vacation/autocomplete.css?" + build + "' />");
        }
    }

})(); // Called right away
