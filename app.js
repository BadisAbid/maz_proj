// ===== VARIABLES GLOBALES =====
let cart = [];
let currentPage = 'home';
let slideInterval;

// ===== DONNÉES DES PRODUITS =====
const products = [
    {
        id: 1,
        name: "Expresso",
        category: "boissons-chaudes",
        description: "Un café court et intense, parfait pour un coup de boost.",
        price: 2.50,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        popularity: 9
    },
    {
        id: 2,
        name: "Cappuccino",
        category: "boissons-chaudes",
        description: "Café expresso avec du lait mousseux, saupoudré de cacao.",
        price: 3.80,
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        popularity: 8
    },
    {
        id: 3,
        name: "Thé Vert Matcha",
        category: "boissons-chaudes",
        description: "Thé vert japonais moulu, riche en antioxydants.",
        price: 4.20,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        popularity: 7
    },
    {
        id: 4,
        name: "Chocolat Viennois",
        category: "boissons-chaudes",
        description: "Chocolat chaud généreux surmonté de crème fouettée.",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        popularity: 6
    },
    {
        id: 5,
        name: "Smoothie Fruits Rouges",
        category: "boissons-froides",
        description: "Mélange de fraises, framboises et myrtilles fraîches.",
        price: 5.20,
        image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        popularity: 8
    },
    {
        id: 6,
        name: "Limonade Maison",
        category: "boissons-froides",
        description: "Limonade fraîchement pressée avec des citrons bio.",
        price: 3.90,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        popularity: 7
    },
    {
        id: 7,
        name: "Croissant",
        category: "patisseries",
        description: "Croissant au beurre feuilleté, croustillant à l'extérieur.",
        price: 2.80,
        image: "https://images.unsplash.com/photo-1555507036-ab794f27d2e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        popularity: 9
    },
    {
        id: 8,
        name: "Tarte au Citron",
        category: "patisseries",
        description: "Tartelette au citron meringuée, acidulée et douce.",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        popularity: 8
    },
    {
        id: 9,
        name: "Muffin Chocolat",
        category: "patisseries",
        description: "Muffin moelleux avec des pépites de chocolat noir.",
        price: 3.20,
        image: "https://images.unsplash.com/photo-1576866209830-589e1bfbaa4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        popularity: 7
    },
    {
        id: 10,
        name: "Sandwich Jambon-Beurre",
        category: "sandwiches",
        description: "Jambon de qualité et beurre doux sur baguette fraîche.",
        price: 5.80,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        popularity: 8
    },
    {
        id: 11,
        name: "Panini Poulet Avocat",
        category: "sandwiches",
        description: "Poulet grillé, avocat et fromage fondant dans un panini.",
        price: 7.20,
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        popularity: 9
    },
    {
        id: 12,
        name: "Salade César",
        category: "sandwiches",
        description: "Salade fraîche avec poulet grillé, parmesan et croûtons.",
        price: 8.50,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        popularity: 7
    }
];

// ===== FONCTIONS DE NAVIGATION =====
function showPage(pageId) {
    // Masquer toutes les pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });

    // Afficher la page demandée
    document.getElementById(`${pageId}-page`).classList.remove('hidden');

    // Mettre à jour la navigation active
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById(`nav-${pageId}`).classList.add('active');

    // Arrêter le slideshow si on quitte la page d'accueil
    if (pageId !== 'home' && slideInterval) {
        clearInterval(slideInterval);
    }

    // Redémarrer le slideshow si on revient à la page d'accueil
    if (pageId === 'home') {
        initSlideshow();
    }

    // Initialiser la page si nécessaire
    if (pageId === 'menu') {
        initMenuPage();
    } else if (pageId === 'contact') {
        initContactPage();
    }

    currentPage = pageId;
}

