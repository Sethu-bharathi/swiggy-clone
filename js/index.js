
const container = document.querySelector(".container");
// Show the restaurant section when scrolled up
function showContainer() {
  const container = document.querySelector(".container");
  const hideElements = document.querySelectorAll(".restaurant p.faded");
  const ratings = document.querySelectorAll(".rating");
  const inline = document.querySelectorAll(".inline");
  const RemoveFaded = document.querySelector(".fi-star-full");
  const offers = document.querySelector(".offers");
  const card = document.querySelector(".card");
  const filters = document.querySelector(".filters");
  container.classList.remove("is-pinned");
  hideElements.forEach((element) => {
    element.classList.remove("hide");
  });
  ratings.forEach((e) => {
    e.style.display = "block";
  });
  inline.forEach((e) => {
    e.classList.remove("faded");
  });
  RemoveFaded.classList.remove("faded");
  offers.style.padding = "30px 20px 20px";
  card.style.marginBlock = "20px 0px";
  filters.style.position = "relative";
}
// Hide the restaurant section when scrolled down
function hideContainer() {
  const container = document.querySelector(".container");
  const hideElements = document.querySelectorAll(".restaurant p.faded");
  const ratings = document.querySelectorAll(".rating");
  const inline = document.querySelectorAll(".inline");
  const RemoveFaded = document.querySelector(".fi-star-full");
  const offers = document.querySelector(".offers");
  const card = document.querySelector(".card");
  const filters = document.querySelector(".filters");
  container.classList.remove("is-pinned");
  ratings.forEach((e) => {
    e.style.display = "none";
  });
  inline.forEach((e) => {
    e.classList.add("faded");
  });
  RemoveFaded.classList.add("faded");
  offers.style.padding = "20px 10px 10px";
  card.style.marginBlock = "10px 20px";
  filters.style.position = "static";
  document.querySelector(".container").classList.add("is-pinned");
  hideElements.forEach((element) => {
    element.classList.add("hide");
  });
}

// const obsCallback = function (entries, observer) {
//   console.log(entries);
//   entries.forEach((entry, index) => {
//     if (!entry.isIntersecting && entry.intersectionRatio < 0.8) {
      
//       hideContainer();
//     }
//     if (entry.isIntersecting && entry.intersectionRatio > 0.85) {
//       showContainer();
//     }
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0.85,0.80],
// };

const observer = new IntersectionObserver(
  ([e]) => {
    if (e.intersectionRatio < 1) {
      hideContainer();
    } else {
      showContainer();
    }
  },
  {
    root: null,
    rootMargin:"-200px 0px",
    threshold: [1],
  }
);
// const observer = new IntersectionObserver(obsCallback, obsOptions);
setTimeout(() => {
  observer.observe(document.querySelectorAll(".catagory")[0]);
}, 1000);
//Display all items
window.renderMenu(1,observer); //renderMenu(argument isNonveg-whether to include Nonveg);

// Filtering Veg only
function toggleveg(event) {
  observer.unobserve(document.querySelectorAll(".catagory")[0])
  window.renderMenu(!document.querySelector(".checkbox").checked,observer);
  console.log(document.querySelector(".checkbox").checked,"isVeg");
}


function addCart(event){
  console.log(event.getAttribute("foodid"));
  console.log(menu.items[event.getAttribute("foodid")]);
}