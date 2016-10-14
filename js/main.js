var dropzone            = false;
var last_pushstate      = false;
var last_tab            = "a";

var portal_workmode     = $("#_workmode").prop("class");
var portal_session      = $("#_sess_id").prop("class");
var portal_lang         = $("#_lang").prop("class");
var portal_build        = $("#_build").prop("class");
var portal_module       = $("#_module").prop("class");
var portal_focus        = $("#_focus").prop("class");
var portal_subfocus     = false;

// ptable

var ptable_url = "/api/get:ptable:" + portal_module + ":" + portal_focus + ":" + portal_lang;

// fookus->moodul vastavused

var focus_js = {
    "helpdesk":         "srm",
    "helpline":         "srm",
    "request":          "srm",
    "dns":              "srm",
    "room":             "fm",
    "building":         "fm",
    "video":            "media",
    "view":             "cms",
    "wiki":             "cms",
    "msgprep":          "multimail",
    "budget_diagram":   "reports",
    "budget":           "reports",
    "roadmap":          "scorecard",
    "timeline":         "scorecard",
    "vacation":         "vacation",
    "planner":          "mission",
    "circles":          "intranet"
};

// fookused, mille puhul vaikimisi kuvatakse uri'is kõik argumendid

var uri_all_args = [
    "wiki"
];

// moodulid, mis vajavad ptable't

var ptable_enabled = [
    "srm",
    "mission"
];

$.ajaxSetup({ cache: false });

$(document).ready(function() {
    Dropzone.autoDiscover = false;

    if (focus_js[portal_focus]) {
        var js_url = "/lemon/plugins/" + focus_js[portal_focus] + "/main.js?" + portal_build;

        if (!$("script[src='" + js_url + "']").length)
            $.getScript(js_url);
    }

    $("#content-wrapper").addClass("wrapper-" + portal_module);

    process_url(window.location.href, false, true);

    load_focus_widgets();
    load_core_widgets();
});

// back/fwd nuppude puhul

window.onpopstate = function(e) {
    e.preventDefault();
    load_content(process_url(window.location.href, false, true));
};

$(document).on("click", ".ajax-load", function(e) {
    e.preventDefault();
    load_content(process_url($(this)));
});

$(document).on("click", ".subfocus", function() {
    portal_subfocus = $(this).data("subfocus");
});

$(".nav-tabs").on("click", "li > a:not(.nonav)", function(e) {
    e.preventDefault();

    try {
        last_tab = $(this).attr("href")[1];
    }
    catch(err) {
    }
});

// wiki modaali kuvamine

$("#wiki_help").on("show.bs.modal", function(e) {
    var wiki_url;

    // kui alamfookus on juba aktiveeritud

    if (portal_subfocus) {
        wiki_url = "/help/get/" + portal_focus + ":" + portal_subfocus + "?content";
    }
    else {
        // otsi, kas leidub lehel alamfookuse'e elemente (ja hangi esimene)

        var subfocus = "", default_subfocus = $("#content-wrapper").find(".subfocus").data("subfocus");

        if (default_subfocus)
            subfocus = ":" + default_subfocus;

        wiki_url = "/help/get/" + portal_focus + subfocus + "?content";
    }

    $(this).find(".modal-body").load(wiki_url);
});

// ajax vorm

$(document).on("submit", ".ajax-form", function(e) {
    e.preventDefault();

    var form_id = $(this).prop("id");
    var target = $(this).prop("action");
    var before = $(this).data("before");
    var after = $(this).data("after");
    var load_response = false;

    if ($(this).hasClass("load_response"))
        load_response = true;

    var form = target.split("/");
    var module = focus_js[form[3]];

    var url = "/api/form:" + module + ":" + form_id;

    if (before && !window[before](form_id))
        return false;

    $.post(url, $(this).serialize(), function (response) {
        if (after && !window[after](response))
            return false;

        if (response["redirect"]) {
            if (response["redirect"][0] == "/")
                target = response["redirect"];
            else {
                if (response["redirect"] == "parent")
                    target = target + "/tab/" + last_tab;
                else
                    target = target + "/" + response["redirect"];
            }
        }

        if (load_response) {
            $("#content-wrapper").removeClass().addClass("wrapper-" + module).html(response);

            return;
        }
        else {
            load_content(process_url(target));
        }
    }, "json");
});

// töötleb sisendurl'i load_content'i jaoks + history

