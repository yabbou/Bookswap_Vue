$(document).ready(function () {

	$("#save").click(function () {
		$("span").text("");
		var isValid = true;

		var prof = $("#prof").val();
		var major = $("#major").val();
		var isbn = $("#isbn").val();

		checkEmail()
		checkText(prof);
		checkText(major);
		checkNumber(isbn);

		if (zip === "" || ! /^\d{5}(-\d{4})?$/.test(zip)) {
			isValid = false;
			$("#zip").next().text("Please enter a valid zip code.");
		}


		if (isValid) {
			// code that saves profile info goes here
		}

		$("#email").focus();
	});

	$("#email").focus();

	function checkText(id) {
		if (id == '' || ! /[A-Za-z]+/.text(id)) {
			isValid = false;
			id.next().text('Please enter letters only.');
		}
	}
	// pattern="[\w\d\s]+
	//minlength="4" maxlength="4"pattern="[A-Z]{4}"
	//pattern="[\w\s]+"

	function checkNumber(id) {
		if (id == '' || ! /\d+/.text(id)) {
			isValid = false;
			id.next().text('Please enter numbers only.');
		} else if (text.val.length < 10) {
			isValid = false;
			id.next().text('Please enter ten digits.');
		}
	}

	function checkEmail() {
		var email = $("#email").val();
		if (email === "" || ! /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/.test(email)) {
			isValid = false;
			email.next().text("Please enter a valid email.");
		}
	}
});
