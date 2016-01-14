(function () {
    var t; //translations
    var lang = $('#_lang').attr('class');
    var editorLang = lang;
    var actionId;
    var parentId;
    var goalId;
    var departments;
    var actionFilter = {
        '0': false, // not started
        '1': false, // in progress
        '2': false // done
    };
    var lastActionUid;
    loadScripts(lang);
    getTranslations();
    getDepartments();
    goalsInit();

    $('#domainsFilter').click(function (e) {
        var id = $(this).val();
        getGoals(id);
    });

        substringMatcher = function (strs) {
            return function findMatches(q, cb) {
                var matches, substringRegex;

                // an array that will be populated with substring matches
                matches = [];

                // regex used to determine if a string contains the substring `q`
                substrRegex = new RegExp(q, 'i');

                // iterate through the pool of strings and for any string that
                // contains the substring `q`, add it to the `matches` array
                $.each(strs, function (i, str) {
                    if (substrRegex.test(str)) {
                        matches.push(str);
                    }
                });
                cb(matches);
            };
        };

    function goalsInit() {

        $(".goal-badge").click(function (e) {
            e.preventDefault();

            goalId = $(this).attr('data-uid');
            console.log(goalId);

            $(".goal-details-open-button").remove();
            $(".add-new-action-btn").remove();

            if ($(this).hasClass("active")) { //&& $(this).find("a").hasClass(".goal-details-open-button")) {
                $(this).removeClass("active");
                $(this).find('i').addClass("fa-chevron-down");
                $(".goal-badge").show();

                $('#' + goalId + '-actions').addClass('hidden');
                $('#' + goalId + '-actions2').addClass('hidden');
//                        $('#'+goalId+'-actions').html(data);
//                        $('#'+goalId+'-actions').removeClass('hidden');
                //$('#actionsDiv').hide();
            } else {
                //$('#actionsDiv').show();
                $('#' + goalId + '-actions').removeClass('hidden');

                $(".goal-badge").removeClass("active");
                //$(".goal-badge").hide();
                $(this).show();
                $(this).addClass("active");
                $(this).find('i').removeClass("fa-chevron-down");
                $(this).find('a').after("<a href='#' class='goal-details-open-button' data-toggle='modal' data-target='#goal-details'><i class='fa fa-search text-white right m-t-xxs'></i></a>");
                $(this).after("<a href='#' class='add-new-action-btn'><i class='fa fa-plus'></i></a>");

                goalInit();
                $('.add-new-action-btn').off('click');
                $(".add-new-action-btn").click(function (e) {
                    e.preventDefault();
                    //var uid = $(this).prev().attr('data-uid');
                    getJson('acteditmodal', goalId, editorLang + '?new=1')
                            .done(function (data) {
                                if (!data) {
                                    alert(t.txt_error);
                                } else {
                                    $('#actionEditModalContent').html(data.html);
                                    //departments = data.departments;
                                    $('#actionEditModal').modal('show');
                                    initActionEditModal(data.uid);
                                    actionId = data.uid;
                                }
                            })
                            .fail(function (jqXHR, textStatus, errorThrown) {
                                alert(t.error + ": [" + jqXHR.responseText + "]");
                            });
                });
                $("#goal-details").removeClass("hidden");
                getActions();
            }
        });
    }

    function getGoals(domainFilter) {
        var url = '/query/' + portal_session + '/scorecard:goals' + ':' + lang + '?domain=' + domainFilter;
        return $.ajax({
            type: 'get',
            dataType: 'html',
            url: url
        })
                .done(function (data) {
                    if (!data) {
                        alert(t.txt_error);
                    } else {
                        $('#goalsDiv').html(data);
                        goalsInit();
                        //actionsInit(1);
                        //actionFilterInit();
                        //$("#" + parentId + ' li.action-badge').trigger("click");// et L2 actionid uuesti laetaks
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    fail(errorThrown);
                });
    }

    function getActions(departmentFilter) {

        var filterVal = (actionFilter['0'] ? '0' : '') + (actionFilter['1'] ? '1' : '') + (actionFilter['2'] ? '2' : '');
        getHtml('actions', goalId, editorLang, '?status=' + filterVal + '&department=' + departmentFilter)
                .done(function (data) {
                    if (!data) {
                        alert(t.txt_error);
                    } else {
                        if (departmentFilter === undefined) {
                            $('.actionsDiv').addClass('hidden');
                            $('#' + goalId + '-actions').html(data);
                            $('#' + goalId + '-actions').removeClass('hidden');
                            actionsInit(1);
                            actionFilterInit();
                            $("#" + parentId + ' li.action-badge').trigger("click");// et L2 actionid uuesti laetaks
                        } else {
                            $('#goalsDiv').html(data);
                        }
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(t.error + ": [" + jqXHR.responseText + "]");
                });

//        getHtml('actionFilterStatus', goalId, editorLang, '?status=' + filterVal)
//                .done(function (data) {
//                    if (!data) {
//                        alert(t.txt_error);
//                    } else {
//
//                        $('#action-filter-status').html(data);
//                        actionFilterInit();
//                    }
//                })
//                .fail(function (jqXHR, textStatus, errorThrown) {
//                    alert(t.error + ": [" + jqXHR.responseText + "]");
//                });
    }

    function actionFilterInit() {
        //FILTER LOGIC
//        $("#action-filter-status").find("a").click(function (e) {
//
//            e.preventDefault();
//            e.stopPropagation();
//            $(this).toggleClass("selected");
//            var filterIndex = $(this).attr('data-id');
//            actionFilter[filterIndex] = actionFilter[filterIndex] ? false : true; // toggle filter
//            getActions();
//        });
    }

    function goalInit() {
        $('.goal-details-open-button').off('click');// remove click handlers
        $(".goal-details-open-button").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            goalId = $(this).closest('li').attr('data-uid');
            getHtml('goaleditmodal', goalId, editorLang, '')
                    .done(function (data) {
                        if (!data) {
                            alert(t.txt_error);
                        } else {
                            $('#goalEditModalContent').html(data);
                            $('#goalEditModal').modal('show');
                            initGoalEditModal(goalId);
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert(t.error + ": [" + jqXHR.responseText + "]");
                    });
        });
    }

    function getHtml(name, uid, editorLang, param) {
        var url = '/query/' + portal_session + '/scorecard:' + name + ':' + uid + ':' + editorLang + param;
        return $.ajax({
            type: 'get',
            dataType: 'html',
            url: url
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }

    function getJson(name, uid, editorLang) {
        var url = '/query/' + portal_session + '/scorecard:' + name + ':' + uid + ':' + editorLang;
        return $.ajax({
            type: 'get',
            dataType: 'json',
            url: url
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }

    function initGoalEditModal(uid) {
        $('#goal-lang').off('change');// remove handler
        $('#goal-lang').change(function () {
            editorLang = $(this).val();
            getJson('goaltexts', uid, editorLang)
                    .done(function (data) {
                        if (!data) {
                            alert(t.txt_error);
                        } else {
                            $('#goal-title').editable('setValue', data.title, true);
                            $('#goalDescr').html(data.descr);
                            var url = '/query/' + portal_session + '/scorecard:' + 'saveactval:' + editorLang;
                            $('.editable').editable('option', 'url', url);
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert(t.error + ": [" + jqXHR.responseText + "]");
                    });
        });
        $('#goalEditModal').off('hidden.bs.modal');
        $('#goalEditModal').on('hidden.bs.modal', function () {
            getHtml('goal', goalId, lang, '')
                    .done(function (data) {
                        if (!data) {
                            alert(t.txt_error);
                        } else {
                            $('#' + goalId).html(data);
                            $('#' + goalId).find('i').removeClass("fa-chevron-down");
                            $('#' + goalId).find('a').after("<a href='#' class='goal-details-open-button' data-toggle='modal' data-target='#goal-details'><i class='fa fa-search text-white right m-t-xxs'></i></a>");
                            //$('#' + goalId).after("<a href='#' class='add-new-action-btn'><i class='fa fa-plus'></i></a>");
                            goalInit();
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert(t.error + ": [" + jqXHR.responseText + "]");
                    });
        });
        //init editable fields
        var url = '/query/' + portal_session + '/scorecard:' + 'saveactval:' + editorLang;
        $('.editable').editable({
            url: url,
            pk: uid,
            onblur: 'submit'
        });

        $("#domain").change(function () {
            var domain = $(this).find('option:selected').val();
            postData('saveactval', 'domain', domain, goalId);
        });

    }

    function initActionEditModal(uid) {
        lastActionUid = uid;
        actionId = uid;
        init_datepicker();
        initCollapseLink();

        $('#lang').change(function () {
            editorLang = $(this).val();
            getJson('actiontexts', actionId, editorLang)
                    .done(function (data) {
                        if (!data) {
                            alert(t.txt_error);
                        } else {
                            $('#title').editable('setValue', data.title, true);
                            $('#descr').editable('setValue', data.descr, true);
                            var url = '/query/' + portal_session + '/scorecard:' + 'saveactval:' + editorLang;
                            $('.editable').editable('option', 'url', url);
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert(t.error + ": [" + jqXHR.responseText + "]");
                    });
        });

        //init editable fields
        var url = '/query/' + portal_session + '/scorecard:' + 'saveactval:' + editorLang;
        $('.editable').editable({
            url: url,
            pk: uid,
            onblur: 'submit'
        });

        // progress slider
        $('input[type=range]').on("input", function () {
            $('#progressNo').html('<strong>' + $(this).val() + '%</strong>');
        });
        $('input[type=range]').on("change", function () {
            $('#progressNo').html('<strong>' + $(this).val() + '%</strong>');// IE fix
            postData('saveactval', 'progress', $(this).val(), uid);
        });

        $('#addPerson').click(function (e) {
            e.preventDefault();
            addRaciRow();
        });
        initRaci();

        var depInput = $('#department').typeahead(null, {
            name: 'departments',
            source: substringMatcher(departments)
        });
        depInput.bind('typeahead:select', function (ev, suggestion) {
            var depCode = $('#department').val().match(/\d+/g)[0];
            postData('saveactval', 'realm', depCode, actionId);
        });

        $('#actionEditModal').off('hidden.bs.modal');
        $('#actionEditModal').on('hidden.bs.modal', function () {
            getActions();
            getHtml('goal', goalId, lang, '')
                    .done(function (data) {
                        if (!data) {
                            alert(t.txt_error);
                        } else {
                            $('#' + goalId).html(data);
                            goalInit();
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert(t.error + ": [" + jqXHR.responseText + "]");
                    });
        });
    } // END OF initActionEditModal(uid)


    function initActionEditModal_L2(uid) {
        lastActionUid = uid;
        init_datepicker();
        initCollapseLink();

        $('#lang').change(function () {

            editorLang = $(this).val();
            getJson('actiontexts', actionId, editorLang)
                    .done(function (data) {
                        if (!data) {
                            alert(t.txt_error);
                        } else {
                            $('#title').editable('setValue', data.title, true);
                            $('#descr').editable('setValue', data.descr, true);
                            var url = '/query/' + portal_session + '/scorecard:' + 'saveactval:' + editorLang;
                            $('.editable').editable('option', 'url', url);
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert(t.error + ": [" + jqXHR.responseText + "]");
                    });
        });

        $('#actionEditModal').off('hidden.bs.modal');
        $('#actionEditModal').on('hidden.bs.modal', function () {
            //getActions();
//            getHtml('goal', goalId, lang, '')
//                    .done(function (data) {
//                        if (!data) {
//                            alert(t.txt_error);
//                        } else {
//                            $('#' + goalId).html(data);
//                            goalInit();
//                        }
//                    })
//                    .fail(function (jqXHR, textStatus, errorThrown) {
//                        alert(t.error + ": [" + jqXHR.responseText + "]");
//                    });
        });
        //init editable fields
        var url = '/query/' + portal_session + '/scorecard:' + 'saveactval:' + editorLang;
        $('.editable').editable({
            url: url,
            pk: uid,
            onblur: 'submit'
        });

        // progress slider
        $('input[type=range]').on("input", function () {
            $('#progressNo').html('<strong>' + $(this).val() + '%</strong>');
        });
        $('input[type=range]').on("change", function () {
            $('#progressNo').html('<strong>' + $(this).val() + '%</strong>');// IE fix
            postData('saveactval', 'progress', $(this).val(), uid);
        });

        $('#addPerson').click(function (e) {
            e.preventDefault();
            addRaciRow();
        });
        initRaci();
    }

    function actionsInit(level) {
//        $('#testSpan').click(function (e) {
//            e.preventDefault();
//            $('#6Y3VG5').find(".action-badge").addClass("active");
//        });
        if (lastActionUid != 0) {
            $('#' + lastActionUid).find(".action-badge-details").addClass("open");
            $('#' + lastActionUid).find(".action-badge").addClass("active");

            $('#' + lastActionUid).find(".action-badge-open-details").find('i.fa').removeClass('fa-chevron-down');
            $('#' + lastActionUid).find(".action-badge-open-details").find('i.fa').addClass('fa-chevron-up');
            lastActionUid = 0;
        }
        $('.action-badge').off('click');
        $('.action-badge').click(function (e) {
            e.preventDefault();
            //e.stopPropagation();
            actionId = $(this).attr('data-id');
            parentId = $(this).attr('data-parentId');
            var level = $(this).attr('data-level');
            level = +level + 1;

            $(".action-badge-details").removeClass("open"); // sulgeme kõik actionid
            $('.action-badge').removeClass('active');
            $(this).addClass('active');

            var filterVal = (actionFilter['0'] ? '0' : '') + (actionFilter['1'] ? '1' : '') + (actionFilter['2'] ? '2' : '');
            getHtml('actions', actionId, editorLang, '?status=' + filterVal + '&level=' + level)
                    .done(function (data) {
                        if (!data) {
                            alert(t.txt_error);
                        } else {
                            if (level == 2) {
                                $('#' + goalId + '-actions2').html(data);
                                $('#' + goalId + '-actions2').removeClass('hidden');
                                actionsInit(2);
                            }
//                            actionFilterInit();
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert(t.error + ": [" + jqXHR.responseText + "]");
                    });

        });
        // initCollapseLink();
        $('a.action-badge-edit-btn').off('click');
        $('a.action-badge-edit-btn').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            actionId = $(this).parents('.action-badge').attr('data-id');
            parentId = $(this).parents('.action-badge').attr('data-parentId');


            getJson('acteditmodal', actionId, editorLang)
                    .done(function (data) {
                        if (!data) {
                            alert(t.txt_error);
                        } else {
                            $('#actionEditModalContent').html(data.html);
                            //departments = data.departments;
                            $('#actionEditModal').modal('show');
                            initActionEditModal(data.uid);
                            actionId = data.uid;
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert(t.error + ": [" + jqXHR.responseText + "]");
                    });
        });
        $('.action-badge-open-details').off('click');
        $(".action-badge-open-details").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            actionId = $(this).parents('.action-badge').attr('data-id');
            parentId = $(this).parents('.action-badge').attr('data-parentId');

            var thisIsOpen = $(this).parent().parent().parent().next("div").find(".action-badge-details").hasClass("open");
            $(".action-badge-details").removeClass("open"); // sulgeme kõik actionid
            if (thisIsOpen) {
                $(this).parent().parent().parent().next("div").find(".action-badge-details").removeClass("open");
                //fa-chevron-up
                $(this).find('i.fa').removeClass('fa-chevron-up');
                $(this).find('i.fa').addClass('fa-chevron-down');
            } else {
                $(this).parent().parent().parent().next("div").find(".action-badge-details").addClass("open");

                $(this).find('i.fa').removeClass('fa-chevron-down');
                $(this).find('i.fa').addClass('fa-chevron-up');
            }
            $('.action-badge').removeClass('active');
            $(this).parent().parent().parent().parent().addClass('active');
        });
        $('.add-new-action-L2-btn').off('click');
        $(".add-new-action-L2-btn").click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            var uid = $(this).parents('.action-badge').parent().attr('id');

            getJson('acteditmodal', uid, editorLang + '?new=1')
                    .done(function (data) {
                        if (!data) {
                            alert(t.txt_error);
                        } else {
                            $('#actionEditModalContent').html(data.html);
                            //departments = data.departments;
                            $('#actionEditModal').modal('show');
                            initActionEditModal(data.uid);
                            actionId = data.uid;
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert(t.error + ": [" + jqXHR.responseText + "]");
                    });
        });
        $('.delete-action-L2-btn').off('click');
        $(".delete-action-L2-btn").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (confirm("Kas oled kindel, et tahad seda kustudada?")) { //todo: translations
                var uid = $(this).parents('.action-badge').parent().attr('id');
                //
                postData('deleteaction', '', '', uid)
                        .done(function (data) {
                            if (!data) {
                                alert(t.txt_error);
                            } else {
                                if (data.success === true) {

                                    //$(this_).closest('tr').remove();
                                } else {
                                    alert(data.msg);
                                }
                            }
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            alert(t.error + ": [" + jqXHR.responseText + "]");
                        });
            }


        });

    }

    function postData(cmd, name, value, uid) {
        //var cmd = 'saveactval';// get translations
        var url = '/query/' + portal_session + '/scorecard:' + cmd;

        return $.ajax({
            type: 'post',
            dataType: 'json',
            url: url,
            data: {
                name: name,
                value: value,
                pk: uid
            }
        })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    fail(errorThrown);
                });
    }

    //http://bootstrap-datepicker.readthedocs.org
    function init_datepicker() {
        if ($(".datepicker").length) {
            var year = currentYear();
            var startDate = '01.' + year;
            year = +year + 10;
            var endDate = '12.' + year;
            if (typeof ($.fn.datepicker) === "function") {
                $(".datepicker").datepicker('remove'); //detach
                $(".datepicker").datepicker({
                    startDate: startDate,
                    endDate: endDate,
                    language: lang,
                    keyboardNavigation: false,
                    minViewMode: 1,
                    autoclose: true,
                    format: "mm.yyyy",
                }).on('changeDate', function (e) {
                    postData('saveactval', 'due', e.date, actionId);
                });
            }
        }
    }

    function today() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var currentYear = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = dd + '.' + mm + '.' + currentYear;
        return today;
    }
    function currentYear() {
        var today = new Date();
        return  today.getFullYear();
    }

    function initRaci() {
        $('.deletePerson').off('click');// remove click handlers
        $('.deletePerson').click(function (e) {
            e.preventDefault();
            var actionId = $(this).closest("tr").attr('data-actionId');
            var personId = $(this).closest("tr").attr('data-personId');
            var this_ = this;
            if (actionId !== undefined && personId !== undefined) {
                postData('deleteperson', '', personId, actionId)
                        .done(function (data) {
                            if (!data) {
                                alert(t.txt_error);
                            } else {
                                if (data.success === true) {
                                    $(this_).closest('tr').remove();
                                } else {
                                    alert(data.msg);
                                }
                            }
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            alert(t.error + ": [" + jqXHR.responseText + "]");
                        });
            }
        });

        $('input').iCheck({
            checkboxClass: 'icheckbox_square-cherry',
            radioClass: 'iradio_square-cherry',
            increaseArea: '20%' // optional
        });

        $('input[type=radio]').on('ifChecked', function (event) {
            var actionId = $(this).closest("tr").attr('data-actionId');
            var personId = $(this).closest("tr").attr('data-personId');
            var val = $(this).val();
            if (actionId !== undefined && personId !== undefined) {
                postData('saveactval', 'raci', personId + ':' + val + ':1', actionId)
                        .done(function (data) {
                            if (!data) {
                                alert(t.txt_error);
                            } else {
                                if (data.success == true) {
                                    // otsime kas keegi on veel R või A ja eemaldame selle tabelist
                                    $("input[type=radio]").each(function (index) {
                                        if (this.value === val) {
                                            var personId_ = $(this).closest("tr").attr('data-personId');
                                            if (personId !== personId_) {
                                                $(this).iCheck('uncheck');
                                            }
                                        }
                                    });
                                } else {
                                    alert(data.msg);
                                }
                            }
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            alert(t.error + ": [" + jqXHR.responseText + "]");
                        });
            }
        });

        $('input[type=checkbox]').on('ifChanged', function (event) {
            var actionId = $(this).closest("tr").attr('data-actionId');
            var personId = $(this).closest("tr").attr('data-personId');
            var val = '0';
            if ($(this).is(':checked'))
                val = '1';
            if (val !== undefined) {
                postData('saveactval', 'raci', personId + ':' + $(this).attr('name') + ':' + val, actionId);
            }
        });

        var url = '/query/' + portal_session + '/scorecard:' + 'persons:';
        //var prefetchUrl = '/query/' + portal_session + '/scorecard:' + 'personsinit';
        var persons = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            //prefetch: prefetchUrl,
            remote: {
                url: url,
                wildcard: '%QUERY',
                replace: function (url, query) {
                    return url + query.replace(' ', '.');
                }
            }
        });
        // Initialize the Bloodhound suggestion engine
        persons.initialize();
        $('#person').typeahead('destroy');

        var personInput = $('#person').typeahead(null, {
            minLength: 3,
            name: 'person',
            source: persons,
            displayKey: 'displayname',
            templates: {
                suggestion: Handlebars.compile('<div>{{displayname}}</div>')
            }
        });

        personInput.bind('typeahead:select', function (ev, suggestion) {
            $('#raciTable tr:last').attr('data-personId', suggestion.employeeid);
            // otsime eelnevalt lisatud input elementi ja eemaldame typeahead'i
            $('#person').typeahead('destroy');
            var personName = $('#person').val();
            $('#person').closest('td').html(personName);
        });

    }


    function addRaciRow() {
        var count = $('#raciTable').attr('data-count');
        count = +count + 1;
        $('#raciTable tr:last').after('<tr class="gradeX" data-actionId="' + actionId + '" >' +
                '<td width="60%" class="editableRaci">' +
                '<input id="person" name="person" class="form-control input-sm typeahead personInput" type="text" value="">' +
                '</td>' +
                '<td width="8%"><input type="radio" name="ra-' + count + '" value="r"></td>' +
                '<td width="8%"><input type="radio" name="ra-' + count + '" value="a"></td>' +
                '<td width="8%"><input type="checkbox" name="c" value="c"></td>' +
                '<td width="8%"><input type="checkbox" name="i" value="i"></td>' +
                '<td width="8%"><a href="#" class="msg_remove fa fa-trash-o btn_border deletePerson"></a></td>' +
                '</tr>');
        $('#raciTable').attr('data-count', count);
        initRaci();
    }

    function loadScripts(lang) {
        $.getScript('/portal/1.0/js/plugins/x-editable/1.5.1/js/bootstrap-editable.js', function () {
            //X-EDITABLE
            //defaults override
            $.fn.editable.defaults.showbuttons = false;
            $.fn.editable.defaults.emptytext = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            $.fn.editable.defaults.mode = 'inline';
        });

        $.getScript('/portal/1.0/js/plugins/icheck/1.0.2/icheck.min.js', function () {
        });

    }

    function initCollapseLink() {
        // Collapse ibox function
        $('.ibox-title').click(function (e) {
            e.preventDefault();
            var ibox = $(this).closest('div.ibox');
            var button = $(this).find('i');
            var content = ibox.find('div.ibox-content, div.ibox-content-full');
            content.slideToggle(200);
            button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
            ibox.toggleClass('').toggleClass('border-bottom');
            setTimeout(function () {
                ibox.resize();
                ibox.find('[id^=map-]').resize();
            }, 50);
        });
    }

    function getDepartments() {
        getJson('departments', '', editorLang)
                .done(function (data) {
                    if (!data) {
                        alert(t.txt_error);
                    } else {
                        departments = data;
                        var departmentFilter = $('#departmentFilter').typeahead(null, {
                            name: 'departments',
                            source: substringMatcher(departments)
                        });
                        departmentFilter.bind('typeahead:select', function (ev, suggestion) {
                            var depCode = $('#departmentFilter').val().match(/\d+/g)[0];
                            getActions(depCode);
                            //postData('saveactval', 'realm', depCode, actionId);
                        });
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(t.error + ": [" + jqXHR.responseText + "]");
                });
    }

    function getTranslations() {
        var cmd = 'tr';// get translations
        var url = '/query/' + portal_session + '/scorecard:' + cmd;
        var jqxhr = $.ajax({
            type: 'get',
            dataType: 'json',
            url: url
        })
                .done(function (data, textStatus, jqXHR) {
                    t = data;
                    //processDivAfterGet();
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    fail();
                });
    }

})(); // Called right away

