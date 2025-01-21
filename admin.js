


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

function deleteCard(index) {
    const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
    storedCards.splice(index, 1);
    localStorage.setItem('teaCards', JSON.stringify(storedCards));
    renderAdminCards();
}

function editCard(index) {
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

document.addEventListener('DOMContentLoaded', () => {
    renderAdminCards();
});

const orders = JSON.parse(localStorage.getItem('orders')) || [];
const ordersTable = document.getElementById('orders-table');

function renderOrders() {
    ordersTable.innerHTML = '';
    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.name}</td>
            <td>${order.place}</td>
            <td>${order.phone}</td>
            <td>₹${order.total}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteOrder(${index})">Delete</button></td>
        `;
        ordersTable.appendChild(row);
    });
}

function deleteOrder(index) {
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrders();
}

// Initial rendering
renderOrders();