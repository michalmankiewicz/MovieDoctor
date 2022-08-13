import View from "./View.js";

class MobileView extends View {
  mobileBtnsContainer = document.querySelector(".mobile-buttons");
  searchBtn = document.querySelector(".btn-mobile-search");
  optionsBtn = document.querySelector(".btn-mobile-options");
  exitBtn = document.querySelector(".btn-mobile-exit");
  headerEl = document.querySelector("header");
  filterContainer = document.querySelector(".filters");
  genreContainer = document.querySelector(".genres");

  toggleOptions() {
    this.headerEl.classList.toggle("options-open");
  }

  addHandlerOptions() {
    this.optionsBtn.addEventListener("click", this.toggleOptions.bind(this));
  }

  hideSearchBar() {
    this.headerEl.classList.remove("search-open");
    this.filmListEl.classList.remove("hidden");
    this.filterContainer.style.display = "none";
    this.genreContainer.style.display = "none";
  }

  showSearchBar() {
    this.headerEl.classList.add("search-open");
    this.filmListEl.classList.add("hidden");
    this.filterContainer.style.display = "flex";
    this.genreContainer.style.display = "flex";
  }

  toggleSearchBar() {
    if (this.headerEl.classList.contains("search-open")) {
      this.hideSearchBar();
    } else {
      this.showSearchBar();
    }
  }

  addHandlerSearch() {
    const searchInput = document.querySelector(".input-search");
    this.searchBtn.addEventListener(
      "click",
      function (e) {
        this.toggleSearchBar();
        searchInput.focus();
      }.bind(this)
    );
  }

  addHandlerExit() {
    this.exitBtn.addEventListener("click", this.toggleSearchBar.bind(this));
  }
}

export default new MobileView();
