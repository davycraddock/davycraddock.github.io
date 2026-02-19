let shopCurrentSlide = 0;
let shopProducts = [];
let shopTotalSlides = 0;
let currentProductImageIndex = 0; 
let currentProductImages = [];

function initShopSlider() {
    // Your product data with sizes
    key='pk_test_xClPkMNg0WHEehzRM0IWqG4X';
    shopProducts = [
        { 
            image: '/assets/images/home/shop/Caps.jpeg', 
            title: 'Junior Trisuit Rental', 
            price: '$25.00',
            button: 'https://buy.stripe.com/test_14AaEX9ayaeB7lab4e2B20e'
        },
        { 
            image: '/assets/images/home/shop/Socks.jpg', 
            title: 'Beginner Bike Rental', 
            price: '$100.00', 
            button: 'https://buy.stripe.com/test_00wbJ186u86taxm4FQ2B201' // No sizes, direct button
        },
        { 
            image: '/assets/images/home/shop/Trisuit.jpg', 
            title: 'Long Socks', 
            price: '$20.00',
            sizes: [
                { name: 'Small', button: 'https://buy.stripe.com/test_6oU7sLeuS9ax34Uegq2B202' },
                { name: 'Medium', button: 'https://buy.stripe.com/test_eVqfZh3Qe86tcFu2xI2B203' },
                { name: 'Large', button: 'https://buy.stripe.com/test_3cI8wP4Ui72p7la1tE2B204' }
            ]
        },
        { 
            image: '/assets/images/home/shop/Caps.jpeg', 
            title: 'Running Visor', 
            price: '$20.00', 
            button: 'buy_btn_1SyPHnGsG92yi5oUJirPL3zo'
        },
        { 
            image: '/assets/images/home/shop/Trisuit.jpg', 
            title: 'Race Jersey', 
            price: '$129.99',
            sizes: [
                { name: 'Youth - 152', button: 'https://buy.stripe.com/test_6oU00j72q1I5axm2xI2B205' }
            ]
        },
        { 
            image: '/assets/images/home/shop/Caps.jpeg', 
            title: 'Polo Shirt', 
            price: '$19.99', 
            sizes: [
                { name: 'Womens - Small', button: 'https://buy.stripe.com/test_9B66oHdqO9ax8peb4e2B206' }
            ] 
        },
                { 
            image: '/assets/images/home/shop/Trisuit.jpg', 
            title: 'Club Champs Jacket', 
            price: '$20.00',
            sizes: [
                { name: 'Womens - 8', button: 'https://buy.stripe.com/test_eVqdR94Ui1I5eNC3BM2B209' },
                { name: 'Womens - 10', button: 'https://buy.stripe.com/test_eVqfZhbiGfyVeNC0pA2B208' },
                { name: 'Mens - Small', button: 'https://buy.stripe.com/test_aFa28r5Ym72pfRGc8i2B207' }
            ]
        },
        { 
            image: '/assets/images/home/shop/Caps.jpeg', 
            title: 'Club Beanie', 
            price: '$8.00', 
            button: 'https://buy.stripe.com/test_3cI6oH3Qe0E16h6b4e2B20a' 
        },
        { 
            image: '/assets/images/home/shop/Caps.jpeg', 
            title: 'Swimwear', 
            price: '$8.00', 
            sizes: [
                { name: 'Womens - XXL', button: 'https://buy.stripe.com/test_eVqeVdaeC2M948Y6NY2B20c' },
                { name: 'Womens - XXXL', button: 'https://buy.stripe.com/test_8x2cN586u2M9fRGb4e2B20d' }
            ]
        },
        { 
            image: '/assets/images/home/shop/Caps.jpeg', 
            title: 'Hooded Towel', 
            price: '$8.00', 
            button: 'https://buy.stripe.com/test_fZubJ15YmaeB48Y4FQ2B20b' 
        },
    ];
    
    buildShopSlider();
    updateShopSlider();
}

function getItemsPerSlide() {
    const width = window.innerWidth;
    if (width < 480) return 2;   // 1x2 grid on mobile
    if (width < 768) return 4;   // 2x2 grid on small tablets
    if (width < 1200) return 6;  // 3x2 grid on tablets
    return 8;                     // 4x2 grid on desktop
}

// function buildShopSlider() {
//     const slider = document.getElementById('shopSlider');
//     const dotsContainer = document.getElementById('shopSliderDots');
//     const itemsPerSlide = getItemsPerSlide();
    
