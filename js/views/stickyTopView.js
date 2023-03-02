

const container = document.querySelector(".container");
const hideElements = document.querySelectorAll(".restaurant p.faded");
const ratings = document.querySelectorAll(".rating");
const inline = document.querySelectorAll(".inline");
const RemoveFaded = document.querySelector(".fi-star-full");
const offers = document.querySelector(".offers");
const card = document.querySelector(".card");
const filters = document.querySelector(".filters");

export const showContainer=function() {
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

  export const hideContainer=function() {
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

