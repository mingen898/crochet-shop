import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  id: '1',
  quantity: 1
}, {
  id: '2',
  quantity: 1
}];

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingProduct;

  cart.forEach((cartProduct) => {
    if (cartProduct.id === productId) {
      matchingProduct = cartProduct;
    }
  })

  if (matchingProduct) {
    matchingProduct.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1
    })
  }

  saveToStorage();
}

export function addCheckoutItems(productId) {
  let matchingProduct;

    cart.forEach((cartProduct) => {
      if (cartProduct.id === productId) {
        matchingProduct = cartProduct;
      }
    })

    if (matchingProduct) {
      matchingProduct.quantity += 1;
    }
    
    document.querySelector(`.js-product-quantity-${productId}`).innerHTML = matchingProduct.quantity;

    saveToStorage();
    calculateCheckoutPrice();
}

export function minusCheckoutItems(productId) {
  let matchingProduct;

  cart.forEach((cartProduct) => {
    if (cartProduct.id === productId) {
      matchingProduct = cartProduct;
    }
  })

  if (matchingProduct) {
    if (matchingProduct.quantity === 1) {
      let newCart = [];
      cart.forEach((cartItem) => {
        if (cartItem.id !== productId) {
          newCart.push(cartItem);
        }
      });
      cart = newCart;
      saveToStorage();
      const productElement = document.querySelector(`.js-product-${productId}`);
      productElement.remove();
      calculateCheckoutPrice();

    } else {
      matchingProduct.quantity -= 1;
      document.querySelector(`.js-product-quantity-${productId}`).innerHTML = matchingProduct.quantity;
      saveToStorage();
      calculateCheckoutPrice();
    }
  }
}

function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  })

  return matchingProduct;
}

export function calculateCheckoutPrice() {
  let totalPriceCents = 0;
  let totalQuantity = 0;

  cart.forEach((cartProduct) => {
    let matchingProduct = getProduct(cartProduct.id);  

    totalPriceCents += matchingProduct.priceCents * cartProduct.quantity;

    totalQuantity += cartProduct.quantity;
  })

  const checkoutPaymentHTML = `
    <div class="order-summary-text">Order Summary</div>

    <div class="price-before-tax">
      <div class="price-details">
        <div>Items (${totalQuantity}):</div>
        <div>RM ${(Math.round(totalPriceCents) / 100).toFixed(2)}</div>
      </div>
      <div class="price-details">
        <div>Shipping & Handling:</div>
        <div>RM 0.00</div>
      </div>
    </div>

    <div class="price-after-tax">
      <div class="price-details">
        <div>Total before tax:</div>
        <div>RM ${(Math.round(totalPriceCents) / 100).toFixed(2)}</div>
      </div>
      <div class="price-details">
        <div>Estimated tax (10%):</div>
        <div>RM ${((Math.round(totalPriceCents) * 0.1) / 100).toFixed(2)}</div>
      </div>
    </div>

    <div class="total-price">
      <div>Order Total:</div>
      <div>RM ${((Math.round(totalPriceCents) * 1.1) / 100).toFixed(2)}</div>
    </div>
    <button class="buy-now-button">Buy All</button>
  `
  document.querySelector('.js-price-container')
    .innerHTML = checkoutPaymentHTML;
  document.querySelector('.js-quantity')
    .innerHTML = totalQuantity;
}
