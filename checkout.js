// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Render checkout items
function renderCheckoutItems() {
    const cart = getCart();
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    const emptyCartCheckout = document.getElementById('emptyCartCheckout');
    const checkoutContent = document.getElementById('checkoutContent');
    
    if (cart.length === 0) {
        if (emptyCartCheckout) emptyCartCheckout.style.display = 'block';
        if (checkoutContent) checkoutContent.style.display = 'none';
        return;
    }
    
    if (emptyCartCheckout) emptyCartCheckout.style.display = 'none';
    if (checkoutContent) checkoutContent.style.display = 'grid';
    
    if (checkoutItemsContainer) {
        checkoutItemsContainer.innerHTML = cart.map(item => `
            <div class="checkout-item">
                <div class="checkout-item-image">
                    ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}">` : (item.image || '📦')}
                </div>
                <div class="checkout-item-info">
                    <div class="checkout-item-title">${item.name}</div>
                    <div class="checkout-item-details">
                        Quantity: ${item.quantity} × $${item.price.toFixed(2)}
                    </div>
                </div>
                <div style="font-weight: 600;">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `).join('');
    }
    
    updateCheckoutSummary();
}

// Update checkout summary
function updateCheckoutSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;
    
    const subtotalEl = document.getElementById('checkoutSubtotal');
    const shippingEl = document.getElementById('checkoutShipping');
    const taxEl = document.getElementById('checkoutTax');
    const totalEl = document.getElementById('checkoutTotal');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// Format card number
function formatCardNumber(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
        return parts.join(' ');
    } else {
        return v;
    }
}

// Format expiry date
function formatExpiryDate(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
        return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
}

// Handle checkout form submission
function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Get form data
    const formData = new FormData(e.target);
    const orderData = {
        shipping: Object.fromEntries(formData.entries()),
        paymentMethod: formData.get('paymentMethod'),
        items: cart,
        total: calculateTotal(),
        orderDate: new Date().toISOString(),
        orderId: 'ORD-' + Date.now()
    };
    
    // Save order to localStorage (in a real app, this would go to a server)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.removeItem('cart');
    updateCartCount();
    
    // Show success modal
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Calculate total
function calculateTotal() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.1;
    return subtotal + shipping + tax;
}

// Initialize checkout page
function initCheckoutPage() {
    renderCheckoutItems();
    
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            e.target.value = formatCardNumber(e.target.value);
        });
    }
    
    // Expiry date formatting
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            e.target.value = formatExpiryDate(e.target.value);
        });
    }
    
    // CVV formatting (numbers only)
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Payment method toggle
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const cardPayment = document.getElementById('cardPayment');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            if (e.target.value === 'card' && cardPayment) {
                cardPayment.style.display = 'block';
            } else if (cardPayment) {
                cardPayment.style.display = 'none';
            }
        });
    });
    
    // Form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
    
    // Password confirmation validation
    const signupForm = document.getElementById('signupFormSubmit');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            if (password !== confirmPassword) {
                e.preventDefault();
                alert('Passwords do not match!');
            }
        });
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCheckoutPage);
} else {
    initCheckoutPage();
}