//     shopTotalSlides = Math.ceil(shopProducts.length / itemsPerSlide);
//     shopCurrentSlide = 0;
    
//     slider.innerHTML = '';
//     dotsContainer.innerHTML = '';
    
//     // Create slides
//     for (let i = 0; i < shopTotalSlides; i++) {
//         const slideDiv = document.createElement('div');
//         slideDiv.className = 'home-shop-slide';
        
//         const startIdx = i * itemsPerSlide;
//         const endIdx = Math.min(startIdx + itemsPerSlide, shopProducts.length);
        
//         for (let j = startIdx; j < endIdx; j++) {
//             const product = shopProducts[j];
//             const itemDiv = document.createElement('div');
//             itemDiv.className = 'home-shop-item';
            
//             // Check if product has sizes or direct link
//             let buttonHTML = '';
//             if (product.sizes) {
//                 // Product with size options
//                 const selectId = `product-size-${j}`;
//                 buttonHTML = `
//                     <select id="${selectId}" class="product-size-select">
//                         <option value="">Select Size</option>
//                         ${product.sizes.map(size => `<option value="${size.link}">${size.name}</option>`).join('')}
//                     </select>
//                     <button class="btn" onclick="buyProductWithSize('${selectId}')">Buy Now</button>
//                 `;
//             } else {
//                 // Product with direct link
//                 buttonHTML = `
//                 <div class="product-no-size-spacer"></div>

//                 <stripe-buy-button
//                 class="stripe-buy-button"
//   buy-button-id="${product.button}"
//   publishable-key="${key}"
// >
// </stripe-buy-button>`;
//             }
            
//             itemDiv.innerHTML = `
//                 <div onclick="openProductModal(${j})">
//                 <div class="home-shop-item-image">
//                     <img src="${product.image}" alt="${product.title}">
//                 </div>
//                 <h3>${product.title}</h3>
//                 <p>${product.price}</p>
//                 </div>
//                 ${buttonHTML}
//             `;
            
//             slideDiv.appendChild(itemDiv);
//         }
        
//         slider.appendChild(slideDiv);
        
//         // Create dot
//         const dot = document.createElement('div');
//         dot.className = 'shop-slider-dot';
//         if (i === 0) dot.classList.add('active');
//         dot.onclick = () => shopGoToSlide(i);
//         dotsContainer.appendChild(dot);
//     }
// }

// Modal Functions

function showStripeButton(selectId, buttonContainerId, productIndex) {
    const select = document.getElementById(selectId);
    const buttonContainer = document.getElementById(buttonContainerId);
    const sizeIndex = parseInt(select.value);
    
    if (select.value === '') {
        buttonContainer.innerHTML = '';
        return;
    }
    
    const product = shopProducts[productIndex];
    const selectedSize = product.sizes[sizeIndex];
    
    // Clear and create new Stripe button
    buttonContainer.innerHTML = `
        <stripe-buy-button
            buy-button-id="${selectedSize.button}"
            publishable-key="${product.key}"
        ></stripe-buy-button>
    `;
}

