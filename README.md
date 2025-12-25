# ShopEasy - Modern E-Commerce Website

A fully functional, modern e-commerce website built with HTML, CSS, and JavaScript. Features a beautiful UI, shopping cart functionality, user authentication, and secure checkout process.

## Features

### 🛍️ Core E-Commerce Features
- **Product Catalog**: Browse products by category (Electronics, Clothing, Books, Home & Living)
- **Product Details**: Detailed product pages with quantity selection
- **Shopping Cart**: Add, update, and remove items with real-time cart count
- **Checkout Process**: Complete checkout with shipping and payment information
- **Order Management**: View order history in user account

### 👤 User Features
- **User Authentication**: Login and signup system with localStorage
- **User Account**: Profile management, order history, and saved addresses
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 🎨 Design Features
- Modern, clean UI with gradient accents
- Smooth animations and transitions
- Intuitive navigation and user experience
- Beautiful product cards with hover effects
- Mobile-responsive navigation menu

## File Structure

```
restaurant-website/
│
├── index.html              # Homepage
├── products.html           # Product listing page
├── product-detail.html     # Individual product page
├── cart.html              # Shopping cart page
├── checkout.html          # Checkout page
├── login.html             # Login/Signup page
├── account.html           # User account page
├── about.html             # About us page
├── contact.html           # Contact page
│
├── styles/
│   └── main.css           # Main stylesheet
│
└── js/
    ├── main.js            # Main JavaScript (cart count, navigation)
    ├── products.js        # Product data and rendering
    ├── product-detail.js  # Product detail page functionality
    ├── cart.js            # Shopping cart functionality
    ├── checkout.js        # Checkout process
    ├── auth.js            # Authentication system
    └── account.js         # User account management
```

## Getting Started

### Installation

1. **Clone or download** this repository
2. **Open** `index.html` in a web browser
3. **That's it!** No build process or server required

### Usage

1. **Browse Products**: Navigate to the Products page to see all available items
2. **View Details**: Click on any product to see detailed information
3. **Add to Cart**: Click the cart icon or "Add to Cart" button
4. **Review Cart**: Go to the Cart page to review items and quantities
5. **Checkout**: Proceed to checkout and fill in shipping/payment information
6. **Create Account**: Sign up to track orders and manage your account

## Product Categories

- **Electronics**: Headphones, Smart Watches, Tablets, Bluetooth Speakers
- **Clothing**: Backpacks, Running Shoes, T-Shirts
- **Books**: Novel Collections, Cookbooks
- **Home & Living**: Coffee Makers, Desk Lamps, Yoga Mats

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (Vanilla)**: No frameworks, pure JavaScript
- **LocalStorage**: Client-side data persistence
- **Font Awesome**: Icon library

## Browser Support

Works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features Explained

### Shopping Cart
- Items are stored in browser's localStorage
- Cart count updates automatically across all pages
- Persistent cart (survives page refresh)

### User Authentication
- Sign up to create an account
- Login to access account features
- User data stored in localStorage
- Password validation on signup

### Checkout
- Complete shipping information form
- Payment method selection (Card/PayPal)
- Credit card number formatting
- Order confirmation and success modal
- Orders saved to localStorage

### Responsive Design
- Mobile-first approach
- Hamburger menu on mobile devices
- Adaptive grid layouts
- Touch-friendly buttons and inputs

## Customization

### Adding Products
Edit `js/products.js` and add products to the `products` array:

```javascript
{
    id: 13,
    name: 'Product Name',
    category: 'electronics',
    price: 99.99,
    image: '🎯',
    description: 'Product description here',
    featured: true,
    inStock: true
}
```

### Changing Colors
Edit CSS variables in `styles/main.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    /* ... */
}
```

### Modifying Categories
Update category filter buttons in `products.html` and add corresponding products in `products.js`.

## Notes

- This is a **frontend-only** demonstration website
- Data is stored in **localStorage** (client-side only)
- For production use, you would need:
  - Backend server for data persistence
  - Database for products, users, and orders
  - Payment gateway integration (Stripe, PayPal, etc.)
  - Server-side authentication
  - Email services for order confirmations

## License

This project is open source and available for educational purposes.

## Support

For questions or issues, please contact us through the Contact page on the website.

---

**Enjoy shopping with ShopEasy! 🛒✨**

