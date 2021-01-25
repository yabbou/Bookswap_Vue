$(document).ready(function () {
	var isValid = true;

	$("#book_form").submit(function (event) {
		event.preventDefault();

		checkText('#title'); //Only letters, numbers, and white space allowed.
		checkText('#prof');  //Only letters and white space allowed.
		checkText('#major'); //Four capital letters, please.
		checkNumber("#isbn"); //Ten digits, please.

		if (isValid == false) {
			event.preventDefault();
			$("#title").focus();
		} else {
			var count = 0;
			var prof = $('#prof').val();
			books.forEach(book => {
				if (book.professor == prof) {
					count++;
				}
			});
			alert(`Fun fact: ${count * 100 / books.length} of the books in our system are used by ${prof}!`);
			this.submit();
		}
	});

	function checkText(id) {
		var input = $(id).val().trim();

		if (input == '' || ! /[A-Za-z]+/.test(input)) {
			isValid = false;
			$(id).siblings('span').text('Please enter letters only.').show();
		} else {
			isValid = true;
			$(id).next().text('').hide();
		}
	}

	function checkNumber(id) {
		var input = $(id).val().trim();

		if (input.length == 0 || ! /\d+/.test(input)) {
			isValid = false;
			$(id).next().text('Please enter numbers only.').show();
		} else if (input.length < 10) {
			isValid = false;
			$(id).next().text('Please enter ten digits.').show();
		}
		else {
			isValid = true;
			$(id).next().text('').hide();
		}
	}

	function checkEmail() {
		var email = $("#email").val().trim();

		if (email === "" || ! /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/.test(email)) {
			isValid = false;
			email.next().text("Please enter a valid email.");
		}
	}
});
