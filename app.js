// Luxe Companions - Premium Doll Shop JavaScript

// Doll Data
const dolls = [
    {
        id: 1,
        name: "Aria",
        description: "Elegant proportions with realistic skin texture. Perfect balance of beauty and realism.",
        price: 2499,
        emoji: "💃",
        height: "165cm",
        weight: "45kg",
        material: "Premium Silicone",
        category: "premium",
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "Bella",
        description: "Curvaceous figure with ultra-realistic features. Our most popular model.",
        price: 2799,
        emoji: "👸",
        height: "170cm",
        weight: "52kg",
        material: "Platinum Silicone",
        category: "premium",
        badge: "Most Popular"
    },
    {
        id: 3,
        name: "Chloe",
        description: "Athletic build with stunning facial features. Natural look and feel.",
        price: 2199,
        emoji: "💫",
        height: "168cm",
        weight: "48kg",
        material: "Medical Silicone",
        category: "classic",
        badge: "New"
    },
    {
        id: 4,
        name: "Diana",
        description: "Petite frame with incredible detail. Perfect for those seeking discretion.",
        price: 1999,
        emoji: "🌟",
        height: "155cm",
        weight: "38kg",
        material: "Premium Silicone",
        category: "classic",
        badge: null
    },
    {
        id: 5,
        name: "Eva",
        description: "Limited edition with custom features. Each piece is unique.",
        price: 3999,
        emoji: "👑",
        height: "172cm",
        weight: "50kg",
        material: "Platinum Silicone",
        category: "limited",
        badge: "Limited"
    },
    {
        id: 6,
        name: "Faith",
        description: "Full-figured beauty with premium craftsmanship. Exceptional quality.",
        price: 2999,
        emoji: "✨",
        height: "165cm",
        weight: "55kg",
        material: "Premium Silicone",
        category: "premium",
        badge: "Premium"
    }
];

// Cart
let cart = [];

// Customization State
let customization = {
    body: 'athletic',
    skin: '#fce4d6',
    eyes: '#4a90d9',
    hair: 'long',
    hairColor: '#2c1810'
};

// Price Calculator
const prices = {
    body: { athletic: 0, curvy: 300, petite: -200, plus: 400 },
    hair: { long: 0, medium: 0, short: 0, bald: -100 }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initDolls();
    initCart();
    initContactForm();
    initTabs();
    initFAQ();
    initAgeModal();
    initThreeJS();
    initCustomizer();
});

// Render Dolls
function initDolls() {
    const grid = document.getElementById('dollsGrid');
    if (!grid) return;
    
    grid.innerHTML = dolls.map(doll => `
        <div class="doll-card" data-category="${doll.category}" onclick="showDollDetails(${doll.id})">
            <div class="doll-image">
                ${doll.emoji}
                ${doll.badge ? `<span class="doll-badge">${doll.badge}</span>` : ''}
            </div>
            <div class="doll-info">
                <h3>${doll.name}</h3>
                <p class="doll-description">${doll.description}</p>
                <div class="doll-specs">
                    <span class="spec">📏 ${doll.height}</span>
                    <span class="spec">⚖️ ${doll.weight}</span>
                    <span class="spec">💎 ${doll.material}</span>
                </div>
                <div class="doll-footer">
                    <span class="doll-price">$${doll.price.toLocaleString()}</span>
                    <button class="view-details" onclick="event.stopPropagation(); addToCart(${doll.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Doll Details Modal
function showDollDetails(dollId) {
    const doll = dolls.find(d => d.id === dollId);
    if (!doll) return;
    
    // Create modal dynamically
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="background: var(--secondary); max-width: 800px;">
            <button class="modal-close" onclick="closeModal(this)">&times;</button>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 20px;">
                <div style="text-align: center; font-size: 10rem;">${doll.emoji}</div>
                <div>
                    <h2 style="font-size: 2.5rem; margin-bottom: 10px;">${doll.name}</h2>
                    ${doll.badge ? `<span style="background: var(--accent); color: var(--dark); padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${doll.badge}</span>` : ''}
                    <p style="color: var(--text-light); margin: 20px 0;">${doll.description}</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 25px 0;">
                        <div style="background: var(--darker); padding: 15px; border-radius: 10px;">
                            <strong style="color: var(--primary);">Height</strong>
                            <p>${doll.height}</p>
                        </div>
                        <div style="background: var(--darker); padding: 15px; border-radius: 10px;">
                            <strong style="color: var(--primary);">Weight</strong>
                            <p>${doll.weight}</p>
                        </div>
                        <div style="background: var(--darker); padding: 15px; border-radius: 10px;">
                            <strong style="color: var(--primary);">Material</strong>
                            <p>${doll.material}</p>
                        </div>
                        <div style="background: var(--darker); padding: 15px; border-radius: 10px;">
                            <strong style="color: var(--primary);">Category</strong>
                            <p>${doll.category}</p>
                        </div>
                    </div>
                    <h3 style="font-size: 2rem; color: var(--primary); margin-bottom: 20px;">$${doll.price.toLocaleString()}</h3>
                    <button class="btn btn-primary" onclick="addToCart(${doll.id}); closeModal(this);" style="width: 100%;">Add to Cart 🛒</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal(modal.querySelector('.modal-close'));
    });
}

