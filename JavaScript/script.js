let cart = [];

// ---------- Funções auxiliares (fora do DOMContentLoaded para serem acessíveis globalmente ou por outras funções) ----------
function salvarCarrinho() {
    localStorage.setItem('carrinhoBangu', JSON.stringify(cart));
}

function carregarCarrinho() {
    const salvo = localStorage.getItem('carrinhoBangu');
    if (salvo) {
        cart = JSON.parse(salvo);
    }
}

// ---------- Espera DOM carregar (UM ÚNICO BLOCO) ----------
document.addEventListener("DOMContentLoaded", () => {
    // --- Declaração de todas as variáveis de elementos DOM no escopo principal ---
    const themeToggleButton = document.getElementById("theme-toggle");
    const userStatusContainer = document.getElementById('user-status-container'); // Movido para cá
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartButton = document.getElementById('cart-button');
    const cartDropdown = document.getElementById('cart-dropdown');
    const addCartButtons = document.querySelectorAll('.add-to-cart'); // Renomeado para evitar conflito com 'buttons' no console.log

    // DEBUG: Confirma se os principais containers foram encontrados
    console.log('DEBUG (script.js): theme-toggle encontrado:', !!themeToggleButton);
    console.log('DEBUG (script.js): user-status-container encontrado:', !!userStatusContainer);


    // ----- Tema claro/escuro -----
    // SOMENTE EXECUTA A LÓGICA DO TEMA SE O BOTÃO 'theme-toggle' EXISTIR NA PÁGINA
    if (themeToggleButton) {
        const currentTheme = localStorage.getItem("theme") || "light";
        document.body.classList.toggle("dark-theme", currentTheme === "dark");
        themeToggleButton.textContent = currentTheme === "dark" ? "☀️" : "🌙";

        themeToggleButton.addEventListener("click", () => {
            const isDarkMode = document.body.classList.toggle("dark-theme");
            localStorage.setItem("theme", isDarkMode ? "dark" : "light");
            themeToggleButton.textContent = isDarkMode ? "☀️" : "🌙";
        });
    } else {
        console.warn("Elemento com ID 'theme-toggle' não encontrado. A funcionalidade de tema não será ativada nesta página.");
    }


    // ----- Efeitos de imagem (para páginas de produtos) -----
    const productImages = document.querySelectorAll('.produto img');
    if (productImages.length > 0) { // Só adiciona listeners se houver imagens de produto
        productImages.forEach(img => {
            img.addEventListener('mouseover', () => {
                img.style.transform = 'scale(1.2)';
                img.style.transition = 'transform 0.5s ease';
            });
            img.addEventListener('mouseout', () => {
                img.style.transform = 'scale(1)';
            });
        });
    }


    // ----- Lógica do Carrinho -----
    // Só tenta configurar o carrinho se todos os elementos necessários existirem
    if (cartButton && cartDropdown && cartCount && cartItems && cartTotal) {
        carregarCarrinho(); // Carrega dados salvos
        updateCart();       // Atualiza interface inicial

        addCartButtons.forEach(button => { // Usando o novo nome 'addCartButtons'
            button.addEventListener('click', () => {
                const produto = button.closest('.produto');
                const nome = produto.querySelector('h3').textContent;
                const precoText = produto.querySelector('p').textContent.replace('R$', '').replace(',', '.');
                const preco = parseFloat(precoText);

                const existente = cart.find(item => item.nome === nome);
                if (existente) {
                    existente.quantidade += 1;
                } else {
                    cart.push({ nome, preco, quantidade: 1 });
                }

                salvarCarrinho();
                updateCart();
            });
        });

        cartButton.addEventListener('click', () => {
            cartDropdown.classList.toggle('hidden');
        });

        function updateCart() { // Função aninhada para ter acesso às variáveis do carrinho
            cartItems.innerHTML = '';
            let total = 0;
            let totalItens = 0;

            cart.forEach((item, index) => {
                total += item.preco * item.quantidade;
                totalItens += item.quantidade;

                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${item.nome}</strong><br>
                    R$${item.preco.toFixed(2)} x ${item.quantidade} = <strong>R$${(item.preco * item.quantidade).toFixed(2)}</strong>
                    <button class="remove-item" data-index="${index}" style="margin-left:10px; color:red;">x</button>
                `;
                cartItems.appendChild(li);
            });

            cartTotal.textContent = total.toFixed(2);
            cartCount.textContent = totalItens;

            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', () => {
                    const index = parseInt(button.getAttribute('data-index'));
                    // Garante que o índice existe e o item tem quantidade para remover
                    if (cart[index] && cart[index].quantidade > 0) {
                        cart[index].quantidade--;

                        if (cart[index].quantidade <= 0) {
                            cart.splice(index, 1);
                        }
                    } else if (cart[index]) { // Se a quantidade já é 0 ou negativa, apenas remove o item
                        cart.splice(index, 1);
                    }

                    salvarCarrinho();
                    updateCart();
                });
            });
        }
    } else {
        console.warn("Um ou mais elementos do carrinho não encontrados. A funcionalidade de carrinho pode não funcionar nesta página.");
    }


    // --- Lógica de Usuário Logado/Deslogado no Cabeçalho ---
    // Esta função tem acesso a userStatusContainer porque está no mesmo escopo
    if (userStatusContainer) { // Só executa se o container de status do usuário existir
        function updateHeaderUserStatus() {
            const userName = localStorage.getItem('loggedInUser');
            console.log('DEBUG (script.js - dentro de updateHeaderUserStatus): localStorage.getItem("loggedInUser") retornou:', userName);

            if (userName) { // Se há um nome de usuário logado
                console.log('DEBUG (script.js): Usuário LOGADO. Tentando exibir nome.');
                userStatusContainer.innerHTML = `
                    <a href="#" id="user-profile-link" class="user-logged-in">
                        Olá, ${userName.split(' ')[0]}!
                    </a>
                    <button id="logout-button" class="logout-btn">Sair</button>
                `;

                // Adiciona event listeners APÓS o elemento ser inserido no DOM
                setTimeout(() => {
                    const logoutButton = document.getElementById('logout-button');
                    if (logoutButton) {
                        logoutButton.addEventListener('click', function() {
                            localStorage.removeItem('loggedInUser');
                            alert('Você foi desconectado.');
                            window.location.href = 'pag-login.html';
                        });
                    }

                    const userProfileLink = document.getElementById('user-profile-link');
                    if (userProfileLink) {
                        userProfileLink.addEventListener('click', function(e) {
                            e.preventDefault();
                        });
                    }
                }, 0);

            } else { // Se não há usuário logado
                console.log('DEBUG (script.js): Usuário NÃO LOGADO. Exibindo ícone.');
                userStatusContainer.innerHTML = `
                    <a href="pag-login.html" id="login-link"><i class="fas fa-user"></i></a>
                `;
            }
        }
        updateHeaderUserStatus(); // Chama a função para atualizar o cabeçalho
    } else {
        console.warn("Elemento com ID 'user-status-container' não encontrado. A funcionalidade de status de usuário não será ativada nesta página.");
    }

    // Opcional: Listener para o evento 'storage' caso o login seja feito em outra aba/janela
    // window.addEventListener('storage', updateHeaderUserStatus);
});