# Phase 1: Ann's Personal Project - The Funny, Punny Programmer

The Funny, Punny Programmer is a project submission for the Flatiron School's Phase 1 Personal Project.

## Requirements Completed

This project calls a free public API - a free joke API (https://v2.jokeapi.dev/) and POSTS 10 fetched jokes to a local db.json. 

The entire web app runs on a single page. 

This project includes four event listeners (click, submit, mouseenter, mouseleave).

This project uses forEach array iteration.

Stretch goal: Uses json-server to persist app interactivity.

Implemented Boostrap (https://getbootstrap.com/) as stylesheet to learn more about it and for fun.

## Functionality

Upon initial page, the app will fetch any jokes in the local db.json and display them on the DOM. On each joke element, the user can read the joke, and either upvote or downvote the joke. The vote count persists. 

Clicking the "Add Jokes" a free joke API (https://v2.jokeapi.dev/) will add 10 jokes to the local db.json and will refresh the jokes on the page.

Clicking the "Delete Jokes" button will clear all jokes from the db.json and show a message on the DOM that there are no jokes to show.

Clicking the "Show Top Jokes" button will reorder the jokes shown on the page by the jokes with top votes.

Searching the search bar at the top of the page will show only jokes that include that search string in the text of the joke. This is not case sensitive.

## Challenges

The main challenge I faced in building this app was with regard to async fetching. In some cases, if you click "Delete Jokes" or "Add Jokes" the local db.json server will refuse the connection and this will show up in the fetch catch. In speaking to instructor David W, I learned that this is a good learning in that this issue would not be a concern if this app was built with React (which is later in our course). While we could have possibly solved this with async functions and "wait" (and I did attempt to do so), it was not necessary to solve for the purpose this project (and, as such, now serves as a good learning).

## Contributing

Commments certainly welcome. Again, this project is for the purpose of my own learning.

## License

[MIT](https://choosealicense.com/licenses/mit/)