// ===== FONCTIONS POUR LA PAGE D'ACCUEIL =====
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        // Masquer toutes les slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Désactiver tous les dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Afficher la slide demandée
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Gestion des clics sur les dots
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            showSlide(slideIndex);
        });
    });

    // Changement automatique des slides
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }

    // Démarrer le slideshow
    slideInterval = setInterval(nextSlide, 5000);

    // Arrêt du slideshow au survol
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', function () {
            clearInterval(slideInterval);
        });

        slideshowContainer.addEventListener('mouseleave', function () {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
}

// ===== FONCTIONS POUR LA PAGE MENU =====
function initMenuPage() {
    // Afficher les produits
    displayProducts(products);

    // Initialiser les filtres
    initFilters();

    // Initialiser le tri
    initSorting();

    // Initialiser le panier
    initCart();

    // Mettre à jour l'affichage du panier
    updateCartDisplay();
}

function displayProducts(productsToDisplay) {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '';

    if (productsToDisplay.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">Aucun produit trouvé dans cette catégorie.</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-content">
                <span class="product-category">${getCategoryLabel(product.category)}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price.toFixed(2)} €</span>
                    <button class="add-to-cart" data-id="${product.id}">Ajouter au panier</button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });

    // Ajouter les événements pour les boutons "Ajouter au panier"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function getCategoryLabel(category) {
    const labels = {
        'boissons-chaudes': 'Boissons Chaudes',
        'boissons-froides': 'Boissons Froides',
        'patisseries': 'Pâtisseries',
        'sandwiches': 'Sandwiches'
    };
    return labels[category] || category;
}

function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Mettre à jour le bouton actif
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filtrer les produits
            const category = this.getAttribute('data-category');
            let filteredProducts;

            if (category === 'all') {
                filteredProducts = products;
            } else {
                filteredProducts = products.filter(product => product.category === category);
            }

            // Appliquer le tri actuel
            const sortSelect = document.getElementById('sort-select');
            if (sortSelect.value !== 'default') {
                filteredProducts = sortProducts(filteredProducts, sortSelect.value);
            }

            // Afficher les produits filtrés
            displayProducts(filteredProducts);
        });
    });
}

function initSorting() {
    const sortSelect = document.getElementById('sort-select');

    sortSelect.addEventListener('change', function () {
        const sortValue = this.value;
        if (sortValue === 'default') return;

        // Récupérer la catégorie active
        const activeFilter = document.querySelector('.filter-btn.active');
        const category = activeFilter.getAttribute('data-category');

        // Filtrer les produits
        let filteredProducts;
        if (category === 'all') {
            filteredProducts = products;
        } else {
            filteredProducts = products.filter(product => product.category === category);
        }

        // Trier les produits
        const sortedProducts = sortProducts(filteredProducts, sortValue);

        // Afficher les produits triés
        displayProducts(sortedProducts);
    });
}

function sortProducts(productsArray, sortBy) {
    const sortedArray = [...productsArray];

    switch (sortBy) {
        case 'price-asc':
            return sortedArray.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sortedArray.sort((a, b) => b.price - a.price);
        case 'popularity':
            return sortedArray.sort((a, b) => b.popularity - a.popularity);
        default:
            return sortedArray;
    }
}

function initCart() {
    // Charger le panier depuis le localStorage
    const savedCart = localStorage.getItem('cafeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    // Événements pour les boutons du panier
    document.getElementById('checkout-btn').addEventListener('click', checkout);
    document.getElementById('clear-btn').addEventListener('click', clearCart);
}

// ===== FONCTIONS POUR LE PANIER COULISSANT =====
function initCartPanel() {
    const cartIcon = document.querySelector('.cart-icon-container');
    const cartPanel = document.getElementById('cart-panel');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const checkoutBtn = document.getElementById('checkout-button');
    const clearCartBtn = document.getElementById('clear-cart-button');

    // Ouvrir le panier
    if (cartIcon) {
        cartIcon.addEventListener('click', openCartPanel);
    }

    // Fermer le panier
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCartPanel);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartPanel);
    }

    // Commander
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkoutFromPanel);
    }

    // Vider le panier
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCartFromPanel);
    }

    // Mettre à jour le compteur du panier
    updateCartCount();
}

