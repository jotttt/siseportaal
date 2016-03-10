$.ajaxSetup ({
    // Disable caching of AJAX responses
    cache: false
});
var sess_id = $('#_sess_id').attr('class');
var wiki_uid = $('#_wiki_uid').attr('class');
var wikiAcl = $('#wiki_acl').attr('data-acl');
var lang = $('#_lang').attr('data-lang');
var ns = '';

Dropzone.autoDiscover = false;

var ns = $('#nameSpace').val();
var wiki_uid = $('#_wiki_uid').attr('class');
init();

function init() {
  //  screenshotPreview(); keelasin ajutiselt ära. UI vajab viimistlemist.

    wiki_uid = $('#_wiki_uid').attr('class');
    wikiAcl = $('#wiki_acl').attr('data-acl');
    ns = $('#nameSpace').attr('data-namespace');

    $('#addBtn').on('click', function () {
        $('.cd-panel').toggleClass('is-visible');
    });

    // media list onClick
    $('.row-links').on('click', 'td:not(.special-td)', function () {
        var the_link = $(this).parent().attr("data-link");
        var name = $(this).parent().attr("data-name");
        returnFileUrl(the_link, name); // sule aken ja anna link tagasi väljakutsujale
    });

    // kui vajutati kaustale, laeme kogu container div-i sisu uuesti
    $('.folder-links').on('click', function (e) {
        var ns = $(this).attr('data-link');
        replaceContainer(ns);
        e.preventDefault();
    });

    $('.crumb').on('click', function (e) {
        e.preventDefault();
        ns = $(this).attr('data-dir');
        if (!ns)
            ns = '';
        replaceContainer(ns);

    });

    $('#filesForm').submit(function (e) {
        e.preventDefault();
        var url = '/query/' + sess_id + '/cms:' + 'df:'+lang;
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'html',
            data: $(this).serialize()
        }).done(function (response) {
            var ns = $('#nameSpace').attr('data-nameSpace');
            replaceContainer(ns);
        }).fail(function (data) {

        });
    });
    if (wikiAcl > 4) {
        var myDropzone = new Dropzone("div#dropzone", {
            init: function () {
                this.on("completemultiple", function () {
                    replaceContainer(ns);
                });
                this.on("complete", function () {
                    replaceContainer(ns);
                });
            },
            url: 'https://upload.ttu.ee/put/' + sess_id + '/' + wiki_uid,
            maxFilesize: 25,
            //thumbnailWidth: 50,
            //thumbnailHeight: 50,
            uploadMultiple: true,
            autoProcessQueue: true,
            paramName: 'uploader'
//        addRemoveLinks: true,
//        dictRemoveFile: 'Kustuta',
//        removedfile: function (file) {
//            var name = file.name;
//            $.ajax({
//                type: 'POST',
//                url: 'delete.php',
//                data: "id=" + name,
//                dataType: 'html'
//            });
//            var _ref;
//            return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
//        }
        });
    }
}

function getContainer(ns) {
    var cmd = 'fbc';// file browser container
    var url = '/query/' + sess_id + '/cms:' + cmd + ':' + ns + ':' + lang;

    return $.ajax({
        type: 'get',
        dataType: 'html',
        url: url
    }).fail(function (jqXHR, textStatus, errorThrown) {
        fail(errorThrown);
    });
}

function replaceContainer(ns) {
    getContainer(ns)
            .done(function (data) {
                if (!data) {
                    alert('error');
                } else {
                    $('.container').empty().html(data);
                    init();
                }
            });
}
// Helper function to get parameters from the query string.
function getUrlParam(paramName) {
    var reParam = new RegExp('(?:[\?&]|&)' + paramName + '=([^&]+)', 'i');
    var match = window.location.search.match(reParam);

    return (match && match.length > 1) ? match[1] : null;
}

// Simulate user action of selecting a file to be returned to CKEditor.
function returnFileUrl(fileUrl, name) {
    var funcNum = getUrlParam('CKEditorFuncNum');
    //var fileUrl = 'http://c.cksource.com/a/1/img/sample.jpg';
    window.opener.CKEDITOR.tools.callFunction(funcNum, fileUrl, function () {
        // Get the reference to a dialog window.
//        var dialog = this.getDialog();
//        // Check if this is the Image Properties dialog window.
//        if (dialog.getName() == 'image') {
//            // Get the reference to a text field that stores the "alt" attribute.
//            var element = dialog.getContentElement('info', 'alt');
//            // Assign the new value.
//            if (element)
//                element.setValue('');
//        }
        // Return "false" to stop further execution. In such case CKEditor will ignore the second argument ("fileUrl")
        // and the "onSelect" function assigned to the button that called the file manager (if defined).
        // return false;
    });
    // set alt input to media's name
    if (window.opener.CKEDITOR.dialog.getCurrent().getName() == 'image2') {
        window.opener.CKEDITOR.dialog.getCurrent().getContentElement('info', 'alt').getInputElement().setValue(name);
    }
    window.close();
}

function fail(msg) {
    alert(msg);
}

function screenshotPreview() {
    /* CONFIG */

    xOffset = 10;
    yOffset = 30;

    // these 2 variable determine popup's distance from the cursor
    // you might want to adjust to get the right result

    /* END CONFIG */
    $(".filename").hover(function (e) {
//        console.log('e.pageX='+e.pageX);
//        console.log('e.pageY='+e.pageY);
        var x = 30;
        var y = 50;
        var thumbnail_medium_url = $(this).attr('data-thumbnail_medium_url');
        //debugger;
        if (typeof thumbnail_medium_url !== "undefined") {
            $("body").append("<p id='screenshot'><img src='" + thumbnail_medium_url + "' />" + "</p>");
            $("#screenshot")
                    .css('position', 'absolute')
                    .css("top", y + "px")
                    .css("left", x + "px")
                    .fadeIn("fast");
        }
    },
            function () {
                //if (typeof thumbnail_medium_url !== "undefined") {
                    $("#screenshot").remove();
                //}
            });
//    $(".filename").mousemove(function (e) {
//        var x = 10;
//        var y = 10;
//        //if (typeof thumbnail_medium_url !== "undefined") {
//            $("#screenshot")
//            .css('position: absolute')
//                    .css("top", y + "px")
//                    .css("left", x + "px");
//       // }
//    });

}
;
