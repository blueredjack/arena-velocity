/* ==========================================
   VELOCITY ARENA - AUTH GUARD
   Arquivo: js/auth-guard.js
   Descrição: Proteção de páginas autenticadas
   ========================================== */

const AuthGuard = {
    // ===========================
    // CONFIGURAÇÃO
    // ===========================
    config: {
        storageKey: 'neovelox_auth',
        loginPage: 'index.html'
    },

    // ===========================
    // VERIFICAR ACESSO
    // ===========================
    check() {
        if (!this.isAuthenticated()) {
            this.redirectToLogin();
            return false;
        }
        return true;
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
            
            if (data.expires && now < data.expires) {
                return true;
            }
            
            sessionStorage.removeItem(this.config.storageKey);
            return false;
        } catch {
            return false;
        }
    },

    // ===========================
    // REDIRECT PARA LOGIN
    // ===========================
    redirectToLogin() {
        window.location.href = this.config.loginPage;
    },

    // ===========================
    // LOGOUT
    // ===========================
    logout() {
        sessionStorage.removeItem(this.config.storageKey);
        this.redirectToLogin();
    }
};

// ===========================
// VERIFICA IMEDIATAMENTE
// ===========================
(function() {
    AuthGuard.check();
})();

// Exporta para uso global
window.AuthGuard = AuthGuard;
