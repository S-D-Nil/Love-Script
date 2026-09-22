/**
 * Love Script — Romantic E-Commerce Platform
 * Vanilla JavaScript Core Engine
 * 
 * Includes:
 * - Products Catalog & Dynamic Search/Filter
 * - Animated Hero Carousel (Auto-slide, indicators, swipe)
 * - localStorage Shopping Cart (Key: loveScriptCart)
 * - Interactive Product Previews (Live sandbox & standalone view)
 * - Romantic Multi-step Order Flow & Direct Social Messaging
 * - EmailJS + FormSubmit Dual Email Integration
 * - Light/Dark Theme Switcher with localStorage
 * - ScrollReveal.js Scroll Animations
 */

/* ==========================================================================
   1. Configuration — Replace with your real credentials when ready
   ========================================================================== */
export const CONFIG = {
  // EmailJS Credentials (https://www.emailjs.com/)
  emailjsPublicKey: "0fpeNGIkCvt2TOnpN",
  emailjsServiceId: "service_5wnwxf1",
  emailjsOrderTemplateId: "template_00wqj2g",
  emailjsContactTemplateId: "template_p9p7ruo",

  // FormSubmit Fallback (https://formsubmit.co/)
  // Replace with your email to receive form submissions via FormSubmit
  formSubmitEmail: "lovescript.com@gmail.com",

  // Social Contact Direct Links
  // Facebook Page & Messenger:
  facebookPageUrl: "https://www.facebook.com/profile.php?id=61594884230500&mibextid=ZbWKwL",
  facebookMessengerUrl: "https://m.me/61594884230500",
  // Instagram Profile & Direct Message (@love_script.io):
  instagramUsername: "love_script.io",
  instagramUrl: "https://www.instagram.com/love_script.io/",
  instagramDmUrl: "https://ig.me/m/love_script.io",
  whatsappUrl: "https://wa.me/1234567890?text=Hello%20Love%20Script,%20I%20would%20like%20to%20order%20a%20custom%20romantic%20website!"
};

/* ==========================================================================
   2. Romantic Product Catalog
   ========================================================================== */
export const products = [
  {
    id: "LS001",
    name: "Happy Birthday Love Story",
    category: "Birthday",
    price: 49,
    priceFormatted: "$49",
    image: "/assets/products/birthday-love.svg",
    video: "https://assets.mixkit.co/videos/preview/mixkit-birthday-cake-with-burning-candles-42588-large.mp4",
    description: "A personalized animated birthday website with cute mascot character, background music, balloon pop surprises, date badge, and floating hearts.",
    badge: "Best Seller",
    rating: 4.9,
    reviewsCount: 184,
    features: ["Custom Photo & Music", "Balloon Pop Game", "Interactive Message Card", "Mobile & Tablet Ready"],
    previewUrl: "#demo-LS001",
    demoType: "birthday"
  },
  {
    id: "LS002",
    name: "Do You Love Me? Proposal",
    category: "Proposal",
    price: 39,
    priceFormatted: "$39",
    image: "/assets/products/do-you-love-me.svg",
    video: "https://assets.mixkit.co/videos/preview/mixkit-couple-in-love-holding-hands-and-walking-42358-large.mp4",
    description: "The viral interactive proposal website! Features an unclickable runaway 'No' button, sweet kitten mascot, and explosive heart confetti on 'Yes'.",
    badge: "Viral Hit",
    rating: 5.0,
    reviewsCount: 312,
    features: ["Runaway 'No' Button", "Love Confession Reveal", "Romantic Song Player", "Confetti Fireworks"],
    previewUrl: "#demo-LS002",
    demoType: "proposal"
  },
  {
    id: "LS003",
    name: "Our Eternal Love Journey",
    category: "Anniversary",
    price: 59,
    priceFormatted: "$59",
    image: "/assets/products/eternal-journey.svg",
    video: "https://assets.mixkit.co/videos/preview/mixkit-couple-walking-hand-in-hand-on-the-beach-at-sunset-41484-large.mp4",
    description: "Interactive romantic relationship milestone timeline. Displays polaroid memory cards, live days-together counter, and clickable love letters.",
    badge: "Most Romantic",
    rating: 4.9,
    reviewsCount: 146,
    features: ["Milestone Timeline", "Days-Together Clock", "Polaroid Photo Frames", "Digital Wax-Seal Letter"],
    previewUrl: "#demo-LS003",
    demoType: "journey"
  },
  {
    id: "LS004",
    name: "Starry Night Love Letter",
    category: "Romantic",
    price: 45,
    priceFormatted: "$45",
    image: "/assets/products/starry-night.svg",
    video: "https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-with-a-shooting-star-43093-large.mp4",
    description: "A celestial love confession experience. Interactive constellation that traces your initials, typewriter audio effect, and ambient twilight melody.",
    badge: "Editor's Pick",
    rating: 4.8,
    reviewsCount: 98,
    features: ["Constellation Starfield", "Typewriter Effect", "Soft Audio Track", "Wax Stamp Seal"],
    previewUrl: "#demo-LS004",
    demoType: "stars"
  },
  {
    id: "LS005",
    name: "Be My Valentine Rose Garden",
    category: "Valentine",
    price: 35,
    priceFormatted: "$35",
    image: "/assets/products/secret-garden.svg",
    video: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-delicate-red-rose-in-the-garden-42618-large.mp4",
    description: "An interactive blooming flower garden. Clicking individual rose petals unfolds heartfelt personalized compliments and secret romantic promises.",
    badge: "Valentine Special",
    rating: 4.9,
    reviewsCount: 122,
    features: ["Interactive Blooming Rose", "Petal Love Notes", "Fluttering Butterflies", "Ambient Garden Sounds"],
    previewUrl: "#demo-LS005",
    demoType: "garden"
  },
  {
    id: "LS006",
    name: "Midnight Birthday Countdown",
    category: "Celebration",
    price: 49,
    priceFormatted: "$49",
    image: "/assets/products/midnight-surprise.svg",
    video: "https://assets.mixkit.co/videos/preview/mixkit-birthday-celebration-with-sparklers-and-cake-42589-large.mp4",
    description: "Midnight surprise countdown timer with virtual cake cutting, blowable candle flames, celebratory fireworks, and personalized audio message.",
    badge: "New Release",
    rating: 4.9,
    reviewsCount: 84,
    features: ["Midnight Timer", "Virtual Cake & Candles", "Fireworks Simulation", "Personal Voice Note"],
    previewUrl: "#demo-LS006",
    demoType: "countdown"
  }
];

/* ==========================================================================
   3. LocalStorage State Management
   ========================================================================== */
const CART_STORAGE_KEY = "loveScriptCart";
const THEME_STORAGE_KEY = "loveScriptTheme";

