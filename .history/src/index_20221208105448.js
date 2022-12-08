// DOM Global Variables & Event Listeners
const localUrlBase = 'http://localhost:3000/jokes';
const jokeCardsDiv = document.querySelector('#joke-cards-div');
const deleteJokesBtn = document.querySelector('#delete-jokes-btn');
const refreshJokesBtn = document.querySelector('#refresh-jokes-btn');

deleteJokesBtn.addEventListener('click', deleteJokesHandler);
refreshJokesBtn.addEventListener('click', refreshJokesHandler);

// DOM Content Updates
document.querySelector('#hero-header').textContent = 'Get ready for jokes.';
document.querySelector('#hero-content').textContent = 
`This is the home of JavaScript jokes, programming puns, coding 
quips, and dev double entendres. Warning: they may not be funny and, 
truthfully, several may not be initially understood; but that's the
point here at the Funny, Punny Programmer -- you're in charge. 
You tell us what gets a laugh, and what should be tossed!`;

// Initialize jokes on page
displayJokes();

// Fetch jokes from local db.json and call display function
function displayJokes() {
    jokeCardsDiv.innerHTML = '';
    fetch(localUrlBase)
    .then(resp => resp.json())
    .then(jokeData => createJokeToDisplay(jokeData))
    .catch(error => console.log(`Error with local db: ${error}`));
}

// Construct joke and append to DOM
function createJokeToDisplay(jokeData) {
    // Specify which div on index.html to later append joke div
    const jokeCardsDiv = document.querySelector('#joke-cards-div');

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

        // Build vote div

        // Build upvote button
        const upvoteBtn = document.createElement('button');
        upvoteBtn.type = 'button';
        upvoteBtn.id = `upvote-${joke.id}`;
        upvoteBtn.className = 'btn btn-outline-primary';
        upvoteBtn.textContent = 'upvote ↑';
        upvoteBtn.addEventListener('click', e => upvoteHandler(e));

        // Build downvote button
        const downvoteBtn = document.createElement('button');
        downvoteBtn.type = 'button';
        downvoteBtn.id = `downvote-${joke.id}`;
        downvoteBtn.className = 'btn btn-outline-danger';
        downvoteBtn.textContent = 'downvote ↓';
        downvoteBtn.addEventListener('click', e => downvoteHandler(e));

        // Build button dividers
        const divBtnDivider = document.createElement('div');
        divBtnDivider.className = 'vr';
        const divBtnDivider2 = document.createElement('div');
        divBtnDivider2.className = 'vr';
        
        // Append voting buttons and divider div to div for voting buttons
        divVoteBtns.appendChild(divBtnDivider2);
        divVoteBtns.appendChild(upvoteBtn);
        divVoteBtns.appendChild(divBtnDivider);
        divVoteBtns.appendChild(downvoteBtn);

        // Append joke paragraph and div for voting buttons to joke div
        divJoke.appendChild(jokeParagraph);
        divJoke.appendChild(divVoteBtns);

        // Append joke div to joke div container
        jokeCardsDiv.appendChild(divJoke);
    })

}

function deleteJokesHandler() {
    // Delete jokes from local db and dom, fetch new jokes, display jokes
    jokeCardsDiv.innerHTML = '';
    fetch(localUrlBase)
    .then(resp => resp.json())
    .then(jokeData => {
        jokeData.forEach(joke => {
            // Build fetch url for delete
            const fetchURL = `${localUrlBase}/${joke.id}`;
            // Delete from db.json
            fetch(fetchURL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .catch(error => console.log(`Error with delete fetch: ${error}`));
        })
    })
    .catch(error => console.log(`Error with local db in refresh handler: ${error}`));
}

function fetchJokes(postCallback, displayCallback) {
    // Call fetch to Joke API to refresh
    fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=10')
    .then(resp => resp.json())
    .then(jokeAPIData => {
        const newJokesFromAPI = [];
        jokeAPIData.jokes.forEach(jokeAPI => {
            let joke;
            if(jokeAPI.type == 'single') {
                joke = jokeAPI.joke;
            } else if (jokeAPI.type == 'twopart') {
                joke = `<b>Setup:</b> ${jokeAPI.setup}<br><b>Delivery:</b> ${jokeAPI.delivery}`; 
            } else {
                console.log('Unable to display joke content.');
            };

            // Build joke object for post to local db.json
            const jokeConfigObj = {
                category: jokeAPI.category,
                type: jokeAPI.type,
                idJokeAPI: jokeAPI.id,
                language: jokeAPI.lang,
                votes: 0,
                joke: joke
            } 

            //Add joke to global array
            newJokesFromAPI.push(jokeConfigObj);
            
        })
        console.log(newJokesFromAPI.length);
        return newJokesFromAPI;
    })
    .then(newJokesFromAPI => postCallback(newJokesFromAPI, displayCallback))
    .catch(error => console.log(`Error in fetchJokes(): ${error}`));
}


function postJokesToDatabase(newJokesFromAPI, displayCallback) {
    // Loop through joke array and post to local db
    newJokesFromAPI.forEach(newJoke => {
        console.log(newJoke);
        fetch(localUrlBase, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newJoke)
        })
        .catch(error => console.log(`Error in postJokesToDatabase(): ${error}`));
    }); 

    // Call displayJokes() as a callback
    displayCallback();
}

function refreshJokesHandler() {
    fetchJokes(postJokesToDatabase, displayJokes);
}

function upvoteHandler(e) {
    console.log('upvote');
    console.log(e.target.id);

    fetch(localUrlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newJoke)
    })
    .catch(error => console.log(`Error in postJokesToDatabase(): ${error}`));

}

function downvoteHandler(e) {
    console.log('downvote');
    console.log(e.target.id);

}

function generalFetch(url, mthd, configObj, handler) {
    fetch(url, {
        method: mthd,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(configObj)
    })
    .catch(error => console.log(`Error in ${handler}(): ${error}`));
}





