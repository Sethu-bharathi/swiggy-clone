"use strict";

import { menu } from "./menu.js";
window.menu = menu;
const foodMenu = document.querySelector(".food-menu");
const total = [];
const foodNav = [];
const cart = { items: [] };
const toWatch = [];

function renderMenu(isveg) {
  foodMenu.innerHTML = "";
  menu.allCollections.forEach((element) => {
    const node = [];
    toWatch.push(element.name);
    if (element.name === "Recommended" || element.name === "Accompaniments") {
      foodNav.push(`<a href="#${element.name.replace(
        /[^A-Z0-9]/gi,
        ""
      )}"><div class="food-type">${element.name}</div></a>
    `);
      total.push(addElementsToNav(element));
      element.entities.forEach((e) => {
        const food = menu.items[e.id.toString()];
        node.push(
          addMenu(
            food.id,
            food.name,
            food.isVeg,
            food.price / 100,
            food.description,
            food.cloudinaryImageId
          )
        );
      });
      total.push(node.join(`<div class="line"></div>`));
    } else {
      foodNav.push(`<a href="#${element.name.replace(
        /[^A-Z0-9]/gi,
        ""
      )}"><div class="food-type">${element.name}</div></a>
    `);
      total.push(`<div id="${element.name.replace(/[^A-Z0-9]/gi, "")}">
    <h3 class="catagory">${element.name}</h3>`);
      foodNav.push(`<div>`);
      element.widgets.forEach((e) => {
        foodNav.push(
          `<a href="#${e.name.replaceAll(
            " ",
            ""
          )}"><div class="drop-down-items">${e.name}</div></a>`
        );
        total.push(addElementsToNav(e));
        e.entities.forEach((e) => {
          const food = menu.items[e.id.toString()];
          node.push(
            addMenu(
              food.id,
              food.name,
              food.isVeg,
              food.price / 100,
              food.description,
              food.cloudinaryImageId
            )
          );
        });
        total.push(node.join(`<div class="line"></div>`));
        total.push("</div>");
      });
      foodNav.push("</div>");
      total.push("</div>");
    }

    total.push(`</div>`);
  });
  foodMenu.insertAdjacentHTML("beforeend", total.join(""));
  document.querySelector(".food-nav div").innerHTML += foodNav.join("\n");
  document.addEventListener("DOMContentLoaded", function () {
    toWatch.forEach((sections) => {
      navObserver.observe(
        document.querySelector(`#${sections.replace(/[^A-Z0-9]/gi, "")}`)
      );
    });
  });
}
const navObserver = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting === true)
      addColor(entries[0].target.getAttribute("id"));
  },
  { threshold: [0.05],
  rootMargin:"-180px 0px 0px 0px" }
);

export function addMenu(
  foodId,
  foodName,
  isveg,
  foodCost,
  foodDescription,
  foodImage
) {
  return `<div class="menu-card" foodid=${foodId}>
    <div>
      <div class="icon ${isveg ? "veg" : "non-veg"}">
        <div></div>
      </div>
      <h3 class="f-name">${foodName}</h3>
      <p class="f-cost">₹ ${foodCost}</p>
      <p class="f-description faded">
        ${foodDescription}
      </p>
    </div>
    <button class="relative pointer" style="width:118px;height:96px" foodid=${foodId}>
      ${
        foodImage !== ""
          ? `<img
      class="food-img"
        loading="lazy"
        width="118"
        height="96"
        src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${foodImage}"
        alt="${foodName}"
      />`
          : `<div class="food-img"> </div> `
      }
      <div class="add" foodid=${foodId} onClick="addCart(this)">ADD</div>
    </button>
  </div>`;
  // foodMenu.insertAdjacentHTML("beforeend", newFood);
}

function addElementsToNav(element) {
  return `<div id="${element.name.replace(/[^A-Z0-9]/gi, "")}">
  <h3 class="catagory">${element.name}</h3>
  <h5 class="total">${
    element.count ? element.count : element.entities.length
  } items</h5>
  <div class="u-underline"></div>`;
}
renderMenu(false);
document.querySelector(".food-nav div a div").classList.add("selected-fill");

export function addColor(currentId) {
  let count = 0;
  const navitems = document.querySelector(".food-nav>div");
  for (const child of navitems.children) {
    if (child.getAttribute("href") == `#${currentId}`) {
      child.firstChild.classList.add("selected-fill");
      const indicator = document.querySelector(".orange-indicator > div");
      indicator.style.transform = `translateY(${42 + count * 21+count*7}px)`;
      console.log(count);
      if (child.lastChild) {
        const lastChild = child.lastChild;
        for (const lastchild of lastChild.children) {
          lastChild.classList.add(show);
        }
      }
    } else if (child.getAttribute("href")) {
      try {
        child.firstChild.classList.remove("selected-fill");
      } catch (e) {
        console.log(e);
      }
    } else {
      count -= 1;
    }
    count += 1;
  }
}
