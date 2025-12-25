// Product Data
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        category: 'electronics',
        price: 99.99,
        image: '🎧',
        imageUrl: 'https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
        featured: true,
        inStock: true
    },
    {
        id: 2,
        name: 'Smart Watch',
        category: 'electronics',
        price: 249.99,
        image: '⌚',
        imageUrl: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and smartphone connectivity. Stay connected on the go.',
        featured: true,
        inStock: true
    },
    {
        id: 3,
        name: 'Laptop Backpack',
        category: 'clothing',
        price: 49.99,
        image: '🎒',
        imageUrl: 'https://images.pexels.com/photos/374574/pexels-photo-374574.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        description: 'Durable and stylish laptop backpack with multiple compartments. Perfect for work, travel, or school.',
        featured: true,
        inStock: true
    },
    {
        id: 4,
        name: 'Classic Novel Collection',
        category: 'books',
        price: 29.99,
        image: '📚',
        imageUrl: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        description: 'Collection of 5 classic novels in beautiful hardcover editions. A must-have for any book lover.',
        featured: true,
        inStock: true
    },
    {
        id: 5,
        name: 'Coffee Maker',
        category: 'home',
        price: 79.99,
        image: '☕',
        imageUrl: 'https://images.pexels.com/photos/4052386/pexels-photo-4052386.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        description: 'Programmable coffee maker with thermal carafe. Start your day with the perfect cup of coffee.',
        featured: false,
        inStock: true
    },
    {
        id: 6,
        name: 'Running Shoes',
        category: 'clothing',
        price: 89.99,
        image: '👟',
        imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        description: 'Comfortable running shoes with excellent support and cushioning. Perfect for daily workouts.',
        featured: false,
        inStock: true
    },
    {
        id: 7,
        name: 'Tablet',
        category: 'electronics',
        price: 299.99,
        image: '📱',
        imageUrl: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        description: '10-inch tablet with high-resolution display and powerful processor. Great for work and entertainment.',
        featured: false,
        inStock: true
    },
    {
        id: 8,
        name: 'Desk Lamp',
        category: 'home',
        price: 39.99,
        image: '💡',
        imageUrl: 'https://images.pexels.com/photos/209758/pexels-photo-209758.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        description: 'Adjustable LED desk lamp with multiple brightness levels. Perfect for your workspace.',
        featured: false,
        inStock: true
    },
    {
        id: 9,
        name: 'Cookbook Set',
        category: 'books',
        price: 59.99,
        image: '📖',
        imageUrl: 'https://images.pexels.com/photos/3184170/pexels-photo-3184170.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        description: 'Collection of 3 professional cookbooks with 500+ recipes. Elevate your cooking skills.',
        featured: false,
        inStock: true
    },
    {
        id: 10,
        name: 'Bluetooth Speaker',
        category: 'electronics',
        price: 69.99,
        image: '🔊',
        imageUrl: 'https://images.pexels.com/photos/1010492/pexels-photo-1010492.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design. Take the party anywhere.',
        featured: false,
        inStock: true
    },
    {
        id: 11,
        name: 'Yoga Mat',
        category: 'home',
        price: 24.99,
        image: '🧘',
        imageUrl: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        description: 'Premium yoga mat with non-slip surface and extra cushioning. Perfect for yoga and exercise.',
        featured: false,
        inStock: true
    },
    {
        id: 12,
        name: 'Designer T-Shirt',
        category: 'clothing',
        price: 34.99,
        image: '👕',
        imageUrl: 'https://images.pexels.com/photos/1002644/pexels-photo-1002644.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        description: 'Premium cotton t-shirt with modern design. Comfortable and stylish for everyday wear.',
        featured: false,
        inStock: true
    }
];

// Get all products
function getAllProducts() {
    return products;
}

// Get featured products
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Get products by category
function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

// Render product card
function renderProductCard(product) {
    const imageContent = product.imageUrl
        ? `<img src="${product.imageUrl}" alt="${product.name}">`
        : product.image;

    return `
        <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
            <div class="product-image">
                ${imageContent}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="btn-icon" onclick="event.stopPropagation(); addToCart(${product.id})" title="Add to Cart">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                        <button class="btn-icon" onclick="event.stopPropagation();" title="Add to Wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render products grid
function renderProductsGrid(productsArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (productsArray.length === 0) {
        container.innerHTML = '<p class="text-center">No products found.</p>';
        return;
    }
    
    container.innerHTML = productsArray.map(product => renderProductCard(product)).join('');
}

// Initialize products page
function initProductsPage() {
    // Load all products
    const allProducts = getAllProducts();
    renderProductsGrid(allProducts, 'productsGrid');
    
    // Category filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            const filteredProducts = getProductsByCategory(category);
            renderProductsGrid(filteredProducts, 'productsGrid');
        });
    });
    
    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortValue = e.target.value;
            let sortedProducts = [...allProducts];
            
            switch(sortValue) {
                case 'price-low':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                default:
                    // Default order
                    break;
            }
            
            renderProductsGrid(sortedProducts, 'productsGrid');
        });
    }
}

// Initialize featured products on homepage
function initFeaturedProducts() {
    const featuredProducts = getFeaturedProducts();
    renderProductsGrid(featuredProducts, 'featuredProducts');
}

// Add to cart function
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            imageUrl: product.imageUrl,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    showNotification('Product added to cart!');
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('featuredProducts')) {
            initFeaturedProducts();
        }
        if (document.getElementById('productsGrid')) {
            initProductsPage();
        }
    });
} else {
    if (document.getElementById('featuredProducts')) {
        initFeaturedProducts();
    }
    if (document.getElementById('productsGrid')) {
        initProductsPage();
    }
}


