$(document).ready(function () {
	var isValid = true;

	var formId = $('form')[0].id;
	if (formId == 'contact_form') {
		validateContactForm();
	}
	if (formId == 'book_form') {
		validateBookForm();
	}

	function validateBookForm() {
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
				console.log(this.$parent.books); //does not yet access vue data()
				this.$parent.books.forEach(book => {
					if (book.professor == prof) {
						count++;
					}
				});
				alert(`Fun fact: ${count * 100 / books.length} of the books in our system are used by ${prof}!`);
				this.submit();
			}
		});
	}

	function validateContactForm() {
		$("#contact_form").submit(function (event) {
			event.preventDefault();

			checkText('#nameEntry');
			checkEmail();
			// checkText('#msgEntry');

			if (isValid == false) {
				event.preventDefault();
				$("#nameEntry").focus();
			} else {
				this.submit();
			}
		});
	}

	function checkText(id) {
		var input = $(id).val().trim();
		var errorElement = $(id).siblings('span');
		if (input == '' || ! /[A-Za-z]+/.test(input)) {
			isValid = false;
			errorElement.text('Please enter letters only.').show();
		} else {
			isValid = true;
			errorElement.text('').hide();
		}
	}

	function checkNumber(id) {
		var input = $(id).val().trim();
		var errorElement = $(id).siblings('span');

		if (input.length == 0 || ! /\d+/.test(input)) {
			isValid = false;
			errorElement.text('Please enter numbers only.').show();
		} else if (input.length < 10) {
			isValid = false;
			errorElement.text('Please enter ten digits.').show();
		}
		else {
			isValid = true;
			errorElement.text('').hide();
		}
	}

	function checkEmail() {
		var email = $("#emailEntry").val().trim();

		if (email === "" || ! /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/.test(email)) {
			isValid = false;
			$("#emailEntry").next().text("Please enter a valid email.");
		}
	}
});
