document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const productName = product.querySelector('h2').textContent;
            const productPrice = parseFloat(product.querySelector('p').textContent.replace('$', ''));
            
            const cartItem = document.createElement('li');
            cartItem.textContent = `${productName} - $${productPrice}`;
            cartItems.appendChild(cartItem);
            
            total += productPrice;
            cartTotal.textContent = total.toFixed(2);
        });
    });
});
