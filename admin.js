

// function renderAdminCards() {
//     const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
//     const container = document.getElementById('admin-tea-cards-container');
//     container.innerHTML = '';

//     storedCards.forEach((card, index) => {
//         const cardElement = `
//             <div class="col-md-4 mb-4">
//                 <div class="card">
//                     <img src="${card.imageUrl}" class="card-img-top" alt="${card.title}">
//                     <div class="card-body">
//                         <h5 class="card-title">${card.title}</h5>
//                         <p class="card-text">${card.description}</p>
//                         <p class="card-text"><strong>Price:</strong> ₹${card.price}</p>
//                         <p class="card-text"><strong>Stock:</strong> ${card.stock} units</p>
//                         <p class="card-text"><small class="text-muted">${card.category}</small></p>
//                         <button class="btn btn-sm edit-card" data-index="${index}" title="Edit">
//                             <i class="fas fa-edit text-primary"></i>
//                         </button>
//                         <button class="btn btn-sm delete-card" data-index="${index}" title="Delete">
//                             <i class="fas fa-trash-alt text-danger"></i>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         `;
//         container.innerHTML += cardElement;
//     });

//     document.querySelectorAll('.delete-card').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const index = e.target.closest('button').getAttribute('data-index');
//             deleteCard(index);
//         });
//     });

//     document.querySelectorAll('.edit-card').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const index = e.target.closest('button').getAttribute('data-index');
//             editCard(index);
//         });
//     });
// }

// // Delete Card with Confirmation
// function deleteCard(index) {
//     const confirmDelete = confirm('Are you sure you want to delete this card?');
//     if (confirmDelete) {
//         const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
//         storedCards.splice(index, 1);
//         localStorage.setItem('teaCards', JSON.stringify(storedCards));
//         renderAdminCards();
//     }
// }

// // Edit Card with Confirmation
// function editCard(index) {
//     const confirmEdit = confirm('Are you sure you want to edit this card?');
//     if (confirmEdit) {
//         const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
//         const cardToEdit = storedCards[index];

//         document.getElementById('title').value = cardToEdit.title;
//         document.getElementById('description').value = cardToEdit.description;
//         document.getElementById('category').value = cardToEdit.category;
//         document.getElementById('imageUrl').value = cardToEdit.imageUrl;
//         document.getElementById('price').value = cardToEdit.price;
//         document.getElementById('stock').value = cardToEdit.stock;

//         const submitButton = document.getElementById('submit-button');
//         submitButton.textContent = 'Update Card';
//         submitButton.dataset.editIndex = index;

//         const formSection = document.getElementById('form-section');
//         formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
// }

// // Add or Update Card
// document.getElementById('add-card-form').addEventListener('submit', (e) => {
//     e.preventDefault();

//     const title = document.getElementById('title').value;
//     const description = document.getElementById('description').value;
//     const category = document.getElementById('category').value;
//     const imageUrl = document.getElementById('imageUrl').value;
//     const price = document.getElementById('price').value;
//     const stock = document.getElementById('stock').value;

//     const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
//     const submitButton = document.getElementById('submit-button');

//     if (submitButton.dataset.editIndex !== undefined) {
//         const editIndex = submitButton.dataset.editIndex;
//         storedCards[editIndex] = { title, description, category, imageUrl, price, stock };
//         submitButton.textContent = 'Add Card';
//         delete submitButton.dataset.editIndex;
//     } else {
//         const newCard = { title, description, category, imageUrl, price, stock };
//         storedCards.push(newCard);
//     }

//     localStorage.setItem('teaCards', JSON.stringify(storedCards));
//     alert('Card saved successfully!');
//     document.getElementById('add-card-form').reset();
//     renderAdminCards();
// });

// // Render Orders with Font Awesome Icons
// function renderOrders() {
//     const orders = JSON.parse(localStorage.getItem('orders')) || [];
//     const ordersTable = document.getElementById('orders-table');
//     ordersTable.innerHTML = '';

//     orders.forEach((order, index) => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${order.name}</td>
//             <td>${order.place}</td>
//             <td>${order.phone}</td>
//             <td>₹${order.total}</td>
//             <td>
//                 <button class="btn btn-sm delete-order" title="Delete">
//                     <i class="fas fa-trash-alt text-danger" onclick="deleteOrder(${index})"></i>
//                 </button>
//             </td>
//         `;
//         ordersTable.appendChild(row);
//     });
// }

// // Delete Order with Confirmation
// function deleteOrder(index) {
//     const orders = JSON.parse(localStorage.getItem('orders')) || [];
//     const confirmDelete = confirm('Are you sure you want to delete this order?');
//     if (confirmDelete) {
//         orders.splice(index, 1);
//         localStorage.setItem('orders', JSON.stringify(orders));
//         renderOrders();
//     }
// }

