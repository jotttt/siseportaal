/*jshint -W117 */
$(document).ready(function(){
	//Sidebar search functions
	$("a.navbar-minimalize").click(function(){
		$("#srch-term2").toggle();
	});

	/****************************************************************
	M-MENU SCRIPTS
	****************************************************************/
	//INIT M-MENU
	$("#m-menu").mmenu({
		"navbar": {
			"title":""
		}
	});

});