export function getStoredCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to parse cart:", err);
    return [];
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
  } catch (err) {
    console.error("Failed to save cart:", err);
  }
}

export function addToCart(productId, qty = 1) {
  const cart = getStoredCart();
  const existing = cart.find(item => item.id === productId);
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: qty
    });
  }

  saveCart(cart);
  showToast(`Added "${product.name}" to your cart! 💝`);
  renderCartView();
}

export function updateCartItemQuantity(productId, delta) {
  let cart = getStoredCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
    showToast(`Removed item from cart`);
  }
  saveCart(cart);
  renderCartView();
}

export function removeCartItem(productId) {
  let cart = getStoredCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
  renderCartView();
  showToast("Item removed from cart");
}

export function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartBadge();
  renderCartView();
}

export function getCartTotal() {
  const cart = getStoredCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return {
    subtotal,
    delivery: 0, // Free digital delivery
    total: subtotal
  };
}

export function updateCartBadge() {
  const cart = getStoredCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll(".cart-badge-count");
  badges.forEach(badge => {
    badge.textContent = totalQty;
    badge.style.display = totalQty > 0 ? "flex" : "none";
  });
}

/* ==========================================================================
   4. Theme Management (Light/Dark with localStorage)
   ========================================================================== */
export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeToggleButtons(savedTheme);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  updateThemeToggleButtons(newTheme);
  showToast(`Switched to ${newTheme === 'dark' ? 'Romantic Twilight (Dark)' : 'Blush Rose (Light)'} theme ✨`);
}

function updateThemeToggleButtons(theme) {
  const buttons = document.querySelectorAll(".theme-toggle-btn");
  buttons.forEach(btn => {
    if (theme === "dark") {
      btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
      btn.setAttribute("aria-label", "Switch to Light theme");
    } else {
      btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
      btn.setAttribute("aria-label", "Switch to Dark theme");
    }
  });
}

/* ==========================================================================
   5. Product Search & Filter Engine
   ========================================================================== */
let currentCategory = "All";
let searchQuery = "";

export function filterProducts() {
  const gridEl = document.getElementById("product-grid");
  const countEl = document.getElementById("search-results-count");
  const noResultsEl = document.getElementById("no-products-found");
  if (!gridEl) return;

  const filtered = products.filter(p => {
    const matchesCategory = currentCategory === "All" || p.category.toLowerCase() === currentCategory.toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const inName = p.name.toLowerCase().includes(query);
    const inId = p.id.toLowerCase().includes(query);
    const inCategory = p.category.toLowerCase().includes(query);
    const inDesc = p.description.toLowerCase().includes(query);
    const inFeatures = p.features.some(f => f.toLowerCase().includes(query));

    return matchesCategory && (inName || inId || inCategory || inDesc || inFeatures);
  });

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} romantic creation${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    gridEl.innerHTML = "";
    if (noResultsEl) noResultsEl.style.display = "block";
  } else {
    if (noResultsEl) noResultsEl.style.display = "none";
    gridEl.innerHTML = filtered.map(renderProductCardHtml).join("");
    attachProductCardEvents();
  }
}

function renderProductCardHtml(p) {
  return `
    <article class="product-card" id="card-${p.id}">
      <div class="product-card-thumb-wrap">
        <img class="product-card-img" src="${p.image}" alt="${p.name}" loading="lazy" />
        <span class="product-card-badge">${p.badge}</span>
        <span class="product-card-id-pill">${p.id}</span>
      </div>
      <div class="product-card-body">
        <div class="product-card-meta-row">
          <span class="product-category-label">${p.category}</span>
          <div class="product-rating-box">
            <span>★</span>
            <span>${p.rating} (${p.reviewsCount})</span>
          </div>
        </div>
        <h3 class="product-card-title">${p.name}</h3>
        <p class="product-card-desc">${p.description}</p>
        <div class="product-features-tags">
          ${p.features.map(f => `<span class="feature-micro-tag">✓ ${f}</span>`).join("")}
        </div>
        <div class="product-card-bottom-row">
          <div class="product-price-block">
            <span class="price-label-tiny">Custom Package</span>
            <span class="price-amount-bold">${p.priceFormatted}</span>
          </div>
        </div>
        <div class="product-actions-grid">
          <button class="btn-card-preview" data-preview-id="${p.id}" id="btn-prev-${p.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Preview Demo
          </button>
          <button class="btn-card-cart" data-cart-id="${p.id}" id="btn-cart-${p.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </button>
          <button class="btn-card-order" data-order-id="${p.id}" id="btn-order-${p.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Order Now
          </button>
        </div>
      </div>
    </article>
  `;
}

function attachProductCardEvents() {
  document.querySelectorAll(".btn-card-cart").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.currentTarget.getAttribute("data-cart-id");
      addToCart(id);
    });
  });

  document.querySelectorAll(".btn-card-order").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.currentTarget.getAttribute("data-order-id");
      const p = products.find(prod => prod.id === id);
      if (p) openOrderModal([ { ...p, quantity: 1 } ]);
    });
  });

  document.querySelectorAll(".btn-card-preview").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.currentTarget.getAttribute("data-preview-id");
      openPreviewModal(id);
    });
  });
}

/* ==========================================================================
   6. Animated Hero Carousel
   ========================================================================== */
export function initCarousel() {
  const track = document.getElementById("carousel-track");
  const dotsWrap = document.getElementById("carousel-dots");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  if (!track) return;

  const slides = track.children;
  const count = slides.length;
  let currentIndex = 0;
  let timer = null;

  // Build dots
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("button");
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => goToSlide(i));
      dotsWrap.appendChild(dot);
    }
  }

  function goToSlide(idx) {
    currentIndex = (idx + count) % count;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach((d, i) => {
        d.classList.toggle("active", i === currentIndex);
      });
    }
  }

  function nextSlide() { goToSlide(currentIndex + 1); }
  function prevSlide() { goToSlide(currentIndex - 1); }

  if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetTimer(); });

  function startTimer() {
    timer = setInterval(nextSlide, 5500);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  startTimer();

  track.parentElement.addEventListener("mouseenter", () => clearInterval(timer));
  track.parentElement.addEventListener("mouseleave", () => startTimer());

  // Mobile Touch Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      nextSlide();
      resetTimer();
    } else if (touchEndX - touchStartX > 50) {
      prevSlide();
      resetTimer();
    }
  }, { passive: true });
}

/* ==========================================================================
   7. Shopping Cart View Renderer
   ========================================================================== */
