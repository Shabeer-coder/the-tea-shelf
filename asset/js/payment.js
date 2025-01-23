// Fetching the cart total from URL params and displaying it
const urlParams = new URLSearchParams(window.location.search);
const cartTotal = parseFloat(urlParams.get('total')) || 0.00;

document.getElementById('cart-total-display').textContent = cartTotal.toFixed(2);
document.getElementById('grand-total-display').textContent = cartTotal.toFixed(2);

function proceedToPayment() {
    // Getting values from the payment form
    const name = document.getElementById('name').value.trim();
    const place = document.getElementById('place').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();


    const namePattern = /^[A-Za-z\s]+$/;
if (!name.match(namePattern)) {
    alert("Please enter a valid name (only letters and spaces).");
    return;
}
    // Phone number validation (simple check for 10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phone.match(phonePattern)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    // Card number validation (check if it's 16 digits)
    const cardPattern = /^[0-9]{16}$/;
    if (!cardNumber.match(cardPattern)) {
        alert("Please enter a valid 16-digit card number.");
        return;
    }

    // CVV validation (check if it's 3 digits)
    const cvvPattern = /^[0-9]{3}$/;
    if (!cvv.match(cvvPattern)) {
        alert("Please enter a valid 3-digit CVV.");
        return;
    }

    // Expiry date validation (check if expiry date is empty or invalid)
    if (!expiryDate) {
        alert("Please enter the expiry date.");
        return;
    }

    const currentDate = new Date();
    const expiryDateObj = new Date(expiryDate);
    if (expiryDateObj <= currentDate) {
        alert("Please enter a valid expiry date.");
        return;
    }

    // Check if name, place, and phone are filled
    if (name && place && phone) {
        // Save order details in localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push({
            name,
            place,
            phone,
            total: cartTotal.toFixed(2),
        });
        localStorage.setItem('orders', JSON.stringify(orders));

        // Hide the payment form and show processing message
        document.getElementById('payment-form').style.display = 'none';
        document.getElementById('payment-processing').style.display = 'block';

        // Simulate payment processing
        setTimeout(() => {
            document.getElementById('payment-processing').style.display = 'none';
            document.getElementById('payment-success').style.display = 'block';
        }, 3000);
    } else {
        alert('Please fill in all fields!');
    }
}

// Assuming this function is called after payment is confirmed
function confirmPayment() {
// Clear the cart from local storage
localStorage.removeItem("cart");

// Optionally, redirect to the main page or show a success message
window.location.href = "index.html"; // Redirect to the main page
}