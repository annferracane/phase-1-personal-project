// DOM Global Variables & Event Listeners
const localUrlBase = 'http://localhost:3000/jokes';
const jokeCardsDiv = document.querySelector('#joke-cards-div');
const refreshJokesBtn = document.querySelector('#refresh-jokes-btn');

refreshJokesBtn.addEventListener('click', refreshJokesHandler);


// DOM Content Updates
document.querySelector('#hero-header').textContent = 'Get ready for jokes.';
document.querySelector('#hero-content').textContent = 
`This is the home of JavaScript jokes, programming puns, coding 
quips, and dev double entendres. Warning: they may not be funny and, 
truthfully, several may not be initially understood; but that's the
point here at the Funny, Punny Programmer -- you're in charge. 
You tell us what gets a laugh, and what should be tossed!`;


// Display Jokes 
displayJokes();
//refreshJokesHandler();

// Fetch jokes from local db.json and call display function
function displayJokes() {
    fetch(localUrlBase)
    .then(resp => resp.json())
    .then(jokeData => createJokeToDisplay(jokeData))
    .catch(error => console.log(`Error with local db: ${error}`));
}

// Display jokes on web app
function createJokeToDisplay(jokeData) {

    const jokeCardsDiv = document.querySelector('#joke-cards-div');
    jokeData.forEach(joke => console.log(joke));

    jokeData.forEach(joke => {
        // Build div that holds joke content and voting button container
        const divJoke = document.createElement('div');
        divJoke.className = 'bg-light border p-3';
        divJoke.id = `joke-${joke.id}`;

        // Build paragraph for joke content
        const jokeParagraph = document.createElement('p');
        jokeParagraph.innerHTML = joke.joke;

        // Build div to hold voting buttons
        const divVoteBtns = document.createElement('div');
        divVoteBtns.className = 'hstack gap-3';

        // Build upvote button
        const upvoteBtn = document.createElement('button');
        upvoteBtn.type = 'button';
        upvoteBtn.className = 'btn btn-outline-primary';
        upvoteBtn.textContent = 'upvote ↑';

        // Build downvote button
        const downvoteBtn = document.createElement('button');
        downvoteBtn.type = 'button';
        downvoteBtn.className = 'btn btn-outline-danger';
        downvoteBtn.textContent = 'downvote ↓';

        // Build button divider
        const divBtnDivider = document.createElement('div');
        divBtnDivider.className = 'vr';
        
        // Append voting buttons and divider div to div for voting buttons
        divVoteBtns.appendChild(upvoteBtn);
        divVoteBtns.appendChild(divBtnDivider);
        divVoteBtns.appendChild(downvoteBtn);

        // Append joke paragraph and div for voting buttons to joke div
        divJoke.appendChild(jokeParagraph);
        divJoke.appendChild(divVoteBtns);

        // Append joke div to joke div container
        jokeCardsDiv.appendChild(divJoke);
    })

    jokeData.forEach(joke => console.log(joke));

}

function refreshJokesHandler() {
    // Delete jokes in db.json
    fetch(localUrlBase)
    .then(resp => resp.json())
    .then(jokeData => deleteJoke(jokeData))
    .catch(error => console.log(`Error with local db in refresh handler: ${error}`));
    
    // Call fetch to Joke API to refresh
    fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=20')
    .then(resp => resp.json())
    .then(jokeAPIData => addJokeToDatabase(jokeAPIData.jokes))
    .catch(error => console.log(`Error with joke API: ${error}`));
}

function deleteJoke(jokeData) {
    jokeData.forEach(joke => {
        // Build DOM Element ID
        const elementID = 

        // Build fetch url for delete
        const fetchURL = `${localUrlBase}/${joke.id}`;
        // Delete from db.json
        fetch(fetchURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'DELETE'
        })
    })
}

// Function that 
function addJokeToDatabase(jokeAPIData) {
    // Loop through jokes from Joke API and standaridize format for later display
    jokeAPIData.forEach(jokeAPI => {
        // Standardize joke json format (jokes from API are single or two-part jokes)
        let joke;
        if(jokeAPI.type == 'single') {
            joke = jokeAPI.joke;
        } else if (jokeAPI.type == 'twopart') {
            joke = `<b>Setup:</b> ${jokeAPI.setup}<br><br><b>Delivery:</b> ${jokeAPI.delivery}`; 
        } else {
            console.log('Unable to display joke content.');
        };

        // Build joke object for post to local db.json
        const jokeConfigObj = {
            category: jokeAPI.category,
            type: jokeAPI.type,
            idJokeAPI: jokeAPI.id,
            language: jokeAPI.lang,
            joke: joke
        }

        // Post jokes to db.json
        fetch(localUrlBase, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(jokeConfigObj)
        })
    });
}