function closeModal(btn) {
    const modal = btn.closest('.modal');
    if (modal) {
        modal.remove();
    }
}

// Cart Functions
function initCart() {
    const cartBtn = document.getElementById('cartBtn');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCart);
    }
    if (cartClose) {
        cartClose.addEventListener('click', toggleCart);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', toggleCart);
    }
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
}

function addToCart(dollId) {
    const doll = dolls.find(d => d.id === dollId);
    if (!doll) return;
    
    const existingItem = cart.find(item => item.id === dollId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...doll, quantity: 1});
    }
    
    updateCart();
    showToast(`${doll.name} added to cart!`);
}

function removeFromCart(dollId) {
    cart = cart.filter(item => item.id !== dollId);
    updateCart();
}

function updateQuantity(dollId, change) {
    const item = cart.find(item => item.id === dollId);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(dollId);
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
    
    if (cartCount) cartCount.textContent = totalItems;
    if (cartTotal) cartTotal.textContent = `$${totalPrice.toLocaleString()}`;
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 40px;">Your cart is empty 🛒</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toLocaleString()}</p>
                    <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                        <button onclick="updateQuantity(${item.id}, -1)" style="padding: 5px 12px; border: 1px solid var(--primary); background: transparent; color: var(--primary); border-radius: 5px; cursor: pointer;">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" style="padding: 5px 12px; border: 1px solid var(--primary); background: transparent; color: var(--primary); border-radius: 5px; cursor: pointer;">+</button>
                        <button onclick="removeFromCart(${item.id})" style="margin-left: auto; padding: 5px 10px; border: none; background: #ff6b6b; color: white; border-radius: 5px; cursor: pointer;">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Message sent! We\'ll respond within 24 hours.');
            this.reset();
        });
    }
}

// Tab Filtering
function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const dolls = document.querySelectorAll('.doll-card');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.tab;
            
            dolls.forEach(doll => {
                if (filter === 'all' || doll.dataset.category === filter) {
                    doll.style.display = 'block';
                    doll.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    doll.style.display = 'none';
                }
            });
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    
    questions.forEach(q => {
        q.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            item.classList.toggle('active');
            
            // Close others
            questions.forEach(other => {
                if (other !== this) {
                    other.closest('.faq-item').classList.remove('active');
                }
            });
        });
    });
}

