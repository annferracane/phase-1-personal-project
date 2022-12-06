fetch('http://localhost:3000/jokes')
.then(resp => resp.json())
.then(jokeData => createJokeDatabase(jokeData))


fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=3')
.then(resp => resp.json())
.then(jokeAPIData => reviewJokeAPI(jokeAPIData.jokes));


function createJokeDatabase(jokeData) {
    jokeData.forEach(joke => console.log(joke));

}
function reviewJokeAPI(jokeAPIData) {
    //jokeAPIData.forEach(jokeAPI => console.log(jokeAPI));
}