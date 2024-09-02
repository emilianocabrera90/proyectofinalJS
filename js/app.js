document.addEventListener('DOMContentLoaded', () => {
    try {
        loadProducts();
        loadCart();
        document.getElementById('empty-cart').addEventListener('click', emptyCart);
        document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
        document.getElementById('checkout-btn').addEventListener('click', handleCheckout); 
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        displayMessage('Error al cargar la aplicación. Inténtalo de nuevo más tarde.', 'error');
    }
});

async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error('Error al cargar productos');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar productos:', error);
        displayMessage('Error al cargar productos. Inténtalo de nuevo más tarde.', 'error');
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.className = 'col-md-4 mb-4';
        productElement.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio: $${product.price}</p>
                    <p class="card-text">Stock: ${product.stock}</p>
                    <button class="btn btn-primary" onclick="addToCart(${index})">Agregar al carrito</button>
                </div>
            </div>
        `;
        productList.appendChild(productElement);
    });
}
