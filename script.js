//SELECT ELEMENTS
const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('.quote-text');
const authorText = document.querySelector('.quote-author');
const loader = document.querySelector('.loader');

//SET VARIABLES
let apiQuotes = [];
const apiURL = 'https://type.fit/api/quotes';

//HIDE LOADING
function complete() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

//SHOW LOADING
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

//FUNCTION NEW QUOTE
function newQuote() {
	loading();

	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	//check if Author field is blank and replace is with 'unknown'
	if (!quote.author) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.author;
	}

	//check quote length to determine quote styling
	if (quote.text.length > 120) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}

	//set quote, hide loader
	quoteText.textContent = quote.text;
	complete();
}

//GET QUOTES FROM API
async function getQuotes() {
	loading();
	try {
		const response = await fetch(apiURL);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		//Catch Error
		alert(error);
	}
}

//TWEET QUOTE
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

//ON LOAD
getQuotes();
