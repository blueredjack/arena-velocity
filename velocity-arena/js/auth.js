/* ==========================================
   VELOCITY ARENA - AUTH
   Arquivo: js/auth.js
   Descrição: Sistema de autenticação por senha
   ========================================== */

const Auth = {
    // ===========================
    // CONFIGURAÇÃO
    // ===========================
    config: {
        // Senha de acesso (pode ser alterada aqui)
        password: 'velocity2025',
        
        // Página de destino após login
        redirectTo: 'apresentacao.html',
        
        // Chave do sessionStorage
        storageKey: 'velocity_auth',
        
        // Tempo de sessão (em milissegundos) - 24 horas
        sessionDuration: 24 * 60 * 60 * 1000,
        
        // Mensagens
        messages: {
            empty: 'Digite a senha de acesso',
            invalid: 'Senha incorreta. Tente novamente.',
            success: 'Acesso autorizado. Redirecionando...'
        }
    },

    // ===========================
    // INICIALIZAÇÃO
    // ===========================
    init() {
        // Verifica se já está autenticado
        if (this.isAuthenticated()) {
            this.redirect();
            return;
        }

        // Configura o formulário
        this.setupForm();
    },

    // ===========================
    // VERIFICAR AUTENTICAÇÃO
    // ===========================
    isAuthenticated() {
        const session = sessionStorage.getItem(this.config.storageKey);
        if (!session) return false;

        try {
            const data = JSON.parse(session);
            const now = Date.now();
            
            // Verifica se a sessão ainda é válida
            if (data.expires && now < data.expires) {
                return true;
            }
            
            // Sessão expirada, remove
            sessionStorage.removeItem(this.config.storageKey);
            return false;
        } catch {
            return false;
        }
    },

    // ===========================
    // CRIAR SESSÃO
    // ===========================
    createSession() {
        const session = {
            authenticated: true,
            timestamp: Date.now(),
            expires: Date.now() + this.config.sessionDuration
        };
        sessionStorage.setItem(this.config.storageKey, JSON.stringify(session));
    },

    // ===========================
    // VALIDAR SENHA
    // ===========================
    validatePassword(input) {
        return input === this.config.password;
    },

    // ===========================
    // REDIRECT
    // ===========================
    redirect() {
        window.location.href = this.config.redirectTo;
    },

    // ===========================
    // CONFIGURAR FORMULÁRIO
    // ===========================
    setupForm() {
        const form = document.getElementById('authForm');
        const input = document.getElementById('passwordInput');
        const message = document.getElementById('authMessage');
        const button = document.getElementById('authButton');

        if (!form || !input) return;

        // Submit do formulário
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(input, message, button);
        });

        // Limpa erro ao digitar
        input.addEventListener('input', () => {
            input.classList.remove('error');
            if (message) message.className = 'auth-message';
        });

        // Enter para submeter
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleSubmit(input, message, button);
            }
        });

        // Foca no input
        input.focus();
    },

    // ===========================
    // PROCESSAR SUBMIT
    // ===========================
    handleSubmit(input, message, button) {
        const password = input.value.trim();

        // Validação vazia
        if (!password) {
            this.showError(input, message, this.config.messages.empty);
            return;
        }

        // Adiciona loading
        if (button) {
            button.classList.add('loading');
            button.disabled = true;
        }

        // Simula delay de verificação (mais realista)
        setTimeout(() => {
            if (this.validatePassword(password)) {
                this.handleSuccess(message, button);
            } else {
                this.handleError(input, message, button);
            }
        }, 500);
    },

    // ===========================
    // SUCESSO
    // ===========================
    handleSuccess(message, button) {
        // Cria sessão
        this.createSession();

        // Mostra mensagem de sucesso
        if (message) {
            message.textContent = this.config.messages.success;
            message.className = 'auth-message success';
        }

        // Redirect após breve delay
        setTimeout(() => {
            this.redirect();
        }, 800);
    },

    // ===========================
    // ERRO
    // ===========================
    handleError(input, message, button) {
        // Remove loading
        if (button) {
            button.classList.remove('loading');
            button.disabled = false;
        }

        // Mostra erro
        this.showError(input, message, this.config.messages.invalid);

        // Limpa input
        input.value = '';
        input.focus();
    },

    // ===========================
    // MOSTRAR ERRO
    // ===========================
    showError(input, message, text) {
        input.classList.add('error');
        if (message) {
            message.textContent = text;
            message.className = 'auth-message error';
        }
    },

    // ===========================
    // LOGOUT (para uso futuro)
    // ===========================
    logout() {
        sessionStorage.removeItem(this.config.storageKey);
        window.location.href = 'index.html';
    }
};

// ===========================
// INICIALIZA QUANDO DOM READY
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});

// Exporta para uso global
window.Auth = Auth;
