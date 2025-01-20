
// Function to render admin cards
function renderAdminCards() {
    const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
    const container = document.getElementById('admin-tea-cards-container');
    container.innerHTML = ''; // Clear existing cards

    storedCards.forEach((card, index) => {
        const cardElement = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${card.imageUrl}" class="card-img-top" alt="${card.title}">
                    <div class="card-body">
                        <h5 class="card-title">${card.title}</h5>
                        <p class="card-text">${card.description}</p>
                        <p class="card-text"><strong>Price:</strong> ₹${card.price}</p>
                        <p class="card-text"><small class="text-muted">${card.category}</small></p>
                        <button class="btn btn-primary btn-sm edit-card" data-index="${index}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-card" data-index="${index}">Delete</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardElement;
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-card').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteCard(index);
        });
    });

    // Add event listeners for edit buttons
    document.querySelectorAll('.edit-card').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            editCard(index);
        });
    });
}

// Function to delete a card
function deleteCard(index) {
    const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
    storedCards.splice(index, 1); // Remove card at the given index
    localStorage.setItem('teaCards', JSON.stringify(storedCards)); // Update local storage
    renderAdminCards(); // Re-render cards
}

// Function to edit a card
function editCard(index) {
    const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
    const cardToEdit = storedCards[index];

    // Populate form fields with existing card data
    document.getElementById('title').value = cardToEdit.title;
    document.getElementById('description').value = cardToEdit.description;
    document.getElementById('category').value = cardToEdit.category;
    document.getElementById('imageUrl').value = cardToEdit.imageUrl;
    document.getElementById('price').value = cardToEdit.price;

    // Scroll to the form section
    const formSection = document.getElementById('form-section');
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Optional: Focus on the first input field (e.g., title)
    document.getElementById('title').focus();

    // Update the submit button to save changes
    const submitButton = document.getElementById('submit-button');
    submitButton.textContent = 'Update Card';
    submitButton.dataset.editIndex = index;
}

// Form submission to add or update a card
document.getElementById('add-card-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const price = document.getElementById('price').value;

    const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
    const submitButton = document.getElementById('submit-button');

    if (submitButton.dataset.editIndex !== undefined) {
        // Update existing card
        const editIndex = submitButton.dataset.editIndex;
        storedCards[editIndex] = { title, description, category, imageUrl, price };
        submitButton.textContent = 'Add Card';
        delete submitButton.dataset.editIndex; // Remove edit index
    } else {
        // Add new card
        const newCard = { title, description, category, imageUrl, price };
        storedCards.push(newCard);
    }

    // Save back to local storage
    localStorage.setItem('teaCards', JSON.stringify(storedCards));

    alert('Card saved successfully!');
    document.getElementById('add-card-form').reset();
    renderAdminCards();
});

// Load cards on page load
document.addEventListener('DOMContentLoaded', () => {
    renderAdminCards(); // Load existing cards on page load
});








