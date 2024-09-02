let cart = [];

function loadCart() {
    try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            updateCart();
        }
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
        displayMessage('Error al cargar el carrito. Inténtalo de nuevo más tarde.', 'error');
    }
}

function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error al guardar el carrito:', error);
        displayMessage('Error al guardar el carrito. Inténtalo de nuevo más tarde.', 'error');
    }
}

async function addToCart(productIndex) {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error('Error al cargar productos');
        const products = await response.json();
        const product = products[productIndex];

        if (product.stock > 0) {
            cart.push(product);
            product.stock--; // Descontamos el stock en el cliente
            saveCart();
            updateCart();
            displayMessage('Producto agregado al carrito.', 'success');
        } else {
            displayMessage('No hay stock disponible para este producto.', 'error');
        }
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        displayMessage('Error al agregar producto al carrito. Inténtalo de nuevo más tarde.', 'error');
    }
}


function updateCart() {
    try {
        const cartElement = document.getElementById('cart');
        const totalPriceElement = document.getElementById('total-price');
        cartElement.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((product, index) => {
            const cartItem = document.createElement('li');
            cartItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            cartItem.innerHTML = `
                ${product.name} - $${product.price}
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartElement.appendChild(cartItem);
            totalPrice += product.price;
        });

        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    } catch (error) {
        console.error('Error al actualizar el carrito:', error);
        displayMessage('Error al actualizar el carrito. Inténtalo de nuevo más tarde.', 'error');
    }
}

function removeFromCart(productIndex) {
    try {
        cart.splice(productIndex, 1);
        saveCart();
        updateCart();
        displayMessage("Producto removido del carrito.", 'removido');
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        displayMessage('Error al eliminar producto del carrito. Inténtalo de nuevo más tarde.', 'error');
    }
}

function emptyCart() {
    try {
        cart = [];
        saveCart();
        updateCart();
        displayMessage("Carrito completamente vaciado.", 'success');
    } catch (error) {
        console.error('Error al vaciar el carrito:', error);
        displayMessage('Error al vaciar el carrito. Inténtalo de nuevo más tarde.', 'error');
    }
}

async function handleCheckout(event) {
    event.preventDefault();

    // Verifica si hay productos en el carrito
    if (cart.length === 0) {
        displayMessage('Falta agregar productos al carrito para poder comprar.', 'error');
        return;
    }

    // Obtiene los datos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Verifica si los campos están completos
    if (!name || !email || !phone) {
        displayMessage('Llena todos los campos para finalizar la compra.', 'error');
        return;
    }

    // Valida el número de teléfono y el nombre
    if (!validatePhoneNumber(phone)) {
        displayMessage('El campo de teléfono solo puede contener números.', 'error');
        return;
    }

    if (/\d/.test(name)) {
        displayMessage('El nombre no puede contener números.', 'error');
        return;
    }

    if (!email.includes('@')) {
        displayMessage("Ingrese un correo de electronico valido.", 'error');
        return;
    }

    // Procesa la compra si todos los datos son válidos
    const order = {
        name,
        email,
        phone,
        cart
    };

    try {
        localStorage.setItem('order', JSON.stringify(order));
        cart = [];
        saveCart();
        updateCart();
        displayMessage('Compra confirmada. Gracias por tu compra.', 'success');
    } catch (error) {
        console.error('Error al procesar la compra:', error);
        displayMessage('Error al procesar la compra. Inténtalo de nuevo más tarde.', 'error');
    }
}



function validatePhoneNumber(phone) {
    return /^[0-9]+$/.test(phone);
}

function displayMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = type;
    setTimeout(() => {
        messageElement.textContent = '';
    }, 5000);
}
