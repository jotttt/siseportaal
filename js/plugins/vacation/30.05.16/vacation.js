// ver 3
$(function () {
    // todo: date slider https://static.ttu.ee/portal/ext/inspinia/form_advanced.html
           var daysToShowForOlderIE = 60;

    //var ie = detectIE();
    var ie = false;
    console.log('ie=' + ie);


    var focus = $('#_focus').attr('class');
    var lang = $('#_lang').attr('class');
    if (lang == 'et') {
        $.getScript("https://static.ttu.ee/portal/ext/datepicker/1.3.0/locales/bootstrap-datepicker.et.js", init_filter_datepicker);
    } else {
        init_filter_datepicker();
    }
    //var tl = $.ttuLoader();
    var months, dow;
    if (lang === 'et') {
        months = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"];
        dow = ["P", "E", "T", "K", "N", "R", "L"];
    }
    var personFilter = [];
    var departmentFilter = [];

    loadTab();
// tab change event
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        loadTab();
    });

    $("#content-wrapper").on("change", "#persons", function (e) {
        loadTab();
    });

    $("#results").on("click", "tr", function (e) {
        var id = $(this).data('id');
        getVacationEditModal(id);
    });

    $('#myVacations').on("click", "tr", function (e) {
        var id = $(this).data('id');
        getVacationEditModal(id);
    });

    $('#filterPersonsBtn').on('click', function (e) {
        loadTable();
    });

    $("#department").change(function () {
        load_employee_select();
        loadTab();
    });

    $(".select2-select").select2();
