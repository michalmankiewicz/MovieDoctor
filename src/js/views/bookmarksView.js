import View from "./View.js";

class BookmarksView extends View {
  modalContainer = document.querySelector(".modal");
  overlay = document.querySelector(".overlay");

  addHandlerBookmark(handler) {
    const bookmarkBtns = document.querySelectorAll(".bookmark");

    bookmarkBtns.forEach((btn) =>
      btn.addEventListener(
        "click",
        function (e) {
          const target = e.target;
          const movieHTML = target.closest(".film-card");

          // Checking which bookmark button has been clcked
          // If rate bookmark -> Open rating modal
          if (target.classList.contains("bookmark-rate"))
            this.renderModal(movieHTML, handler);
          // If like bookmark -> color button
          else {
            btn.classList.toggle("bookmark-like_added");
            handler(movieHTML, "favourites");
          }
        }.bind(this)
      )
    );
  }

  openModal() {
    this.modalContainer.classList.remove("hidden");
    this.overlay.classList.remove("hidden");
  }

  closeModal() {
    this.modalContainer.classList.add("hidden");
    this.overlay.classList.add("hidden");
  }

  renderModal(movieHTML, handler) {
    const imgURL = movieHTML.querySelector("img").src;
    const title = movieHTML.querySelector(".title").textContent;
    const overview = movieHTML.querySelector(".overview-text").textContent;

    this.modalContainer.innerHTML = "";

    const markup = `
      <img src="${imgURL}" alt="" />
      <div class="modal-details">
        <div class="modal-details-title">${title}</div>
        <p>
        ${overview}
        </p>
      </div>
      <div class="modal-rating">
        <h3>Rate this movie:</h3>
        <div class="rates">
          <div class="rate">1</div>
          <div class="rate">2</div>
          <div class="rate">3</div>
          <div class="rate">4</div>
          <div class="rate">5</div>
          <div class="rate">6</div>
          <div class="rate">7</div>
          <div class="rate">8</div>
          <div class="rate">9</div>
          <div class="rate">10</div>
        </div>
      </div>
      <i class="ph-x-bold btn-exit"></i>
      `;

    // Generating and opening modal
    this.modalContainer.insertAdjacentHTML("afterbegin", markup);
    this.openModal();

    // Listening to click events on modal's buttons
    const rateEl = document.querySelectorAll(".rate");
    const btnExit = document.querySelector(".btn-exit");

    btnExit.addEventListener("click", this.closeModal.bind(this));
    this.overlay.addEventListener("click", this.closeModal.bind(this));

    rateEl.forEach((rate) =>
      rate.addEventListener(
        "click",
        function (e) {
          const rating = rate.textContent + ".0";

          movieHTML.dataset.userRating = rating;

          this.closeModal();

          handler(movieHTML, "rates");
        }.bind(this)
      )
    );
  }
}

export default new BookmarksView();
