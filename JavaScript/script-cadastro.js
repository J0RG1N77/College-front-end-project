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
    }, 3000);
}

// Validação para o nome
function validarNome(nome) {
    const nomeRegex = /^[a-zA-Z\s]{15,60}$/; // 15 a 60 caracteres, alfabéticos e espaços permitidos
    return nomeRegex.test(nome);
}

// Validação para CPF (com ou sem pontuação)
function validarCPF(cpf) {
    const cpfRegex = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/; // Permite CPF com ou sem pontuação
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

// Função para validar o formulário de cadastro
function validarCadastro() {
    const nomeCompleto = document.getElementById('nome-completo').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const celular = document.getElementById('celular').value.trim();
    const telefonefixo = document.getElementById('telefone-fixo').value.trim();
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmarSenha = document.getElementById('confirmar-senha').value.trim();

    // 1.0 - Cria um objeto usuario com os valores provenientes de cada id
    const usuario = {
        nomeCompleto: nomeCompleto,
        cpf: cpf,
        telefoneCelular: celular,
        telefoneFixo: telefonefixo,
        login: login,
        senha: senha,
        confirmaSenha: confirmarSenha
    };


// Máscara CPF
function maskCPF(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}
// Máscara Celular (21) 99999-9999
function maskCelular(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}
// Máscara Telefone Fixo (21) 9999-9999
function maskFixo(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}

document.addEventListener('DOMContentLoaded', function() {
  const cpf = document.getElementById('cpf');
  const celular = document.getElementById('celular');
  const fixo = document.getElementById('telefone-fixo');
  if (cpf) {
    cpf.addEventListener('input', function(e) {
      this.value = maskCPF(this.value);
    });
  }
  if (celular) {
    celular.addEventListener('input', function(e) {
      this.value = maskCelular(this.value);
    });
  }
  if (fixo) {
    fixo.addEventListener('input', function(e) {
      this.value = maskFixo(this.value);
    });
  }
});


    // Validação do nome
    if (!validarNome(nomeCompleto)) {
        mostrarFeedback('O nome deve ter entre 15 e 60 caracteres alfabéticos, podendo conter espaços.', 'error');
        return false;
    }

    // Validação do CPF
    if (!validarCPF(cpf)) {
        mostrarFeedback('O CPF deve ser válido, com ou sem pontuação.', 'error');
        return false;
    }

    // Validação do celular
    if (!validarCelular(celular)) {
        mostrarFeedback('O celular deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.', 'error');
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

    // Armazenar o objeto usuario no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    return true;
}

// Evento de envio do formulário
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validarCadastro()) {
        const login = document.getElementById('login').value.trim();
        const senha = document.getElementById('senha').value.trim();

        // Função para salvar login e senha (opcional)
        localStorage.setItem('login', login);
        localStorage.setItem('senha', senha);

        mostrarFeedback('Usuário cadastrado com sucesso!', 'success');

        // Redirecionar para a página de login após o cadastro
        setTimeout(() => {
            window.location.href = 'pag-login.html';
        }, 2000);
    }
});
