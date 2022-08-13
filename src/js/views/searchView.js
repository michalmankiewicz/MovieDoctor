import View from "./View";

class SearchView extends View {
  addHandlerSearch(handler) {
    const searchBarEl = document.querySelector(".search-bar");
    const searchInputEl = document.querySelector(".input-search");

    searchBarEl.addEventListener("submit", function (e) {
      e.preventDefault();

      const searchValue = searchInputEl.value;
      searchInputEl.value = "";
      searchInputEl.blur();

      handler(searchValue);
    });
  }

  addHandlerCategory(handler) {
    const categoryEls = document.querySelectorAll(".category");

    categoryEls.forEach((cat) =>
      cat.addEventListener("click", function (e) {
        const target = e.target;
        const category = target.dataset.category;

        // Changing navigation bar UI
        categoryEls.forEach((cat) => cat.classList.remove("chosen-category"));
        target.classList.add("chosen-category");

        handler(category);
      })
    );
  }
}

export default new SearchView();
