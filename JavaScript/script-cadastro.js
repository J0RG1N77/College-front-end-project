// Elementos do formulário de cadastro
const formCadastro = document.getElementById('form-cadastro');
const feedbackMessage = document.getElementById('feedback-message');

// Função para exibir mensagens de feedback
function mostrarFeedback(mensagem, tipo) {
    feedbackMessage.textContent = mensagem;
    feedbackMessage.className = `feedback-message ${tipo}`;
    feedbackMessage.style.display = 'block';

    setTimeout(() => {
        feedbackMessage.style.display = 'none';
        feedbackMessage.textContent = ''; // Limpa a mensagem após esconder
    }, 3000);
}

// Validação para o nome
function validarNome(nome) {
    const nomeRegex = /^[a-zA-Z\s]{15,60}$/; // 15 a 60 caracteres, alfabéticos e espaços permitidos
    return nomeRegex.test(nome);
}

// Validação para CPF (com ou sem pontuação)
function validarCPF(cpf) {
    // Regex para validar o formato com ou sem pontuação
    const cpfRegex = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
    return cpfRegex.test(cpf);
}

// Validação para celular (padrão de celular no Brasil)
function validarCelular(celular) {
    const celularRegex = /^(?:\(?\d{2}\)?\s?)?\d{5}-\d{4}$/; // Formato (XX) XXXXX-XXXX ou XX XXXXX-XXXX
    return celularRegex.test(celular);
}

// Validação para Telefone-Fixo
function validarTelefoneFixo(telefonefixo) {
    const telefoneFixoRegex = /^(?:\(?\d{2}\)?\s?)?\d{4}-\d{4}$/; // Formato (XX) XXXX-XXXX
    return telefoneFixoRegex.test(telefonefixo);
}

// Validação para login (exatamente 6 caracteres alfabéticos)
function validarLogin(login) {
    const loginRegex = /^[a-zA-Z]{6}$/; // Exatamente 6 caracteres alfabéticos
    return loginRegex.test(login);
}

// Validação para senha (exatamente 8 caracteres alfabéticos)
function validarSenha(senha) {
    const senhaRegex = /^[a-zA-Z]{8}$/; // Exatamente 8 caracteres alfabéticos
    return senhaRegex.test(senha);
}

// Função para validar e processar o formulário de cadastro
function validarCadastro() {
    const nomeCompleto = document.getElementById('nome-completo').value.trim();
    const cpfInput = document.getElementById('cpf'); // Pega o elemento input do CPF
    const cpf = cpfInput.value.trim(); // Pega o valor do CPF (com máscara)
    const celular = document.getElementById('celular').value.trim();
    const telefonefixo = document.getElementById('telefone-fixo').value.trim();
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmarSenha = document.getElementById('confirmar-senha').value.trim();

    // Validação do nome
    if (!validarNome(nomeCompleto)) {
        mostrarFeedback('O nome deve ter entre 15 e 60 caracteres alfabéticos, podendo conter espaços.', 'error');
        return false;
    }

    // Validação do CPF
    if (!validarCPF(cpf)) { // Aqui valida o formato com ou sem pontuação
        mostrarFeedback('O CPF deve ser válido, com ou sem pontuação.', 'error');
        return false;
    }

    // Validação do celular
    if (!validarCelular(celular)) {
        mostrarFeedback('O celular deve estar no formato (XX) XXXXX-XXXX ou XX XXXXX-XXXX.', 'error');
        return false;
    }

    // Validação do Telefone-Fixo
    if (!validarTelefoneFixo(telefonefixo)) {
        mostrarFeedback('O Telefone Fixo deve estar no formato (XX) XXXX-XXXX.', 'error');
        return false;
    }

    // Validação do login
    if (!validarLogin(login)) {
        mostrarFeedback('O login deve ter exatamente 6 caracteres alfabéticos.', 'error');
        return false;
    }

    // Validação da senha
    if (!validarSenha(senha)) {
        mostrarFeedback('A senha deve ter exatamente 8 caracteres alfabéticos.', 'error');
        return false;
    }

    // Verificação das senhas
    if (senha !== confirmarSenha) {
        mostrarFeedback('As senhas não coincidem.', 'error');
        return false;
    }

    // 1.0 - Cria um objeto usuario com os valores provenientes de cada id
    // IMPORTANTE: Removemos a máscara do CPF antes de salvar
    const usuario = {
        nomeCompleto: nomeCompleto,
        cpf: cpf.replace(/\D/g, ''), // CPF SALVO SEM MÁSCARA!
        telefoneCelular: celular.replace(/\D/g, ''), // Boa prática: salvar sem máscara também
        telefoneFixo: telefonefixo.replace(/\D/g, ''), // Boa prática: salvar sem máscara também
        login: login,
        senha: senha,
        // confirmaSenha: confirmarSenha // Opcional: geralmente não se salva confirmaSenha, apenas a senha
    };

    // Armazenar o objeto usuario no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    console.log('Dados do usuário salvos no localStorage:', usuario); // Para depuração

    return true;
}

// Evento de envio do formulário
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validarCadastro()) {
        mostrarFeedback('Usuário cadastrado com sucesso!', 'success');

        // Redirecionar para a página de login após o cadastro
        setTimeout(() => {
            window.location.href = 'pag-login.html';
        }, 2000);
    }
});