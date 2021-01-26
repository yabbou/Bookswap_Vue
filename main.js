var bus = new Vue();

Vue.component('header_r', {
	template: `
<header>
    <div class="logo-and-title">
        <div class="img-cropper"><img class="logo" src="img/hand-to-hand.jpg"></div>
        <h3 class="nav-title"><a href="index.html">The Inside Story</a></h3>
    </div>

    <nav class="cd-stretchy-nav">
        <a class="cd-nav-trigger" href="#0">
            <span aria-hidden="true"></span>
        </a>
		<ul id="menu">
			<li><a class="h-icon active" href="index.html"><span>Home</span></a></li>
			<li><a class="b-icon" href="books.html"><span>Browse</span></a></li>
			<li><a class="a-icon" href="account.html"><span>Account</span></a></li>
			<li><a class="t-icon" href="trade.html"><span>Trade Book</span></a></li>
		</ul>
		<span aria-hidden="true" class="stretchy-nav-bg"></span>
	</nav>
</header>
`});

Vue.component('footer_r', {
	template: `
<footer>
    <a class="footer-link" href="contact.html">Contact Us</a>
    <a class="footer-link" href="about.html">About</a>
    <p>Site by Yaakov Abbou</p>
</footer>
`});

//custom
Vue.component('searchbar', {
	template: `
<span>
	<form @submit.prevet='onSubmit'><input v-model="searchTerm" list='titles' type='text' name='browse' placeholder='Browse our titles' required></form>
</span>
`,
	data() {
		return { searchTerm: '' }
	},
	methods: {
		onSubmit() {
			this.$parent.searchTerm = this.searchTerm;
			console.log(this.searchTerm);
		}
	}
});

Vue.component('searchbar_home', {
	template: `
<div class='b-form-container parallax'>
    <form id='b-form' method='get'>
        <div class='browse-text'>
			<searchbar></searchbar>
        </div>

        <div class='browse-link'><a href='books.html?major=#'>By major </a></div>
        <div class='browse-link'><a href='books.html?prof=#'>By professor </a></div>
        <div class='browse-link'><a href='books.html'>All books </a></div>
    </form>
<h1 class="landing-text">Buy This Semester's Books<br>From Last Semester's Students</h1>
</div>
`
});

Vue.component('tabs', {
	template: `
<div>
<ul>
</div>	
`});

Vue.component('carousel', {
	template: `
<div class='carousel-and-title'>
	<h3 class='featured'>Featured</h3>
	
	<div class='jcarousel'>
		<div v-for='(book,index) in orderedBooks' :key='book.index'>
			<h4><a :title='book.title'></a></h4>;
		</div>
	</div>
</div>
`,
	computed: {
		orderedBooks() {
			return _.orderBy(this.$parent.books, 'qtyInStock'); //fix
		}
	}
});

Vue.component('sidebar', {
	template: `
<div class="sidebar">

<form action="books.html" method="get">
	<div class="browse-text-sidebar">
		<searchbar></searchbar>
	<div class="browse-link"><a href="books.html">All books</a></div>
	</div>
</form>

<div id='accordion'>
	<h3>By Major</h3><div>
	<div v-for='(book,index) in this.$parent.books' :key='book.index'>
		<a> {{book.major}} </a>
	</div></div>

	<h3>By Professor</h3><div>
	<div v-for='(book,index) in this.$parent.books' :key='book.index'>
		<a> {{book.professor}} </a>
	</div></div>
</div>
<span id='accordion-advice'>Click title to expand category</span>

</div>
</div>
	`
});

