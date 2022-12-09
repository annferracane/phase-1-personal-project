// DOM Global Variables
const localUrlBase = 'http://localhost:3000/jokes';
const jokeCardsDiv = document.querySelector('#joke-cards-div');
const reorderJokesBtn = document.querySelector('#reorder-jokes-btn');
const deleteJokesBtn = document.querySelector('#delete-jokes-btn');
const addJokesBtn = document.querySelector('#add-jokes-btn');
const searchForm = document.querySelector('#joke-search');

let jokeArray = [];

// Event listeners
deleteJokesBtn.addEventListener('click', deleteJokesHandler);
addJokesBtn.addEventListener('click', addJokesHandler);
searchForm.addEventListener('submit', e => searchJokeHandler(e));
reorderJokesBtn.addEventListener('click', sortJokesBtnHandler);

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
    .then(jokeData => {
        jokeData.forEach(joke => jokeArray.push(joke));
        return jokeArray;
    })
    .then(jokes => createJokeToDisplay(jokes))
    .catch(error => console.log(`Error with local db: ${error}`));
}

// Construct joke and append to DOM
function createJokeToDisplay(jokes) {
    // Specify which div on index.html to later append joke div
    const jokeCardsDiv = document.querySelector('#joke-cards-div');

    // Set html conent to custom text if local db.json has no jokes
    if(jokes.length == 0) {
        jokeCardsDiv.innerHTML = `<div class="px-4 py-5 my-5 text-center"><h3>No jokes to see here. That's not too funny. Add some jokes!</div>`;
    }

    jokes.forEach(joke => {
        // Build div that holds joke content and voting button container
        const divJoke = document.createElement('div');
        divJoke.className = 'bg-light border p-3';
        divJoke.id = `joke-${joke.id}`;
        divJoke.addEventListener('mouseenter', e => jokeMouseHandler(e));
        divJoke.addEventListener('mouseleave', e => jokeMouseHandler(e));

        // Build paragraph for joke content
        const jokeParagraph = document.createElement('p');
        jokeParagraph.innerHTML = joke.joke;

        // Build div to hold voting buttons
        const divVoteBtns = document.createElement('div');
        divVoteBtns.className = 'hstack gap-3';

        // Build vote count div
        const voteCountDiv = document.createElement('div');
        voteCountDiv.id = `votecount-${joke.id}`;
        voteCountDiv.textContent = `Votes: ${joke.votes}`
        
        // Build upvote button
        const upvoteBtn = document.createElement('button');
        upvoteBtn.type = 'button';
        upvoteBtn.id = `upvote-${joke.id}`;
        upvoteBtn.className = 'btn btn-outline-primary';
        upvoteBtn.textContent = 'upvote ↑';
        upvoteBtn.addEventListener('click', e => voteHandler(e));

        // Build downvote button
        const downvoteBtn = document.createElement('button');
        downvoteBtn.type = 'button';
        downvoteBtn.id = `downvote-${joke.id}`;
        downvoteBtn.className = 'btn btn-outline-danger';
        downvoteBtn.textContent = 'downvote ↓';
        downvoteBtn.addEventListener('click', e => voteHandler(e));

        // Build button dividers
        const divBtnDivider = document.createElement('div');
        divBtnDivider.className = 'vr';
        
        // Append voting buttons and divider div to div for voting buttons
        divVoteBtns.appendChild(upvoteBtn);
        divVoteBtns.appendChild(divBtnDivider);
        divVoteBtns.appendChild(downvoteBtn)
        divVoteBtns.appendChild(voteCountDiv);

        // Append joke paragraph and div for voting buttons to joke div
        divJoke.appendChild(jokeParagraph);
        divJoke.appendChild(divVoteBtns);

        // Append joke div to joke div container
        jokeCardsDiv.appendChild(divJoke);
    })

}

