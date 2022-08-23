# Movie Doctor Project

## Description

Application based on The Movie Database (TMDB) API allows users to search the favourite movies based on queries or categories. Furthermore app gives an option to add, delete and update bookmarks. Website is fully responsive, easy to use on mobile or tablet.

Tech Stack: HTML, CSS, JS ES6, Parcel, NPM, GIT

Architecture: MVC

API: The Movie Database (https://developers.themoviedb.org/3/getting-started/introduction)

## Features
### Search movies by query and categories
App allows user to search his favourite movies by query and shown categories. To perform long API requests, all the API calls are handled by asynchronous Javascript with async/await functions, promises and error handling.

Search is handled in the model module with leadSearchResults() or model.LoadCategory() functions. Then if the call is successful app starts to render result by resultsView.renderResults() function (handled in the view module). If not app will show descriptive error in the same section. 

### Bookmarks
App allow users to add and delete their favourite movies to the bookmark section or rate (add, delete and update).

Each time user click bookmark button (heart or star) state object got updated depending on type of bookmark (favourite or rate) by use of bookmarksView.addHandlerBookmark and model.updateBookmarkSummary functions.

User also have an option to check his bookmark summary which will show all added/rated bookmarks (in BookmarkSummaryView module).

### Local storage
Application also comes with ability to store added bookmarks. Storing is handled by LocalStorage functions which is saving state after a change and restore data after loading event. 

### Mobile view
Application is fully responsive. Module mobileView.js help to handle Events in mobile/tablet viewport.

