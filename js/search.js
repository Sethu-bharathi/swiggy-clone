"use strict";
import { addMenu } from "./food.js";

window.searchFood = function () {
  const text = document.getElementById("search").value;
  console.log(text.toUpperCase());
  const foodNav = [];
  const total = [];
  const toWatch = [];
  const foodMenu = document.querySelector(".food-menu");
  menu.allCollections.forEach((element) => {
    const node = [];
    toWatch.push(element.name);
    if (element.name !== "Recommended" && element.name !== "Accompaniments") {
      foodNav.push(`<a href="#${element.name.replace(
        /[^A-Z0-9]/gi,
        ""
      )}"><div class="food-type">${element.name}</div></a>
  `);
  //     total.push(`<div id="${element.name.replace(/[^A-Z0-9]/gi, "")}">
  // <h3 class="catagory">${element.name}</h3>`);
      foodNav.push(`<div>`);
      element.widgets.forEach((e) => {
        // total.push(addElementsToNav(e));
        var count = 0;
        e.entities.forEach((e) => {
          const food = menu.items[e.id.toString()];
          if (food.name.toUpperCase().indexOf(text.toUpperCase()) > -1) {
            console.log(food.name);
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
            count++;
          }
        });
        if (count > 1) {
          foodNav.push(
            `<a href="#${
              element.name + " / " + e.name.replace(/[^A-Z0-9]/gi, "")
            }
            }"><div class="drop-down-items">${e.name}</div></a>`
          );

          total.push(`<div id="${
            element.name + " / " + e.name.replace(/[^A-Z0-9]/gi, "")
          }">
          <h3 class="catagory">${element.name + " / " + e.name}</h3>
          <h5 class="total">${count} items</h5>
          <div class="u-underline"></div>`);
        }
        total.push(node.join(`<div class="line"></div>`));
        node.length=0;
        total.push("</div>");
      });
      foodNav.push("</div>");
      total.push("</div>");
    }

    total.push(`</div>`);
  });
  foodMenu.innerHTML=total.join("")+foodMenu.innerHTML;
  const temp=document
    .getElementById("temp")
    temp.innerHTML+="";
    temp.insertAdjacentHTML("afterBegin", total.join(""));
  //   document.querySelector(".food-nav div").innerHTML += foodNav.join("\n");
  // console.log(total.join(""));
  //   document.addEventListener("DOMContentLoaded", function () {
  //     toWatch.forEach((sections) => {
  //       navObserver.observe(
  //         document.querySelector(`#${sections.replace(/[^A-Z0-9]/gi, "")}`)
  //       );
  //     });
  //   });
};

document.getElementById("search").addEventListener("input", window.searchFood);
