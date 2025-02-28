import { products } from "../data/products.js";
import { cart, addCheckoutItems, saveToStorage, minusCheckoutItems, calculateCheckoutPrice} from "../data/cart.js";
import { generateStars } from "./utils/utils.js";

let checkoutProductHTML = '';

cart.forEach((cartProduct) => {
  let matchingProduct = getProduct(cartProduct.id);  
  
  let matchingProductHTML = `
    <div class="product js-product-${matchingProduct.id}">
      <div class="product-image-container">
        <img class="product-image" src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">${matchingProduct.name}</div>
        <div class="product-description">
          ${matchingProduct.description}
        </div>

        <div class="review-container">
          ${generateStars(matchingProduct.rating.stars)}
          <div class="review-count">${matchingProduct.rating.count}</div>
        </div>

        <div class="product-price">RM ${(Math.round(matchingProduct.priceCents) / 100).toFixed(2)}</div>

        <div class="product-quantity-container">
          <div class="add-product-quantity js-add-product-quantity" data-product-id="${matchingProduct.id}">+</div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">${cartProduct.quantity}</div>
          <div class="minus-product-quantity js-minus-product-quantity" data-product-id="${matchingProduct.id}">-</div>
        </div>

        <button class="buy-now-button">Buy Now</button>
      </div>
    </div>
  `

  checkoutProductHTML += matchingProductHTML;
})

document.querySelector('.js-products-checkout-container')
  .innerHTML = checkoutProductHTML;


function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  })

  return matchingProduct;
}

document.querySelectorAll('.js-add-product-quantity').forEach((addButton) => {
  addButton.addEventListener('click', () => {
    let productId = addButton.dataset.productId;
    addCheckoutItems(productId);
  })
})

document.querySelectorAll('.js-minus-product-quantity').forEach((addButton) => {
  addButton.addEventListener('click', () => {
    let productId = addButton.dataset.productId;
    minusCheckoutItems(productId);
  })
})

calculateCheckoutPrice();


