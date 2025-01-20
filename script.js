document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
    const map = L.map('map').setView([40.7128, -74.0060], 13); // Coordinates for New York City
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.marker([40.7128, -74.0060]).addTo(map)
        .bindPopup('The Tea Shelf, 42 Street, New York City.')
        .openPopup();

    // Fetch cards on page load
    fetchCards();
});

// Fetch and render cards based on the selected category
function fetchCards(category = 'all') {
    const storedCards = JSON.parse(localStorage.getItem('teaCards')) || [];
    const container = document.getElementById('tea-cards-container');
    container.innerHTML = ''; // Clear existing cards

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
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardElement;
    });
}

// Add the missing filterByCategory function
function filterByCategory() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    fetchCards(categoryFilter); // Call fetchCards with the selected category
}