function deleteJokesHandler() {
    // Delete jokes from local db and dom, fetch new jokes, display jokes
    jokeCardsDiv.innerHTML = `<div class="px-4 py-5 my-5 text-center"><h3>No jokes to see here. That's not too funny. Add some jokes!</div>`;
    
    jokeArray.forEach(joke => {
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

    jokeArray = [];
}

// Function calls external API, asseses data returned and calls callback functions to post to db.json and later redisplay
function fetchJokes(postCallback, displayCallback) {
    // Call fetch to Joke API to fetch jokes
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

            //Add joke to array
            newJokesFromAPI.push(jokeConfigObj);
            newJokesFromAPI.push(jokeConfigObj);
            
        })
        return newJokesFromAPI;
    })
    .then(newJokesFromAPI => postCallback(newJokesFromAPI, displayCallback))
    .catch(error => console.log(`Error in fetchJokes(): ${error}`));
}

// Add jokes handler which calls fetchJokes function and passes two functions as callback
function addJokesHandler() {
    fetchJokes(postJokesToDatabase, displayJokes);
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

// Event handler for upvote and downvote buttons
function voteHandler(e) {
    let jokeID;
    let voteDiv;
    let currentVote;
    let newVote;

    if(e.target.id.includes('upvote')) {
        jokeID = e.target.id.slice(7);
        voteDiv = document.querySelector(`#votecount-${jokeID}`);
        currentVote = parseInt(voteDiv.textContent.slice(7));
        newVote = currentVote + 1;

    } else if (e.target.id.includes('downvote')) {
        jokeID = e.target.id.slice(9);
        voteDiv = document.querySelector(`#votecount-${jokeID}`);
        currentVote = parseInt(voteDiv.textContent.slice(7));
        newVote = currentVote - 1;

    }
    const fetchURL = `${localUrlBase}/${jokeID}`;
    const configObj = {
        votes: newVote
    }
    generalFetch(fetchURL,'PATCH', configObj,'upvoteHandler');
    voteDiv.textContent = `Votes: ${newVote}`;
}


// Search handler for search form in DOM
function searchJokeHandler(e) {
    // Prevent default behavior of form to reload page
    e.preventDefault();

    // Store search input value
    const searchStr = e.target.querySelector('#joke-search-input').value;

    // Delete existing jokes displayed on DOM to prep for searched jokes
    jokeCardsDiv.innerHTML = '';

    // Fetch jokes in local db.json then pass to function to search them for search string, then display what is returned
    fetch(localUrlBase)
    .then(resp => resp.json())
    .then(jokeData => searchJokes(jokeData, searchStr))
    .then(searchedJokeData => createJokeToDisplay(searchedJokeData))
    .catch(error => console.log(`Error with local db: ${error}`));
}

// Function takes array full of jokes in db.json and search string and returns jokes that only inlude search string
function searchJokes(jokeData, searchStr) {
    const searchedArray = [];
    jokeData.forEach(joke => {
        const searchStringFound = joke.joke.toLowerCase().includes(searchStr.toLowerCase());
        if(searchStringFound) {
            searchedArray.push(joke);
        }
        
    });
    return searchedArray;
}

// Event handler for the mouseleave and mouseenter event listener 
function jokeMouseHandler(e) {
    if(e.type == "mouseenter") {
        e.target.className = 'bg-warning border p-3';
    } else if (e.type == "mouseleave") {
        e.target.className = 'bg-light border p-3';
    }
}

// Event handler for sort jokes button which shows top votes by reordering votes by vote count
function sortJokesBtnHandler() {
    // Delete existing jokes displayed on DOM to prep for reordered jokes
    jokeCardsDiv.innerHTML = '';

    // Fetch jokes in local db.json then pass to function to sort jokes by vote count
    fetch(localUrlBase)
    .then(resp => resp.json())
    .then(jokeData => sortJokes(jokeData))
    .then(sortedJokeData => createJokeToDisplay(sortedJokeData))
    .catch(error => console.log(`Error with local db: ${error}`));

}

// Function creates copy of joke array param, orders it by votes, and returns reordered joke array
function sortJokes(jokeData) {
    const sortedJokeData = [...jokeData];
    sortedJokeData.sort((a, b) => a.votes > b.votes ? -1 : 1)
    return sortedJokeData;
}

// General PATCH or POST fetch
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