// // Initialize
// document.addEventListener('DOMContentLoaded', () => {
//     renderAdminCards();
//     renderOrders();
// });











document.addEventListener('DOMContentLoaded', () => {
    // Check session login status
    const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
    console.log('Login Status (sessionStorage):', isLoggedIn); // Debug log

    // Redirect to login page if not logged in
    if (!isLoggedIn) {
        alert('You must log in to access this page.');
        window.location.href = 'login.html'; // Redirect to login page
        return; // Stop further script execution
    }

    // If logged in, initialize admin page
    console.log('User is logged in. Initializing admin panel...');
    initializeAdminPanel();
});

// Function to initialize admin panel
function initializeAdminPanel() {
    renderAdminCards();
    renderOrders();
}

// Example: Log out function (optional)
document.getElementById('logout-button')?.addEventListener('click', () => {
    sessionStorage.removeItem('loggedIn'); // Clear session login state
    alert('You have been logged out.');
    window.location.href = 'login.html'; // Redirect to login page
});


// Function to initialize admin panel
function initializeAdminPanel() {
    renderAdminCards();
    renderOrders();
}

// Function to render admin cards
function renderAdminCards() {
    const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
    const container = document.getElementById('admin-tea-cards-container');
    container.innerHTML = '';

    storedCards.forEach((card, index) => {
        const cardElement = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${card.imageUrl}" class="card-img-top" alt="${card.title}">
                    <div class="card-body">
                        <h5 class="card-title">${card.title}</h5>
                        <p class="card-text">${card.description}</p>
                        <p class="card-text"><strong>Price:</strong> ₹${card.price}</p>
                        <p class="card-text"><strong>Stock:</strong> ${card.stock} units</p>
                        <p class="card-text"><small class="text-muted">${card.category}</small></p>
                        <button class="btn btn-sm edit-card" data-index="${index}" title="Edit">
                            <i class="fas fa-edit text-primary"></i>
                        </button>
                        <button class="btn btn-sm delete-card" data-index="${index}" title="Delete">
                            <i class="fas fa-trash-alt text-danger"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardElement;
    });

    attachCardEventListeners();
}

// Attach event listeners for card actions
function attachCardEventListeners() {
    document.querySelectorAll('.delete-card').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.closest('button').getAttribute('data-index');
            deleteCard(index);
        });
    });

    document.querySelectorAll('.edit-card').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.closest('button').getAttribute('data-index');
            editCard(index);
        });
    });
}

// Delete a card
function deleteCard(index) {
    const confirmDelete = confirm('Are you sure you want to delete this card?');
    if (confirmDelete) {
        const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
        storedCards.splice(index, 1);
        localStorage.setItem('teaCards', JSON.stringify(storedCards));
        renderAdminCards();
    }
}

// Edit a card
function editCard(index) {
    const confirmEdit = confirm('Are you sure you want to edit this card?');
    if (confirmEdit) {
        const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
        const cardToEdit = storedCards[index];

        document.getElementById('title').value = cardToEdit.title;
        document.getElementById('description').value = cardToEdit.description;
        document.getElementById('category').value = cardToEdit.category;
        document.getElementById('imageUrl').value = cardToEdit.imageUrl;
        document.getElementById('price').value = cardToEdit.price;
        document.getElementById('stock').value = cardToEdit.stock;

        const submitButton = document.getElementById('submit-button');
        submitButton.textContent = 'Update Card';
        submitButton.dataset.editIndex = index;

        const formSection = document.getElementById('form-section');
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add or update a card
document.getElementById('add-card-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;

    const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
    const submitButton = document.getElementById('submit-button');

    if (submitButton.dataset.editIndex !== undefined) {
        const editIndex = submitButton.dataset.editIndex;
        storedCards[editIndex] = { title, description, category, imageUrl, price, stock };
        submitButton.textContent = 'Add Card';
        delete submitButton.dataset.editIndex;
    } else {
        const newCard = { title, description, category, imageUrl, price, stock };
        storedCards.push(newCard);
    }

    localStorage.setItem('teaCards', JSON.stringify(storedCards));
    alert('Card saved successfully!');
    document.getElementById('add-card-form').reset();
    renderAdminCards();
});

// Render orders
function renderOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersTable = document.getElementById('orders-table');
    ordersTable.innerHTML = '';

    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.name}</td>
            <td>${order.place}</td>
            <td>${order.phone}</td>
            <td>₹${order.total}</td>
            <td>
                <button class="btn btn-sm delete-order" title="Delete">
                    <i class="fas fa-trash-alt text-danger" onclick="deleteOrder(${index})"></i>
                </button>
            </td>
        `;
        ordersTable.appendChild(row);
    });
}

// Delete an order
function deleteOrder(index) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const confirmDelete = confirm('Are you sure you want to delete this order?');
    if (confirmDelete) {
        orders.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        renderOrders();
    }
}
