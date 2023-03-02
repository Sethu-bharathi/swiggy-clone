import * as stickyTopView from "/js/views/stickyTopView.js";
import * as searchView from "/js/views/searchView.js";
import * as model from "/js/model.js";
import * as menuView from "/js/views/menuView.js";
//observe for scrolling
const observer = new IntersectionObserver(
  ([e]) => {
    if (e.intersectionRatio < 1) {
      stickyTopView.hideContainer();
    } else {
      stickyTopView.showContainer();
    }
  },
  {
    root: null,
    rootMargin: "-200px 0px",
    threshold: [1],
  }
);

window.addEventListener(
  "load",
  () => {
    observer.observe(document.querySelectorAll(".catagory")[0]);
  },
  1000
);

//Veg filter

function toggleveg(event) {
  console.log(observer);
  observer.unobserve(document.querySelectorAll(".catagory")[0]);
  window.renderMenu(!document.querySelector(".checkbox").checked, observer);
  console.log(document.querySelector(".checkbox").checked, "isVeg");
}

//Handling Search items
document.getElementById("search").addEventListener("input", () => {
  const text = document.getElementById("search").value;
  if (text.trim() !== "") {
    searchView.searchFood(model.getSearchItems(text));
  }
});

//rendering initial Menu
menuView.renderMenu(1, observer);
window.toggleveg = toggleveg;
