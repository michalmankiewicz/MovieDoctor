import View from "./View";

class BookmarkSummaryView extends View {
  addHandlerMyBookmarks(handler) {
    const btnMyBookmarks = document.querySelectorAll(".nav-item");
    const filterContainer = document.querySelector(".filters");
    const genreContainer = document.querySelector(".genres");

    btnMyBookmarks.forEach((btn) =>
      btn.addEventListener("click", function (e) {
        const target = e.target.closest(".nav-item");

        // Hidding categories
        filterContainer.classList.add("hidden");
        genreContainer.classList.add("hidden");

        // Updating navbar
        const siblingEl =
          target.nextElementSibling ?? target.previousElementSibling;
        siblingEl.classList.remove("selected");
        target.classList.add("selected");

        if (target.classList.contains("btn-favourites")) handler("favourites");
        else handler("rates");
      })
    );
  }

  renderBookmarkSummary(dataArr, type) {
    this.filmListEl.innerHTML = "";

    if (dataArr[type].length === 0) this.renderMessage(type);

    const markup = dataArr[type]
      .map((book) => {
        return `
          <div class="film-card" data-id="${book.id}" data-user-rating="">
            <img src="${
              !book.img
                ? require("../../img/default.png")
                : "https://image.tmdb.org/t/p/w500/" + book.img
            }"
            alt="Poster">
          <div class="title">
            <h2>${book.title}</h2>
          </div>
          <div class="overview">
            <h2>Overview</h2>
            <p class="overview-text">${
              book.overview || "Overview not found"
            }</p>
          </div>

          <div class="rating">
            ${!book.userRating ? "" : "<i class=ph-user-bold></i>"}
            <div class="rating-value">${book.userRating || book.rating}</div>   
          </div>

          <div class="bookmarks"> 
            ${
              type === "favourites"
                ? `<i class="ph-heart-fill bookmark bookmark-like bookmark-like_added"></i>
          `
                : `<i class="ph-star-half-fill bookmark bookmark-rate"></i>`
            }     
          </div>    
      </div> 
    `;
      })
      .join("");

    this.filmListEl.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerDeleteBookmark(type, handler) {
    const deleteBtns = document.querySelectorAll(".bookmark");

    //Changing star icon to trash
    if (type === "rates") {
      deleteBtns.forEach((btn) => {
        btn.classList.remove("ph-star-half-fill");
        btn.classList.remove("bookmark-rate");
        btn.classList.add("ph-trash");
        btn.classList.add("bookmark-trash");
      });
    }

    //Handling click event
    deleteBtns.forEach((btn) =>
      btn.addEventListener("click", function (e) {
        const target = e.target;
        let movieHTML = target.closest(".film-card");
        movieHTML.classList.add("deleted");

        handler(movieHTML, type);
      })
    );
  }
}

export default new BookmarkSummaryView();
