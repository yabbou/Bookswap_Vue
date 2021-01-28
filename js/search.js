$(document).ready(function () {
	let firstSellable = {
		title: 'Not available',
		retailPrice: 'Not available',
		currency: ''
	};

	$('[data-toggle="tooltip"]').mouseenter(
		function () {
			priceSearch(this.id);
		}
	);

	function priceSearch(id) {
		$.ajax({
			url: "https://www.googleapis.com/books/v1/volumes?q=" + id,
			dataType: 'json',
			method: 'GET',
			success: function (data) {
				var sellables = [];
				data.items.forEach(book => {
					if (book.saleInfo.saleability != "NOT_FOR_SALE") {
						sellables.push(book);
					}
				});

				var rp = "";
				var c = "";
				if (sellables.length > 0) {
					var saleInfo = sellables[0].saleInfo;
					if (saleInfo.saleability == "FOR_RENTAL_ONLY") {
						rp = saleInfo.offers[0].retailPrice.amountInMicros / Math.pow(10, 6);
						c = saleInfo.offers[0].retailPrice.currencyCode;
					} else {
						rp = saleInfo.retailPrice.amount;
						c = saleInfo.retailPrice.currencyCode;
					}

					firstSellable.title = sellables[0].volumeInfo.title;
					firstSellable.retailPrice = rp;
					firstSellable.currency = c;
				}
				console.info(firstSellable.title + " " + rp);
				setTooltipPrices(id);
			}
		});
	}

	function setTooltipPrices(id) {
		var prices = `Retail price: ${firstSellable.retailPrice} ${firstSellable.currency}`;
		$('a#' + id).tooltip({ title: prices, placement: "auto bottom" });
	}

});
