fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
.then(resp => resp.json())
.then(jokes => console.log(jokes.));