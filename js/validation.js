$(document).ready(function () {
	var valid_inputs = 0;

	var formId = $('form')[0].id;
	if (formId == 'contact_form') {
		validateContactForm();
	}
	if (formId == 'book_form') {
		validateBookForm();
	}

	var num_books_sold = 0;
	$('#sell-book').click(function () {
		num_books_sold = 1;
	});

	function validateBookForm() {
		$("#book_form").submit(function (event) {
			event.preventDefault();

			checkText('#title'); //Only letters, numbers, and white space allowed.
			checkText('#prof');  //Only letters and white space allowed.
			checkText('#major'); //Four capital letters, please.
			checkNumber("#isbn"); //Ten digits, please.

			if (valid_inputs == getTotalInputs()) {
				var prof = $('#prof').val();

				app.books.forEach(book => {
					if (book.professor == prof && book.qtyInStock) {
						num_books_sold++;
					}
				});
				showFunFact(num_books_sold, prof);
				num_books_sold = 0;
			} else {
				event.preventDefault();
				$("#title").focus();
			}
			valid_inputs = 0;
		});
	}

	function validateContactForm() {
		$("#contact_form").submit(function (event) {
			event.preventDefault();

			checkText('#nameEntry');
			checkEmail();
			checkText('#msgEntry');

			if (valid_inputs == getTotalInputs()) {
				$("#dialog").dialog("open").focus();
				// $('#dialog button').click(
				// 	$("#contact_form").submit() //fix
				// );
				// setTimeout(function () { $("#contact_form").submit(); }, 5000); //alternate
			} else {
				event.preventDefault();
				$("#nameEntry").focus();
			}
			valid_inputs = 0;
		});
	}

	function checkText(id) {
		var input = $(id).val().trim();
		var errorElement = $(id).siblings('span');
		if (input == '' || ! /[A-Za-z]+/.test(input)) {
			errorElement.text('Please enter letters only.').show();
		} else {
			valid_inputs++;
			errorElement.text('').hide();
		}
	}

	function checkNumber(id) {
		var input = $(id).val().trim();
		var errorElement = $(id).siblings('span');

		if (input.length == 0 || ! /\d+/.test(input)) {
			errorElement.text('Please enter numbers only.').show();
		} else if (input.length < 10) {
			errorElement.text('Please enter ten digits.').show();
		} else {
			valid_inputs++;
			errorElement.text('').hide();
		}
	}

	function checkEmail() {
		var email = $("#emailEntry").val().trim();
		var errorElement = $("#emailEntry").siblings('span');

		if (email === "" || ! /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/.test(email)) {
			errorElement.text("Please enter a valid email.").show();
		} else {
			valid_inputs++;
			errorElement.text('').hide();
		}
	}

	function getTotalInputs() {
		return $(".error").length;
	}

	function showFunFact(count, prof) {
		var msg = `Fun fact: ${count * 100 / app.books.length}% of the books being sold in our system are used by ${prof}!`;
		$('#dialog').text(msg).dialog("open").focus();
	}
});
