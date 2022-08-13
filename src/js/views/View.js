export default class View {
  errorMessage = "We could not find that movie. Please try another one!";
  filmListEl = document.querySelector(".film-list");
  filmListContainer = document.querySelector(".film-list-container");

  renderMessage(type) {
    this.filmListEl.innerHTML = "";

    const message =
      type === "favourites"
        ? "You have not added any favourite film."
        : "You have not rated any movie yet.";

    const markup = `
      <div class="message">
        <i class="ph-warning"></i>
        <span>${message}</span>
      </div>`;

    this.filmListEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this.errorMessage) {
    this.filmListEl.innerHTML = "";

    const markup = `
      <div class="message">
        <i class="ph-warning"></i>
        <span>${message}</span>
     </div>`;

    this.filmListEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    this.filmListEl.innerHTML = "";

    const markup = `
      <div class="spinner">
        <i class="ph-spinner"></i>
      </div>`;

    this.filmListEl.insertAdjacentHTML("afterbegin", markup);
  }
}