// Age Verification Modal
function initAgeModal() {
    const modal = document.getElementById('ageModal');
    const confirm = document.getElementById('confirmAge');
    const reject = document.getElementById('rejectAge');
    
    if (modal) {
        // Check if already verified
        if (localStorage.getItem('ageVerified') === 'true') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
        
        if (confirm) {
            confirm.addEventListener('click', function() {
                localStorage.setItem('ageVerified', 'true');
                modal.style.display = 'none';
            });
        }
        
        if (reject) {
            reject.addEventListener('click', function() {
                window.location.href = 'https://google.com';
            });
        }
    }
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3500);
    }
}

// Three.js 3D Interactive Doll
function initThreeJS() {
    const container = document.getElementById('hero3D');
    const interactiveContainer = document.getElementById('interactive3D');
    
    if (container && typeof THREE !== 'undefined') {
        createInteractiveDoll(container, false);
    }
    
    if (interactiveContainer && typeof THREE !== 'undefined') {
        createInteractiveDoll(interactiveContainer, true);
    }
    
    if (interactiveContainer && typeof THREE !== 'undefined') {
        createCustomizerDoll();
    }
}

function createInteractiveDoll(container, isInteractive) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth || 500, container.clientHeight || 500);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xc9a86c, 0.5);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);
    
    // Create elegant body
    const dollGroup = new THREE.Group();
    
    // Torso
    const torsoGeometry = new THREE.CapsuleGeometry(0.9, 2, 16, 32);
    const torsoMaterial = new THREE.MeshPhongMaterial({
        color: 0xf5e6d3,
        shininess: 30,
        specular: 0x444444
    });
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.position.y = 0;
    dollGroup.add(torso);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({
        color: 0xf5e6d3,
        shininess: 30,
        specular: 0x444444
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2;
    dollGroup.add(head);
    
    // Hair
    const hairGeometry = new THREE.SphereGeometry(0.75, 32, 32);
    const hairMaterial = new THREE.MeshPhongMaterial({ color: 0x2c1810 });
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.y = 2.1;
    hair.scale.set(1, 1.2, 1);
    dollGroup.add(hair);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x4a90d9 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, 2.1, 0.6);
    dollGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, 2.1, 0.6);
    dollGroup.add(rightEye);
    
    // Arms
    const armGeometry = new THREE.CapsuleGeometry(0.15, 1.5, 8, 16);
    
    const leftArm = new THREE.Mesh(armGeometry, torsoMaterial);
    leftArm.position.set(-1, 0.5, 0);
    leftArm.rotation.z = 0.15;
    dollGroup.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, torsoMaterial);
    rightArm.position.set(1, 0.5, 0);
    rightArm.rotation.z = -0.15;
    dollGroup.add(rightArm);
    
    // Legs
    const legGeometry = new THREE.CapsuleGeometry(0.2, 2, 8, 16);
    
    const leftLeg = new THREE.Mesh(legGeometry, torsoMaterial);
    leftLeg.position.set(-0.35, -2.2, 0);
    dollGroup.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, torsoMaterial);
    rightLeg.position.set(0.35, -2.2, 0);
    dollGroup.add(rightLeg);
    
    scene.add(dollGroup);
    
    camera.position.z = 6;
    camera.position.y = 0.5;
    
    // Animation
    let time = 0;
    let autoRotate = true;
    let rotationY = 0;
    
    if (isInteractive) {
        // Interactive controls
        const rotateLeft = document.getElementById('rotateLeft');
        const rotateRight = document.getElementById('rotateRight');
        const resetView = document.getElementById('resetView');
        const autoRotateCheckbox = document.getElementById('autoRotate');
        const wireframeCheckbox = document.getElementById('showWireframe');
        
        if (rotateLeft) {
            rotateLeft.addEventListener('click', () => {
                rotationY -= 0.5;
            });
        }
        
        if (rotateRight) {
            rotateRight.addEventListener('click', () => {
                rotationY += 0.5;
            });
        }
        
        if (resetView) {
            resetView.addEventListener('click', () => {
                rotationY = 0;
                camera.position.z = 6;
            });
        }
        
        if (autoRotateCheckbox) {
            autoRotateCheckbox.addEventListener('change', (e) => {
                autoRotate = e.target.checked;
            });
        }
        
        if (wireframeCheckbox) {
            wireframeCheckbox.addEventListener('change', (e) => {
                const material = torso.material;
                material.wireframe = e.target.checked;
            });
        }
    }
    
    function animate() {
        requestAnimationFrame(animate);
        
        time += 0.01;
        
        if (autoRotate) {
            rotationY += 0.008;
        }
        
        dollGroup.rotation.y = rotationY + Math.sin(time) * 0.1;
        
        // Gentle floating
        dollGroup.position.y = Math.sin(time * 0.5) * 0.1;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Mouse interaction
    if (isInteractive && container) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
            
            dollGroup.rotation.x = y * 0.2;
            dollGroup.rotation.x += (x * 0.05 - dollGroup.rotation.x) * 0.1;
        });
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (container) {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
    });
}

