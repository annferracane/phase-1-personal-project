fetch('http://localhost:3000/jokes')
.then(resp => resp.json())
.then(jokeData => createJokeDatabase(jokeData))
.error(error => console.log(`Error with local db: ${error}`));


fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=3')
.then(resp => resp.json())
.then(jokeAPIData => reviewJokeAPI(jokeAPIData.jokes))
.error(error => console.log(`Error with joke API: ${error}`));


function createJokeDatabase(jokeData) {
    jokeData.forEach(joke => console.log(joke));

}
function reviewJokeAPI(jokeAPIData) {
    //jokeAPIData.forEach(jokeAPI => console.log(jokeAPI));
    jokeAPIData.forEach(jokeAPI => {
        console.log(jokeAPI);
        if(jokeAPIObj.type == 'single') {
            console.log('single joke');
        } else if (jokeAPIObj.type == 'twopart') {
            console.log('two part joke');
        } else (

        )
        const jokeAPIObj = {
            category: jokeAPIObj.category,
            type: jokeAPIObj.type,
            idJokeAPI: jokeAPIObj.id,
            language: jokeAPIObj.lang
        }
    });
}