//repeated
// Vue.component('links_head', {
// 	template: `

// `});

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
			<li><a class="t-icon" href="sell.html"><span>Trade Book</span></a></li>
			<li><a class="a-icon" href="account.html"><span>My Account</span></a></li>
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
<input list='titles' type='text' name='browse' placeholder='Browse our titles' required>

</span>
`
});

Vue.component('searchbar_home', {
	template: `
<div class='b-form-container parallax'>
    <form id='b-form' action='displayBooks.php' method='get'>
        <div class='browse-text'>
			<searchbar></searchbar>
        </div>

        <div class='browse-link'><a href='displayBooks.php?major=#'>By major </a></div>
        <div class='browse-link'><a href='displayBooks.php?prof=#'>By professor </a></div>
        <div class='browse-link'><a href='displayBooks.php'>All books </a></div>
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
		<div v-for='(book,index) in books' :key='book.index'>
			<h4><a :title='book.title'></a></h4>;
		</div>
	</div>
</div>
`});

//not useds
Vue.component('profs', {
	template: `
<div class="routing-group profs">
	<h1 class="routing-title">Professors</h1>
	
	<div class="landing-options">
		<div v-if="books.length % 6 == 0">
			<div v-for="book in books"><a href=./book/{{toHref(book.professor)}}> {{book.professor}}</a></div>
		</div v-if="books.length % 6 == 0">
    </div>
</div>	
`});

const app = new Vue({
	el: '#container',
	data() {
		return {
			books: [
				{
					title: 'Intro to Macroeconomics',
					professor: 'Prof Asif',
					major: 'EBEN',
					isbn: '1234567890',
					image: 'img/macro.jpg'
				},
				{
					title: 'Intro to Psychology',
					professor: 'Prof Perry',
					major: 'PSYN',
					isbn: '0987654321',
					image: 'img/psy.jpg'
				},
				{
					title: 'Frankenstein',
					professor: 'Prof Browne',
					major: 'EBEN',
					isbn: '1234512345',
					image: 'img/frank.jpg'
				},
				{
					title: 'Advanced Programming',
					professor: 'Prof Robinson',
					major: 'MCON',
					isbn: '2222222222',
					image: 'img/java.jpg'
				},
				{
					title: 'Biology I',
					professor: 'Prof Abrahmson',
					major: 'BION',
					isbn: '7771112223',
					image: 'img/bio.jpg'
				}
			],

		}
	},
	methods: {
		toHref(prof) {
			prof = prof.toLowerCase();
			prof = prof.replace(' ', '-');
			return prof;
		},
		isbn(index) {
			console.log(index);
			// return 'book.html?isbn=' + this.books[index].isbn;
		}
	},
});