function openCartPanel() {
    const cartPanel = document.getElementById('cart-panel');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartPanel && cartOverlay) {
        cartPanel.classList.add('active');
        cartOverlay.classList.add('active');
        updateCartPanel();
    }
}

function closeCartPanel() {
    const cartPanel = document.getElementById('cart-panel');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartPanel && cartOverlay) {
        cartPanel.classList.remove('active');
        cartOverlay.classList.remove('active');
    }
}

function updateCartPanel() {
    const cartBody = document.getElementById('cart-body');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartCount = document.getElementById('cart-count');

    if (!cartBody) return;

    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="empty-cart-message" id="empty-cart-message">
                <i class="fas fa-shopping-basket"></i>
                <p>Votre panier est vide</p>
            </div>
        `;
        cartTotalAmount.textContent = '0.00 €';
        
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'flex';
            emptyCartMessage.style.flexDirection = 'column';
            emptyCartMessage.style.alignItems = 'center';
            emptyCartMessage.style.justifyContent = 'center';
            emptyCartMessage.style.padding = '3rem 1rem';
        }
        
        if (cartCount) {
            cartCount.classList.add('hidden');
        }
        
        return;
    }

    // Calculer le total
    let total = 0;
    let itemCount = 0;

    // Générer le contenu du panier
    let cartHTML = '<div class="cart-items-list">';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;

        // Trouver l'image du produit
        const product = products.find(p => p.id === item.id);
        const productImage = product ? product.image : 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400';

        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${productImage}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toFixed(2)} €</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity-number">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartHTML += '</div>';
    
    cartBody.innerHTML = cartHTML;
    cartTotalAmount.textContent = `${total.toFixed(2)} €`;

    // Mettre à jour le compteur
    if (cartCount) {
        cartCount.textContent = itemCount;
        cartCount.classList.remove('hidden');
    }

    // Ajouter les événements pour les boutons dans le panier
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(productId, -1);
            updateCartPanel();
            updateCartDisplay();
        });
    });

    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(productId, 1);
            updateCartPanel();
            updateCartDisplay();
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
            updateCartPanel();
            updateCartDisplay();
        });
    });
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }
}

function checkoutFromPanel() {
    closeCartPanel();
    checkout();
}

function clearCartFromPanel() {
    if (cart.length === 0) {
        alert('Le panier est déjà vide.');
        return;
    }

    if (confirm('Voulez-vous vraiment vider votre panier ?')) {
        clearCart();
        updateCartPanel();
        closeCartPanel();
    }
}

// ===== FONCTIONS DU PANIER =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Vérifier si le produit est déjà dans le panier
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    // Sauvegarder dans le localStorage
    localStorage.setItem('cafeCart', JSON.stringify(cart));

    // Mettre à jour les affichages
    updateCartDisplay();
    updateCartCount();

    // Afficher une notification
    showNotification(`${product.name} ajouté au panier`);
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartItemsContainer || !cartTotalElement) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        cartTotalElement.textContent = '0.00 €';
        return;
    }

    // Calculer le total
    let total = 0;

    // Afficher les éléments du panier
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toFixed(2)} €</div>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span class="cart-item-quantity">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
                <button class="remove-item" data-id="${item.id}">Supprimer</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Mettre à jour le total
    cartTotalElement.textContent = `${total.toFixed(2)} €`;

    // Ajouter les événements pour les boutons du panier
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(productId, -1);
        });
    });

    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(productId, 1);
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

function updateCartItemQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += change;

    // Si la quantité devient 0, supprimer l'article
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }

    // Sauvegarder dans le localStorage
    localStorage.setItem('cafeCart', JSON.stringify(cart));

    // Mettre à jour les affichages
    updateCartDisplay();
    updateCartCount();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    // Sauvegarder dans le localStorage
    localStorage.setItem('cafeCart', JSON.stringify(cart));

    // Mettre à jour les affichages
    updateCartDisplay();
    updateCartCount();

    // Afficher une notification
    showNotification('Article supprimé du panier');
}

function clearCart() {
    if (cart.length === 0) return;

    if (confirm('Voulez-vous vraiment vider votre panier ?')) {
        cart = [];
        localStorage.removeItem('cafeCart');
        updateCartDisplay();
        updateCartCount();
        showNotification('Panier vidé');
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Votre panier est vide. Ajoutez des produits avant de commander.');
        return;
    }

    // Calculer le total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Générer une facture
    let invoice = '=== FACTURE ===\n';
    invoice += 'M.A.Z Coffee House\n';
    invoice += '123 Rue du Café, 75000 Sousse\n';
    invoice += `Date: ${new Date().toLocaleDateString('fr-FR')}\n`;
    invoice += '------------------------\n';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        invoice += `${item.name} x${item.quantity}: ${itemTotal.toFixed(2)} €\n`;
    });

    invoice += '------------------------\n';
    invoice += `TOTAL: ${total.toFixed(2)} €\n`;
    invoice += 'Merci pour votre commande !\n';
    invoice += '=== FIN DE FACTURE ===';

    // Afficher la facture
    alert(invoice);

    // Vider le panier après la commande
    cart = [];
    localStorage.removeItem('cafeCart');
    updateCartDisplay();
    updateCartCount();
    updateCartPanel();

    // Afficher une confirmation
    showNotification('Commande passée avec succès !');
}

// ===== FONCTIONS POUR LA PAGE CONTACT =====
function initContactPage() {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Réinitialiser les messages d'erreur
        document.querySelectorAll('.error-message').forEach(msg => {
            msg.style.display = 'none';
        });

        // Valider le formulaire
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        // Validation du nom
        if (name === '') {
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }

        // Validation du message
        if (message === '') {
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        }

        // Si le formulaire est valide
        if (isValid) {
            // Simuler l'envoi du formulaire
            setTimeout(() => {
                // Afficher le message de succès
                document.getElementById('success-message').style.display = 'block';

                // Réinitialiser le formulaire
                contactForm.reset();

                // Masquer le message de succès après 5 secondes
                setTimeout(() => {
                    document.getElementById('success-message').style.display = 'none';
                }, 5000);
            }, 1000);
        }
    });
}

// ===== FONCTIONS UTILITAIRES =====
function showNotification(message) {
    // Créer une notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #D4A76A;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Supprimer la notification après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);

    // Ajouter les animations CSS si elles n'existent pas déjà
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INITIALISATION AU CHARGEMENT =====
document.addEventListener('DOMContentLoaded', function () {
    // Menu mobile
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Fermer le menu mobile quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Navigation entre les pages
    document.getElementById('nav-home').addEventListener('click', function (e) {
        e.preventDefault();
        showPage('home');
    });

    document.getElementById('nav-menu').addEventListener('click', function (e) {
        e.preventDefault();
        showPage('menu');
    });

    document.getElementById('nav-contact').addEventListener('click', function (e) {
        e.preventDefault();
        showPage('contact');
    });

    // Bouton CTA sur la page d'accueil
    document.getElementById('cta-button').addEventListener('click', function () {
        showPage('menu');
    });

    // Initialiser le slideshow
    initSlideshow();

    // Initialiser le panier coulissant
    initCartPanel();

    // Charger le panier depuis le localStorage
    const savedCart = localStorage.getItem('cafeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }

    // Effet sur le bouton CTA
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 10px 20px rgba(139, 69, 19, 0.3)';
        });

        ctaButton.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 10px 20px rgba(139, 69, 19, 0.2)';
        });
    }
});