function createCustomizerDoll() {
    const container = document.getElementById('customizer3D');
    if (!container || typeof THREE === 'undefined') return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth || 500, container.clientHeight || 500);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create doll parts that can be customized
    const dollGroup = new THREE.Group();
    
    // Body
    const bodyGeometry = new THREE.CapsuleGeometry(0.9, 2, 16, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0xf5e6d3,
        shininess: 30,
        specular: 0x444444
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0;
    dollGroup.add(body);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({
        color: 0xf5e6d3,
        shininess: 30,
        specular: 0x444444
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2;
    dollGroup.add(head);
    
    scene.add(dollGroup);
    
    camera.position.z = 5;
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        dollGroup.rotation.y += 0.005;
        dollGroup.position.y = Math.sin(time) * 0.05;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Store references for customization
    window.customizerDoll = {
        bodyMaterial,
        headMaterial,
        dollGroup
    };
}

// Customizer Functions
function initCustomizer() {
    const optionBtns = document.querySelectorAll('.option-btn');
    const colorBtns = document.querySelectorAll('.color-btn');
    const addToCartBtn = document.getElementById('addToCartCustom');
    
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const option = this.dataset.option;
            const value = this.dataset.value;
            
            // Update active state
            this.parentElement.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update customization state
            customization[option] = value;
            
            // Update 3D model
            updateCustomizer3D();
            
            // Update price
            updatePrice();
        });
    });
    
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const option = this.dataset.option;
            const value = this.dataset.value;
            
            this.parentElement.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            customization[option] = value;
            updateCustomizer3D();
            updatePrice();
        });
    });
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const basePrice = 2499;
            const totalPrice = calculatePrice();
            
            const customDoll = {
                id: Date.now(),
                name: `Custom ${customization.body.charAt(0).toUpperCase() + customization.body.slice(1)} Doll`,
                description: `Customized: ${customization.hair} hair, ${customization.eyes} eyes, ${customization.skin} skin`,
                price: totalPrice,
                emoji: '💃',
                category: 'custom',
                badge: 'Custom',
                customization: {...customization}
            };
            
            cart.push({...customDoll, quantity: 1});
            updateCart();
            showToast('Custom doll added to cart!');
        });
    }
}

function updateCustomizer3D() {
    if (!window.customizerDoll) return;
    
    const { bodyMaterial, headMaterial } = window.customizerDoll;
    
    // Update colors
    bodyMaterial.color.set(customization.skin);
    headMaterial.color.set(customization.skin);
}

function calculatePrice() {
    let price = 2499;
    price += prices.body[customization.body] || 0;
    price += prices.hair[customization.hair] || 0;
    return price;
}

function updatePrice() {
    const priceDisplay = document.getElementById('estimatedPrice');
    if (priceDisplay) {
        priceDisplay.textContent = `$${calculatePrice().toLocaleString()}`;
    }
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
