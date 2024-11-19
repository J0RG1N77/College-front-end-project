// Atualiza o contador de itens no carrinho
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').innerText = cart.length;
}

// Adiciona um produto ao carrinho
function addToCart(id, name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} adicionado ao carrinho!`);
    updateCartCount();
}

// Exibe os itens do carrinho na página de carrinho
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const carrinhoItens = document.getElementById('carrinho-itens');
    const carrinhoTotal = document.getElementById('carrinho-total');

    // Limpa o conteúdo existente
    carrinhoItens.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        carrinhoItens.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            carrinhoItens.innerHTML += `
                <div>
                    <span>${item.name} - R$ ${item.price.toFixed(2)}</span>
                    <button onclick="removeFromCart(${index})">Remover</button>
                </div>
            `;
        });
    }

    carrinhoTotal.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
}

// Remove um item do carrinho
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Finaliza a compra
function finalizarCompra() {
    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('cart');
    displayCart();
    updateCartCount();
}

// Atualiza o contador na página de produtos
if (document.getElementById('cart-count')) {
    updateCartCount();
}

// Exibe os itens na página de carrinho
if (document.getElementById('carrinho-itens')) {
    displayCart();
}
