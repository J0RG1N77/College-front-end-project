// Recupera o usuário cadastrado no localStorage
// Atenção: O objeto 'usuario' DEVE ser salvo pelo cadastro com { login, senha, cpf (sem mascara), nomeCompleto }
const usuarioCadastrado = JSON.parse(localStorage.getItem('usuario')); 

// Elementos do formulário de login
const loginForm = document.getElementById('login-form'); // Captura o formulário pelo ID
const inputUsuario = document.getElementById('usuario');
const inputSenha = document.getElementById('senha');
const inputCpf = document.getElementById('cpf'); 
const feedbackMessage = document.getElementById('feedback-message');

// Função para exibir mensagens de feedback
function mostrarFeedback(mensagem, tipo) {
    feedbackMessage.textContent = mensagem;
    feedbackMessage.className = `feedback-message ${tipo}`; // Adiciona classe 'success' ou 'error'
    feedbackMessage.style.display = 'block';

    setTimeout(() => {
        feedbackMessage.style.display = 'none';
        feedbackMessage.textContent = ''; // Limpa a mensagem
    }, 3000);
}

// Função que realiza a lógica de login
function realizarLogin() {
    const usuarioLogin = inputUsuario.value.trim();
    const senha = inputSenha.value.trim();
    const cpf = inputCpf.value.trim(); // Pega o CPF do input (com máscara)

    // Remove a máscara do CPF digitado para COMPARAR com o CPF salvo (que está sem máscara)
    const cpfLimpo = cpf.replace(/\D/g, ''); 

    if (!usuarioLogin || !senha || !cpf) { // Verifica se algum campo está vazio
        mostrarFeedback('Preencha todos os campos!', 'error');
        return;
    }

    // DEBUG: Logs para verificação no console
    console.log('--- Tentativa de Login ---');
    console.log('Dados Digitados:');
    console.log('  Login:', usuarioLogin);
    console.log('  Senha:', senha);
    console.log('  CPF (mascarado do input):', cpf);
    console.log('  CPF (limpo para comparação):', cpfLimpo);

    console.log('Dados Cadastrados (do localStorage):', usuarioCadastrado);
    if (usuarioCadastrado) {
        console.log('  Login Cadastrado:', usuarioCadastrado.login);
        console.log('  Senha Cadastrada:', usuarioCadastrado.senha);
        console.log('  CPF Cadastrado:', usuarioCadastrado.cpf); // Este deve ser sem máscara
        console.log('  Nome Cadastrado:', usuarioCadastrado.nomeCompleto);
    } else {
        console.log('Nenhum usuário encontrado no localStorage.');
    }
    console.log('--------------------------');


    // Verifica se o usuário está cadastrado e as credenciais correspondem
    // Compara o CPF limpo com o CPF salvo (que também deve estar limpo)
    if (usuarioCadastrado && 
        usuarioCadastrado.login === usuarioLogin && 
        usuarioCadastrado.senha === senha && 
        usuarioCadastrado.cpf === cpfLimpo) { 
        
        mostrarFeedback('Login realizado com sucesso! Redirecionando...', 'success');

        // Armazena o NOME COMPLETO do usuário logado no localStorage para o cabeçalho
        // Pega nomeCompleto do objeto salvo, se não existir, usa o login.
        localStorage.setItem('loggedInUser', usuarioCadastrado.nomeCompleto || usuarioCadastrado.login); 
        console.log('loggedInUser salvo:', localStorage.getItem('loggedInUser')); // Para depuração

        // Redireciona para a página principal (index.html)
        setTimeout(() => {
            window.location.href = 'index.html'; 
        }, 1500); 
    } else {
        mostrarFeedback('Usuário, senha ou CPF inválidos.', 'error');
        // Limpa campos para nova tentativa e foca na senha
        inputSenha.value = '';
        inputCpf.value = '';
        inputSenha.focus(); 
    }
}

// Event Listener para o envio do formulário
document.addEventListener('DOMContentLoaded', function() {
    if (loginForm) { 
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            realizarLogin();
        });
    }
});