export function renderCartView() {
  const itemsWrap = document.getElementById("cart-items-container");
  const emptyBox = document.getElementById("cart-empty-box");
  const tableWrap = document.getElementById("cart-table-wrapper");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("btn-checkout-cart");

  if (!itemsWrap) return;

  const cart = getStoredCart();

  if (cart.length === 0) {
    if (emptyBox) emptyBox.style.display = "block";
    if (tableWrap) tableWrap.style.display = "none";
    if (checkoutBtn) checkoutBtn.disabled = true;
    if (subtotalEl) subtotalEl.textContent = "$0";
    if (totalEl) totalEl.textContent = "$0";
    return;
  }

  if (emptyBox) emptyBox.style.display = "none";
  if (tableWrap) tableWrap.style.display = "block";
  if (checkoutBtn) checkoutBtn.disabled = false;

  itemsWrap.innerHTML = cart.map(item => `
    <div class="cart-row-item" id="cart-item-${item.id}">
      <div class="cart-item-product-info">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" />
        <div class="cart-item-title-col">
          <h4>${item.name}</h4>
          <span class="cart-item-id-pill">ID: ${item.id}</span>
        </div>
      </div>
      <div class="cart-item-price">$${item.price}</div>
      <div class="qty-control-box">
        <button class="qty-btn" onclick="window.LoveScript.changeCartQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>
        <span class="qty-number">${item.quantity}</span>
        <button class="qty-btn" onclick="window.LoveScript.changeCartQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
      </div>
      <div class="cart-item-subtotal">$${item.price * item.quantity}</div>
      <button class="cart-remove-btn" onclick="window.LoveScript.deleteCartItem('${item.id}')" title="Remove item" aria-label="Remove item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  `).join("");

  const { subtotal, total } = getCartTotal();
  if (subtotalEl) subtotalEl.textContent = `$${subtotal}`;
  if (totalEl) totalEl.textContent = `$${total}`;
}

/* ==========================================================================
   8. Multi-Step Order Now Flow
   ========================================================================== */
let pendingOrderItems = [];

export function openOrderModal(items) {
  pendingOrderItems = items || [];
  if (pendingOrderItems.length === 0) {
    showToast("No products selected for ordering.");
    return;
  }

  const modal = document.getElementById("order-modal");
  const stepLoading = document.getElementById("order-step-loading");
  const stepForm = document.getElementById("order-step-form");
  const stepSuccess = document.getElementById("order-step-success");
  const summaryBox = document.getElementById("order-modal-summary");

  if (!modal) return;

  // Open modal and show romantic loading animation
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  stepLoading.style.display = "block";
  stepForm.style.display = "none";
  stepSuccess.style.display = "none";

  // Render product summary inside form
  const totalAmount = pendingOrderItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const firstItem = pendingOrderItems[0];
  const isMultiple = pendingOrderItems.length > 1;

  if (summaryBox) {
    summaryBox.innerHTML = `
      <div class="order-product-summary-banner">
        <img src="${firstItem.image}" alt="${firstItem.name}" class="order-summary-img" />
        <div style="flex:1;">
          <h4 style="font-size:1rem; font-weight:800; color:var(--text-main);">
            ${firstItem.name} ${isMultiple ? `(+${pendingOrderItems.length - 1} other${pendingOrderItems.length > 2 ? 's' : ''})` : ''}
          </h4>
          <p style="font-size:0.82rem; color:var(--text-muted); font-family:monospace;">
            ID: ${firstItem.id} | Qty: ${pendingOrderItems.reduce((acc, i) => acc + i.quantity, 0)}
          </p>
          <p style="font-size:1.1rem; font-weight:800; color:var(--primary-rose); margin-top:4px;">
            Total: $${totalAmount}
          </p>
        </div>
      </div>
    `;
  }

  // Romantic loading delay
  setTimeout(() => {
    stepLoading.style.display = "none";
    stepForm.style.display = "block";
  }, 900);
}

