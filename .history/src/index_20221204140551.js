fetch('http://localhost:3000/jokes')
.then(resp => resp.json())
.then(jokeData => jokeData.forEach(joke => console.log(joke)))


fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
.then(resp => resp.json())
.then(jokeAPIData => createJokeDatabase(jokeAPIData))


function assessExistingJokeData() {

}
function createJokeDatabase(jokeAPIData) {
    console.log(jokeAPIData);
}