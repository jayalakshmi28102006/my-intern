// Get product ID from URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Render product detail
function renderProductDetail() {
    const productId = getProductIdFromURL();
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }
    
    // Get product data (assuming products.js is loaded)
    const product = getProductById(productId);
    if (!product) {
        window.location.href = 'products.html';
        return;
    }
    
    const wrapper = document.getElementById('productDetailWrapper');
    const breadcrumb = document.getElementById('productBreadcrumb');
    
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
    }
    
    if (wrapper) {
        const imageContent = product.imageUrl
            ? `<img src="${product.imageUrl}" alt="${product.name}">`
            : product.image;

        wrapper.innerHTML = `
            <div class="product-detail-image">
                ${imageContent}
            </div>
            <div class="product-detail-info">
                <div class="product-category">${product.category}</div>
                <h1>${product.name}</h1>
                <div class="product-detail-price">$${product.price.toFixed(2)}</div>
                <p class="product-detail-description">${product.description}</p>
                
                <div class="product-options">
                    <div class="quantity-selector">
                        <label>Quantity:</label>
                        <button class="quantity-btn" id="decreaseQty">-</button>
                        <input type="number" class="quantity-input" id="productQuantity" value="1" min="1">
                        <button class="quantity-btn" id="increaseQty">+</button>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <button class="btn btn-primary btn-lg" onclick="addToCartFromDetail(${product.id})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button class="btn btn-outline btn-lg">
                            <i class="fas fa-heart"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Quantity controls
        const decreaseBtn = document.getElementById('decreaseQty');
        const increaseBtn = document.getElementById('increaseQty');
        const quantityInput = document.getElementById('productQuantity');
        
        if (decreaseBtn && quantityInput) {
            decreaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(quantityInput.value) || 1;
                if (currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                }
            });
        }
        
        if (increaseBtn && quantityInput) {
            increaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(quantityInput.value) || 1;
                quantityInput.value = currentValue + 1;
            });
        }
    }
    
    // Render related products
    renderRelatedProducts(product.category, product.id);
}

// Render related products
function renderRelatedProducts(category, excludeId) {
    const relatedProducts = getProductsByCategory(category)
        .filter(p => p.id !== excludeId)
        .slice(0, 4);
    
    const container = document.getElementById('relatedProducts');
    if (container) {
        if (relatedProducts.length === 0) {
            container.innerHTML = '<p>No related products found.</p>';
            return;
        }
        
        container.innerHTML = relatedProducts.map(product => `
            <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
                <div class="product-image">
                    ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}">` : product.image}
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
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Add to cart from product detail page
function addToCartFromDetail(productId) {
    const quantityInput = document.getElementById('productQuantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
    
    const product = getProductById(productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            imageUrl: product.imageUrl,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    showNotification(`${quantity} item(s) added to cart!`);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProductDetail);
} else {
    renderProductDetail();
}