//    $(".chosen-select").chosen({
//        width: "100%",
//        placeholder_text_multiple: t.txt_placeholder_text_multiple,
//        no_results_text: t.txt_placeholder_text_multiple
//    });

    $('.addVacationBtn').click(function (e) {
        // check that only one ou and person is selected
        personFilter = $("#persons").val();
        if (personFilter == null) {
            personFilter = [];
        }
        departmentFilter = $('#department').val();
        if (departmentFilter == null) {
            departmentFilter = [];
        }
        if (personFilter.length === 1) {
            getVacationAddModal('', personFilter[0], true);
        } else {
            alert('Palun vali enne üks töötaja');
        }
    });

    $('#addMyVacationBtn').click(function (e) {
        getMyVacationAddModal('', '', false);
    });

    function loadTab() {
        //tl.addLoader();
        $('#wrapper').spin('ttu');//start spinner
        var tab = $('.tab-pane.active').attr("id");
        if (tab == 'a') {
            loadTable();
        } else if (tab == 'b') {
            init_gantt();
        } else if (tab == 'c') {
            loadMyVacations();
        }
    }

    function init_gantt() {
        personFilter = $("#persons").val();
        if (personFilter == null) {
            personFilter = [];
        }
        departmentFilter = $('#department').val();
        if (departmentFilter == null) {
            departmentFilter = [];
        }
        var url = '/api/vacations:vacation';
        var start_date = $('#filterStartDate').val();
        var end_date = $('#filterEndDate').val();
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            data: {
                departmentFilter: departmentFilter,
                personFilter: personFilter,
                start_date: start_date,
                end_date: end_date
            }
        }).done(function (data) {
            if (!data) {
                alert(t.txt_error);
            } else {
                if (typeof data.message !== "undefined") {
                    alert(data.message);
                } else {
                    var start_date = localDateToSql($('#filterStartDate').val());
                    var end_date = localDateToSql($('#filterEndDate').val());
                    var config = {
                        start: start_date,
                        end: end_date,
                        dow: ["E", "T", "K", "N", "R", "L", "P"],
                        months: ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"],
                        /*
                         * 1 - "Korraline puhkus" - green
                         * 2 - "Vanemapuhkus" - red
                         * 3 - "Haiguspuhkus" - purple
                         * 4 - "Palgata puhkus" - orange
                         * 5 - "Lähetus" - teal
                         * 6 - "Õppepuhkus" - blue
                         * 7 - "Koolitus" - yellow
                         */
                        leaveStyles: ['', 'green', 'red', 'purple', 'orange', 'teal', 'blue', 'yellow'], // types are 1..7
                        onItemClick: function (id) {
                            getVacationEditModal(id);
                        },
                        onAddClick: function (date, rowId) {
                            getVacationAddModal(date, rowId, false);
                        }
                    };
                    var vacationsTable = new VacationsTable($('#VacationsTable'), config, data);
                    $('#wrapper').spin(false);//stop spinner

                }
            }
        })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert("[" + jqXHR.responseText + "]");
                });
    }

    function getVacationAddModal(start_date, employee_id, ouCode, disableSaveBtn) {
        getJson('add_modal', '?employee_id=' + encodeURIComponent(employee_id) + '&start_date=' + start_date + '&oucode=' + ouCode)
                .done(function (data) {
                    if (data) {
                        if (typeof data.message !== "undefined") {
                            alert(data.message);
                        } else {
                            $('#vacationEditModalContent').html(data.html);
                            $('#vacationEditModal').modal('show');
                            if (disableSaveBtn) {
                                $('#saveBtn').prop("disabled", true);
                            }
                            initVacationEditModal();
                        }
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert("[" + jqXHR.responseText + "]");
                });
    }

    function getMyVacationAddModal() {
        getJson('my_add_modal', '', '')
                .done(function (data) {
                    if (data) {
                        if (typeof data.message !== "undefined") {
                            alert(data.message);
                        } else {
                            $('#vacationEditModalContent').html(data.html);
                            $('#vacationEditModal').modal('show');
                            initVacationEditModal();
                        }
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert("[" + jqXHR.responseText + "]");
                });
    }


    function getVacationEditModal(id) {
        getJson('edit_modal', 'et', id)
                .done(function (data) {
                    if (!data) {
                        alert(t.txt_error);
                    } else {
                        $('#vacationEditModalContent').html(data.html);
                        $('#vacationEditModal').modal('show');
                        initVacationEditModal();
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert("[" + jqXHR.responseText + "]");
                });
    }

    function initVacationEditModal() {
//        $('#departmentMod').chosen({
//            disable_search_threshold: 10,
//            width: "100%",
//            placeholder_text_multiple: t.txt_placeholder_text_multiple,
//            no_results_text: t.txt_placeholder_text_multiple
//        });
        $('#departmentMod').select2({

        });
//        $("#vacationEditModalContent #person").chosen({
//            disable_search_threshold: 10,
//            width: "100%",
//            placeholder_text_multiple: t.txt_placeholder_text_multiple,
//            no_results_text: t.txt_placeholder_text_multiple
//        });
        $("#vacationEditModalContent #person").select2({

        });

// pole enam vaja
//        $("#vacationEditModalContent #person").on("select2-select",function (e) {
//            $('#saveBtn').prop("disabled", false);
//            var employee_id = $('#person').val();
//            $('#dialogData').attr('data-employee_id', employee_id);
//        });
        $('#vacationEditModalContent #addPerson').click(function (e) {
            e.preventDefault();
            var id = $('#dialogData').attr('data-absence_id');
            addReplacementRow(id);
        });
        $('#vacationEditModalContent #saveBtn').click(function (e) {
            var ouCode = $('#departmentMod').val();
            if (typeof ouCode === 'undefined') {
                ouCode = $('#dialogData').data('oucode');
            }
            var replacementsJson = getReplacements();
            var id = $('#dialogData').data('absence_id');
            var employee_id = $('#dialogData').data('employee_id');
            var display_name = $('#dialogData').data('display_name');
            var absence_type = $('#absence_type').val();
            var start_date = $('#start_date').val();
            var end_date = $('#end_date').val();

            var url = '/api/save:vacation';
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                data: {id: id, oucode: ouCode, employee_id: employee_id, display_name: display_name, absence_type: absence_type, start_date: start_date, end_date: end_date, replacements: replacementsJson}
            }).done(function (response) {
                if (response.success) {
                    loadTab();
                    $('#vacationEditModal').modal('hide');
                } else {
                    var msg = response.message;
                    alert(msg);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                fail(errorThrown);
            });
        });

        $('#vacationEditModalContent #deleteBtn').click(function (e) {
            if (confirm(t.txt_confirm_delete)) {
                var id = $('#dialogData').attr('data-absence_id');
                var url = '/api/delete:vacation';
                $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: 'json',
                    data: {id: id}
                }).done(function (response) {
                    if (response.success) {
                        $('#vacationEditModal').modal('hide');
                        loadTab();
                    } else {
                        fail(response.message);
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    fail(errorThrown);
                });
            }
        });

        initPerson();

    }

    function initPerson() {
//        if (lang == 'et') {
//            $.getScript("https://static.ttu.ee/portal/ext/datepicker/1.3.0/locales/bootstrap-datepicker.et.js", init_modal_datepicker);
//        } else {
        init_modal_datepicker();
        //}
        $('.deletePerson').off('click');// remove click handlers
        $('.deletePerson').click(function (e) {
            e.preventDefault();
            $(this).closest("div .row").remove();
        });

        $('.personInput').ae_complete({
            url: "/api/persons:vacation",
            show: 'displayname',
            property: 'displayname',
            onSelect: function (parent, result) {
                $(parent).attr('data-employee_id', result.employee_id);
                $(parent).attr('data-display_name', result.displayname);
                $(parent).attr('data-oucode', result.oucode);
            }
        });
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function formatDate(date) {
        var month = '' + (date.getMonth() + 1);
        var len = month.length;
        if (month.length === 1) {
            month = '0' + month;
        }
        return date.getDate() + '.' + month + '.' + date.getFullYear();
    }

    function getReplaceStartDate() {
        var rows = $('#replacements').children();
        if (rows.length === 0) {
            return $('#start_date').val();
        } else {
            var date = $(rows).last().find('input[name="end"]').val();
            var split = date.split('.');
            date = split[1] + '/' + split[0] + '/' + split[2];
            return formatDate(addDays(date, 1));
        }
    }

    function getReplaceEndDate() {
        return $('#end_date').val();
    }

    function getReplacements() {
        var rows = $('#replacements').children();
        var replacements = [];
        $.each(rows, function (index, value) {
            var replacement = {};
            replacement.id = $(value).find('.personInput').data('id');
            replacement.employee_id = $(value).find('.personInput').data('employee_id');
            replacement.display_name = $(value).find('.personInput').data('display_name');
            replacement.start_date = $(value).find('input[name="start"]').val();
            replacement.end_date = $(value).find('input[name="end"]').val();
            replacements.push(replacement);
        });
        return JSON.stringify(replacements);
    }

    function addReplacementRow(absence_id) {
        getJson('newPersonRow', lang, absence_id)
                .done(function (data) {
                    if (!data) {
                        alert(t.txt_error);
                    } else {
                        //$('#replacementsTable tr:last').after(data.html);
                        var start_date = getReplaceStartDate();
                        var end_date = getReplaceEndDate();
                        $('#replacements').append(data.html);
                        $('#replacements').children().last().find('input[name="start"]').val(start_date);
                        $('#replacements').children().last().find('input[name="end"]').val(end_date);

                        initPerson();
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert("[" + jqXHR.responseText + "]");
                });
    }

    function getJsonFiltered(name, param, uid) {
        if (typeof uid === 'undefined') {
            uid = '';
        } else {
            uid = ':' + uid;
        }
        var url = '/api/' + name + ':vacation:' + param + uid;
        var start_date = $('#filterStartDate').val();
        var end_date = $('#filterEndDate').val();
        return $.ajax({
            type: 'post',
            dataType: 'json',
            url: url,
            data: {
                department: department,
                personFilter: personFilter,
                startate: start_date,
                end_date: end_date
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }

    function getJson(name, param, uid) {
        if (typeof uid === 'undefined') {
            uid = '';
        } else {
            uid = ':' + uid;
        }
        var url = '/api/' + name + ':vacation:' + param + uid;
        return $.ajax({
            type: 'get',
            dataType: 'json',
            url: url
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }

    function fail(error) {
        alert(error);
    }

    //http://bootstrap-datepicker.readthedocs.org
    function init_modal_datepicker() {
        $('#vacationEditModalContent .input-daterange').datepicker({
            language: lang,
            format: "dd.mm.yyyy",
            keyboardNavigation: false,
            autoclose: true,
            todayHighlight: true,
            weekStart: 1,
            calendarWeeks: true
        });
    }

    //http://bootstrap-datepicker.readthedocs.org
    function init_filter_datepicker() {
        $('#daterangeDiv .input-daterange').datepicker({
            language: lang,
            format: "dd.mm.yyyy",
            keyboardNavigation: false,
            autoclose: true,
            todayHighlight: true,
            weekStart: 1,
            calendarWeeks: true
        }).on('changeDate', function (e) {
            var start = $('#filterStartDate').val();
            var end = $('#filterEndDate').val();
            start = localDateToSql(start);
            end = localDateToSql(end);
            if (ie && parseInt(ie) < 13) { // Internet Explorer < ver 13
                var diff = daysBetween(start, end);
                if (diff > daysToShowForOlderIE) {
                    start = new Date(start);
                    end = new Date(start.getTime() + daysToShowForOlderIE * 24 * 60 * 60 * 1000);
                    $('#filterEndDate').datepicker('update', end);
                }
            }
            loadTab();
        });
    }

    function load_employee_select() {
        var url = '/api/employee_select:vacation';
        departmentFilter = $('#department').val();
        if (departmentFilter == null) {
            departmentFilter = [];
        }
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            data: {
                departmentFilter: departmentFilter
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        })
                .done(function (data) {
                    if (!data) {
                        alert(t.txt_error);
                    } else {
                        $('#employeeSelectDiv').html(data.html);
                        personFilter = [];
                        $("#persons").select2();

                        departmentFilter = $('#department').val();
                        if (departmentFilter === null) {
                            //$('#persons').prop('disabled', true).trigger("chosen:updated");
                        } else {
                            //$('#persons').prop('disabled', false).trigger("chosen:updated");
                        }
                        $("#persons").change(function () {
                            loadTab();
                        });
                        loadTab();
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert("[" + jqXHR.responseText + "]");
                });
    }

    function loadMyVacations() {
        var url = '/api/my_vacations:vacation';
        departmentFilter = $('#department').val();
        if (departmentFilter == null) {
            departmentFilter = [];
        }
        var start_date = $('#filterStartDate').val();
        var end_date = $('#filterEndDate').val();
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            data: {
                departmentFilter: departmentFilter,
                start_date: start_date,
                end_date: end_date
            }
        }).done(function (response) {
            $('#myVacations').html(response.html);
            $('#wrapper').spin(false);//stop spinner
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }

    function loadTable() {
        personFilter = $("#persons").val();
        if (personFilter == null) {
            personFilter = [];
        }
        departmentFilter = $('#department').val();
        if (departmentFilter == null) {
            departmentFilter = [];
        }
        var url = '/api/vacations_table:vacation';
        var start_date = $('#filterStartDate').val();
        var end_date = $('#filterEndDate').val();
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            data: {
                departmentFilter: departmentFilter,
                personFilter: personFilter,
                start_date: start_date,
                end_date: end_date
            }
        }).done(function (response) {
            $('#results').html(response.html);
            $('#wrapper').spin(false);//stop spinner
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }

    function localDateToSql(date) {
        var split = date.split('.');
        var d = parseInt(split[0]);
        var m = parseInt(split[1]);
        var y = parseInt(split[2]);
        m = (m < 10) ? ('0' + m) : m;
        d = (d < 10) ? ('0' + d) : d;
        return y + "-" + m + "-" + d;
    }


/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}
});



