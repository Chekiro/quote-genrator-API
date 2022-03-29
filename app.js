const quoteContainer = document.querySelector('#quote-container');
const quoteAuthor = document.querySelector('#author');
const quoteText = document.querySelector('#quote');
const quoteButton = document.querySelector('#new-quote');
const twitterButton = document.querySelector('#twitter');
const loader = document.querySelector('#loader');

    

let apiQuotes = [];


// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide Loading

function hideLoading() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


function newQuote() {
    const quote = apiQuotes[Math.trunc(Math.random() * apiQuotes.length)];

    !quote.author ? quoteAuthor.textContent = "Unknown" : quoteAuthor.textContent = quote.author;
    quote.text.length > 100 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
    quoteText.textContent = quote.text;
    hideLoading()

}

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error) {
        alert("ERRROOOR");
    }
}


 // Tweet Quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

quoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);


getQuotes();



