




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
        const cardElement = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${card.imageUrl}" class="card-img-top" alt="${card.title}">
                    <div class="card-body">
                        <h5 class="card-title">${card.title}</h5>
                        <p class="card-text">${card.description}</p>
                        <p class="card-text"><strong>Price:</strong> ₹${card.price}</p>
                        <p class="card-text"><small class="text-muted">${card.category}</small></p>
                        <button class="btn btn-primary" onclick="addToCart('${card.title}', ${card.price})">Add to Cart</button>
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


// Add Item to Wishlist
function addToWishlist(itemName, price) {
    const wishlistItems = document.getElementById("wishlist-items");

    // Check if the item already exists in the wishlist
    const existingItem = Array.from(wishlistItems.children).find(item =>
        item.querySelector(".item-name").textContent === itemName
    );

    if (!existingItem) {
        // Add a new item to the wishlist
        const itemHTML = `
            <li class="d-flex justify-content-between align-items-center mb-3">
                <span class="item-name">${itemName}</span> - ₹<span class="item-price">${price}</span>
                <button class="btn btn-danger btn-sm" onclick="deleteItem(this, 'wishlist')">Delete</button>
            </li>
        `;
        wishlistItems.insertAdjacentHTML("beforeend", itemHTML);
    }
}

// Delete Item from Cart or Wishlist
function deleteItem(button, type) {
    const itemElement = button.parentElement;
    itemElement.remove();

    if (type === "cart") calculateCartSubtotal(); // Recalculate cart subtotal if an item is removed
}

// Calculate Cart Subtotal
function calculateCartSubtotal() {
    const cartItems = document.querySelectorAll("#cart-items li");
    let subtotal = 0;

    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector(".item-price").textContent);
        const quantity = parseInt(item.querySelector(".item-quantity").value);
        subtotal += price * quantity;
    });

    document.getElementById("cart-total").textContent = subtotal.toFixed(2);
}

// Example: Attach to buttons to add items
document.querySelector(".fa-cart-shopping").addEventListener("click", toggleCartPanel);
document.querySelector(".fa-heart").addEventListener("click", toggleWishlistPanel);

// Example items for testing
function addTestItems() {
    addToCart("Black Tea", 300);
    addToCart("Green Tea", 200);
    addToWishlist("Herbal Tea", 150);
}

// Call addTestItems for testing if needed
// addTestItems();
// Handle Buy Now Button Click
document.getElementById("buy-now-button").addEventListener("click", function () {
    const cartTotal = parseFloat(document.getElementById("cart-total").textContent);
    
    if (cartTotal > 0) {
        // Redirect to payment.html with cart total as a query parameter
        window.location.href = `payment.html?total=${cartTotal.toFixed(2)}`;
    } else {
        alert("Your cart is empty. Add items before proceeding to payment.");
    }
});


// Add Item to Cart with Modal Alert
function addToCart(itemName, price) {
    const cartItems = document.getElementById("cart-items");

    // Check if the item already exists in the cart
    const existingItem = Array.from(cartItems.children).find(item =>
        item.querySelector(".item-name").textContent === itemName
    );

    if (existingItem) {
        // Increment the quantity of the existing item
        const quantityInput = existingItem.querySelector(".item-quantity");
        quantityInput.value = parseInt(quantityInput.value) + 1;
        showAlert(`${itemName} quantity updated in the cart.`);
    } else {
        // Add a new item to the cart
        const itemHTML = `
            <li class="d-flex justify-content-between align-items-center mb-3">
                <span class="item-name">${itemName}</span> - ₹<span class="item-price">${price}</span>
                <input type="number" value="1" min="1" class="form-control w-25 item-quantity" onchange="calculateCartSubtotal()">
                <button class="btn btn-danger btn-sm" onclick="deleteItem(this, 'cart')">Delete</button>
            </li>
        `;
        cartItems.insertAdjacentHTML("beforeend", itemHTML);
        showAlert(`${itemName} has been added to the cart.`);
    }

    calculateCartSubtotal(); // Update subtotal after adding an item
}



