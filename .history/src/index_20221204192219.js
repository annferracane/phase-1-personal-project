fetch('http://localhost:3000/jokes')
.then(resp => resp.json())
.then(jokeData => displayJokes(jokeData))
.catch(error => console.log(`Error with local db: ${error}`));




//refreshJokesHandler();

function displayJokes(jokeData) {
    jokeData.forEach(joke => console.log(joke));

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