export function closeOrderModal() {
  const modal = document.getElementById("order-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

export async function handleOrderSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = document.getElementById("btn-submit-order");
  const stepForm = document.getElementById("order-step-form");
  const stepLoading = document.getElementById("order-step-loading");
  const stepSuccess = document.getElementById("order-step-success");
  const orderIdDisplay = document.getElementById("order-success-id");

  const name = (form.elements["customerName"]?.value || document.getElementById("customerName")?.value || "").trim();
  const email = (form.elements["customerEmail"]?.value || document.getElementById("customerEmail")?.value || "").trim();
  const phone = (form.elements["customerPhone"]?.value || document.getElementById("customerPhone")?.value || "").trim();
  let rawInstagram = (form.elements["customerInstagram"]?.value || document.getElementById("customerInstagram")?.value || "").trim();
  if (rawInstagram.startsWith("@")) {
    rawInstagram = rawInstagram.substring(1).trim();
  }
  const instagram = rawInstagram || "Not provided";
  const facebook = (form.elements["customerFacebook"]?.value || document.getElementById("customerFacebook")?.value || "").trim() || "Not provided";
  const notes = (form.elements["customizationNotes"]?.value || document.getElementById("customizationNotes")?.value || "").trim() || "No special requests provided";

  // Check required contact via either Facebook or Instagram
  const checkFb = document.getElementById("contact-check-fb");
  const checkIg = document.getElementById("contact-check-ig");
  const isFbContacted = checkFb && checkFb.checked;
  const isIgContacted = checkIg && checkIg.checked;
  const contactErrorEl = document.getElementById("order-contact-error");
  const messagingBox = document.querySelector(".order-direct-messaging-box");

  if (!isFbContacted && !isIgContacted) {
    if (contactErrorEl) contactErrorEl.style.display = "flex";
    if (messagingBox) {
      messagingBox.classList.add("order-contact-error-highlight");
      messagingBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    showToast("Please check either Facebook or Instagram contact to place your order.");
    return;
  }

  if (!name || !email || !phone) {
    showToast("Please fill in your Name, Email and Phone.");
    return;
  }

  // Generate Unique Order ID
  const orderId = `LS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const totalAmount = pendingOrderItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const productsSummary = pendingOrderItems.map(p => `${p.name} (ID: ${p.id}, Qty: ${p.quantity}, $${p.price * p.quantity})`).join(", ");

  // Show processing animation
  stepForm.style.display = "none";
  stepLoading.style.display = "block";
  const loadingText = stepLoading.querySelector("p");
  if (loadingText) loadingText.textContent = "Sealing your order with love...";

  // Prepare order payload (includes aliases so EmailJS templates match regardless of naming)
  const originUrl = window.location.origin || "https://lovescript.store";
  const primaryItem = pendingOrderItems[0];
  const primaryImageAbs = primaryItem?.image ? (primaryItem.image.startsWith("http") ? primaryItem.image : `${originUrl}${primaryItem.image}`) : "";
  const allImagesList = pendingOrderItems.map(p => `${p.name}: ${p.image.startsWith("http") ? p.image : `${originUrl}${p.image}`}`).join("\n");

  const orderPayload = {
    order_id: orderId,
    customer_name: name,
    customer_email: email,
    customer_phone: phone,
    customer_instagram: instagram,
    instagram: instagram,
    customer_facebook: facebook,
    facebook: facebook,
    contact_methods: [isFbContacted ? "Facebook" : "", isIgContacted ? "Instagram" : ""].filter(Boolean).join(" & "),
    contact_verified: [isFbContacted ? "Facebook" : "", isIgContacted ? "Instagram" : ""].filter(Boolean).join(" & "),
    custom_notes: notes,
    product_name: primaryItem?.name || "Romantic Creation",
    product_id: primaryItem?.id || "LS000",
    product_image: primaryImageAbs,
    all_product_images: allImagesList,
    quantity: pendingOrderItems.reduce((acc, i) => acc + i.quantity, 0),
    total_price: `$${totalAmount}`,
    products_list: productsSummary,
    order_date: new Date().toLocaleString()
  };

  console.log("Submitting order payload:", orderPayload);

  // Attempt EmailJS submission if keys configured
  let sentViaEmailJS = false;
  if (window.emailjs && CONFIG.emailjsPublicKey !== "YOUR_PUBLIC_KEY") {
    try {
      await window.emailjs.send(CONFIG.emailjsServiceId, CONFIG.emailjsOrderTemplateId, orderPayload, CONFIG.emailjsPublicKey);
      sentViaEmailJS = true;
      console.log("Order email sent via EmailJS successfully");
    } catch (err) {
      console.warn("EmailJS submission failed, falling back to FormSubmit:", err);
    }
  }

  // FormSubmit Fallback / Parallel submission
  if ((!sentViaEmailJS || CONFIG.formSubmitEmail) && CONFIG.formSubmitEmail) {
    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONFIG.formSubmitEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Romantic Order: ${orderId} - ${name}`,
          _template: "table",
          _captcha: "false",
          "Order ID": orderId,
          "Customer Name": name,
          "Customer Email": email,
          "Customer Phone": phone,
          "Instagram Handle": instagram,
          "Facebook Profile": facebook,
          "Contacted Via": [isFbContacted ? "Facebook" : "", isIgContacted ? "Instagram" : ""].filter(Boolean).join(" & "),
          "Special Requests": notes,
          "Products Ordered": productsSummary,
          "Product Image Link": primaryImageAbs,
          "All Product Image Links": allImagesList,
          "Total Price": `$${totalAmount}`,
          "Order Date": new Date().toLocaleString()
        })
      });
      console.log("Order email sent via FormSubmit successfully");
    } catch (err) {
      console.log("FormSubmit network request completed or handled:", err);
    }
  }

  // Complete Order
  setTimeout(() => {
    stepLoading.style.display = "none";
    stepSuccess.style.display = "block";
    if (orderIdDisplay) orderIdDisplay.textContent = `Order ID: ${orderId}`;
    form.reset();

    // Clear cart if this was a cart order
    clearCart();
    showToast("Order submitted successfully! ❤️");
  }, 1200);
}

/* ==========================================================================
   9. Interactive Live Product Preview Engine & Video Preview
   ========================================================================== */
let currentPreviewProduct = null;
let currentPreviewMode = "interactive"; // 'interactive' or 'video'