function addToCart(itemName, price) {
    const cartItems = document.getElementById("cart-items");

    // Retrieve teaCards data from localStorage
    const teaCards = JSON.parse(localStorage.getItem("teaCards")) || [];

    // Find the item's stock
    const teaCard = teaCards.find(card => card.title === itemName);
    if (!teaCard) {
        alert("This item is no longer available.");
        return;
    }

    const stockAvailable = parseInt(teaCard.stock);

    // Check if the item already exists in the cart
    const existingItem = Array.from(cartItems.children).find(item =>
        item.querySelector(".item-name").textContent === itemName
    );

    if (existingItem) {
        // Increment the quantity of the existing item
        const quantityInput = existingItem.querySelector(".item-quantity");
        const newQuantity = parseInt(quantityInput.value) + 1;

        if (newQuantity > stockAvailable) {
            alert(`Cannot add more than ${stockAvailable} units of ${itemName} to the cart.`);
        } else {
            quantityInput.value = newQuantity;
            showAlert(`${itemName} quantity updated in the cart.`);
            // Update stock in teaCards
            teaCard.stock = stockAvailable - newQuantity;
            localStorage.setItem('teaCards', JSON.stringify(teaCards));
        }
    } else {
        // Add a new item to the cart
        if (stockAvailable > 0) {
            const itemHTML = `
                <li class="d-flex justify-content-between align-items-center mb-3">
                    <span class="item-name">${itemName}</span> - ₹<span class="item-price">${price}</span>
                    <input type="number" value="1" min="1" max="${stockAvailable}" class="form-control w-25 item-quantity" onchange="updateQuantity('${itemName}', this.value)">
                    <button class="btn btn-danger btn-sm" onclick="deleteItem(this, 'cart')">Delete</button>
                </li>
            `;
            cartItems.insertAdjacentHTML("beforeend", itemHTML);
            showAlert(`${itemName} has been added to the cart.`);

            // Update stock in teaCards
            teaCard.stock = stockAvailable - 1;
            localStorage.setItem('teaCards', JSON.stringify(teaCards));
        } else {
            alert(`Sorry, ${itemName} is out of stock.`);
        }
    }

    calculateCartSubtotal(); // Update subtotal after adding an item
}

function updateQuantity(itemName, newQuantity) {
    const teaCards = JSON.parse(localStorage.getItem("teaCards")) || [];
    const teaCard = teaCards.find(card => card.title === itemName);

    if (!teaCard) return; // Item no longer exists
    const stockAvailable = parseInt(teaCard.stock);

    if (parseInt(newQuantity) > stockAvailable) {
        alert(`Cannot set more than ${stockAvailable} units for ${itemName}.`);
        return;
    }

    // Update stock in teaCards
    teaCard.stock = stockAvailable - parseInt(newQuantity);
    localStorage.setItem('teaCards', JSON.stringify(teaCards));

    calculateCartSubtotal(); // Recalculate subtotal
}





function renderAdminCards() {
    const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
    const container = document.getElementById('admin-tea-cards-container');
    container.innerHTML = '';

    storedCards.forEach((card, index) => {
        const isOutOfStock = card.stock === 0;
        const cardElement = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${card.imageUrl}" class="card-img-top" alt="${card.title}">
                    <div class="card-body">
                        <h5 class="card-title">${card.title}</h5>
                        <p class="card-text">${card.description}</p>
                        <p class="card-text"><strong>Price:</strong> ₹${card.price}</p>
                        <p class="card-text"><strong>Stock:</strong> 
                            <span class="${isOutOfStock ? 'text-danger' : ''}">
                                ${isOutOfStock ? 'Out of Stock' : `${card.stock} units`}
                            </span>
                        </p>
                        <p class="card-text"><small class="text-muted">${card.category}</small></p>
                        <button class="btn btn-primary btn-sm edit-card" data-index="${index}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-card" data-index="${index}">Delete</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardElement;
    });

    document.querySelectorAll('.delete-card').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteCard(index);
        });
    });

    document.querySelectorAll('.edit-card').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            editCard(index);
        });
    });
}





// Add Item to Wishlist with Modal Alert
function addToWishlist(itemName, price) {
    const wishlistItems = document.getElementById("wishlist-items");

    // Check if the item already exists in the wishlist
    const existingItem = Array.from(wishlistItems.children).find(item =>
        item.querySelector(".item-name").textContent === itemName
    );

    if (!existingItem) {
        // Add a new item to the wishlist
        const itemHTML = `
            <li class="d-flex justify-content-between align-items-center mb-3">
                <span class="item-name">${itemName}</span> - ₹<span class="item-price">${price}</span>
                <button class="btn btn-danger btn-sm" onclick="deleteItem(this, 'wishlist')">Delete</button>
            </li>
        `;
        wishlistItems.insertAdjacentHTML("beforeend", itemHTML);
        showAlert(`${itemName} has been added to your wishlist.`);
    } else {
        showAlert(`${itemName} is already in your wishlist.`);
    }
}

// Show custom modal alert with message
function showAlert(message) {
    const alertMessage = document.getElementById("alertModalMessage");
    alertMessage.textContent = message;
    
    const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
    alertModal.show();
}














