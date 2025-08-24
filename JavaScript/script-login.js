// Recupera o usuário cadastrado no localStorage
const usuario = JSON.parse(localStorage.getItem('usuario')); // Agora recupera o objeto 'usuario', não 'usuarios'

// Elementos do formulário de login
const inputCpf = document.getElementById('cpf');  // Agora captura o input de CPF
const buttonEnviar = document.getElementById('enviar');
const inputUsuario = document.getElementById('usuario');
const inputSenha = document.getElementById('senha');
const feedbackMessage = document.getElementById('feedback-message');

// Função para exibir mensagens de feedback
function mostrarFeedback(mensagem, tipo) {
    feedbackMessage.textContent = mensagem;
    feedbackMessage.className = `feedback-message ${tipo}`;
    feedbackMessage.style.display = 'block';

    setTimeout(() => {
        feedbackMessage.style.display = 'none';
    }, 3000);
}

// Validação ao clicar no botão "Enviar"
buttonEnviar.addEventListener('click', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do botão

    const usuarioLogin = inputUsuario.value.trim();
    const senha = inputSenha.value.trim();
    const cpf = inputCpf.value.trim(); // Agora estamos pegando o CPF

    if (!usuarioLogin || !senha || !cpf) { // Verifica se algum campo está vazio
        mostrarFeedback('Preencha todos os campos!', 'error');
        return;
    }

    // Verifica se o usuário está cadastrado
    if (usuario && usuario.login === usuarioLogin && usuario.senha === senha && usuario.cpf === cpf) {
        mostrarFeedback('Login realizado com sucesso! Redirecionando...', 'success');

        // Armazena o login do usuário logado no localStorage
        localStorage.setItem('loggedUser', usuarioLogin);

        // Redireciona para a página principal
        setTimeout(() => {
            window.location.href = 'produtos.html';
        }, 2000);
    } else {
        mostrarFeedback('Usuário, senha ou CPF inválidos.', 'error');
        console.log(JSON.parse(localStorage.getItem('usuario'))); 
    }
});
