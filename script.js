//SELECT ELEMENTS

const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('.quote-text');
const authorText = document.querySelector('.quote-author');

//SET VARIABLES
let apiQuotes = [];
const apiURL = 'https://type.fit/api/quotes';

//FUNCTION NEW QUOTE
function newQuote() {
	//pick a random quote from apiQuotes array
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

	//insert quote text
	quoteText.textContent = quote.text;
}

//GET QUOTES FROM API
async function getQuotes() {
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
