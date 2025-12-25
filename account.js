// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Check login status and show/hide content
function checkLoginStatus() {
    const loginRequired = document.getElementById('loginRequired');
    const accountContent = document.getElementById('accountContent');
    
    if (!isLoggedIn()) {
        if (loginRequired) loginRequired.style.display = 'block';
        if (accountContent) accountContent.style.display = 'none';
        return false;
    } else {
        if (loginRequired) loginRequired.style.display = 'none';
        if (accountContent) accountContent.style.display = 'grid';
        return true;
    }
}

// Load profile data
function loadProfile() {
    const user = getCurrentUser();
    if (!user) return;
    
    const nameInput = document.getElementById('profileName');
    const emailInput = document.getElementById('profileEmail');
    
    if (nameInput) nameInput.value = user.name || '';
    if (emailInput) emailInput.value = user.email || '';
}

// Save profile
function saveProfile(e) {
    e.preventDefault();
    
    const user = getCurrentUser();
    if (!user) return;
    
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    const phone = document.getElementById('profilePhone').value;
    
    // Update current user
    user.name = name;
    user.email = email;
    user.phone = phone;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].phone = phone;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    alert('Profile updated successfully!');
}

// Load orders
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const user = getCurrentUser();
    
    // Filter orders by current user (in a real app, orders would be linked to user ID)
    const userOrders = orders.filter(order => {
        // For demo purposes, we'll show all orders
        // In production, filter by user.id
        return true;
    });
    
    const ordersList = document.getElementById('ordersList');
    if (!ordersList) return;
    
    if (userOrders.length === 0) {
        ordersList.innerHTML = '<p>No orders yet. <a href="products.html">Start shopping!</a></p>';
        return;
    }
    
    ordersList.innerHTML = userOrders.map(order => {
        const orderDate = new Date(order.orderDate).toLocaleDateString();
        return `
            <div class="order-item">
                <div class="order-info">
                    <h3>Order #${order.orderId}</h3>
                    <p>Date: ${orderDate} | Items: ${order.items.length} | Total: $${order.total.toFixed(2)}</p>
                </div>
                <span class="order-status completed">Completed</span>
            </div>
        `;
    }).join('');
}

// Load addresses
function loadAddresses() {
    const user = getCurrentUser();
    if (!user) return;
    
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    const userAddresses = addresses.filter(addr => addr.userId === user.id);
    
    const addressesList = document.getElementById('addressesList');
    if (!addressesList) return;
    
    if (userAddresses.length === 0) {
        addressesList.innerHTML = '<p>No saved addresses.</p>';
        return;
    }
    
    addressesList.innerHTML = userAddresses.map(address => `
        <div class="address-card">
            <h3>${address.label || 'Home'}</h3>
            <p>${address.houseNo ? address.houseNo + ', ' : ''}${address.street || ''}</p>
            <p>${address.city || ''}${address.country ? ', ' + address.country : ''}</p>
            ${address.phone ? `<p>${address.phone}</p>` : ''}
        </div>
    `).join('');
}

// Save new address
function saveNewAddress() {
    const user = getCurrentUser();
    if (!user) return;

    const houseNoInput = document.getElementById('addressHouseNo');
    const streetInput = document.getElementById('addressStreet');
    const cityInput = document.getElementById('addressCity');
    const countryInput = document.getElementById('addressCountry');
    const phoneInput = document.getElementById('addressPhone');

    if (!houseNoInput || !streetInput || !cityInput || !countryInput || !phoneInput) return;

    const houseNo = houseNoInput.value.trim();
    const street = streetInput.value.trim();
    const city = cityInput.value.trim();
    const country = countryInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!houseNo || !street || !city || !country || !phone) {
        alert('Please fill in all address fields.');
        return;
    }

    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];

    const newAddress = {
        id: Date.now(),
        userId: user.id,
        label: 'Home',
        houseNo,
        street,
        city,
        country,
        phone
    };

    addresses.push(newAddress);
    localStorage.setItem('addresses', JSON.stringify(addresses));

    // Clear form
    houseNoInput.value = '';
    streetInput.value = '';
    cityInput.value = '';
    countryInput.value = '';
    phoneInput.value = '';

    // Hide form and reload list
    const formWrapper = document.getElementById('addressFormWrapper');
    if (formWrapper) formWrapper.style.display = 'none';
    loadAddresses();
}

// Account menu navigation
function initAccountMenu() {
    const menuItems = document.querySelectorAll('.account-menu-item:not(#logoutBtn)');
    const sections = document.querySelectorAll('.account-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            
            // Update active menu item
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
            
            // Show/hide sections
            sections.forEach(sec => {
                if (sec.id === section + 'Section') {
                    sec.classList.add('active');
                } else {
                    sec.classList.remove('active');
                }
            });
        });
    });
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            }
        });
    }
}

// Initialize account page
function initAccountPage() {
    if (!checkLoginStatus()) {
        return;
    }
    
    loadProfile();
    loadOrders();
    loadAddresses();
    initAccountMenu();
    
    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', saveProfile);
    }
    
    // Settings form
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmNewPassword').value;
            
            if (newPassword && newPassword === confirmPassword) {
                // Update password (in production, verify current password first)
                const user = getCurrentUser();
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(u => u.id === user.id);
                if (userIndex !== -1) {
                    users[userIndex].password = newPassword;
                    localStorage.setItem('users', JSON.stringify(users));
                    alert('Password updated successfully!');
                    settingsForm.reset();
                }
            } else {
                alert('Passwords do not match!');
            }
        });
    }

    // Add address handlers
    const addAddressBtn = document.getElementById('addAddressBtn');
    const saveAddressBtn = document.getElementById('saveAddressBtn');
    const cancelAddressBtn = document.getElementById('cancelAddressBtn');
    const addressFormWrapper = document.getElementById('addressFormWrapper');

    if (addAddressBtn && addressFormWrapper) {
        addAddressBtn.addEventListener('click', () => {
            addressFormWrapper.style.display = 'block';
        });
    }

    if (cancelAddressBtn && addressFormWrapper) {
        cancelAddressBtn.addEventListener('click', () => {
            addressFormWrapper.style.display = 'none';
        });
    }

    if (saveAddressBtn) {
        saveAddressBtn.addEventListener('click', saveNewAddress);
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccountPage);
} else {
    initAccountPage();
}


