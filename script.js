






window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    // Hide preloader and show content with fade-out effect
    preloader.style.opacity = '0';
    setTimeout(function () {
        preloader.style.display = 'none'; // Hide the preloader completely after fade
        mainContent.style.display = 'block'; // Show the main content
    }, 500); // Wait for the fade-out transition to complete (0.5s)
});




document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([40.7128, -74.0060], 13); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.marker([40.7128, -74.0060]).addTo(map)
        .bindPopup('The Tea Shelf, 42 Street, New York City.')
        .openPopup();
    
    fetchCards();
});





function fetchCards(category = 'all') {
    const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
    const container = document.getElementById('tea-cards-container');
    container.innerHTML = ''; 

    const filteredCards = category === 'all' 
        ? storedCards 
        : storedCards.filter(card => card.category === category);

        filteredCards.forEach(card => {
            // Determine stock status
            const stockStatus = parseInt(card.stock) === 0 ? 
                `<p class="stock-status out-of-stock">Out of Stock</p>` : 
                `<p class="stock-status">${card.stock} in stock</p>`;
    
            const cardElement = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${card.imageUrl}" class="card-img-top" alt="${card.title}">
                        <div class="card-body">
                            <h5 class="card-title">${card.title}</h5>
                            <p class="card-text">${card.description}</p>
                            <p class="card-text"><strong>Price:</strong> ₹${card.price}</p>
                            <p class="card-text"><small class="text-muted">${card.category}</small></p>
                            ${stockStatus} <!-- Add stock status here -->
                            <button class="btn btn-primary" onclick="addToCart('${card.title}', ${card.price})" ${parseInt(card.stock) === 0 ? 'disabled' : ''}>Add to Cart</button>
                            <button class="btn btn-secondary" onclick="addToWishlist('${card.title}', ${card.price})">Add to Wishlist</button>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += cardElement;
        });
    }

function filterByCategory() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    fetchCards(categoryFilter); 
}


// Toggle Cart Panel
function toggleCartPanel() {
    const cartPanel = document.getElementById("cart-panel");
    const bootstrapOffcanvas = new bootstrap.Offcanvas(cartPanel);
    bootstrapOffcanvas.show();
    calculateCartSubtotal(); // Ensure the subtotal is accurate
}

// Toggle Wishlist Panel
function toggleWishlistPanel() {
    const wishlistPanel = document.getElementById("wishlist-panel");
    const bootstrapOffcanvas = new bootstrap.Offcanvas(wishlistPanel);
    bootstrapOffcanvas.show();
}


// Initialize cart from local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to save cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Toggle Cart Panel
function toggleCartPanel() {
    const cartPanel = document.getElementById("cart-panel");
    const bootstrapOffcanvas = new bootstrap.Offcanvas(cartPanel);
    bootstrapOffcanvas.show();
    calculateCartSubtotal(); // Ensure the subtotal is accurate
}

// Add Item to Cart
function addToCart(itemName, price) {
    const teaCards = JSON.parse(localStorage.getItem("teaCards")) || [];
    const teaCard = teaCards.find(card => card.title === itemName);

    if (!teaCard) {
        alert("This item is no longer available.");
        return;
    }

    const stockAvailable = parseInt(teaCard.stock);
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        const newQuantity = existingItem.quantity + 1;

        if (newQuantity > stockAvailable) {
            alert(`Cannot add more than ${stockAvailable} units of ${itemName} to the cart.`);
        } else {
            existingItem.quantity = newQuantity;
            showAlert(`${itemName} quantity updated in the cart.`);
        }
    } else {
        if (stockAvailable > 0) {
            // Add the image URL to the cart item
            cart.push({ name: itemName, price: price, quantity: 1, imageUrl: teaCard.imageUrl });
            showAlert(`${itemName} has been added to the cart.`);
        } else {
            alert(`Sorry, ${itemName} is out of stock.`);
        }
    }

    saveCartToLocalStorage(); // Save updated cart to local storage
    renderCart(); // Render cart items
}

// Render Cart Items
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        const itemHTML = `
            <li class="d-flex justify-content-between align-items-center mb-3">
                <img src="${item.imageUrl}" alt="${item.name}" class="img-fluid cart-item-image" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                <span class="item-name">${item.name}</span> - ₹<span class="item-price">${item.price}</span>
                <input type="number" value="${item.quantity}" min="1" class="form-control w-25 item-quantity" onchange="updateQuantity('${item.name}', this.value)">
                <button class="btn btn-danger btn-sm" onclick="deleteItem('${item.name}')">Delete</button>
            </li>
        `;
        cartItems.insertAdjacentHTML("beforeend", itemHTML);
    });

    calculateCartSubtotal(); // Update subtotal after rendering
}

// Update Quantity
function updateQuantity(itemName, newQuantity) {
    const teaCards = JSON.parse(localStorage.getItem("teaCards")) || [];
    const teaCard = teaCards.find(card => card.title === itemName);
    const stockAvailable = parseInt(teaCard.stock);

    if (parseInt(newQuantity) > stockAvailable) {
        alert(`Cannot set more than ${stockAvailable} units for ${itemName}.`);
        return;
    }

    const existingItem = cart.find(item => item.name === itemName);
    existingItem.quantity = parseInt(newQuantity);
    saveCartToLocalStorage(); // Update local storage
    renderCart(); // Re-render cart items
}

// Delete Item from Cart
function deleteItem(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    saveCartToLocalStorage(); // Update local storage
    renderCart(); // Re-render cart items
}

// Calculate Cart Subtotal
function calculateCartSubtotal() {
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    document.getElementById("cart-total").textContent = subtotal.toFixed(2);
    return subtotal; // Return the subtotal for use in the Buy Now button
}

// Show custom modal alert with message
function showAlert(message) {
    const alertMessage = document.getElementById("alertModalMessage");
    alertMessage.textContent = message;
    
    const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
    alertModal.show();
}

// Load cart items on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    renderCart(); // Render cart items from local storage
});

// Handle Buy Now Button Click
document.getElementById("buy-now-button").addEventListener("click", function () {
    const cartTotal = calculateCartSubtotal(); // Get the current cart total

    if (cartTotal > 0) {
        const teaCards = JSON.parse(localStorage.getItem("teaCards")) || [];

        // Update stock levels in teaCards based on cart items
        cart.forEach(item => {
            const teaCard = teaCards.find(card => card.title === item.name);
            if (teaCard) {
                teaCard.stock = parseInt(teaCard.stock) - item.quantity; // Decrement stock by quantity in cart
            }
        });

        // Save updated teaCards to local storage
        localStorage.setItem('teaCards', JSON.stringify(teaCards));

        // Clear the cart
        cart = []; // Empty the cart array
        saveCartToLocalStorage(); // Update local storage to reflect the empty cart

        // Redirect to payment.html with cart total as a query parameter
        window.location.href = `payment.html?total=${cartTotal.toFixed(2)}`;
    } else {
        alert("Your cart is empty. Add items before proceeding to payment.");
    }
});
