function buildShopSlider() {
    const slider = document.getElementById('shopSlider');
    const dotsContainer = document.getElementById('shopSliderDots');
    const itemsPerSlide = getItemsPerSlide();
    
    shopTotalSlides = Math.ceil(shopProducts.length / itemsPerSlide);
    shopCurrentSlide = 0;
    
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < shopTotalSlides; i++) {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'home-shop-slide';
        
        const startIdx = i * itemsPerSlide;
        const endIdx = Math.min(startIdx + itemsPerSlide, shopProducts.length);
        
        for (let j = startIdx; j < endIdx; j++) {
            const product = shopProducts[j];
            const itemDiv = document.createElement('div');
            itemDiv.className = 'home-shop-item';
            
            let buttonHTML = '';
            if (product.sizes) {
                const selectId = `product-size-${j}`;
                const buttonContainerId = `stripe-button-${j}`;
                
                buttonHTML = `
                    <select id="${selectId}" class="product-size-select" onchange="showStripeButton('${selectId}', '${buttonContainerId}', ${j})">
                        <option value="">Select Size</option>
                        ${product.sizes.map((size, idx) => `<option value="${idx}">${size.name}</option>`).join('')}
                    </select>
                    <div id="${buttonContainerId}" class="stripe-button-container"></div>
                `;
            } else {
                buttonHTML = `
                    <div class="product-no-size-spacer"></div>
                    <div class="stripe-button-container">
                    <script async src="https://js.stripe.com/v3/buy-button.js"></script>
                    <stripe-buy-button
                        buy-button-id="${product.button}"
                        publishable-key="${product.key}"
                    ></stripe-buy-button>
                    </div>
                `;
            }
            
            itemDiv.innerHTML = `
                <div class="home-shop-item-image" onclick="openProductModal(${j})">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                ${buttonHTML}
            `;
            
            slideDiv.appendChild(itemDiv);
        }
        
        slider.appendChild(slideDiv);
        
        const dot = document.createElement('div');
        dot.className = 'shop-slider-dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => shopGoToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function openProductModal(productIndex) {
    const product = shopProducts[productIndex];
    const modal = document.getElementById('productModal');
    
    // Set product info
    document.getElementById('productModalTitle').textContent = product.title;
    document.getElementById('productModalPrice').textContent = product.price;
    document.getElementById('productModalDescription').textContent = product.description || 'No description available.';
    
    // Set images
    currentProductImages = product.images || [product.image];
    currentProductImageIndex = 0;
    
    const imagesContainer = document.getElementById('productModalImages');
    imagesContainer.innerHTML = currentProductImages.map(img => `
        <div class="product-modal-image">
            <img src="${img}" alt="${product.title}">
        </div>
    `).join('');
    
    updateProductModalSlider();

    const prevBtn = document.querySelector('.product-modal-slider-btn.prev');
    const nextBtn = document.querySelector('.product-modal-slider-btn.next');
    
    if (currentProductImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
    
    // Set size selector or buy button
    const sizeContainer = document.getElementById('productModalSizeContainer');
    const buttonContainer = document.getElementById('productModalButton');
    
    if (product.sizes) {
        const selectId = 'productModalSize';
        sizeContainer.innerHTML = `
            <select id="${selectId}" class="product-modal-size-select">
                <option value="">Select Size</option>
                ${product.sizes.map(size => `<option value="${size.link}">${size.name}</option>`).join('')}
            </select>
        `;
        buttonContainer.innerHTML = `<button class="btn" onclick="buyProductWithSize('${selectId}')">Buy Now</button>`;
    } else {
        sizeContainer.innerHTML = '<div class="product-no-size-spacer"></div>';
        buttonContainer.innerHTML = `<button class="btn" onclick="window.open('${product.link}', '_blank')">Buy Now</button>`;
    }
    
    // Show modal
  //  modal.style.display = 'flex';
    // document.body.style.overflow = 'hidden'; // Prevent background scrolling
      modal.style.display = 'block';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    //document.body.style.overflow = 'auto';
}

function updateProductModalSlider() {
    const imagesContainer = document.getElementById('productModalImages');
    imagesContainer.style.transform = `translateX(-${currentProductImageIndex * 100}%)`;
}

function prevProductImage() {
    if (currentProductImageIndex > 0) {
        currentProductImageIndex--;
        updateProductModalSlider();
    }
}

function nextProductImage() {
    if (currentProductImageIndex < currentProductImages.length - 1) {
        currentProductImageIndex++;
        updateProductModalSlider();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeProductModal();
    }
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// Function to handle size-based purchases
function buyProductWithSize(selectId) {
    const select = document.getElementById(selectId);
    const url = select.value;
    
    if (!url) {
        alert('Please select a size');
        return;
    }
    
    window.open(url, '_blank');
}

function updateShopSlider() {
    const slider = document.getElementById('shopSlider');
    slider.style.transform = `translateX(-${shopCurrentSlide * 100}%)`;
    
    // Update dots
    document.querySelectorAll('.shop-slider-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === shopCurrentSlide);
    });
}

function shopSliderNext() {
    if (shopCurrentSlide < shopTotalSlides - 1) {
        shopCurrentSlide++;
        updateShopSlider();
    }
}

function shopSliderPrev() {
    if (shopCurrentSlide > 0) {
        shopCurrentSlide--;
        updateShopSlider();
    }
}

function shopGoToSlide(index) {
    shopCurrentSlide = index;
    updateShopSlider();
}

// Rebuild slider on resize
let shopResizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(shopResizeTimeout);
    shopResizeTimeout = setTimeout(() => {
        const newItemsPerSlide = getItemsPerSlide();
        const oldItemsPerSlide = Math.ceil(shopProducts.length / shopTotalSlides);
        
        if (newItemsPerSlide !== oldItemsPerSlide) {
            buildShopSlider();
            updateShopSlider();
        }
    }, 250);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initShopSlider);