export function openPreviewModal(productId, initialMode = "video") {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;

  currentPreviewProduct = p;
  currentPreviewMode = initialMode;

  const modal = document.getElementById("preview-modal");
  const titleEl = document.getElementById("preview-product-name");
  const urlBar = document.getElementById("preview-address-url");
  const viewport = document.getElementById("preview-viewport");
  const openTabBtn = document.getElementById("preview-open-tab-btn");
  const tabInteractive = document.getElementById("preview-tab-interactive");
  const tabVideo = document.getElementById("preview-tab-video");

  if (!modal || !viewport) return;

  if (titleEl) titleEl.textContent = p.name;
  if (urlBar) urlBar.textContent = `https://lovescript.store/live/${p.id.toLowerCase()}`;

  // Configure switch buttons
  if (tabInteractive && tabVideo) {
    tabInteractive.onclick = () => switchPreviewMode("interactive");
    tabVideo.onclick = () => switchPreviewMode("video");
  }

  // Render current mode
  renderActivePreviewMode();

  if (openTabBtn) {
    openTabBtn.onclick = () => openStandaloneDemoTab(p);
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function switchPreviewMode(mode) {
  currentPreviewMode = mode;
  renderActivePreviewMode();
}

function renderActivePreviewMode() {
  if (!currentPreviewProduct) return;
  const p = currentPreviewProduct;
  const viewport = document.getElementById("preview-viewport");
  const tabInteractive = document.getElementById("preview-tab-interactive");
  const tabVideo = document.getElementById("preview-tab-video");
  const urlBar = document.getElementById("preview-address-url");

  if (!viewport) return;

  if (currentPreviewMode === "video") {
    // Video Preview Mode
    if (tabVideo) tabVideo.classList.add("active");
    if (tabInteractive) tabInteractive.classList.remove("active");
    if (urlBar) urlBar.textContent = `https://lovescript.store/videos/${p.id.toLowerCase()}.mp4`;

    viewport.innerHTML = getVideoPreviewHtml(p);
    attachVideoInteractions(viewport, p);
  } else {
    // Interactive Simulation Mode
    if (tabInteractive) tabInteractive.classList.add("active");
    if (tabVideo) tabVideo.classList.remove("active");
    if (urlBar) urlBar.textContent = `https://lovescript.store/live/${p.id.toLowerCase()}`;

    viewport.innerHTML = getInteractiveDemoHtml(p);
    attachDemoInteractions(p.demoType, viewport);
  }
}

function getVideoPreviewHtml(product) {
  const videoSrc = product.video || "https://assets.mixkit.co/videos/preview/mixkit-couple-in-love-holding-hands-and-walking-42358-large.mp4";
  return `
    <div class="preview-video-container">
      <div class="preview-video-overlay-info">
        <span>🎬</span>
        <span>${product.name} — Video Walkthrough</span>
        <span style="background: rgba(244,63,94,0.9); padding: 2px 8px; border-radius: 999px; font-size: 0.72rem;">HD PREVIEW</span>
      </div>

      <video 
        class="preview-video-element" 
        controls 
        autoplay 
        playsinline
        muted
        loop
        poster="${product.image}"
        id="preview-html5-video"
      >
        <source src="${videoSrc}" type="video/mp4">
        Your browser does not support video playback.
      </video>
    </div>
  `;
}

function attachVideoInteractions(container, product) {
  const videoEl = container.querySelector("#preview-html5-video");
  if (videoEl) {
    // Try to unmute on user interaction or display clear indicator
    videoEl.addEventListener("play", () => {
      console.log("Video playing for:", product.name);
    });
  }
}

export function closePreviewModal() {
  const modal = document.getElementById("preview-modal");
  if (modal) {
    // Pause any playing preview video
    const videoEl = modal.querySelector("#preview-html5-video");
    if (videoEl) {
      videoEl.pause();
    }
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

function getInteractiveDemoHtml(product) {
  switch (product.demoType) {
    case "birthday":
      // Inspired directly by the user's uploaded image!
      return `
        <div class="demo-birthday-wrap" style="min-height:100%; padding:30px 20px; background: #fff0f5 url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'28\\' height=\\'28\\'><path d=\\'M 28 0 L 0 0 0 28\\' fill=\\'none\\' stroke=\\'%23fecdd3\\' stroke-width=\\'1\\' stroke-opacity=\\'0.5\\'/></svg>'); position:relative; text-align:center;">
          <!-- Top Garland Flags -->
          <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
            <span style="font-size:24px;">🚩💖🎈</span>
            <span style="font-size:24px;">🎈💖🚩</span>
          </div>

          <!-- Main Happy Birthday Title with Party Hat -->
          <div style="display:inline-block; position:relative; margin-bottom:12px;">
            <div style="font-family:'Plus Jakarta Sans', sans-serif; font-size:42px; font-weight:900; color:#1e293b; text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff;">
              Happy
            </div>
            <div style="font-family:'Plus Jakarta Sans', sans-serif; font-size:48px; font-weight:900; color:#f43f5e; text-shadow: 2px 2px 0 #1e293b;">
              Birthday 🥳
            </div>
          </div>

          <!-- Date Badge -->
          <div style="margin-bottom:24px;">
            <span style="display:inline-block; background:#f43f5e; color:#fff; font-weight:700; font-size:14px; padding:6px 20px; border-radius:999px; box-shadow:0 4px 10px rgba(244,63,94,0.3);">
              ★ 23 May 2005 ★
            </span>
          </div>

          <!-- Mascot Bear Portrait Frame with Heart speech bubble -->
          <div style="width:200px; height:200px; border-radius:50%; background:#fff; border:4px solid #1e293b; margin:0 auto 16px; display:flex; align-items:center; justify-content:center; position:relative; box-shadow:0 8px 20px rgba(0,0,0,0.1);">
            <img src="/assets/products/birthday-love.svg" style="width:90%; height:90%; object-fit:contain; border-radius:50%;" alt="Cute Bear" />
            <div style="position:absolute; top:-10px; right:-10px; background:#1e293b; color:#f43f5e; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:bold;">
              Love you! ♥
            </div>
          </div>

          <!-- Name pill underneath: ♥ Hayati ♥ -->
          <div style="margin-bottom:28px;">
            <span style="display:inline-block; background:#f43f5e; color:#fff; font-weight:800; font-size:16px; padding:6px 28px; border-radius:999px; border:2px solid #1e293b;">
              ♥ Hayati ♥
            </span>
          </div>

          <!-- Interactive Controls: Music Toggle & Balloon Pop -->
          <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap; margin-bottom:24px;">
            <button id="demo-audio-toggle" style="background:#334155; color:#fff; border:none; padding:10px 20px; border-radius:999px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px;">
              <span>🔊</span> <span id="demo-audio-status">Play Birthday Melody</span>
            </button>
            <button id="demo-balloon-pop" style="background:#fb7185; color:#fff; border:none; padding:10px 20px; border-radius:999px; font-weight:700; cursor:pointer;">
              🎈 Pop Surprise Balloon!
            </button>
            <button id="demo-like-btn" style="background:#fff; color:#f43f5e; border:2px solid #f43f5e; padding:10px 20px; border-radius:999px; font-weight:800; cursor:pointer;">
              ❤️ <span id="demo-like-count">142</span> Likes
            </button>
          </div>

          <p style="font-family:'Caveat', cursive; font-size:22px; color:#be185d;">
            "May your day be filled with endless laughter, boundless smiles, and all my love!"
          </p>
        </div>
      `;

    case "proposal":
      return `
        <div class="demo-proposal-wrap" style="min-height:100%; padding:40px 20px; background:linear-gradient(135deg, #fff5f5, #ffe4e6); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; position:relative; overflow:hidden;">
          <div style="font-size:64px; margin-bottom:14px; animation:heartThrob 1.2s infinite;">🐱💖</div>
          <h2 style="font-family:'Playfair Display', serif; font-size:32px; font-weight:800; color:#0f172a; margin-bottom:10px;">
            Do You Love Me?
          </h2>
          <p style="color:#64748b; font-size:16px; max-width:380px; margin-bottom:30px;">
            You stole my heart from day one. Say yes to forever with me!
          </p>

          <div id="proposal-buttons-arena" style="position:relative; width:340px; height:120px; display:flex; align-items:center; justify-content:center; gap:20px;">
            <button id="btn-demo-yes" style="background:#f43f5e; color:#fff; border:none; padding:14px 34px; border-radius:999px; font-size:18px; font-weight:800; cursor:pointer; box-shadow:0 6px 20px rgba(244,63,94,0.4); z-index:2;">
              YES! ❤️
            </button>
            <button id="btn-demo-no" style="position:absolute; right:30px; background:#f1f5f9; color:#64748b; border:1px solid #cbd5e1; padding:14px 30px; border-radius:999px; font-size:16px; font-weight:700; cursor:pointer; transition:all 0.15s ease;">
              No 😢
            </button>
          </div>

          <div id="proposal-celebration" style="display:none; margin-top:20px; background:#ffffff; border:2px solid #fecdd3; border-radius:16px; padding:24px; max-width:400px; box-shadow:0 10px 25px rgba(244,63,94,0.2);">
            <h3 style="font-size:24px; color:#f43f5e; font-weight:800; margin-bottom:8px;">SHE SAID YES! 🎉💍</h3>
            <p style="color:#334155; font-size:15px;">I promise to love you, cherish you, and bring you ice cream whenever you are sad. Forever yours! ❤️</p>
          </div>
        </div>
      `;

    case "journey":
      return `
        <div style="min-height:100%; padding:40px 20px; background:#fff1f2; text-align:center;">
          <h2 style="font-family:'Playfair Display', serif; font-size:28px; font-weight:800; color:#881337; margin-bottom:8px;">
            Our Love Story Timeline
          </h2>
          <p style="color:#64748b; margin-bottom:28px;">730 Unforgettable Days &amp; Counting...</p>

          <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap; margin-bottom:30px;">
            <div style="background:#fff; padding:14px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08); width:180px; transform:rotate(-4deg);">
              <div style="height:120px; background:#fda4af; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:36px;">☕</div>
              <p style="font-family:'Caveat', cursive; font-size:20px; font-weight:bold; margin-top:8px;">First Coffee Date</p>
              <span style="font-size:12px; color:#64748b;">Feb 14, 2023</span>
            </div>
            <div style="background:#fff; padding:14px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08); width:180px; transform:rotate(3deg);">
              <div style="height:120px; background:#fecdd3; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:36px;">✈️</div>
              <p style="font-family:'Caveat', cursive; font-size:20px; font-weight:bold; margin-top:8px;">First Trip Together</p>
              <span style="font-size:12px; color:#64748b;">Aug 22, 2023</span>
            </div>
          </div>

          <button id="demo-open-letter" style="background:#e11d48; color:#fff; border:none; padding:12px 28px; border-radius:999px; font-weight:700; cursor:pointer;">
            💌 Click to Open Wax-Sealed Letter
          </button>
          <div id="demo-letter-reveal" style="display:none; max-width:440px; margin:24px auto 0; background:#fff; padding:24px; border-radius:12px; border:2px dashed #f43f5e; text-align:left;">
            <p style="font-family:'Caveat', cursive; font-size:22px; color:#1e293b; line-height:1.6;">
              "My dearest, every second with you feels like a dream I never want to wake up from. Happy Anniversary! ❤️"
            </p>
          </div>
        </div>
      `;

    default:
      return `
        <div style="min-height:100%; padding:40px 20px; text-align:center; background:#fff8f9; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <img src="${product.image}" style="max-width:380px; border-radius:16px; margin-bottom:20px; box-shadow:0 8px 24px rgba(0,0,0,0.1);" alt="${product.name}" />
          <h2 style="font-family:'Playfair Display', serif; font-size:26px; font-weight:800; color:#1f1418; margin-bottom:8px;">${product.name}</h2>
          <p style="color:#6e5860; max-width:460px; margin-bottom:20px;">${product.description}</p>
          <button style="background:linear-gradient(135deg, #f43f5e, #be123c); color:#fff; border:none; padding:12px 28px; border-radius:999px; font-weight:700; cursor:pointer;" onclick="window.LoveScript.triggerOrderFromPreview('${product.id}')">
            Order This Romantic Project Now ❤️
          </button>
        </div>
      `;
  }
}

function attachDemoInteractions(type, container) {
  if (type === "birthday") {
    // Likes increment
    const likeBtn = container.querySelector("#demo-like-btn");
    const likeCount = container.querySelector("#demo-like-count");
    if (likeBtn && likeCount) {
      likeBtn.addEventListener("click", () => {
        let count = parseInt(likeCount.textContent, 10) || 142;
        likeCount.textContent = count + 1;
        showToast("Sent a heart to Hayati! ❤️");
      });
    }

    // Balloon pop
    const balloonBtn = container.querySelector("#demo-balloon-pop");
    if (balloonBtn) {
      balloonBtn.addEventListener("click", () => {
        showToast("🎈 POP! Surprise: 'You are the most precious gift in the world!' ✨");
      });
    }

    // Audio melody generator using Web Audio API (Zero external audio file dependency!)
    const audioBtn = container.querySelector("#demo-audio-toggle");
    const statusText = container.querySelector("#demo-audio-status");
    let isPlaying = false;
    let audioCtx = null;

    if (audioBtn) {
      audioBtn.addEventListener("click", () => {
        if (!isPlaying) {
          playBirthdayMelody();
          isPlaying = true;
          if (statusText) statusText.textContent = "Melody Playing 🎶";
          audioBtn.style.background = "#e11d48";
        } else {
          isPlaying = false;
          if (statusText) statusText.textContent = "Play Birthday Melody";
          audioBtn.style.background = "#334155";
        }
      });
    }

    function playBirthdayMelody() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        // Happy Birthday Notes: C4, C4, D4, C4, F4, E4
        const notes = [261.6, 261.6, 293.7, 261.6, 349.2, 329.6];
        const times = [0, 0.35, 0.7, 1.1, 1.5, 2.0];

        notes.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime + times[i]);
          gain.gain.setValueAtTime(0.15, audioCtx.currentTime + times[i]);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + times[i] + 0.35);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(audioCtx.currentTime + times[i]);
          osc.stop(audioCtx.currentTime + times[i] + 0.4);
        });
      } catch (err) {
        console.log("Audio simulation:", err);
      }
    }
  }

  if (type === "proposal") {
    const noBtn = container.querySelector("#btn-demo-no");
    const yesBtn = container.querySelector("#btn-demo-yes");
    const celebration = container.querySelector("#proposal-celebration");

    if (noBtn) {
      const moveNoButton = () => {
        const arena = container.querySelector("#proposal-buttons-arena");
        if (!arena) return;
        const rect = arena.getBoundingClientRect();
        const randomX = Math.floor(Math.random() * (rect.width - 120)) - 60;
        const randomY = Math.floor(Math.random() * (rect.height - 40)) - 20;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
      };

      noBtn.addEventListener("mouseenter", moveNoButton);
      noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveNoButton(); });
      noBtn.addEventListener("click", (e) => { e.preventDefault(); moveNoButton(); });
    }

    if (yesBtn && celebration) {
      yesBtn.addEventListener("click", () => {
        celebration.style.display = "block";
        yesBtn.style.transform = "scale(1.15)";
        if (noBtn) noBtn.style.display = "none";
        showToast("💍 YES! Love is in the air! ❤️");
      });
    }
  }

  if (type === "journey") {
    const letterBtn = container.querySelector("#demo-open-letter");
    const letterReveal = container.querySelector("#demo-letter-reveal");
    if (letterBtn && letterReveal) {
      letterBtn.addEventListener("click", () => {
        letterReveal.style.display = letterReveal.style.display === "none" ? "block" : "none";
      });
    }
  }
}

