import { API_KEY, BASE_URL } from "./config";
import { getJSON } from "./helpers";

///////////////////////
// STATE
///////////////////////

export let state = {
  search: {
    searchQuery: "",
    categoryQuery: "",
    results: [],
  },
  genresList: [],
  bookmarks: {
    favourites: [],
    rates: [],
  },
};

///////////////////////////////////////////////
// SEARCH RESULTS
///////////////////////////////////////////////

const createResultsObject = function (data) {
  const { results } = data;

  return results.map((res) => {
    return {
      id: res.id,
      img: res.poster_path,
      title: res.title,
      overview: res.overview,
      rating: res.vote_average,
      userRating: "",
    };
  });
};

// Loading film results by query
export const loadSearchResults = async function (query) {
  try {
    state.search.searchQuery = query;

    const url = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}`;
    const data = await getJSON(url);

    state.search.results = createResultsObject(data);
  } catch (err) {
    throw err;
  }
};

// Loading genre list from API (comedy, action etc.)
const loadGenreList = async function () {
  try {
    const url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}`;
    const data = await getJSON(url);

    state.genresList = data.genres;
  } catch (err) {
    throw err;
  }
};

loadGenreList();

export const loadCategoryResults = async function (category) {
  try {
    state.search.categoryQuery = category;

    // Checking if genre (comedy, drama etc.) or filtring category (popular, top rated etc.)
    const categoryArr = state.genresList.filter(
      (g) => g.name.toLowerCase() === category
    );

    // Creating url - there is different one for genre (comedy, drama etc.) and filtring category (popular, top rated etc.)
    let url = "";

    // Filtring category
    if (categoryArr.length === 0) {
      url = `${BASE_URL}movie/${category}?api_key=${API_KEY}`;
    }
    // Genre
    else {
      const genreId = categoryArr[0].id;
      url = `${BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
    }

    const data = await getJSON(url);

    state.search.results = createResultsObject(data);
  } catch (err) {
    throw err;
  }
};

////////////////////////////////////
// BOOKMARKS
////////////////////////////////////

const createBookmarkObject = function (movieHTML, type) {
  return {
    id: movieHTML.dataset.id,
    type: type,
    userRating: movieHTML.dataset.userRating,
    rating: movieHTML.querySelector(".rating-value").textContent,
    img: movieHTML.querySelector("img").src,
    title: movieHTML.querySelector(".title").textContent,
    overview: movieHTML.querySelector(".overview").textContent,
  };
};

export const updateBookmarkSummary = function (movieHTML, type) {
  const bookmarkObj = createBookmarkObject(movieHTML, type);

  const id = bookmarkObj.id;

  // Checking for repeated bookmark (if there is not reapeaatedIndex=-1)
  const repeatedIndex = state.bookmarks[type].findIndex(
    (book) => book.id === id && book.type === type
  );

  // MY FAVOURITES SUMMARY
  if (type === "favourites") {
    // Adding new bookmark
    if (repeatedIndex < 0) state.bookmarks[type].push(bookmarkObj);
    // Deleting existing bookmark
    else state.bookmarks[type].splice(repeatedIndex, 1);
  }

  // MY RATES SUMMARY
  if (type === "rates") {
    // Deleting existing bookmark
    if (movieHTML.classList.contains("deleted"))
      state.bookmarks[type].splice(repeatedIndex, 1);
    // Adding new bookmark
    else if (repeatedIndex < 0) state.bookmarks[type].push(bookmarkObj);
    // Updating existing bookmark
    else
      state.bookmarks[type][repeatedIndex].userRating = bookmarkObj.userRating;
  }
};

////////////////////////////////////////
// SET / GET / DELETE LOCAL STORAGE

export const setLocalStorage = function () {
  localStorage.setItem("stateMovies", JSON.stringify(state));
};

export const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("stateMovies"));

  if (!data) return;

  state = data;
};

export const deleteLocalStorage = function () {
  localStorage.removeItem("stateMovies");
  location.reload();
};
// deleteLocalStorage();
