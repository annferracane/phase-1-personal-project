// DOM Content Updates
document.querySelector('#hero-header').textContent = 'Get ready for jokes.';
document.querySelector('#hero-content').textContent = 
`This is the home of JavaScript jokes, programming puns, coding 
quips, and dev double entendres. Warning: they may not be funny and, 
truthfully, several may not be initially understood; but that's the
point here at the Funny, Punny Programmer -- you're in charge. 
You tell us what gets a laugh, and what should be tossed!`;

// DOM Global Variables
const jokeCardsDiv = document.querySelector('#joke-cards-div');


// Fetch jokes from local db.json and call display function
fetch('http://localhost:3000/jokes')
.then(resp => resp.json())
.then(jokeData => displayJokes(jokeData))
.catch(error => console.log(`Error with local db: ${error}`));

// Display jokes on web app
function displayJokes(jokeData) {

    const jokeCardsDiv = document.querySelector('#joke-cards-div');
    jokeData.forEach(joke => console.log(joke));

    jokeData.forEach(joke => {
        const divJoke = document.createElement('div');
        divJoke.className = 'bg-light border';
        const jokeParagraph = document.createElement('p');
        jokeParagraph.innerHTML = joke.joke;

        // Build div to hold voting buttons
        const divVoteBtns = document.createElement('div');
        divVoteBtns.className = 'hstack gap-3';

        // Build upvote button
        const upvoteBtn = document.createElement('button');
        upvoteBtn.type = 'button';
        upvoteBtn.className = 'btn btn-primary';
        upvoteBtn.textContent = 'upvote ↑';

        // Build downvote button
        const downvoteBtn = document.createElement('button');
        downvoteBtn.type = 'button';
        downvoteBtn.className = 'btn btn-outline-danger';
        downvoteBtn.textContent = 'downvote ↓';

        const divBtnDivider = document.createElement('div');

        
        // Append voting buttons and divider div to div for buttons
        divVoteBtns.appendChild(upvoteBtn);
        divVoteBtns.appendChild(divBtnDivider);
        divVoteBtns.appendChild(downvoteBtn);

        // Append joke paragraph and div for voting buttons to joke div
        divJoke.appendChild(jokeParagraph);
        divJoke.appendChild(divVoteBtns);
    })

    /*
    <div class="hstack gap-3">
        <button type="button" class="btn btn-secondary">Submit</button>
        <div class="vr"></div>
        <button type="button" class="btn btn-outline-danger">Reset</button>
    </div>
    */
    jokeData.forEach(joke => console.log(joke));

}

//refreshJokesHandler();

function refreshJokesHandler() {
    // Delete jokes in db.json -- BUILD

    // Call fetch to Joke API to refresh
    fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=20')
    .then(resp => resp.json())
    .then(jokeAPIData => refreshJokeDatabase(jokeAPIData.jokes))
    .catch(error => console.log(`Error with joke API: ${error}`));
}

function refreshJokeDatabase(jokeAPIData) {
    // Loop through jokes from Joke API and standaridize format for later display
    jokeAPIData.forEach(jokeAPI => {
        // Standardize joke json format (jokes from API are single or two-part jokes)
        let joke;
        if(jokeAPI.type == 'single') {
            joke = jokeAPI.joke;
        } else if (jokeAPI.type == 'twopart') {
            joke = `Setup: ${jokeAPI.setup}<br>Delivery: ${jokeAPI.delivery}`; 
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
        fetch('http://localhost:3000/jokes', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(jokeConfigObj)
        })
    });
}