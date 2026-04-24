document.addEventListener('DOMContentLoaded', () => {
    // 1. Selectores de cantidad
    const selectors = document.querySelectorAll('.quantity-selector');
    selectors.forEach(selector => {
        const btnMinus = selector.querySelector('.minus');
        const btnPlus = selector.querySelector('.plus');
        const input = selector.querySelector('.qty-input');

        btnMinus.addEventListener('click', () => {
            if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
        });
        btnPlus.addEventListener('click', () => {
            input.value = parseInt(input.value) + 1;
        });
    });

    // 2. Botones de compra
    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            
            // Verificamos que existan los elementos antes de leerlos
            const nameEl = card.querySelector('h3');
            const priceEl = card.querySelector('.current-price');
            const imgEl = card.querySelector('img');

            if (!priceEl) {
                console.error("Error: No se encontró la clase .current-price en el HTML");
                alert("Error técnico: Clase de precio faltante");
                return;
            }

            const product = {
                id: Date.now(),
                name: nameEl.innerText,
                price: parseFloat(priceEl.innerText),
                quantity: parseInt(card.querySelector('.qty-input').value),
                image: imgEl.src // Usamos la ruta absoluta que da .src
            };

            addToCart(product);
        });
    });

    updateCartCount();
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.name === product.name);
    
    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('¡Producto agregado!');
}

// function updateCartCount() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const countElement = document.getElementById('cart-count');
//     if (!countElement) return;

//     const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
//     countElement.innerText = totalItems;
//     countElement.style.display = totalItems > 0 ? 'block' : 'none';
// }

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElement = document.getElementById('cart-count');
    
    if (countElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        countElement.innerText = totalItems;
        countElement.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Llamar siempre al cargar el DOM
document.addEventListener('DOMContentLoaded', updateCartCount);