Vue.component('trade_form', {
	template: `
<form id="book_form">
<div>
	<input v-model='title' list="books" type="text" id="title" placeholder="Title">
	<span id="t-id" class="error">*</span>
</div>

<div>
	<input v-model='major' list="majors" type="text" id="major" placeholder="Major">
	<datalist id="majors">
		<option v-for='book in this.$parent.books' :value='book.major'></option>
	</datalist>
	<span id="m-id" class="error">*</span>
</div>

<div>
	<input v-model='professor' list="profs" type="text" id="prof" placeholder="Professor">
	<datalist id="profs">
		<option v-for='book in this.$parent.books' :value='book.professor'></option>
	</datalist>
	<span id="p-id" class="error">*</span>
</div>

<div>
	<input v-model='isbn' type="number" id="isbn" placeholder="ISBN-10">
	<span id="i-id" class="error">*</span>
	<!-- should really also check if not taken by other book... live -->
</div>

<div class='book-buttons'>
	<input class='btn-add-book' type='submit' id='sell-book' value='Sell Book' @click='onSubmit(1)'>
	<input class='btn-add-book' type='submit' id='ask-book' value='Book Wanted' @click='onSubmit(0)'>
</div>
</form>`,

	data() {
		return {
			title: '',
			professor: '',
			major: '',
			isbn: '',
		}
	},

	methods: {
		onSubmit(isSold) {
			let newBook = {
				title: this.title,
				professor: this.professor,
				major: this.major,
				isbn: this.isbn,
				image: 'img/no-image.png',
				qtyInStock: isSold,
			};
			bus.$emit('book-submitted', newBook);
			// this.title = this.professor = this.major = this.isbn = null;
		}
	}

});

Vue.component('book', {
	props: { book: { type: Array } },
	template: `
	<li class="book-tile">
		<a class="img-link"> <img :src='book.image' :alt='book.title'> </a>
		<a><h4>{{book.title}}</h4></a>
		<p>Available:
			<strong :style="{color: 'book.qtyInStock' == 0 ? 'darkred' : 'black'}">
				{{book.qtyInStock}}
			</strong>
		</p>
	</li>
		`
});

// Vue.component('profs', {
// 	template: `
// <div class="routing-group profs">
// 	<h1 class="routing-title">Professors</h1>

// 	<div class="landing-options">
// 		<div v-if="books.length % 6 == 0">
// 			<div v-for="book in books"><a href=./book/{{toHref(book.professor)}}> {{book.professor}}</a></div>
// 		</div v-if="books.length % 6 == 0">
//     </div>
// </div>	
// `});

const app = new Vue({
	el: '#container',
	data: {
		// return {
		books: [
			{
				title: 'Intro to Macroeconomics',
				professor: 'Prof Asif',
				major: 'EBEN',
				isbn: '1234567890',
				image: 'img/macro.jpg',
				qtyInStock: 2
			},
			{
				title: 'Intro to Psychology',
				professor: 'Prof Perry',
				major: 'PSYN',
				isbn: '0987654321',
				image: 'img/psy.jpg',
				qtyInStock: 1
			},
			{
				title: 'Frankenstein',
				professor: 'Prof Browne',
				major: 'EBEN',
				isbn: '1234512345',
				image: 'img/frank.jpg',
				qtyInStock: 3
			},
			{
				title: 'Advanced Programming',
				professor: 'Prof Robinson',
				major: 'MCON',
				isbn: '2222222222',
				image: 'img/java.jpg',
				qtyInStock: 0
			},
			{
				title: 'Biology I',
				professor: 'Prof Abrahmson',
				major: 'BION',
				isbn: '7771112223',
				image: 'img/bio.jpg',
				qtyInStock: 2
			}
		],
		searchTerm: '',
		searchResults: 0,
		msgEntry: ''
		// }
	},
	methods: {
		addBook(newBook) {
			this.books.push(newBook);
		},
		toHref(prof) {
			prof = prof.toLowerCase();
			prof = prof.replace(' ', '-');
			return prof;
		},
	},
	computed: {
		searchResultsFormatted() { //fix
			var query = this.books.filter(book => book.title.includes(this.searchTerm)).length;
			return `(${query} results)`;
		},
		searchTermFormatted() {
			return this.searchTerm == '' ? 'ALL BOOKS' : this.searchTerm;
		},
		// isbn(index) {
		// console.log(index);
		// return 'book.html?isbn=' + this.books[index].isbn;
		// },
		isLong() {
			console.log();
			var MANY_CHARACTERS = 5;
			return this.msgEntry.length > MANY_CHARACTERS;
		}
	}
});
