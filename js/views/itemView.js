
function renderMenu(isNonVeg = 1,observer) {
    const foodNav = [];
    const toWatch = [];
    const total = [];
    foodMenu.innerHTML = "";
    menu.allCollections.forEach((element) => {
      const node = [];
      toWatch.push(element.name);
      if (element.name === "Recommended" || element.name === "Accompaniments") {
        let count=0;
        foodNav.push(`<a href="#${element.name.replace(
          /[^A-Z0-9]/gi,
          ""
        )}"><div class="food-type">${element.name}</div></a>
      `);
        total.push(addElementsToNav(element));
        element.entities.forEach((e) => {
          const food = menu.items[e.id.toString()];
          if (isNonVeg || food.isVeg) {
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
        total.push(node.join(`<div class="line"></div>`));
      } else {
        let count = 0;
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
            if (isNonVeg || food.isVeg) {
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
          total.push(node.join(`<div class="line"></div>`));
          total.push("</div>");
        });
        foodNav.push("</div>");
        total.push("</div>");
      }
  
      total.push(`</div>`);
    });
    foodMenu.insertAdjacentHTML("beforeend", total.join(""));
    foodNavDom.innerHTML = "";
    foodNavDom.innerHTML = foodNav.join("\n");
    console.log(observer);
    setTimeout(function () {
      toWatch.forEach((sections) => {
        navObserver.observe(
          document.querySelector(`#${sections.replace(/[^A-Z0-9]/gi, "")}`)
        );
        document.querySelector(".food-nav div a div").classList.add("selected-fill");
        observer.observe(document.querySelectorAll(".catagory")[0]);
      });
    },500);
  }