# 🧸 Dreamland Dolls - E-commerce Website

A stunning, modern e-commerce website for selling handcrafted dolls. Built with HTML5, CSS3, JavaScript, and Three.js for 3D visuals.

## ✨ Features

- 🎨 **Beautiful Design** - Modern, responsive layout with smooth animations
- 🧸 **3D Doll Visualization** - Interactive Three.js 3D doll in the hero section
- 🛒 **Full Shopping Cart** - Add/remove items, quantity management
- 🎯 **Product Filtering** - Filter by category (Classic, Modern, Limited)
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Performance Optimized** - Fast loading, optimized images
- ♿ **Accessibility** - WCAG compliant
- 🔍 **SEO Friendly** - Proper meta tags and semantic HTML

## 🚀 Quick Start

Simply open `index.html` in your browser:

```bash
# Option 1: Open directly
open index.html

# Option 2: Start a local server
npx serve .
# Then visit http://localhost:3000
```

## 📁 Project Structure

```
doll-shop/
├── index.html       # Main HTML file
├── styles.css       # All styles
├── app.js          # JavaScript functionality
├── three.min.js    # Three.js 3D library
└── README.md       # This file
```

## 🎨 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern CSS with variables, animations
- **JavaScript (ES6+)** - All interactive features
- **Three.js** - 3D graphics
- **Google Fonts** - Playfair Display & Poppins

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🛠️ Customization

### Changing Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary: #e8a4b8;      /* Main brand color */
    --secondary: #b8d4e8;    /* Secondary color */
    --accent: #f4d03f;       /* Accent/highlight color */
    --dark: #2c3e50;         /* Text color */
}
```

### Adding Products

Edit the `products` array in `app.js`:

```javascript
const products = [
    {
        id: 1,
        name: "Your Product Name",
        description: "Product description",
        price: 49.99,
        emoji: "🎁",
        category: "classic",
        badge: "New"
    },
    // Add more products...
];
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📄 License

Free to use for personal and commercial projects.

## 🤝 Contributing

Feel free to fork and customize for your own doll shop or any other e-commerce project!

---

Built with ❤️ using OpenClaw 💡
