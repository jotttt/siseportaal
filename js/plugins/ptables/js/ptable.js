/*jshint -W117 */
$.fn.ptable = function(targets) {
	var prefix 		= "#ptable_",
		need_worker = false,
		updater		= false,
		last_resize	= false,
		settings	= [];

	if (targets === undefined)
		targets = ".ptable";

	$(targets).each(function() {
		var ptable = $(this).prop("id");

		settings[ptable] = {
			target: $(this).prop("id"),
			class: $(this).prop("class"),
			data: $(this).data(),
			mode: "init",
			url: "ptable.php",
			search_from: 3
		}

		// kas on juba olemas salvestatud seaded selle tabeli jaoks?

		sniff_prefs(ptable);

		// tabeli kuvamine

		update(ptable);

		// valikutekasti kuvamine/peitmine

		$("#" + settings[ptable].target).on("click", ".pref_btn", function() {
			$("#" + $(this).prop("id") + "box").toggle();

			//autoupdate_check();
		});

		// klaviatuuriga tabeli juhtimine

		$(document).on("keyup", function(e) {
			// TODO: "keydown" actioniga pgup/pgdown ja nooltega ka üles/alla liikumine tabelis (ainult kui tabel on fookuses)

			//e.preventDefault();
			e.stopImmediatePropagation();

			// kui mingi tabel omab fookust (mouseover) ja navigeerimine on lubatud (vasakule-paremale nooled)

			$(".ptable").each(function() {
				var ct = $(this).prop("id");

				if ($(this).is(":hover") && $(prefix + settings[ct].target).data("navigation")) {
					if (e.keyCode == 37 && settings[ct].page > 1) { // nool vasakule
						settings[ct].page--;
						update(ct);
					}
					else if (e.keyCode == 39 && settings[ct].page < $(prefix + settings[ct].target).data("pages")) { // nool paremale
						settings[ct].page++;
						update(ct);
					}
				}
			});
		});

		// triggerite käivitamine (ainult lingid)
		// ('data'-välja puhul välise skripti asi kontrollida, mis juhtub kui real klikitakse)

		$("#" + settings[ptable].target).on("click", ".trigger", function(e) {
			var ct = Date.now();

			e.stopImmediatePropagation();							// ära luba mitut trigerit käivitada; välja trigger omab prioriteeti kui rea oma ees

			if (last_resize && (ct - last_resize) < 500)			// kui veerulaiuse muutmisest on möödas vähem kui 500ms, siis ära käivita triggereid
				return false;

			if ($(this).data("link")) {
				if ($(this).data("ext"))
					window.open($(this).data("link"), "_blank");	// avab uues aknas
				else
					location.href = $(this).data("link");			// avab samas aknas
			}
			else {
				trigger($(this).data());							// tee midagi selle saadetava infoga
			}
		});

		// tabeli kirjete arvu muutmine ja vastavale uuele leheküljele viimine

		$("#" + settings[ptable].target).on("change", prefix + settings[ptable].target + "_pagesize", function() {
			var old_pagesize = $(prefix + settings[ptable].target).data("page_size");
			var old_page = $(prefix + settings[ptable].target).data("page") - 1;
			var landing_page = 1;

			// kui uus või vana valik pole "kõik read", siis arvuta millisele lehele oleks sobiv kasutaja visata

			if ($(this).val() !== "*" && old_pagesize !== "*")
				landing_page = Math.floor((old_page * old_pagesize) / $(this).val()) + 1;

			settings[ptable].page = landing_page;
			settings[ptable].page_size = $(this).val();

			update(ptable);
		});

		// otsingukasti sisu puhul enter triggerdab otsingunuppu

		$("#" + settings[ptable].target).on("change", prefix + settings[ptable].target + "_search", function() {
			$(prefix + settings[ptable].target + "_commit_search").trigger("click");
		});

		// automaatne otsing (kui lubatud)

		$("#" + settings[ptable].target).on("keyup", prefix + settings[ptable].target + "_search", function(e) {
			if (e.keyCode < 46 && e.keyCode !== 32 && e.keyCode !== 8) // kui ei ole reaalsed tähemärgid ja ei ole del, backspace, tühik
				return false;

			if ($(prefix + settings[ptable].target).data("autosearch")) {
				settings[ptable].search = $(prefix + settings[ptable].target + "_search").val();

				if (settings[ptable].search.length < settings[ptable].search_from) {
					if (e.keyCode === 8 || e.keyCode === 46) // kui vajutatakse backspace või del
						settings[ptable].search = "";
					else
						return false;
				}

				update(ptable);
			}
		});

		// et väljaotsingukastil endal klikkimine ei vallandaks sorteerimistriggerit

		/*
		$("#" + settings[ptable].target).on("click", ".field_search", function(e) {
			e.stopImmediatePropagation();
		});

		// väljaotsingu kasti kuvamine

		$("#" + settings[ptable].target).on("click", ".field_search_btn", function(e) {
			e.stopImmediatePropagation();

			$("#
			$("#" + $(this).prop("id") + "_input").toggle();
		});*/

		$("#" + settings[ptable].target).on("click", ".nav, .order, .search_btn", function(e) {
			if ($(this).hasClass("order")) { // tabeli välja peal klikkimise puhul sorteeri selle järgi
				if (settings[ptable].order == undefined) {
					settings[ptable].order = $(prefix + settings[ptable].target).data("order");
					settings[ptable].way = $(prefix + settings[ptable].target).data("way");
				}

				if (settings[ptable].order == $(this).data("field")) { // teistkordsel klikkimisel sama välja peal, muuda järjestamine vastupidiseks
					if (settings[ptable].way == "asc")
						settings[ptable].way = "desc";
					else
						settings[ptable].way = "asc";
				}
				else {
					settings[ptable].way = "asc"; // uue välja klikkimisel on järjekord kasvav
				}

				settings[ptable].order = $(this).data("field");
			}
			else if ($(this).hasClass("search_btn")) {
				settings[ptable].search = $(prefix + settings[ptable].target + "_search").val();
			}
			else { // ära navigeeri, kui see on keelatud või kui leht juba on aktiivne
				if ($(this).hasClass("denied") || $(this).hasClass("selected"))
					return false;

				settings[ptable].page = $(this).data("page");
			}

			update(ptable);
		});
	});

	// uuenda tabelit

	function update(ptable) {
		var timestamp = Math.floor(Date.now() / 1000);

		// kui tabel pole hetkel nähtav, siis ei uuenda ka

		if (settings[ptable].mode == "update" && $("#" + settings[ptable].target).is(":hidden"))
			return false;

		// leia veergude laiused

		if (settings[ptable].mode == "update")
			settings[ptable].col_width = col_widths(ptable);

		// salvesta kõik hetkeseaded

		//store_prefs(ptable);

		// uuenda tabelit

		$.ajax({ url: settings[ptable].url, data: { ptable: settings[ptable] } }).done(function(content) {
			if (settings[ptable].mode == "init")
				$("#" + settings[ptable].target).html(content);
			else
				$(prefix + settings[ptable].target + "_container").html(content);

			settings[ptable].page = 		$(prefix + settings[ptable].target).data("page");
			settings[ptable].page_size =	$(prefix + settings[ptable].target).data("page_size");
			settings[ptable].order =		$(prefix + settings[ptable].target).data("order");
			settings[ptable].way =			$(prefix + settings[ptable].target).data("way");
			settings[ptable].autoupdate =	$(prefix + settings[ptable].target).data("autoupdate");
			settings[ptable].store = 		$(prefix + settings[ptable].target).data("store");
			settings[ptable].last_update =	timestamp;
			settings[ptable].mode = 		"update";

			autoupdate_check();
			resize_columns();
			store_prefs(ptable);
		});
	}

	/* hangi salvestatud info */

	function sniff_prefs(ptable) {
		if (store.get(ptable + "_page") === undefined)
			return false;

		settings[ptable].autoupdate =	store.get(ptable + "_autoupdate");
		settings[ptable].col_width =	store.get(ptable + "_col_width");
		//settings[ptable].page =			store.get(ptable + "_page");
		settings[ptable].page_size =	store.get(ptable + "_page_size");
		settings[ptable].order =		store.get(ptable + "_order");
		settings[ptable].way =			store.get(ptable + "_way");
		//settings[ptable].search =		store.get(ptable + "_search");
	}

	/* salvesta tabeli seaded (vajalikud) */

	function store_prefs(ptable) {
		if (settings[ptable].store === false)
			return false;

		store.set(ptable + "_autoupdate",	settings[ptable].autoupdate);
		store.set(ptable + "_col_width",	settings[ptable].col_width);
		//store.set(ptable + "_page",			settings[ptable].page);
		store.set(ptable + "_page_size",	settings[ptable].page_size);
		store.set(ptable + "_order",		settings[ptable].order);
		store.set(ptable + "_way",			settings[ptable].way);
		//store.set(ptable + "_search",		settings[ptable].search);
	}

	/* hangi veergude laiused */

	function col_widths(ptable) {
		var widths = "";

		$(prefix + settings[ptable].target + " th:not(.resize)").each(function() {
			widths += $(this).width() + "-";
		});

		return widths;
	}

	/* muuda veergude laiust */

	function resize_columns(ptable) {
		var resizing = false;
		var el = undefined;
		var el_x, el_width;

		$(".resize").mousedown(function(e) {
			resizing = $(this).closest("table").prop("id").substr(prefix.length - 1); // hangi tabeli id
			el = $(prefix + resizing).find("th").eq(this.cellIndex - 1); // õige th (nii td kui th muutmisel)
			el_x = e.pageX;
			el_width = el.width();
			$(el).addClass("resizing");
		});

		$(document).mousemove(function(e) {
			if (resizing)
				$(el).width(el_width + (e.pageX - el_x));
		});

		$(document).mouseup(function() {
			if (resizing) {
				store.set(resizing + "_col_width", col_widths(resizing));
				$(el).removeClass("resizing");
				last_resize = Date.now();
                resizing = false;
			}
		});
	}

	function autoupdate_check() {
		need_worker = false;

		// kas mõnda tabelit on vaja automaatselt uuendada?

		for (pt in settings)
			//if ($(prefix + settings[pt].target).data("autoupdate"))
			if (settings[pt].autoupdate)
				need_worker = true;

		// kas on vaja seada uuenduse intervall või hoopis panna worker seisma, kuna ükski tabel ei vaja enam seda?

		if (need_worker && !updater)
			updater = setInterval(worker, 1000);
		else if (!need_worker && updater)
			clearInterval(updater);
	}

	// tee midagi triggeriga rea või välja peal klikkimise peale (mitte lingi puhul siis)

	function trigger(data) {
		var what = "";

        $.each(data, function(i, field) {
			what += " [" + field + "]";
		});

		alert(what);
	}

	// uuenda tabelit automaatselt, kui on autoupdate seatud tabelile ja eelmisest updatest on määratud aeg mööda läinud

	function worker() {
		var timestamp = Math.floor(Date.now() / 1000);

		/*$.ajax({ url: "update_sql.php" });*/

		// uuenda vajalikku tabelit, kui vastav aeg on mööda läinud viimasest uuendusest

		for (pt in settings) {
			if ($(prefix + settings[pt].target).data("autoupdate") && timestamp > (settings[pt].last_update + $(prefix + settings[pt].target).data("autoupdate"))) {
				//console.log(pt + ":" + $(prefix + settings[pt].target).data("autoupdate"));
				update(pt);
			}
		}
	}

	// keeleuuendus (ainult demo jaoks)

	$(".lang").click(function() {
		if ($(this).hasClass("current"))
			return false;

		location.href = "/ptable/?lang=" + $(this).data("lang");
	});

	// autoupdate checkboxi ja valikukasti aktiveerimine

	$(".ptable").on("click", ".autoupdate_check", function() {
		var tbl = $(this).data("table");

		if ($(this).hasClass("off")) {
			$(prefix + tbl + "_autoupdate_off").hide();
			$(prefix + tbl + "_autoupdate_on").show();
			$(prefix +tbl + "_autoupdate_select").prop("disabled", false);

			settings[tbl].autoupdate = parseInt($(prefix + tbl + "_autoupdate_select").val());
		}
		else {
			$(prefix + tbl + "_autoupdate_on").hide();
			$(prefix + tbl + "_autoupdate_off").show();
			$(prefix + tbl + "_autoupdate_select").prop("disabled", "disabled");

			settings[tbl].autoupdate = 0;
		}

		autoupdate_check();
		store_prefs(tbl);
	});

	// kui muudetakse autoupdate aega

	$(".ptable").on("change", ".autoupdate_select", function() {
		var tbl = $(this).data("table");

		settings[tbl].autoupdate = parseInt($(this).val());

		store_prefs(tbl);
	});
};

$().ptable();
