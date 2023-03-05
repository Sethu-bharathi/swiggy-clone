export const cartView = function (cartItem) {
  if (!Object.keys(cartItem.items).length)
    return { markup: "CART EMPTY", total: 0 };
  let markup = `
    <div class="total">${Object.keys(cartItem.items).length} items</div>`;
  let total = 0;
  for (const key in cartItem.items) {
    const element = cartItem.items[key];
    markup += `<div class="flex-row align-center">
        <div class="icon ${element.isVeg ? "veg" : "non-veg"}">
          <div></div>
        </div>
        <h3>${element.name}</h3>
        ${addDeleteView(element.count, "add-cart", element.id)}
        <p class="amount">₹${(element.price / 100) * element.count}</p>
      </div>`;
    total += (element.price / 100) * element.count;
  }
  markup += ` 
    <div class="total-cost">
      <h3>Subtotal</h3>
      <p>₹${total}</p>
    </div>
    <p class="extra-charges">Extra charges may apply</p>
    <button class="checkout-btn" onclick="completeOrder()">CHECKOUT  →</button>`;
  return { markup, total };
};

export const addDeleteView = function (count, className, id) {
  return `<ul class="${className}">
  <li foodid="${id}" value="-1" onclick="addCart(this)" >-</li>
  <li foodid="${id}" class="fa-green">${count}</li>
  <li foodid="${id}" value="1" onclick="addCart(this)" class="fa-green">+</li>
</ul>`;
};


