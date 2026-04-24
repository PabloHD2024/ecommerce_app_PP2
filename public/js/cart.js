// const cartItemsContainer = document.getElementById('cart-items');
// const cartTotalElement = document.getElementById('cart-total');

// function renderCart() {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cartItemsContainer.innerHTML = '';
//     let total = 0;

//     cart.forEach((item, index) => {
//         total += item.price * item.quantity;
//         cartItemsContainer.innerHTML += `
//             <div class="cart-item">
//                 <img src="${item.image}" width="50">
//                 <p>${item.name} (x${item.quantity})</p>
//                 <p>$${item.price * item.quantity}</p>
//                 <button onclick="removeItem(${index})">Eliminar</button>
//             </div>
//         `;
//     });

//     cartTotalElement.innerText = `$${total}`;
// }

// function removeItem(index) {
//     let cart = JSON.parse(localStorage.getItem('cart'));
//     cart.splice(index, 1);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     renderCart();
//     updateCartCount();
// }

// renderCart();

// document.getElementById('btn-checkout').addEventListener('click', () => {
//     const cart = JSON.parse(localStorage.getItem('cart'));
//     if (cart && cart.length > 0) {
//         alert('Redirigiendo a la pasarela de pago...');
//         // Aquí es donde en el futuro enviarás el JSON a tu servidor Node.js
//     } else {
//         alert('El carrito está vacío');
//     }
// });

// document.getElementById('btn-empty').addEventListener('click', () => {
//     if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
//         localStorage.removeItem('cart'); // Borra los datos
//         renderCart();                    // Vuelve a dibujar el carrito (ahora vacío)
//         updateCartCount();               // Actualiza el icono del nav
//     }
// });

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" width="50">
                    <div class="item-details">
                        <p><strong>${item.name}</strong></p>
                        <p>Cantidad: ${item.quantity}</p>
                        <p>Subtotal: $${item.price * item.quantity}</p>
                    </div>
                    <button class="btn-remove" onclick="removeItem(${index})">Eliminar</button>
                </div>
            `;
        });
    }
    cartTotalElement.innerText = `$${total}`;
}

// Función para eliminar un solo item
window.removeItem = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
};

// Función para vaciar TODO el carrito
document.getElementById('btn-empty').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        localStorage.removeItem('cart');
        renderCart();
        updateCartCount();
    }
});

// Función para el contador del nav
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        if (totalItems > 0) {
            countElement.innerText = totalItems;
            countElement.style.display = 'flex';
        } else {
            countElement.style.display = 'none';
        }
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartCount();
});