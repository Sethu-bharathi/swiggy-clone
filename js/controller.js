import * as stickyTopView from "/js/views/stickyTopView.js";
import * as searchView from "/js/views/searchView.js";
import * as model from "/js/model.js";
import * as menuView from "/js/views/menuView.js";
import * as cartView from "/js/views/cartView.js";

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

//Cart states
const cart = { items: {}, total: 0 };
const ordered = JSON.parse(window.localStorage.getItem("ordered")) ?? {
  user: "sethu",
  orderHistory: [],
};

window.addCart = function (event) {
  console.log(event, "called");
  const isAdd = +event.getAttribute("value");
  const foodId = event.getAttribute("foodid");
  const newFood = model.getItem(foodId);
  const CartButton = document.querySelector(`.add[foodid='${foodId}']`);

  if (cart.items[newFood.id]) {
    cart.items[newFood.id].count += isAdd;
    if (cart.items[newFood.id].count === 0) {
      delete cart.items[newFood.id];
      setTimeout(() => {
        CartButton.innerHTML = "ADD";
        CartButton.setAttribute("onclick", "addCart(this)");
      }, 0);
    } else {
      CartButton.innerHTML = cartView.addDeleteView(
        cart.items[newFood.id].count,
        "add-cart1",
        newFood.id
      );
    }
  } else {
    CartButton.removeAttribute("onclick");
    cart.items[newFood.id] = { ...newFood, count: 1 };
    CartButton.innerHTML = cartView.addDeleteView(
      cart.items[newFood.id].count,
      "add-cart1",
      newFood.id
    );
  }
  const { markup, total } = { ...cartView.cartView(cart) };
  document.querySelector(".cart-items").innerHTML = markup;
  cart.total = total;
  // CartButton.removeChild(CartButton.firstChild)
};

const completeOrder = () => {
  ordered.orderHistory.push({
    ...cart,
    time: new Date(Date.now()).toUTCString(),
  });
  setTimeout(() => {
    console.log(ordered);
    // window.localStorage("ordered",JSON)
  }, 0);
};

window.completeOrder=completeOrder