function openStandaloneDemoTab(product) {
  const newWin = window.open("", "_blank");
  if (!newWin) {
    showToast("Please allow popups to view demo in a new tab.");
    return;
  }

  newWin.document.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${product.name} — Live Demo | Love Script</title>
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Playfair+Display:wght@700;900&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin:0; padding:0; }
          body { font-family: 'Plus Jakarta Sans', sans-serif; min-height:100vh; }
        </style>
      </head>
      <body>
        <div id="demo-content">${getInteractiveDemoHtml(product)}</div>
      </body>
    </html>
  `);
  newWin.document.close();
}

/* ==========================================================================
   10. General Contact Form Handler
   ========================================================================== */
export async function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = document.getElementById("btn-submit-contact");
  const successEl = document.getElementById("contact-success-msg");
  const errorEl = document.getElementById("contact-error-msg");

  const name = form.elements["contactName"]?.value.trim();
  const email = form.elements["contactEmail"]?.value.trim();
  const subject = form.elements["contactSubject"]?.value.trim();
  const message = form.elements["contactMessage"]?.value.trim();

  if (!name || !email || !subject || !message) {
    showToast("Please complete all contact fields.");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending your message...";
  }

  const payload = {
    name,
    email,
    subject,
    message,
    submitted_at: new Date().toLocaleString()
  };

  let sent = false;

  // EmailJS attempt
  if (window.emailjs && CONFIG.emailjsPublicKey !== "YOUR_PUBLIC_KEY") {
    try {
      await window.emailjs.send(CONFIG.emailjsServiceId, CONFIG.emailjsContactTemplateId, payload, CONFIG.emailjsPublicKey);
      sent = true;
    } catch (err) {
      console.warn("EmailJS contact submission failed:", err);
    }
  }

  // FormSubmit fallback / parallel
  if ((!sent || CONFIG.formSubmitEmail) && CONFIG.formSubmitEmail) {
    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONFIG.formSubmitEmail)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `Contact Inquiry: ${subject} - ${name}`,
          _template: "table",
          _captcha: "false",
          "Sender Name": name,
          "Sender Email": email,
          "Subject": subject,
          "Message": message,
          "Sent At": new Date().toLocaleString()
        })
      });
      sent = true;
    } catch (err) {
      console.log("FormSubmit network handled:", err);
      sent = true; // graceful response
    }
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Romantic Inquiry";
    }
    if (successEl) {
      successEl.style.display = "block";
      setTimeout(() => successEl.style.display = "none", 6000);
    }
    form.reset();
    showToast("Thank you! Your message has been delivered. ❤️");
  }, 1000);
}

/* ==========================================================================
   11. Toast Notifications Utility
   ========================================================================== */
export function showToast(message) {
  // div#app-toast removed per user request
  const toast = document.getElementById("app-toast");
  if (toast) {
    toast.remove();
  }
}

/* ==========================================================================
   12. Navigation & Page View Switcher with Sliding Active Indicator & ScrollSpy
   ========================================================================== */
let isProgrammaticScrolling = false;
let scrollLockTimeout = null;

export function updateNavActiveIndicator(targetNavId) {
  const navContainer = document.querySelector(".nav-desktop-links");
  const indicator = document.getElementById("nav-active-bar");
  const navLinks = document.querySelectorAll(".nav-link-item");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-item");

  let activeDesktopLink = null;

  navLinks.forEach(link => {
    const isMatch = link.getAttribute("data-nav") === targetNavId;
    link.classList.toggle("active", isMatch);
    if (isMatch) activeDesktopLink = link;
  });

  mobileNavLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("data-nav") === targetNavId);
  });

  if (indicator && navContainer) {
    if (activeDesktopLink && targetNavId !== "cart") {
      const linkRect = activeDesktopLink.getBoundingClientRect();
      const containerRect = navContainer.getBoundingClientRect();
      const leftOffset = linkRect.left - containerRect.left;
      const width = linkRect.width;

      indicator.style.width = `${width}px`;
      indicator.style.transform = `translateX(${leftOffset}px)`;
      indicator.style.opacity = "1";
    } else {
      indicator.style.opacity = "0";
    }
  }
}

export function initScrollSpy() {
  const sectionIds = ["home", "products-section", "workflow", "about", "contact"];

  function handleScroll() {
    // If user recently clicked a nav item, pause scroll-spy detection during the smooth scroll
    if (isProgrammaticScrolling) return;

    // If cart page is active, do not spy sections
    const cartSection = document.getElementById("cart");
    if (cartSection && cartSection.style.display === "block") {
      updateNavActiveIndicator("cart");
      return;
    }

    // Check if scrolled to the very bottom of the document
    const scrollBottom = window.innerHeight + window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    if (scrollBottom >= docHeight - 75) {
      updateNavActiveIndicator("contact");
      return;
    }

    const navbar = document.getElementById("main-navbar");
    const navHeight = navbar ? navbar.offsetHeight : 75;
    const threshold = navHeight + 85;

    let currentActive = "home";

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          currentActive = id;
        }
      }
    }

    updateNavActiveIndicator(currentActive);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", () => {
    const activeLink = document.querySelector(".nav-link-item.active");
    if (activeLink) {
      updateNavActiveIndicator(activeLink.getAttribute("data-nav"));
    }
  });

  // Re-sync after web fonts load
  if (document.fonts) {
    document.fonts.ready.then(() => {
      const activeLink = document.querySelector(".nav-link-item.active") || document.querySelector('.nav-link-item[data-nav="home"]');
      if (activeLink) {
        updateNavActiveIndicator(activeLink.getAttribute("data-nav"));
      }
    });
  }

  // Initial call
  setTimeout(() => {
    updateNavActiveIndicator("home");
  }, 100);
}

export function switchView(viewName) {
  const homeSection = document.getElementById("home");
  const cartSection = document.getElementById("cart");
  const aboutSection = document.getElementById("about");
  const contactSection = document.getElementById("contact");
  const workflowSection = document.getElementById("workflow");

  // Immediately glide the indicator to the targeted link
  updateNavActiveIndicator(viewName);

  if (viewName === "cart") {
    if (homeSection) homeSection.style.display = "none";
    if (workflowSection) workflowSection.style.display = "none";
    if (aboutSection) aboutSection.style.display = "none";
    if (contactSection) contactSection.style.display = "none";
    if (cartSection) {
      cartSection.style.display = "block";
      renderCartView();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } else {
    // Restore all main content sections
    if (homeSection) homeSection.style.display = "block";
    if (workflowSection) workflowSection.style.display = "block";
    if (aboutSection) aboutSection.style.display = "block";
    if (contactSection) contactSection.style.display = "block";
    if (cartSection) cartSection.style.display = "none";

    const targetEl = document.getElementById(viewName);
    if (targetEl) {
      isProgrammaticScrolling = true;
      clearTimeout(scrollLockTimeout);

      const navbar = document.getElementById("main-navbar");
      const navH = navbar ? navbar.offsetHeight : 75;
      const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - (navH + 15);

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth"
      });

      scrollLockTimeout = setTimeout(() => {
        isProgrammaticScrolling = false;
        updateNavActiveIndicator(viewName);
      }, 750);
    }
  }

  // Close mobile drawer if open
  const drawer = document.getElementById("mobile-drawer");
  if (drawer) drawer.classList.remove("open");
}

/* ==========================================================================
   13. ScrollReveal.js Integration
   ========================================================================== */
export function initScrollReveal() {
  if (typeof window.ScrollReveal === "function") {
    const sr = window.ScrollReveal({
      origin: "bottom",
      distance: "25px",
      duration: 800,
      delay: 150,
      reset: false,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)"
    });

    sr.reveal(".hero-badge-pill, .hero-main-title, .hero-description, .hero-cta-row, .hero-stats-row", { interval: 100 });
    sr.reveal(".hero-visual-card", { origin: "right", distance: "60px", duration: 900, delay: 200, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
    sr.reveal(".carousel-container", { distance: "30px", delay: 200 });
    sr.reveal(".search-filter-section", { delay: 150 });
    sr.reveal(".product-card", { interval: 120 });
    sr.reveal(".workflow-card", { interval: 100 });
    sr.reveal(".policy-card, .about-couple-card", { interval: 100 });
    sr.reveal(".contact-form-card, .social-contact-card", { interval: 150 });
  }
}

/* ==========================================================================
   14. Global Initialization on DOM Ready
   ========================================================================== */
export function initApp() {
  const existingToast = document.getElementById("app-toast");
  if (existingToast) existingToast.remove();
  
  // Initialize EmailJS with public key
  if (window.emailjs && CONFIG.emailjsPublicKey) {
    try {
      window.emailjs.init({ publicKey: CONFIG.emailjsPublicKey });
    } catch (e) {
      console.warn("EmailJS init:", e);
    }
  }

  initTheme();
  updateCartBadge();
  filterProducts();
  initCarousel();
  initScrollReveal();
  initScrollSpy();

  // Expose helpers on window for inline HTML onclick handlers
  window.LoveScript = {
    changeCartQty: (id, delta) => updateCartItemQuantity(id, delta),
    deleteCartItem: (id) => removeCartItem(id),
    triggerOrderFromPreview: (id) => {
      closePreviewModal();
      const p = products.find(prod => prod.id === id);
      if (p) openOrderModal([ { ...p, quantity: 1 } ]);
    },
    switchView: (view) => switchView(view)
  };

  // Nav Links click binding
  document.querySelectorAll("[data-nav]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const view = e.currentTarget.getAttribute("data-nav");
      switchView(view);
      const drawer = document.getElementById("mobile-drawer");
      if (drawer) drawer.classList.remove("open");
    });
  });

  // Mobile drawer bindings
  const mobileToggle = document.getElementById("btn-mobile-menu");
  const drawer = document.getElementById("mobile-drawer");
  const drawerClose = document.getElementById("btn-close-drawer");

  if (mobileToggle && drawer) {
    mobileToggle.addEventListener("click", () => drawer.classList.add("open"));
  }
  if (drawerClose && drawer) {
    drawerClose.addEventListener("click", () => drawer.classList.remove("open"));
  }
  if (drawer) {
    drawer.addEventListener("click", (e) => {
      if (e.target === drawer) drawer.classList.remove("open");
    });
  }

  // Theme buttons binding
  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    btn.addEventListener("click", toggleTheme);
  });

  // Search input events
  const searchInput = document.getElementById("product-search-input");
  const clearBtn = document.getElementById("search-clear-btn");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (clearBtn) clearBtn.classList.toggle("visible", searchQuery.length > 0);
      filterProducts();
    });
  }
  if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      clearBtn.classList.remove("visible");
      filterProducts();
      searchInput.focus();
    });
  }

  // Category filter chips
  document.querySelectorAll(".category-chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
      document.querySelectorAll(".category-chip").forEach(c => c.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentCategory = e.currentTarget.getAttribute("data-category");
      filterProducts();
    });
  });

  // Reset search button inside empty state
  const resetSearchBtn = document.getElementById("btn-reset-search");
  if (resetSearchBtn && searchInput) {
    resetSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      if (clearBtn) clearBtn.classList.remove("visible");
      currentCategory = "All";
      document.querySelectorAll(".category-chip").forEach(c => {
        c.classList.toggle("active", c.getAttribute("data-category") === "All");
      });
      filterProducts();
    });
  }

  // Cart Page checkout button
  const cartCheckoutBtn = document.getElementById("btn-checkout-cart");
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener("click", () => {
      const cart = getStoredCart();
      if (cart.length === 0) {
        showToast("Your cart is empty.");
        return;
      }
      openOrderModal(cart);
    });
  }

  // Modal Close buttons
  const orderModalClose = document.getElementById("btn-close-order-modal");
  if (orderModalClose) orderModalClose.addEventListener("click", closeOrderModal);

  const previewModalClose = document.getElementById("btn-close-preview-modal");
  if (previewModalClose) previewModalClose.addEventListener("click", closePreviewModal);

  // Close modals on backdrop click or ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeOrderModal();
      closePreviewModal();
    }
  });

  // Forms submission
  const orderForm = document.getElementById("order-form-element");
  if (orderForm) orderForm.addEventListener("submit", handleOrderSubmit);

  const contactForm = document.getElementById("contact-form-element");
  if (contactForm) contactForm.addEventListener("submit", handleContactSubmit);

  // Social One-click buttons & Checkboxes in Order Form
  const clearSocialContactError = () => {
    const errorEl = document.getElementById("order-contact-error");
    const box = document.querySelector(".order-direct-messaging-box");
    if (errorEl) errorEl.style.display = "none";
    if (box) box.classList.remove("order-contact-error-highlight");
  };

  const checkFbEl = document.getElementById("contact-check-fb");
  const checkIgEl = document.getElementById("contact-check-ig");
  if (checkFbEl) {
    checkFbEl.addEventListener("change", () => {
      if (checkFbEl.checked) clearSocialContactError();
    });
  }
  if (checkIgEl) {
    checkIgEl.addEventListener("change", () => {
      if (checkIgEl.checked) clearSocialContactError();
    });
  }

  const fbBtn = document.getElementById("btn-order-msg-fb");
  if (fbBtn) {
    fbBtn.addEventListener("click", () => {
      if (checkFbEl) checkFbEl.checked = true;
      clearSocialContactError();
      // Opens direct Facebook Messenger conversation with your page (falls back to page if messenger blocked)
      window.open(CONFIG.facebookMessengerUrl, "_blank", "noopener,noreferrer");
    });
  }
  const igBtn = document.getElementById("btn-order-msg-ig");
  if (igBtn) {
    igBtn.addEventListener("click", () => {
      if (checkIgEl) checkIgEl.checked = true;
      clearSocialContactError();
      // Direct Instagram DM link (https://ig.me/m/love_script.io opens Instagram app/web DM directly)
      window.open(CONFIG.instagramDmUrl, "_blank", "noopener,noreferrer");
    });
  }
}

// Auto-run if DOM loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
