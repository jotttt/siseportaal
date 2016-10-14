/*jshint -W117 */

$(document).ready(function(){

	//LOADBAR AND REDIRECT FOR M-ID AUTHENTICATION TIMEOUT

	//SET SECONDS TIL REDIRECT
	var sec = 10;

	var r = 100;
	var p = dif();

	function dif() {
		var result = r / sec;
		return result;
	}

	//
	function myTimer() {
		console.log(r);
		r -= p;

		if (r > 0) {return r;
				   }
		else {
			return window.location = "https://auth-test.ttu.ee/login/no-intra-et/portal-dev";
		}
	}
	//SET FUNCTION EXECUTION TO 1 SECONT INTERVAL
	setInterval(function(){
		$("#progress-bar").css("width", myTimer() + "%");
	},
				1000
			   );

});

