/*jshint -W117 */
$(document).ready(function(){
	// ADD NEW EXPENDITURE LINE
	$("#expenditure-new").after("<p>Tere</p>");
	// SHOW/HIDE EXPENDITURE SECTION
	$("#expenditure").show();
	$("#expenditure-yes").click(function(){
		console.log("tere");
		$("#expenditure-yes").addClass("btn-default").removeClass("btn-white");
		$("#expenditure-no").addClass("btn-white").removeClass("btn-default");
		$("#expenditure").fadeIn("slow").show();
	});
	$("#expenditure-no").click(function(){
		$("#expenditure-no").addClass("btn-default").removeClass("btn-white");
		$("#expenditure-yes").addClass("btn-white").removeClass("btn-default");
		$("#expenditure").fadeOut("slow");
	});




	// CHECKBOX PLUGIN
	$('input').iCheck({
		checkboxClass: 'icheckbox_square-grey',
		radioClass: 'iradio_square-grey',
		increaseArea: '20%' // optional
	}); //end

	//DATEPICKER PLUGIN
	$.fn.datepicker.defaults.format = 'dd-mm-yyyy';
	// END DATEPICKER PLUGIN

	// INLINE EDITING PLUGIN
	//defaults
	$.fn.editable.defaults.url = '/post';
	$.fn.editable.defaults.showbuttons = false;
	$.fn.editable.defaults.emptytext = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	//enable / disable
	$('#enable').click(function() {
		$('#user .editable').editable('toggleDisabled');
	});
	$.fn.editable.defaults.mode = 'inline';

	// 1ST BLOCK
	$('#name').editable({
		type: 'text',
		url: '/post',
	});

	$('#department').editable({
		type: 'text',
		url: '/post',
	});

	$('#position').editable({
		type: 'text',
		url: '/post',
	});

	$('#errand_duration_b').editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$('#errand_duration_e').editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});


	$("#vacation").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});



	$('#financing').editable({
		type: 'text',
		url: '/post',
	});

	// 2ND BLOCK
	$('#destination-country').editable({
		value: 'Riik',
		typeahead: {
			name: 'country',
			local: [
				"Afganistan", "Ahvenamaa", "Albaania", "Alžeeria", "Ameerika Samoa", "Ameerika Ühendriigid", "Andorra", "Angola", "Anguilla", "Antarktis", "Antigua ja Barbuda", "Aomen - Hiina erihalduspiirkond", "Araabia Ühendemiraadid", "Argentina", "Armeenia", "Aruba", "Aserbaidžaan", "Austraalia", "Austria", "Bahama", "Bahrein", "Bangladesh", "Barbados", "Belau", "Belgia", "Belize", "Benin", "Bermuda", "Bhutan", "Boliivia", "Bosnia ja Hertsegoviina", "Botswana", "Bouvet’ saar", "Brasiilia", "Briti India ookeani ala", "Briti Neitsisaared", "Brunei", "Bulgaaria", "Burkina Faso", "Burundi", "Colombia", "Cooki saared", "expenditurea Rica", "Côte d'Ivoire", "Djibouti", "Dominica", "Dominikaani Vabariik", "Ecuador", "Eesti", "Egiptus", "Ekvatoriaal-Guinea", "El Salvador", "Eritrea", "Etioopia", "Falklandi saared", "Fidži", "Filipiinid", "Fääri saared", "Gabon", "Gambia", "Ghana", "Gibraltar", "Grenada", "Gruusia", "Gröönimaa", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard ja McDonald", "Hiina", "Hispaania", "Holland", "Hollandi Antillid", "Honduras", "Hongkong - Hiina erihalduspiirkond", "Horvaatia", "Ida-Timor", "Iirimaa", "Iisrael", "India", "Indoneesia", "Iraak", "Iraan", "Island", "Itaalia", "Jaapan", "Jamaica", "Jeemen", "Jersey", "Jordaania", "Jõulusaar", "Kaimanisaared", "Kambodža", "Kamerun", "Kanada", "Kasahstan", "Katar", "Kenya", "Kesk-Aafrika Vabariik", "Kiribati", "Komoorid", "Kongo DV", "Kongo Vabariik", "Kookossaared", "Kreeka", "Kuuba", "Kuveit", "Kõrgõzstan", "Küpros", "Laos", "Leedu", "Lesotho", "Libeeria", "Liechtenstein", "Liibanon", "Liibüa", "Luksemburg", "Läti", "Lääne-Sahara", "Lõuna-Aafrika Vabariik", "Lõuna-Georgia ja Lõuna-Sandwichi saared", "Lõuna-Korea", "Madagaskar", "Makedoonia", "Malaisia", "Malawi", "Maldiivid", "Mali", "Malta", "Mani saar", "Maroko", "Marshalli Saared", "Martinique", "Mauritaania", "Mauritius", "Mayotte", "Mehhiko", "Mikroneesia Liiduriigid", "Moldova", "Monaco", "Mongoolia", "Montenegro", "Montserrat", "Mosambiik", "Myanmar", "Namiibia", "Nauru", "Nepal", "Nicaragua", "Nigeeria", "Niger", "Niue", "Norfolk", "Norra", "Omaan", "Paapua Uus-Guinea", "Pakistan", "Palestiina ala", "Panama", "Paraguay", "Peruu", "Pitcairn", "Poola", "Portugal", "Prantsuse Guajaana", "Prantsuse Lõunaalad", "Prantsuse Polüneesia", "Prantsusmaa", "Puerto Rico", "Põhja-Korea", "Põhja-Mariaanid", "Roheneemesaared", "Rootsi", "Rumeenia", "Rwanda", "Réunion", "Saalomoni Saared", "Saint Helena", "Saint Kitts ja Nevis", "Saint Lucia", "Saint Vincent ja Grenadiinid", "Saint-Pierre ja Miquelon", "Saksamaa", "Sambia", "Samoa", "San Marino", "Saudi Araabia", "Seišellid", "Senegal", "Serbia", "Serbia ja Montenegro", "Sierra Leone", "Singapur", "Slovakkia", "Sloveenia", "Somaalia", "Soome", "Sri Lanka", "Sudaan", "Suriname", "Suurbritannia", "Svaasimaa", "Svalbard ja Jan Mayen", "São Tomé ja Príncipe", "Süüria", "Taani", "Tadžikistan", "Tai", "Taiwan", "Tansaania", "Togo", "Tokelau", "Tonga", "Trinidad ja Tobago", "Tuneesia", "Turks ja Caicos", "Tuvalu", "Türgi", "Türkmenistan", "Tšaad", "Tšehhi", "Tšiili", "USA Neitsisaared", "Uganda", "Ukraina", "Ungari", "Uruguay", "Usbekistan", "Uus-Kaledoonia", "Uus-Meremaa", "Valgevene", "Vanuatu", "Vatikan", "Venemaa", "Venezuela", "Vietnam", "Wallis ja Futuna", "Zimbabwe", "määramata", "Ühendriikide hajasaared", "Šveits"
			]
		}
	});

	$('#destination-city').editable({
		type: 'text',
		url: '/post',
	});

	$('#organization').editable({
		type: 'text',
		url: '/post',
	});

	$('#errand-goal').editable({
		showbuttons: false,
		source: [
			{value: 1, text: 'Teadustöö läbiviimine'},
			{value: 2, text: 'Oponeerimine, kaitsmiskogus osalemine'},
			{value: 3, text: 'Õppetöö läbiviimine'},
			{value: 4, text: 'Eksperthinnangu andmine'},
			{value: 5, text: 'Enesetäiendamine'},
			{value: 6, text: 'Koosolek, kohtumine'},
			{value: 7, text: 'Konverents, seminar > Suuline ettekanne'},
			{value: 8, text: 'Konverents, seminar > Stendiettekanne'},
			{value: 9, text: 'Konverents, seminar > Osalemine'},
			{value: 10, text: 'Mess, näitus > Külastamine'},
			{value: 11, text: 'Mess, näitus > Osalemine eksponendina'},
			{value: 12, text: 'Institutsionaalne koostöö'},
			{value: 13, text: 'Võrgustiku kohtumine'},
			{value: 14, text: 'Välitöödel osalemine'},
			{value: 15, text: 'Muu'}
		]
	});

	$('#transportation').editable({
		pk: 1,
		limit: 3,
		source: [
			{value: 1, text: 'auto'},
			{value: 2, text: 'buss'},
			{value: 3, text: 'lennuk'},
			{value: 4, text: 'laev'},
			{value: 5, text: 'rong'}
		]
	});
	// 3RD BLOCK

	$('#expenditure').editable({
		showbuttons: false,
		prepend: "valimata",
		source: [
			{value: 1, text: 'jah'},
			{value: 2, text: 'ei'}
		]
	});

	$('#daily-expenditure').editable({
		type: 'text',
		url: '/post',
	});

	$("#daily-expenditure-comment").editable({
		type: 'textarea',
		url: '/post',
	});

	$('#travel-expenditure').editable({
		type: 'text',
		url: '/post',
	});

	$("#travel-expenditure-comment").editable({
		type: 'textarea',
		url: '/post',
	});

	$('#accomodation-expenditure').editable({
		type: 'text',
		url: '/post',
	});

	$("#accomodation-expenditure-comment").editable({
		type: 'textarea',
		url: '/post',
	});

	$('#other-expenditure').editable({
		type: 'text',
		url: '/post',
	});

	$("#other-expenditure-comment").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#advance").editable({
		type: 'text',
		url: '/post',
	});


	$("#my-bank-account").editable({
		type: 'text',
		url: '/post',
	});

	$("#finance-manager").editable({
		type: 'text',
		url: '/post',
	});

	$("#head-of-department").editable({
		type: 'text',
		url: '/post',
	});

	/**********************************************************
 	 TÖÖLÄHETUSE ARUANNE
	**********************************************************/
	$("#errand-nr").editable({
		type: 'text',
		url: '/post',
	});

	$("#errand-date").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#action-report").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#advance-date").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#advance-cost").editable({
		type: 'textarea',
		url: '/post',
	});

	// SÕIDUKULU
	//--------------------------------------------------------
	$("#transport-date-b").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#transport-date-e").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#transport-amount").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#transport-cost").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#transport-total").editable({
		type: 'textarea',
		url: '/post',
	});

	// PÄEVARAHA
	//--------------------------------------------------------
	$("#daily-expenditure-date-b").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#daily-expenditure-date-e").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#daily-expenditure-amount").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#daily-expenditure-cost").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#daily-expenditure-total").editable({
		type: 'textarea',
		url: '/post',
	});

	// MAJUTUSKULUD
	//--------------------------------------------------------
	$("#accommodation-date-b").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#accommodation-date-e").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#accommodation-amount").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#accommodation-cost").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#accommodation-total").editable({
		type: 'textarea',
		url: '/post',
	});

	// KONVERENTSI OSAVÕTUMAKS
	//--------------------------------------------------------
	$("#conference-admission-expenditure-date-b").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#conference-admission-expenditure-date-e").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#conference-admission-expenditure-amount").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#conference-admission-expenditure-cost").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#conference-admission-expenditure-total").editable({
		type: 'textarea',
		url: '/post',
	});

	// KINDLUSTUS
	//--------------------------------------------------------
	$("#insurance-date-b").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#insurance-date-e").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#insurance-amount").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#insurance-cost").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#insurance-total").editable({
		type: 'textarea',
		url: '/post',
	});

	// MUUD KULUD
	//--------------------------------------------------------
	$("#other-expenses-date-b").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#other-expenses-date-e").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	$("#other-expenses-amount").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#other-expenses-cost").editable({
		type: 'textarea',
		url: '/post',
	});

	$("#other-expenses-total").editable({
		type: 'textarea',
		url: '/post',
	});

	//KINNITAN ANDMETE ÕIGSUST
	//---------------------------------------------------------
	$("#my-cost-compensation").editable({
		type: 'text',
		url: '/post',
	});

	$("#my-bank-account").editable({
		type: 'text',
		url: '/post',
	});

	$("#my-bank").editable({
		type: 'text',
		url: '/post',
	});

	$("#accept-date-b").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});
	$("#accept-date-e").editable({
		tpl: "<input type='text' class='form-control'></input>",
		format: "dd/mm/yyyy",
		viewformat: "dd/mm/yyyy",
		datetimepicker: {
			weekStart: 1
		}
	});

	/*************************************
	RAAMATUPIDAMISE JA EELARVE OSAKOND
	*************************************/
	//SÕIDUKULUD KOKKU
	//---------------------------------------------------------
	$("#ac-travel-expense-account").editable({
		type: 'textarea',
		url: '/post',
	});
	$("#ac-travel-calculated-expenses").editable({
		type: 'textarea',
		url: '/post',
	});
	$("#ac-travel-advance-pay").editable({
		type: 'textarea',
		url: '/post',
	});

	//PÄEVARAHAD KOKKU
	//---------------------------------------------------------
	$("#ac-daily-expenses-expense-account").editable({
		type: 'textarea',
		url: '/post',
	});
	$("#ac-daily-expenses-calculated-expenses").editable({
		type: 'textarea',
		url: '/post',
	});
	$("#ac-daily-expenses-advance-pay").editable({
		type: 'textarea',
		url: '/post',
	});

	//MAJUTUSKULUD KOKKU
	//---------------------------------------------------------
	$("#ac-accommodation-expense-account").editable({
		type: 'textarea',
		url: '/post',
	});
	$("#ac-accommodation-calculated-expenses").editable({
		type: 'textarea',
		url: '/post',
	});
	$("#ac-accommodation-advance-pay").editable({
		type: 'textarea',
		url: '/post',
	});

	//MUUD KULUD KOKKU
	//---------------------------------------------------------
	$("#ac-other-expenses-expense-account").editable({
		type: 'textarea',
		url: '/post',
	});
	$("#ac-other-expenses-calculated-expenses").editable({
		type: 'textarea',
		url: '/post',
	});
	$("#ac-other-expenses-advance-pay").editable({
		type: 'textarea',
		url: '/post',
	});

	// END INLINE EDITING PLUGIN

});
