import { products } from "../data/products.js";
import { generateStars } from "./utils/utils.js";
import { cart, addToCart, saveToStorage } from "../data/cart.js";

let crochetHTML = '';

products.forEach((product) => {
  let html = `
    <div class="product">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name-price">
          <div>${product.name}</div>
          <div>RM ${(Math.round(product.priceCents) / 100).toFixed(2)}</div>
        </div>

        <div class="product-description">
          ${product.description}
        </div>

        <div class="review-container">
          ${generateStars(product.rating.stars)}
          <div class="review-count">${product.rating.count}</div>
        </div>

        <button class="add-to-cart-button js-add-to-cart-button" data-product-id="${product.id}">Add To Cart</button>
      </div>
    `;
  
    crochetHTML += html;
})

document.querySelector('.js-products-container')
  .innerHTML = crochetHTML;



document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);
  })
})
