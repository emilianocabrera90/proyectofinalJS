# Simulador de Ecommerce

## Descripción

Este proyecto es un simulador de un ecommerce simple. Permite al usuario ver productos, agregar productos al carrito, vaciar el carrito, y realizar una compra. Los productos y datos de la aplicación se gestionan mediante archivos JSON.

## Instrucciones de Uso

1. **Archivos y Estructura**

   - `index.html`: Archivo principal que contiene la interfaz de usuario.
   - `css/styles.css`: Estilos personalizados para la interfaz.
   - `js/app.js`: Maneja la carga y visualización de productos.
   - `js/cart.js`: Maneja el carrito de compras y la confirmación de compras.
   - `data/products.json`: Base de datos simulada de productos.
   - `assets/images/`: Imágenes de productos.

2. **Cómo Iniciar**

   - Abre el archivo `index.html` en tu navegador para ver y utilizar la aplicación.

3. **Funcionalidades**

   - **Visualizar Productos:** Los productos se cargan desde `products.json` y se muestran dinámicamente en la página.
   - **Agregar al Carrito:** Puedes agregar productos al carrito desde la lista de productos.
   - **Vaciar Carrito:** Puedes vaciar todo el carrito en cualquier momento.
   - **Confirmar Compra:** Completa el formulario de checkout para procesar la compra.

4. **Notas Técnicas**

   - **CSS:** Utiliza Bootstrap para diseño y estilos básicos.
   - **JavaScript:** Utiliza Fetch para cargar datos JSON y manejar el estado del carrito.
   - **Almacenamiento:** Usa `localStorage` para guardar el carrito y los pedidos.

5. **Errores y Control**

   - Todos los errores se manejan mediante `try-catch` y se muestran mensajes de error amigables al usuario.

6. **Requisitos**
   - Asegúrate de tener una conexión a internet para cargar Bootstrap.

## Agradecimientos

Gracias por revisar este proyecto. Si tienes alguna pregunta, no dudes en contactarme.
