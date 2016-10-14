//WIDGETS


		// Collapse widget-wrapper function
		$(document).on("click", ".collapse-link", function() {
			var widgetWrapper = $(this).closest('.widget-wrapper');
			var button = $(this).find('i');
			var content = widgetWrapper.find('.ibox-content, .ibox-content-full');
			content.slideToggle(200);
			button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
			setTimeout(function () {
				widgetWrapper.resize();
				widgetWrapper.find('[id^=map-]').resize();
			}, 50);



		});

		// Close ibox function
		$(document).on("click", ".close-link", function() {
			var content = $(this).closest('.widget-wrapper');
			content.remove();

			setTimeout(function () {
				widgetPositions();
			}, 200);
		});

		// REMOVE WIDGET WHEN CLOSE BUTTON IS PRESSED AND SAVE POSITIONS TO DB
		//$(".close-link").click(function () {
		//});




		//DRAGABLE WIDGETS

		function WinMove() {
			var element = "[class*=ui-sortable]";
			var handle = ".ibox-title";
			var connect = "[class*=ui-sortable]";

			$(element).sortable(
				{
					containment: "#sortable-view",
					items: "> div",
					handle: handle,
					connectWith: connect,
					helper: 'clone',
					tolerance: 'pointer',
					forcePlaceholderSize: true,
					opacity: 0.8,
					appendTo: 'body',
					update: function () {
						setTimeout(widgetPositions(),200);
					}
				}
			);
		}
		WinMove();
		//end draggable widgets---------------------------------------

		//widgets end-------------------------------------------------




