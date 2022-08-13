import View from "./View";

class ResultsView extends View {
  renderResults(results, bookmarks) {
    this.filmListEl.innerHTML = "";

    const markup = results
      .map(
        (res) => `
            <div class="film-card" data-id="${res.id}" data-user-rating="">
              <img src="${
                !res.img
                  ? require("../../img/default.png")
                  : "https://image.tmdb.org/t/p/w500/" + res.img
              }" alt="Poster">
              <div class="title">
                <h2>${res.title}</h2>
              </div>
    
              <div class="overview">
                  <h2>Overview</h2>
                  <p class="overview-text">${
                    res.overview || "Overview not found"
                  }</p>
              </div>
    
              <div class="rating">
                <div class="rating-value">${
                  res.rating === 0
                    ? "-.-"
                    : String(res.rating).length === 1
                    ? res.rating + ".0"
                    : res.rating
                }</div>
              </div>
    
              <div class="bookmarks">  
                <i class="ph-heart-fill bookmark bookmark-like ${
                  bookmarks.favourites.some(
                    (book) => book.id === String(res.id)
                  ) && "bookmark-like_added"
                }"></i>
                <i class="ph-star-half-fill bookmark bookmark-rate"></i>
              </div>
              
             </div> 
          `
      )
      .join("");

    if (!markup) this.renderError();

    this.filmListEl.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerPageLoad(handler) {
    window.addEventListener("load", function (e) {
      handler("popular");
    });
  }

  addHandlerLogo(handler) {
    const logoEl = document.querySelector(".logo");
    const bookmarkEls = document.querySelectorAll(".nav-item");
    const filterContainer = document.querySelector(".filters");
    const genreContainer = document.querySelector(".genres");

    logoEl.addEventListener("click", function () {
      // UI
      bookmarkEls.forEach((el) => el.classList.remove("selected"));
      filterContainer.classList.remove("hidden");
      genreContainer.classList.remove("hidden");

      handler("popular");
    });
  }
}

export default new ResultsView();
