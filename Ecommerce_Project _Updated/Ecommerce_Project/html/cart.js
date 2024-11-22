window.addEventListener('storage', (event) => {
  if (event.key === 'cartUpdated') {
    console.log('Cart updated event detected from another page');
    displayCart();
    updateCartSizeDisplay();
  }
});

function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items-container');
  const totalItemsElement = document.getElementById('total-items');
  const totalPriceElement = document.getElementById('total-price');
  const totalAmountWithDeliveryCharges = document.getElementById('total-amt-delivery-price');
  const deiveryCharges = document.getElementById('delivery-charges');
  const cartEmptyDiv = document.getElementById('cart-empty-div'); 
  const orderSummary = document.getElementById('cart-order-summary'); 


  container.innerHTML = '';

  if (cart.length === 0) {
    
    cartEmptyDiv.style.display = 'block';
    orderSummary.style.display = 'none';
    console.log("cart empty");
    
    return;
  } else {
  
    cartEmptyDiv.style.display = 'none';
    orderSummary.style.display = 'block';
    console.log("cart is not empty");
  }

  let totalItems = 0;
  let totalPrice = 0;
  let deliveryAmt = 30;
  
  cart.forEach(product => {
    const cartItemHTML = `
      <div class="cart-item" data-id="${product.id}">
        <img src="${product.image}"  alt="${product.title}">
        <div class="cart-item-details">
          <h6>${product.title}</h6>
          <p><strong>${product.quantity} x $${product.price} </strong></p>
         
        </div>
        <div class="cart-item-quantity">
          <button  onclick="updateQuantity(${product.id}, -1)">-</button>
          <input type="text" value="${product.quantity}" readonly>
          <button  onclick="updateQuantity(${product.id}, 1)">+</button>
          
        </div>
        
        
      </div>
      <hr>
      
    `;
    container.innerHTML += cartItemHTML;

    
    totalItems += product.quantity;
    totalPrice += product.price * product.quantity;
  });

  
  totalItemsElement.textContent = totalItems;
  deiveryCharges.textContent = deliveryAmt;
  totalPriceElement.textContent = totalPrice.toFixed(2);
  totalAmountWithDeliveryCharges.textContent = (totalPrice+ deliveryAmt).toFixed(2);
  updateCartSizeDisplay();
}

function updateQuantity(id, change) {
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productIndex = cart.findIndex(product => product.id === id);

  if (productIndex > -1) {
  
    cart[productIndex].quantity += change;

  
    if (cart[productIndex].quantity <= 0) {
      cart.splice(productIndex, 1);
    }

  
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartUpdated', JSON.stringify({ time: Date.now() }));
    
    updateCartSizeDisplay();
  
    displayCart();
  }
}

function updateCartSizeDisplay() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartSize = cart.length; 
  console.log("cart size : "+cartSize);
  const numberDisplay = document.getElementById("cartSize");
  if (numberDisplay) {
    numberDisplay.textContent = cartSize;
  }
}

window.addEventListener('storage', (event) => {
  if (event.key === 'cartUpdated') {
    console.log('Cart updated event detected from another page');
    updateCartSizeDisplay();
  }
});

window.onload = displayCart;