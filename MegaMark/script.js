let cart = [];

try {
    const savedCart = localStorage.getItem("megamart-cart");
    cart = savedCart ? JSON.parse(savedCart) : [];
} catch (error) {
    console.error("Failed to load cart data:", error);
    cart = [];
}

const cartBtn = document.querySelector(".cart");
const cartMenu = document.querySelector(".cart-menu");
const cartOverlay = document.querySelector(".cart-overlay");
const closeCartBtn = document.querySelector(".close-cart");
const cartItemsContainer = document.querySelector(".cart-items");
const cartCountEl = document.querySelector(".cart-count");
const cartTotalEl = document.querySelector(".cart-total-amount");
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

function saveCart() {
    try {
        localStorage.setItem("megamart-cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Failed to save cart:", error);
    }
}

function addToCart(product) {
    const { id } = product;

    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        cart = cart.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
    } else {
        cart = [...cart, { ...product, qty: 1 }];
    }

    saveCart();
    renderCart();
    openCartMenu();
}

function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    saveCart();
    renderCart();
}

function changeQty(id, delta) {
    cart = cart
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0);

    saveCart();
    renderCart();
}

function renderCart() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="cart-empty">Your cart is empty</p>`;
    } else {
        cartItemsContainer.innerHTML = cart
            .map(({ id, name, price, image, qty }) => `
                <div class="cart-item" data-id="${id}">
                    <img src="${image}" alt="${name}">
                    <div class="cart-item-info">
                        <h5>${name}</h5>
                        <p>₹${price} × ${qty}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="qty-btn minus" data-id="${id}">-</button>
                        <button class="qty-btn plus" data-id="${id}">+</button>
                        <button class="remove-btn" data-id="${id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `)
            .join("");
    }

    const totalCount = cart.reduce((sum, { qty }) => sum + qty, 0);
    const totalPrice = cart.reduce((sum, { price, qty }) => sum + price * qty, 0);

    if (cartCountEl) cartCountEl.textContent = totalCount;
    if (cartTotalEl) cartTotalEl.textContent = `₹${totalPrice.toLocaleString()}`;

    attachCartItemListeners();
}

function attachCartItemListeners() {
    document.querySelectorAll(".remove-btn").forEach((btn) => {
        btn.addEventListener("click", () => removeFromCart(btn.dataset.id));
    });
    document.querySelectorAll(".qty-btn.plus").forEach((btn) => {
        btn.addEventListener("click", () => changeQty(btn.dataset.id, 1));
    });
    document.querySelectorAll(".qty-btn.minus").forEach((btn) => {
        btn.addEventListener("click", () => changeQty(btn.dataset.id, -1));
    });
}

function openCartMenu() {
    cartMenu?.classList.add("open");
    cartOverlay?.classList.add("show");
}

function closeCartMenu() {
    cartMenu?.classList.remove("open");
    cartOverlay?.classList.remove("show");
}

cartBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    cartMenu?.classList.toggle("open");
    cartOverlay?.classList.toggle("show");
});

closeCartBtn?.addEventListener("click", closeCartMenu);
cartOverlay?.addEventListener("click", closeCartMenu);

addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const card = btn.closest(".product-card");
        const { id, name, price, image } = card.dataset;
        addToCart({ id, name, price: Number(price), image });
    });
});

renderCart();

const searchInput = document.querySelector(".search-bar input");
const searchResultsBox = document.createElement("div");
searchResultsBox.classList.add("search-results");
document.querySelector(".search-bar")?.appendChild(searchResultsBox);

function getAllProducts() {
    return [...document.querySelectorAll(".product-card")].map((card) => {
        const { id, name, price, image } = card.dataset;
        return { id, name, price: Number(price), image };
    });
}

let searchTimer = null;

searchInput?.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();

    clearTimeout(searchTimer);

    if (!query) {
        searchResultsBox.classList.remove("show");
        searchResultsBox.innerHTML = "";
        return;
    }

    searchTimer = setTimeout(() => {
        try {
            const products = getAllProducts();

            const matches = products
                .filter(({ name }) => name.toLowerCase().includes(query))
                .sort((a, b) => a.price - b.price);

            renderSearchResults(matches);
        } catch (error) {
            console.error("Error occurred while searching:", error);
            searchResultsBox.innerHTML = `<p class="no-results">An error occurred, please try again</p>`;
            searchResultsBox.classList.add("show");
        }
    }, 400);
});

function renderSearchResults(matches) {
    if (matches.length === 0) {
        searchResultsBox.innerHTML = `<p class="no-results">No matching results found</p>`;
    } else {
        searchResultsBox.innerHTML = matches
            .map(
                ({ name, price, image }) => `
                <div class="search-result-item">
                    <img src="${image}" alt="${name}">
                    <div>
                        <p>${name}</p>
                        <span>₹${price}</span>
                    </div>
                </div>
            `
            )
            .join("");
    }
    searchResultsBox.classList.add("show");
}

document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-bar")) {
        searchResultsBox.classList.remove("show");
    }
});

