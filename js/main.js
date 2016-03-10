//var History = window.History, State = History.getState();
var portal_focus, portal_module, portal_session, portal_lang, portal_build;
var dropzone = false;
var last_tab = "a";
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
    "planner":          "mission"
};

$.ajaxSetup({cache: false});

/*
 History.Adapter.bind(window, "statechange", function() {
 State = History.getState();
 var url = State.data["url"];

 console.log("navigate: " + url);

 load_content(url);
 });
 */

$(document).ready(function () {
    Dropzone.autoDiscover = false;

    portal_focus = $("#_focus").prop("class");
    portal_module = $("#_module").prop("class");
    portal_session = $("#_sess_id").prop("class");
    portal_lang = $("#_lang").prop("class");
    portal_build = $("#_build").prop("class");

    if (focus_js[portal_focus]) {
        var js_url = "/lemon/plugins/" + focus_js[portal_focus] + "/main.js?" + portal_build;

        if (!$("script[src='" + js_url + "']").length)
            $.getScript(js_url);
    }

    window.history.replaceState(null, "", "/" + portal_focus); // + "/action");

    load_focus_widgets();
    load_core_widgets();
});

$(document).on("click", ".ajax-load", function (e) {
    e.preventDefault();
    load_content(process_url($(this)));
});

$(document).on("submit", ".ajax-form", function (e) {
    e.preventDefault();

    var target = $(this).prop("action");
    var before = $(this).data("before");
    var after = $(this).data("after");
    var load_response = false;

    if ($(this).hasClass("load_response"))
        load_response = true;

    var form = target.split("/");
    var focus = focus_js[form[3]];

    var url = "/api/form:" + focus + ":" + $(this).prop("id");

    if (before && !window[before]())
        return false;

    $.post(url, $(this).serialize(), function (response) {
        if (after && !window[after](response))
            return false;

        if (response["redirect"]) {
            if (response["redirect"][0] == "/")
                target = response["redirect"];
            else {
                if (response["redirect"] == "parent")
                    target = target + "/" + last_tab;
                else
                    target = target + "/" + response["redirect"];
            }
        }

        if (load_response) {
            $("#content-wrapper").html(response);
            return;
        }
        else {
            load_content(target);
        }
    }, "json");
});

function process_url(target) {
    var url = target.attr("href");

    if (!url)
        url = target.data("url");

    //console.log(url);

    var args = url.split("/");

    if (!args[0])
        portal_focus = args[1];
    else {
        portal_focus = args[3];

        url = "/" + args.splice(3).join("/");
    }

    //console.log(target);

    // kui argumendiks on "parent", siis suunatakse ümber viimati aktiivsele tab'ile

    if (args[3] == "parent" && last_tab)
        url = args.splice(0, 3).join("/") + "/" + last_tab;

    return url;
}

function push_state(load_url) {
    if (!load_url) {
        var url = $(location).attr("href").split("/");
        var user_args = "";

        if (url[5])
            user_args = "/" + url[5];

        load_url = "/" + portal_focus + "/show" + user_args;

        console.log("refresh load:" + load_url);

        window.history.replaceState(null, "", load_url);

        return;
    }

    History.pushState({url: load_url}, false, load_url);
}

function load_content(url) {
    $("#content-wrapper").load(url, function (response, status, xhr) { // fadeOut(100).
        // kui laaditavat lehte ei leitud või kasutaja sessioon on aegunud, mine algsele lehele tagasi
        if (status == "error" && (xhr.status == 404 || xhr.status == 401)) {
            location.reload();
        }

        // lae vastava mooduli main.js

        if (focus_js[portal_focus]) {
            var js_url = "/lemon/plugins/" + focus_js[portal_focus] + "/main.js?" + portal_build;

            if (!$("script[src='" + js_url + "']").length) {
                $.getScript(js_url);
            }
        }

        portal_module = $("#_module").prop("class");

        load_focus_widgets();

        $().widgetui();
        $().portalui();

        if (focus_js[portal_focus] == "fm")
            $().fm();

        if (focus_js[portal_focus] == "srm")
            $().ptable();
    });

    window.history.replaceState(null, "", "/" + portal_focus);
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
        $.ajax({
            url: url,
            dataType: 'html'
        }).done(function (data) {
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
    $(".core-widget-wrapper").each(function () {
        $(this).load("/core-widget/get/" + $(this).prop("id") + "?content");
    });
}

$("#wiki_help").on("show.bs.modal", function (e) {
    var url = "/help/get/" + portal_focus + "?content";
    $(this).find(".modal-body").load(url);
});

showLoadingAnimation(0);
