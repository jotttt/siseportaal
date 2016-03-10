/*jshint browser: true, jquery: true*/
$(function() {

	//prepare arrays to get all placeholder texts
	var objArr = [];
	var placeholderArr = [];

	//get all dom objects that are inputs with class natural and put //to array
	objArr =  $("input.natural").toArray();

	//put all placeholder texts to array
	for (var i = 0; i < objArr.length; i++) {
		placeholderArr[i] = objArr[i].placeholder;
		//replace input fields with underlined plaintext
		$("input.natural:eq(0)").replaceWith("<div class='natural display'>" + placeholderArr[i] + "</div>");
	}

	//click on text makes it an input field
	$(document).on("click", ".natural.display", function() {
		var htmlInner = $(this).html();
		$(this).replaceWith("<input type='text' class='form-control natural edit' placeholder='" + htmlInner + "'>");
		$(".natural.edit").focus();
	});

	//click outside input field turns it back to underlined plaintext
	$(document).on('focusout','.natural.edit',function () {
		$("input.natural.edit").replaceWith("<div class='natural display'>" + this.placeholder + "</div>");
	});

});
