// Doll Shop JavaScript

// Product Data
const products = [
    {
        id: 1,
        name: "Emma Classic",
        description: "Traditional cloth doll with hand-stitched features",
        price: 49.99,
        emoji: "🎎",
        category: "classic",
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "Luna Modern",
        description: "Contemporary design with bright colors",
        price: 59.99,
        emoji: "🧸",
        category: "modern",
        badge: "New"
    },
    {
        id: 3,
        name: "Princess Royal",
        description: "Royal gown with golden crown included",
        price: 89.99,
        emoji: "👸",
        category: "limited",
        badge: "Limited"
    },
    {
        id: 4,
        name: "Baby Bear",
        description: "Adorable bear costume with removable parts",
        price: 39.99,
        emoji: "🧸",
        category: "classic",
        badge: null
    },
    {
        id: 5,
        name: "Ocean Explorer",
        description: "Diving suit with realistic accessories",
        price: 69.99,
        emoji: "🤿",
        category: "modern",
        badge: "Popular"
    },
    {
        id: 6,
        name: "Starlight Dreamer",
        description: "Glow-in-the-dark celestial theme",
        price: 79.99,
        emoji: "⭐",
        category: "limited",
        badge: "Exclusive"
    }
];

// Cart
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initProducts();
    initCart();
    initContactForm();
    initFilters();
    initThreeJS();
});

// Render Products
function initProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}" onclick="showProductDetails(${product.id})">
            <div class="product-image">
                ${product.emoji}
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Product Details Modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 8rem; margin-bottom: 20px;">${product.emoji}</div>
            <h2 style="font-size: 2rem; margin-bottom: 10px;">${product.name}</h2>
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <p style="color: #888; margin: 20px 0;">${product.description}</p>
            <h3 style="color: var(--primary); font-size: 2rem; margin-bottom: 20px;">$${product.price.toFixed(2)}</h3>
            <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModal();">
                Add to Cart 🛒
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Cart Functions
function initCart() {
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('cartClose').addEventListener('click', toggleCart);
    document.getElementById('cartOverlay').addEventListener('click', toggleCart);
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCart();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #888; padding: 40px;">Your cart is empty 🛒</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                    <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                        <button onclick="updateQuantity(${item.id}, -1)" style="padding: 5px 10px; border: 1px solid #ddd; background: white; border-radius: 5px; cursor: pointer;">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" style="padding: 5px 10px; border: 1px solid #ddd; background: white; border-radius: 5px; cursor: pointer;">+</button>
                        <button onclick="removeFromCart(${item.id})" style="margin-left: auto; padding: 5px 10px; border: none; background: #ff6b6b; color: white; border-radius: 5px; cursor: pointer;">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// Filter Functions
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const products = document.querySelectorAll('.product-card');
            
            products.forEach(product => {
                if (filter === 'all' || product.dataset.category === filter) {
                    product.style.display = 'block';
                    product.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
}

// Contact Form
function initContactForm() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Message sent! We\'ll get back to you soon 💕');
        this.reset();
    });
}

// Three.js 3D Doll
function initThreeJS() {
    const container = document.getElementById('hero3D');
    if (!container || typeof THREE === 'undefined') return;
    
    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create a simple doll shape (using geometric primitives)
    const dollGroup = new THREE.Group();
    
    // Head
    const headGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffd4c4,
        shininess: 30
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 3;
    dollGroup.add(head);
    
    // Body
    const bodyGeometry = new THREE.CapsuleGeometry(0.8, 1.5, 8, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xe8a4b8,
        shininess: 30
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    dollGroup.add(body);
    
    // Arms
    const armGeometry = new THREE.CapsuleGeometry(0.25, 1.2, 8, 16);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xffd4c4 });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-1.2, 1.5, 0);
    leftArm.rotation.z = 0.3;
    dollGroup.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(1.2, 1.5, 0);
    rightArm.rotation.z = -0.3;
    dollGroup.add(rightArm);
    
    // Legs
    const legGeometry = new THREE.CapsuleGeometry(0.3, 1.5, 8, 16);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0xffd4c4 });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.5, -1.2, 0);
    dollGroup.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.5, -1.2, 0);
    dollGroup.add(rightLeg);
    
    // Hair (simple sphere)
    const hairGeometry = new THREE.SphereGeometry(1.3, 32, 32);
    const hairMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.y = 3.2;
    dollGroup.add(hair);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x4a4a4a });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.4, 3.1, 1.2);
    dollGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.4, 3.1, 1.2);
    dollGroup.add(rightEye);
    
    // Smile (small torus)
    const smileGeometry = new THREE.TorusGeometry(0.2, 0.05, 8, 16, Math.PI);
    const smileMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b6b });
    const smile = new THREE.Mesh(smileGeometry, smileMaterial);
    smile.position.set(0, 2.5, 1.3);
    smile.rotation.z = Math.PI;
    dollGroup.add(smile);
    
    // Dress/Outfit (cone)
    const dressGeometry = new THREE.ConeGeometry(1.5, 2, 32);
    const dressMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4 });
    const dress = new THREE.Mesh(dressGeometry, dressMaterial);
    dress.position.y = 0.2;
    dollGroup.add(dress);
    
    scene.add(dollGroup);
    
    camera.position.z = 8;
    camera.position.y = 1;
    
    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        
        time += 0.01;
        
        // Gentle floating animation
        dollGroup.position.y = Math.sin(time) * 0.3;
        dollGroup.rotation.y = Math.sin(time * 0.5) * 0.2;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .feature-card, .testimonial').forEach(el => {
    observer.observe(el);
});
