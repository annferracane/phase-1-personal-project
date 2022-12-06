fetch('http://localhost:3000/jokes')
.then(resp => resp.json())
.then(jokeData => displayJokes(jokeData))
.catch(error => console.log(`Error with local db: ${error}`));


fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=3')
.then(resp => resp.json())
.then(jokeAPIData => refreshJokeDatabase(jokeAPIData.jokes))
.catch(error => console.log(`Error with joke API: ${error}`));


function displayJokes(jokeData) {
    jokeData.forEach(joke => console.log(joke));

}
function refreshJokeDatabase(jokeAPIData) {
    jokeAPIData.forEach(jokeAPI => {
        console.log(jokeAPI);
        let joke;
        if(jokeAPI.type == 'single') {
            joke = jokeAPI.joke;
            console.log(joke);
        } else if (jokeAPI.type == 'twopart') {
            joke = `Setup: ${jokeAPI.setup}<br>Delivery: ${jokeAPI.delivery}` 
            console.log(joke);
        } else {
            console.log('Unable to display joke content.');
        };
        
        // Build joke object for local db.json
        const jokeAPIObj = {
            category: jokeAPIObj.category,
            type: jokeAPIObj.type,
            idJokeAPI: jokeAPIObj.id,
            language: jokeAPIObj.lang
        }
    });
}