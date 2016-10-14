//LOADING ANIMATION TOGGLE
		//---------------------------------------------------------
		function showLoadingAnimation(state) {
			if(state===1) {
				$("#loading-mask").addClass("fadeIn");
				$("#loading-mask").removeClass("fadeOut");
				$("#loading-mask").addClass("active");
				$(".loading-animation").removeClass("hidden");
			}
			else if(state===0) {
				$("#loading-mask").removeClass("fadeIn");
				$("#loading-mask").addClass("fadeOut");
				$("#loading-mask").removeClass("active");
				$(".loading-animation").addClass("hidden");
			}
		}
		//showLoadingAnimation(1);

		//end------------------------------------------------------
