fetch('https://v2.jokeapious,political,racist,sexist,explicit')
.then(resp => resp.json())
.then(jokeData => createJokeDatabase(jokeData))


fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
.then(resp => resp.json())
.then(jokeData => createJokeDatabase(jokeData))

function createJokeDatabase(jokeData) {
    console.log(jokeData);
}