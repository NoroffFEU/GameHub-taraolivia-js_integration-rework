export function updateIconColors() {
  const icons = document.querySelectorAll('.cart-icon-in-button');
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  icons.forEach(icon => {
      const gameId = icon.getAttribute('data-game-id');
      const isInCart = cartItems.some(item => item.id === gameId);
      if (isInCart) {
          icon.classList.add('cart-icon-added');
      } else {
          icon.classList.remove('cart-icon-added');
      }
  });
}

export function updateCartItemCount() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemCount = document.getElementById('cartItemCount');

  if (cartItemCount) {
      if (cartItems.length > 0) {
          cartItemCount.textContent = cartItems.length;
          cartItemCount.style.display = 'inline';
      } else {
          cartItemCount.textContent = '';
          cartItemCount.style.display = 'none';
      }
  }
}

export function updateButtonText() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const buttons = document.querySelectorAll('.button--add_to_cart');

  buttons.forEach(button => {
      const gameId = button.getAttribute('data-product-id');
      const isInCart = cartItems.some(item => item.id === gameId);

      if (isInCart) {
          button.innerHTML = `<p>Remove from cart</p>`;
          button.classList.add('background-color-darkened');
      } else {
          button.innerHTML = `<p>Add to cart</p>`;
          button.classList.remove('background-color-darkened');
      }
  });
}

export function addToCart(productId, buttonElement) {
  console.log(`Adding product ${productId} to cart`);
  const games = JSON.parse(sessionStorage.getItem('games')) || [];
  const product = games.find(game => game.id === productId);
  if (!product) {
      console.error('Product not found!', productId);
      return;
  }

  const isInCart = isInShoppingCart(productId);
  if (isInCart) {
      removeGameFromCart(productId);
  } else {
      addGameToCart(product);
  }

  updateButtonIcon(!isInCart, buttonElement);
  updateCartItemCount();
  displayCart();
  if (document.body.classList.contains('games-page')) {
      updateIconColors();
  }
}

function updateButtonIcon(isInCart, buttonElement) {
  if (isInCart) {
      buttonElement.classList.add('cart-icon-added');
  } else {
      buttonElement.classList.remove('cart-icon-added');
  }
}

function isInShoppingCart(gameId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart.some(item => item.id === gameId);
}

function addGameToCart(game) {
  console.log('Adding game to cart:', game);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(game);
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeGameFromCart(gameId) {
  console.log('Removing game from cart:', gameId);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCart = cart.filter(item => item.id !== gameId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
}

export function displayCart() {
  const overlayCartList = document.getElementById('cart-list');
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  if (overlayCartList) {
      overlayCartList.innerHTML = '';
      cartItems.forEach((product, index) => {
          overlayCartList.appendChild(createCartItem(product, index));
      });
  }

  updateCartTotal();
}

function createCartItem(product, index) {
  const cartItem = document.createElement('div');
  cartItem.className = 'cart-item';

  const cartItemLeft = document.createElement('div');
  cartItemLeft.className = 'cart-item-left';
  const cartItemImage = document.createElement('img');
  cartItemImage.src = product.image;
  cartItemImage.alt = product.title;
  cartItemLeft.appendChild(cartItemImage);

  const cartItemMiddle = document.createElement('div');
  cartItemMiddle.className = 'cart-item-middle';
  const cartItemTitle = document.createElement('p');
  cartItemTitle.textContent = product.title;
  cartItemMiddle.appendChild(cartItemTitle);

  const isCheckoutSuccess = document.body.classList.contains('checkout-success');
  cartItem.appendChild(cartItemLeft);
  cartItem.appendChild(cartItemMiddle);

  if (!isCheckoutSuccess) {
      const cartItemRight = document.createElement('div');
      cartItemRight.className = 'cart-item-right';
      const cartItemPrice = document.createElement('p');
      cartItemPrice.textContent = getCartItemPrice(product);
      cartItemRight.appendChild(cartItemPrice);

      const removeButton = document.createElement('button');
      removeButton.textContent = '×';
      removeButton.className = 'remove-item-button';
      removeButton.onclick = () => removeFromCart(index);
      cartItemRight.appendChild(removeButton);

      cartItem.appendChild(cartItemRight);
  }

  return cartItem;
}

function getCartItemPrice(product) {
  return product.onSale ? `€${product.discountedPrice.toFixed(2)}` : `€${product.price.toFixed(2)}`;
}

function removeFromCart(index) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  displayCart();
  updateCartItemCount();
  updateIconColors();
}

function updateCartTotal() {
  const total = calculateTotal();
  const overlayTotal = document.getElementById('cart-total');

  if (overlayTotal) {
      overlayTotal.textContent = `Total: €${total.toFixed(2)}`;
  }
}

function calculateTotal() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  return cartItems.reduce((sum, item) => sum + (item.onSale ? item.discountedPrice : item.price), 0);
}

export function setupCartIcon() {
  const cartIcon = document.getElementById("cart-icon");
  const cartOverlay = document.getElementById("cart-overlay");
  const closeCartBtn = document.querySelector(".close-cart-btn");
  const goToCheckoutBtn = document.getElementById("go-to-checkout-btn");
  const cartContainer = document.getElementById("cart-container");

  cartIcon?.addEventListener("click", () => {
      cartOverlay.classList.toggle("visible");
      cartContainer.classList.toggle("show-cart-container");
  });

  closeCartBtn?.addEventListener("click", () => {
      cartOverlay.classList.remove("visible");
      cartContainer.classList.remove("show-cart-container");
  });

  goToCheckoutBtn?.addEventListener("click", () => {
      window.location.href = "../checkout/checkout.html";
  });

  document.addEventListener("click", function (event) {
      const clickedElement = event.target;
      if (!cartContainer.contains(clickedElement) && !cartIcon.contains(clickedElement) && !clickedElement.classList.contains('remove-item-button')) {
          cartOverlay.classList.remove("visible");
          cartContainer.classList.remove("show-cart-container");
      }
  });
}

export function setupCartEvents() {
  document.querySelectorAll('.button--add_to_cart').forEach(button => {
      button.addEventListener('click', function () {
          const gameId = this.getAttribute('data-product-id');
          console.log(`Button clicked for gameId: ${gameId}`);
          addToCart(gameId, this);
      });
  });
}
