fetch('http://localhost:3000/jokes')
.then(resp => resp.json())
.then(jokeData => displayJokes(jokeData))
.catch(error => console.log(`Error with local db: ${error}`));


function refreshJokesHandler() {
    // Delete jokes in db.json -- BUILD

    // Call fetch to Joke API to refresh
    fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=3')
    .then(resp => resp.json())
    .then(jokeAPIData => refreshJokeDatabase(jokeAPIData.jokes))
    .catch(error => console.log(`Error with joke API: ${error}`));
}

refreshJokesHandler();

function displayJokes(jokeData) {
    jokeData.forEach(joke => console.log(joke));

}
function refreshJokeDatabase(jokeAPIData) {
    // Loop through jokes from Joke API and standaridize format for 
    jokeAPIData.forEach(jokeAPI => {
        let joke;
        // Standardize joke json format (jokes from API are single or two-part jokes)
        if(jokeAPI.type == 'single') {
            joke = jokeAPI.joke;
        } else if (jokeAPI.type == 'twopart') {
            joke = `Setup: ${jokeAPI.setup}<br>Delivery: ${jokeAPI.delivery}` 
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

        console.log(jokeConfigObj);
    });
}