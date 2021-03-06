<?php

/* tabeli üldised omadused																					[variandid] :vaikeväärtus */

$this->title		= $l->?;				// tabeli pealkiri												[<title>]: string
$this->title_icon	= "odnoklassniki";		// tabeli pealkirjast vasakul olev ikoon						[<font-awesome ikooni klass>] :none

/* andmebaasi override'd */

$this->host			= "";
$this->database		= "";
$this->username		= "";
$this->password		= "";
$this->charset		= "utf8";
$this->collation	= "utf8_estonian_ci";

/* päringu koostamine */

$this->table		= "";				// põhitabel														[<table>]: string
$this->where		= "";				// where tingimused vabas vormis									["where"]: string
$this->values		= [];				// tingimustele vastavad väärtused									[ [<val>, <val>..] ]
$this->order		= "";				// esmaselt on tabel sorditud selle välja järgi						[<field>]: string
$this->way			= "";				// mis suunas järjestatakse tulemused								["asc", "desc"] :"asc"

/* tabeliväljade loetelu ja omadused (kõik peale "field" väärtuse on valikulised) */

// "field"			- väljanimetus tabelis (TODO: kohustuslikkusekontoll; kas selline väli tabelist leiti)	[<field>]: string
// "joined"			- tähendab, et antud väli on juurdeliidetud tabelist saadud (vajab 'joins'-kirjelduses vastavat välja ja seost - 'alias'): none
// "title"			- tabeli päises kuvatav väljakirjeldus (mõistlik panna tõlkestring)						[<title>] :string
// "class"			- välja stiil, override																	[<class_name>] :string
// "align"			- välja sisu paiknemine																	["left", "center", "right", "justify"] :"left"
// "nowrap"			- välja ei wrapita																		[true, false] :false
// "searchable"		- kui tehakse üldine otsing, siis lisatakse see väli otsingusse							[true, false] :false
// "search_left"	- otsingu puhul otsitakse vasakule (like "%<otsingusõna>")								[true, false] :true
// "search_right"	- otsingu puhul otsitakse paremale (like "<otsingusõna>%"								[true, false] :true
// "sortable"		- antud välja puhul on lubatud kasutaja poolne järjekorra muutmine (üles/alla) 			[true, false] :true
// "extend"			- määra väljale teisendusfunktsioon (ptable_ext all kirjeldatud)						[<method>, [ <method>, <method>.. ] ]: string
// "translate"		- prinditakse väärtus tõlke külge (tõlkestring + väärtus)								[false, <translation>] :false
// "field_search"	- TODO: lisada otsingukast klikitud veerule, täppisotsing veeru piires					[true, false] :false

$this->fields	= [
	[ "field"	=> "",		"title" => $l->? ]
];

/* liidetavate tabelite kirjeldused */

// "table"			- tabeli nimi																			[
// "method"			- mis tüüpi join
// "on"				- mis tingimustel

$this->joins		= [
	[ "table"	=> "", "method" => "left join", "on" => "" ],
];

/* triggerid */

// "ROW"			- trigger määratakse kogu valitud reale																	["ROW", "<field>"]: string
// "<field>"		- trigger lisatakse konkreetsele väljale reas
// "title"			- triggeri kirjeldus, mida kuvatakse rea/välja kohal ([]-vaheline asendatakse vastava välja väärtusega) [<title>] :string
// "data"			- siin üksikelement või massiiv, milliseid väärtusi panna kaasa triggerile								[<data>, [<data>, <data>..] ]
//					  (kõik, mis on []-vahel asendatakse selle välja väärtusega (kui leitakse))
// "link"			- kui vähemalt üks 'data'-väli pole kirjeldatud, siis minnakse kirjeldatud lingile (asendatakse [])		[<link>]: string
// "external"		- kas sisemine või välimine link																		[true, false] :false

$this->triggers		= [
	"ROW"		=> [ "title" => "", "data" => [] ],
	"id"		=> [ "title" => "", "link" => "", "external" => true ]
];

/* TODO: puhas sql-päring (selleasemel, et kasutada päringu moodustamiseks "fields" kirjelduses olevaid ja "joins" & "where" muutujaid) */

//$this->query_count= "select id from request";
//$this->query		= "select * from request";

// TODO: per person/tabel meelde jätta vajalikud väljad nendest

$this->order_icon	= "chevron";		// mis tüüpi ikoone kasutatakse otsingutulemuste järjestamiseks						["chevron", "sort", "angle-double"] :"chevron"
$this->page_sizes	= [ 10 => "10 ". $l->records, 25 => "25 ". $l->records, 50 => "50 ". $l->records, "*" => $l->all_records ]; // valitavad lehepikkused
$this->page_size	= 10;				// esmane lehepikkus (TODO: milline on varasemalt valitud)							[10..50, "*"] :10
$this->nav_length	= 5;				// mitu navigatsiooninuppu on kuvatud esimese ja viimase lehe nuppude vahel			[1-10] :5 (TODO: teised väärtused panna korralikult toimima)
$this->nav_header	= false;			// kas header'i navigatsiooniriba on lubatud										[true, false] :false
$this->nav_footer	= true;				// kas header'i navigatsiooniriba on lubatud										[true, false] :true
$this->nav_prev		= $l->?;			// "eelmine leht"-nupu kirjeldus													["text"] : string
$this->nav_next		= $l->?;			// "järgmine leht"-nupu kirjeldus													["text"] : string
$this->fields_descr	= true;				// kas väljakirjeldused on lubatud													[true, false] :true
$this->header_sep	= false;			// eralda väljakirjeldused tabeli sisuosast											[true, false] :false
$this->footer_sep	= false;			// eralda alumine nav tabeli sisuosast												[true, false] :false
$this->autoupdate	= false;			// mitme sekundi pärast uuendatakse antud tabelit automaatselt						[false,5-600] :false
$this->autosearch	= false;			// kas otsingukast käitub automaatsena (alates on kirjeldatud js: search_from = l)	[true, false] :false
$this->searchable	= true;				// kas otsing ja otsingukast on rakendatud tabelile									[true, false] :true
$this->prefs		= true;				// kas on lubatud kasutajal muuta tabeli seadeid									[true, false] :true
$this->store_prefs	= true;				// salvestab tabeli põhiandmed (välja laiused salvestatakse siiski)					[true, false] :true
$this->sizeable		= true;				// kas on lubatud muuta tabeli kirjete arvu ühel lehel								[true, false] :true
$this->download		= true;				// TODO: võimalda tabeli sisu allalaadimine .csv, .pdf või excel'ina				[true, false] :true
$this->smart_select	= true;				// TODO: võimaldab valida märkida tabeli ridasid ja veergusid sõltumatult			[true, false] :true
$this->fullscreen	= true;				// TODO: ava tabel täisekraanis														[true, false] :true
$this->fadein		= false;			// TODO: fade'i tabel alles siis sisse, kui on laetud								[0..n (ms)] :false

?>