function process_url(obj, show_all_args, no_pushstate) {
    var result, args, is_str = false;

    // kontrolli, kas sisend on jquery objekt või string

    try {
        result = obj.attr("href");

        // kui objektil puudub href, siis vaata kas on olemas data-url

        if (typeof(result) == "undefined") {
            result = obj.data("url");

            // kui kumbagi ei leitud, suuna kasutaja ümber avalehele

            if (typeof(result) == "undefined")
                result = "/";
        }

        // kui on "ajax-show" klass küljes, siis kuva kõik argumendid

        if (obj.hasClass("ajax-show"))
            show_all_args = true;
    }
    catch(error) {
        // kui sisend oli hoopis string, mitte objekt

        result = obj;
        is_str = true;
    }

    // eemalda võimalik kaldkriips url'i lõpust

    result = result.replace(/\/+$/, "");

    // kontrolli, mis fookuses ollakse (vajadusel eemalda domeeni osa urlist)

    args = result.split("/");

    // eemalda argumentide seast (võimalik) sessioon ja asenda show'ga

    try {
        if (args[4].length == 16 && !isNaN(args[4])) {
            // kui väärtuslikke argumente pole, siis kuva ainult fookust

            if (args.length < 6)
                args.splice(4);
            else
                args[4] = "show";

            window.history.replaceState(null, "", args.join('/'));
        }
    }
    catch(error) {}

    // kui esimene argument on tühi, siis on relatiivne url, vastasel juhul nopi sealt fookus ja tee relatiivseks

    try {
        if (!args[0]) {
            portal_focus = args[1];

            // kui järgmine argument on parent, siis väärtusta see viimase tab'i järgi

            if (args[2] == "parent")
                args[2] = "tab/" + last_tab;

            result = args.join("/");
        }
        else {
            portal_focus = args[3];

            // kui järgmine argument on parent, siis väärtusta see viimase tab'i järgi

            if (args[4] == "parent")
                args[4] = "tab/" + last_tab;

            result = "/" + args.splice(3).join("/");
        }
    }
    catch(error) {}

    // kui vastav fookus on lisatud "uri_all_args" massiivi, siis kuvatakse kõik argumendid

    if ($.inArray(portal_focus, uri_all_args) !== -1)
        show_all_args = true;

    // kui on küljes "ajax-hide", siis see override'b kõik eelmised ja kuvatakse uri's vaid fookust

    if (!is_str && obj.hasClass("ajax-hide"))
        show_all_args = false;

    // lisa vajadusel antud url history'sse

    if (!no_pushstate) {
        var push_url = result;

        if (!show_all_args)
            push_url = "/" + portal_focus;

        // kui pole sama, mis eelmine, siis lisa

        if (last_pushstate != push_url) {
            window.history.pushState(null, "", push_url);

            last_pushstate = push_url;
        }
        else
            window.history.replaceState(null, "", push_url);
    }
    else {
        /* login case quick fix (ebavajalik nüüd)
        if (!show_all_args || portal_focus == "main" || portal_focus == "start") {
            result = "/" + portal_focus;

            window.history.replaceState(null, "", result);
        }
        */

        last_pushstate = result;
    }

    // alamfookuse reset uue sisulehe laadimisel

    portal_subfocus = false;

    return result;
}

function load_content(url) {
    $("#content-wrapper").load(url, function (response, status, xhr) { // fadeOut(100).
        // kui laaditavat lehte ei leitud või kasutaja sessioon on aegunud, mine algsele lehele tagasi

        if (xhr.status != 200)
            location.reload();

        // lae vastava mooduli main.js

        if (focus_js[portal_focus]) {
            var js_url = "/lemon/plugins/" + focus_js[portal_focus] + "/main.js?" + portal_build;

            if (!$("script[src='" + js_url + "']").length)
                $.getScript(js_url);
        }

        portal_module = $("#_module").prop("class");

        $("#content-wrapper").removeClass().addClass("wrapper-" + portal_module);

        load_focus_widgets();

        $().widgetui();
        $().portalui();

        if (focus_js[portal_focus] == "fm")
            $().fm();

        if ($.inArray(focus_js[portal_focus], ptable_enabled) !== -1) {
            ptable_url = "/api/get:ptable:" + portal_module + ":" + portal_focus + ":" + portal_lang;

            $().ptable();
        }

        // attachi vajalikud event'id uuesti

        $(".nav-tabs").unbind("click").on("click", "li > a:not(.nonav)", function(e) {
            e.preventDefault();
            last_tab = $(this).attr("href")[1];
        });
    });
}

function load_focus_widgets() {
    $(".widget-wrapper").each(function () {
        var data_w = "";

        if ($(this).data("input")) {
            var input = $(this).data("input");
            //var jsonDecoded = JSON.parse(input);// wiki%3Aerkki%20solvak
            //var encoded = encodeURI(input).replace('%3A', ':');
            //console.log(encoded);
            var data_w = ':' + input;
        }

        //$(this).load("/" + portal_module + "-widget" + "/get/" + $(this).prop("id") + data_w + "?content");
        //console.log(resultsCount);
        var url = "/" + portal_module + "-widget" + "/get/" + $(this).prop("id") + data_w + "?content";
        var t = this;

        $.ajax({ url: url, dataType: 'html' }).done(function (data) {
            if (!data){
                $(t).remove();
            }
            $(t).html(data);
            if ($(t).attr("id") === 'search') {
                var html = $('<div/>').append(data);
                var resultCount = $(html).find('.resultsCount').attr('data-count');

                var id = $(t).parent().attr('id');
                var href = 'a[href="#' + id + '"]';
                var span = $(t).parents().find(href).find('span');
                span.attr('class', 'badge badge-primary');
                span.text(resultCount);
                //$(t).parents().find(href).find('span').text(resultCount);
            }
        });
    });
}

function load_core_widgets() {
    $(".core-widget-wrapper").each(function() {
        $(this).load("/core-widget/get/" + $(this).prop("id") + "?content");
    });
}
