"use strict";

import { TABLET_MEDIA_QUERY } from "./config.js";
import * as model from "./model.js";
import View from "./views/View.js";
import bookmarksView from "./views/bookmarksView.js";
import bookmarkSummaryView from "./views/bookmarkSummaryView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import mobileView from "./views/mobileView.js";

const controlSearchResults = async function (query) {
  try {
    // 0. Closing navbar rendering (only on mobile/tablet)
    if (window.innerWidth < TABLET_MEDIA_QUERY) mobileView.hideSearchBar();
    //////////////////////////////////////////////

    resultsView.renderSpinner();

    // 1. Searching results by query
    await model.loadSearchResults(query);

    // 2. Rendering results
    resultsView.renderResults(
      model.state.search.results,
      model.state.bookmarks
    );

    // 3. Listening to bookmark buttons
    bookmarksView.addHandlerBookmark(controlUpdateBookmarkSummary);
  } catch (err) {
    resultsView.renderError();
    console.error(err);
  }
};

const controlCategoryResults = async function (category) {
  try {
    // 0. Closing navbar rendering (only on mobile/tablet)
    if (window.innerWidth < TABLET_MEDIA_QUERY) mobileView.hideSearchBar();
    //////////////////////////////////////////////

    resultsView.renderSpinner();

    // 1. Searching results by category
    await model.loadCategoryResults(category);

    // 2. Rendering results
    resultsView.renderResults(
      model.state.search.results,
      model.state.bookmarks
    );

    // 3. Listening to bookmark buttons
    bookmarksView.addHandlerBookmark(controlUpdateBookmarkSummary);
  } catch (err) {
    resultsView.renderError();
    console.error(err);
  }
};

const controlUpdateBookmarkSummary = function (movieHTML, type) {
  // 1. Adding bookmark
  model.updateBookmarkSummary(movieHTML, type);

  // 2. Saving bookmark in local storage
  model.setLocalStorage();
};

const controlLoadBookmarkSummary = function (type) {
  // 0. Toggling (showing/hiding) options navigation bar (only mobile/tablet)
  if (window.innerWidth < TABLET_MEDIA_QUERY) mobileView.toggleOptions();
  ////////////////////////////////////////////////////////////

  // 1. Rendering bookmark list
  bookmarkSummaryView.renderBookmarkSummary(model.state.bookmarks, type);

  // 2. Listening to bookmark buttons / delete buttons
  bookmarkSummaryView.addHandlerDeleteBookmark(
    type,
    controlUpdateBookmarkSummary
  );
};

const init = function () {
  model.getLocalStorage();
  searchView.addHandlerSearch(controlSearchResults);
  searchView.addHandlerCategory(controlCategoryResults);
  resultsView.addHandlerPageLoad(controlCategoryResults);
  bookmarkSummaryView.addHandlerMyBookmarks(controlLoadBookmarkSummary);
  resultsView.addHandlerLogo(controlCategoryResults);
  mobileView.addHandlerOptions();
  mobileView.addHandlerSearch();
  mobileView.addHandlerExit();
};

init();
